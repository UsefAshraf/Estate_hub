import { useState } from 'react';
import { Shield, Users, UserCheck, TrendingUp, Home, Search, Trash2, UserPlus, X } from 'lucide-react';
import Swal from 'sweetalert2';
// Type definitions
interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  role: 'user' | 'agent' | 'admin';
  status: 'active' | 'inactive';
  joinedDate: string;
}

const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('All Roles');
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const [newUserForm, setNewUserForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'user'
  });

  // Mock data
  const stats = {
    totalUsers: 8,
    activeUsers: 8,
    totalAgents: 4,
    totalProperties: 6
  };

  const users: User[] = [
    {
      id: 'JD',
      name: 'John Doe',
      avatar: '1',
      email: 'john.doe@example.com',
      phone: '+1 (555) 111-2222',
      role: 'user',
      status: 'active',
      joinedDate: 'Jan 15, 2024'
    },
    {
      id: 'SJ',
      name: 'Sarah Johnson',
      avatar: '2',
      email: 'sarah.johnson@estatehub.com',
      phone: '+1 (555) 123-4567',
      role: 'agent',
      status: 'active',
      joinedDate: 'Jun 20, 2023'
    },
    {
      id: 'MC',
      name: 'Michael Chen',
      avatar: '3',
      email: 'michael.chen@estatehub.com',
      phone: '+1 (555) 234-5678',
      role: 'agent',
      status: 'active',
      joinedDate: 'Aug 10, 2023'
    },
    {
      id: 'ER',
      name: 'Emily Rodriguez',
      avatar: '4',
      email: 'emily.rodriguez@estatehub.com',
      phone: '+1 (555) 345-6789',
      role: 'agent',
      status: 'active',
      joinedDate: 'Sep 5, 2023'
    },
    {
      id: 'DP',
      name: 'David Park',
      avatar: '5',
      email: 'david.park@estatehub.com',
      phone: '+1 (555) 456-7890',
      role: 'agent',
      status: 'active',
      joinedDate: 'Nov 12, 2023'
    }
  ];

  const handleDeleteUser = (userId: string, userName: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `This will permanently delete the user "${userName}" and cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-xl',
        title: 'text-xl font-bold',
        htmlContainer: 'text-gray-600',
        confirmButton: 'px-6 py-2 rounded-lg font-semibold',
        cancelButton: 'px-6 py-2 rounded-lg font-semibold'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Deleting user:', userId);
        // Add delete logic here
        Swal.fire({
          title: 'Deleted!',
          text: `User "${userName}" has been deleted.`,
          icon: 'success',
          confirmButtonColor: '#059669',
          timer: 2000,
          customClass: {
          popup: 'rounded-l'
          }
        });
      }
    });
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New user data:', newUserForm);
    // Add user creation logic here
    
    Swal.fire({
      title: 'Success!',
      text: 'User added successfully!',
      icon: 'success',
      confirmButtonColor: '#059669',
      timer: 2000,
      customClass: {
        popup: 'rounded-l'
      }
    });
    
    setShowAddUserModal(false);
    setNewUserForm({
      fullName: '',
      email: '',
      phone: '',
      role: 'user'
    });
  };

  const handleNewUserInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewUserForm({
      ...newUserForm,
      [e.target.name]: e.target.value
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery);
    const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gray-50 bg-primary">
      

      {/* Page Header */}
      <div className="bg-primary border-b border-gray-200 px-8 py-6 bg-secondary">
        <div className="flex items-center space-x-3 mb-2">
          <Shield className="w-8 h-8 text-gray-700" />
          <h1 className="text-3xl font-bold text-secondary">Admin Dashboard</h1>
        </div>
        <p className="text-black ml-11 text-secondary">Manage users, agents, and monitor platform activity</p>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 ">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-primary rounded-xl p-6 shadow-sm border border-gray-200 bg-secondary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-l text-secondary mb-1">Total Users</p>
                <p className="text-3xl font-bold text-secondary">{stats.totalUsers}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </div>

          {/* Active Users */}
          <div className="bg-primary rounded-xl p-6 shadow-sm border border-gray-200 bg-secondary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-l text-secondary mb-1">Active Users</p>
                <p className="text-3xl font-bold text-secondary">{stats.activeUsers}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <UserCheck className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </div>

          {/* Total Agents */}
          <div className="bg-primary rounded-xl p-6 shadow-sm border border-gray-200 bg-secondary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-l text-secondary mb-1">Total Agents</p>
                <p className="text-3xl font-bold text-secondary">{stats.totalAgents}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-amber-900" />
              </div>
            </div>
          </div>

          {/* Total Properties */}
          <div className="bg-primary rounded-xl p-6 shadow-sm border border-gray-200 bg-secondary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-l text-secondary mb-1">Total Properties</p>
                <p className="text-3xl font-bold text-secondary">{stats.totalProperties}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Home className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* User Management Section */}
        <div className="bg-primary rounded-xl shadow-sm border border-gray-200 bg-secondary">
          {/* Section Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-secondary" />
              <h2 className="text-lg font-semibold text-secondary">User Management</h2>
            </div>
          </div>

          {/* Manage Users Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-base font-semibold text-secondary">Manage Users</h3>
            <button 
              onClick={() => setShowAddUserModal(true)}
              className="btn-primary hover:bg-orange-400 text-gray-800 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add New User</span>
            </button>
          </div>

          {/* Search and Filter */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className=" bg-primary px-7 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              <option>All Roles</option>
              <option>User</option>
              <option>Agent</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-orange-800 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-s font-semibold text-white uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-s font-semibold text-white uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-s font-semibold text-white uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-s font-semibold text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-s font-semibold text-white uppercase tracking-wider">
                    Joined Date
                  </th>
                  <th className="px-6 py-3 text-left text-s font-semibold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-primary divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-semibold text-gray-700">
                          {user.id}
                        </div>
                        <div>
                          <div className="font-medium text-secondary">{user.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <span className="mr-1">👤</span>
                            {user.avatar}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-black">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        user.role === 'user' ? 'bg-orange-900' :
                        user.role === 'agent' ? 'bg-orange-300' :
                        'bg-purple-500'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.joinedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteUser(user.id, user.name)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add New User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
          <div className="bg-primary rounded-xl shadow-2xl max-w-md w-full p-6 relative dark:bg-primary">
            <button 
              onClick={() => setShowAddUserModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-secondary mb-6">Add New User</h2>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={newUserForm.fullName}
                  onChange={handleNewUserInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={newUserForm.email}
                  onChange={handleNewUserInputChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={newUserForm.phone}
                  onChange={handleNewUserInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                  Role
                </label>
                <select
                  name="role"
                  value={newUserForm.role}
                  onChange={handleNewUserInputChange}
                  className="w-full px-4 py-3 bg-primary border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                >
                  <option value="user">User</option>
                  <option value="agent">Agent</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 btn-primary text-gray-800 rounded-lg font-semibold hover:bg-orange-400 transition-colors"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;