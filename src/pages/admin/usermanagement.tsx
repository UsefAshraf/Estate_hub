import React, { useState, useEffect } from 'react';
import { Shield, Users, UserCheck, TrendingUp, Home, Search, Trash2, ChevronLeft, ChevronRight, Loader2, Key } from 'lucide-react';

// --- 1. TYPES ---
interface User {
  _id: string;
  userName: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  role: string;
  createdAt: string;
}

interface UsersResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: User[];
}

// --- 2. CONFIGURATION ---
const API_BASE_URL = "http://localhost:3000/api/users";

// --- 3. REAL API SERVICE ---
const userService = {
  getToken: () => {
    // Try common keys for the token
    return localStorage.getItem('token') || localStorage.getItem('accessToken') || localStorage.getItem('auth_token');
  },

  getAllUsers: async (page: number, limit: number, search: string, role: string): Promise<UsersResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search: search,
      role: role === 'All Roles' ? '' : role
    });

    const token = userService.getToken();
    const headers: HeadersInit = { 'Content-Type': 'application/json' };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}?${params.toString()}`, {
        method: 'GET',
        headers: headers,
        credentials: 'include',
      });

      if (!response.ok) {
        let errorMessage = `Error ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          errorMessage = `${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error("API Fetch Error:", error);
      throw error;
    }
  },

  deleteUser: async (userId: string) => {
    const token = userService.getToken();
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
      const response = await fetch(`${API_BASE_URL}/${userId}`, {
        method: 'DELETE',
        headers: headers,
        credentials: 'include',
      });

      if (!response.ok) {
        let errorMessage = `Error ${response.status}`;
        let responseText = '';
        try {
          // Try to get the response text first
          responseText = await response.text();
          console.log('Server response:', responseText);

          // Try to parse as JSON
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          // If response is not JSON, use the text or status
          errorMessage = responseText || `${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error("Delete Error:", error);
      throw error;
    }
  }
};

// --- 4. INTERNAL ALERT SYSTEM ---
const SimpleAlert = {
  confirm: (message: string) => window.confirm(message),
  success: (message: string) => window.alert(`SUCCESS: ${message}`),
  error: (message: string) => window.alert(`ERROR: ${message}`)
};

// --- 5. MAIN COMPONENT ---
const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('All Roles');

  // Data states
  const [users, setUsers] = useState<User[]>([]); 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalUsersCount, setTotalUsersCount] = useState<number>(0);

  // Auth Debug State
  const [manualToken, setManualToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState<boolean>(true);

  // Initialize token from storage if available
  useEffect(() => {
    const existingToken = localStorage.getItem('token');
    if (existingToken) {
      setManualToken(existingToken);
      setShowTokenInput(false);
      fetchUsers(1);
    }
  }, []);

  const handleSetToken = () => {
    if (manualToken) {
      localStorage.setItem('token', manualToken);
      setShowTokenInput(false);
      fetchUsers(1);
    }
  };

  const fetchUsers = async (currentPage: number) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Fetching from ${API_BASE_URL}...`);
      const response = await userService.getAllUsers(currentPage, 10, searchQuery, roleFilter);

      if (response.success) {
        setUsers(response.data);
        setTotalPages(response.pages);
        setTotalUsersCount(response.total);
        setPage(response.page);
      } else {
        setUsers([]);
      }
    } catch (err: any) {
      console.error("Failed to fetch users", err);
      setError(err.message);

      // If unauthorized, show token input
      if (err.message.includes('token') || err.message.includes('401') || err.message.includes('403') || err.message.includes('404')) {
        setShowTokenInput(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if we have a token or user explicitly hid the input
    if (!showTokenInput) {
      fetchUsers(1);
    }
  }, [searchQuery, roleFilter]);

  useEffect(() => {
    if (page !== 1 && !showTokenInput) fetchUsers(page);
  }, [page]);

  const handleDeleteUser = async (userId: string, userName: string) => {
    const confirmed = SimpleAlert.confirm(`Are you sure you want to permanently delete "${userName}"?`);

    if (confirmed) {
      try {
        await userService.deleteUser(userId);
        SimpleAlert.success(`User "${userName}" has been deleted.`);
        fetchUsers(page);
      } catch (err: any) {
        SimpleAlert.error(err.message || 'Failed to delete user');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">

      {/* Dev Tool: Token Input */}
      {showTokenInput && (
        <div className="bg-orange-50 border-b border-orange-200 px-8 py-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2 text-orange-800">
              <Key className="w-5 h-5" />
              <span className="font-semibold">Dev Mode: Authentication Required</span>
            </div>
            <div className="flex-1 w-full flex gap-2">
              <input
                type="text"
                value={manualToken}
                onChange={(e) => setManualToken(e.target.value)}
                placeholder="Paste your JWT Token from your main app's LocalStorage here..."
                className="flex-1 px-4 py-2 text-sm border border-orange-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
              />
              <button
                onClick={handleSetToken}
                className="px-4 py-2 bg-orange-600 text-white rounded-md text-sm font-medium hover:bg-orange-700 transition-colors"
              >
                Set Token & Fetch
              </button>
            </div>
          </div>
          <p className="text-xs text-orange-700 mt-2 max-w-7xl mx-auto">
            *The preview environment is isolated and does not share LocalStorage with your main browser window. You must manually provide a token.
          </p>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="w-8 h-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          {error && !showTokenInput && (
            <div className="text-red-600 text-sm font-semibold bg-red-50 px-4 py-2 rounded-lg border border-red-200">
              Error: {error}
            </div>
          )}
        </div>
        <p className="text-gray-600 ml-11">Manage users, agents, and monitor platform activity</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{totalUsersCount}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-600 mb-1">Active Users</p>
                <p className="text-3xl font-bold text-gray-900">{totalUsersCount}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-600 mb-1">Total Agents</p>
                <p className="text-3xl font-bold text-gray-900">-</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-600 mb-1">Total Properties</p>
                <p className="text-3xl font-bold text-gray-900">-</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Home className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* User Management Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
            </div>
            <button
              onClick={() => fetchUsers(page)}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              Refresh Data
            </button>
          </div>

          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">Manage Users</h3>
          </div>

          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex-1 relative min-w-[250px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-white px-7 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
            >
              <option>All Roles</option>
              <option>User</option>
              <option>Agent</option>
              <option>Admin</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-orange-800 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Joined Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex justify-center items-center">
                        <Loader2 className="w-8 h-8 animate-spin text-orange-500 mr-2" />
                        <span className="text-gray-500">Loading users from server...</span>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      {error ? (
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-red-500 font-semibold">{error}</span>
                          <span className="text-sm text-gray-400">Please provide a valid token above.</span>
                        </div>
                      ) : (
                        "No users found."
                      )}
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                            {user.avatar ? (
                              <img src={user.avatar} alt={user.userName} className="w-full h-full object-cover" />
                            ) : (
                              <span className="font-semibold text-gray-700">
                                {user.userName ? user.userName.charAt(0).toUpperCase() : '?'}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user.userName || 'Unknown'}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${user.role === 'user' ? 'bg-orange-900' :
                          user.role === 'agent' ? 'bg-orange-300' :
                            'bg-purple-500'
                          }`}>
                          {user.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1)) : 'User'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteUser(user._id, user.userName)}
                          className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
                          title="Delete User"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  )))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page <span className="font-medium text-gray-900">{page}</span> of <span className="font-medium text-gray-900">{totalPages}</span>
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;