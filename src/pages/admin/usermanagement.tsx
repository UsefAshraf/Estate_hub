// import { useState, useEffect } from 'react';
// import { Shield, Users, UserCheck, TrendingUp, Home, Search, Trash2, UserPlus, X, Loader2 } from 'lucide-react';
// import Swal from 'sweetalert2';
// import { authService } from '../../services/auth.api';
// import { useNavigate } from 'react-router-dom';

// // Type definitions
// interface User {
//   id: string;
//   _id?: string;
//   userName: string;
//   name?: string;
//   email: string;
//   phone?: string;
//   role: 'user' | 'agent' | 'admin' | 'buyer' | 'seller';
//   status?: 'active' | 'inactive';
//   isVerified?: boolean;
//   createdAt?: string;
//   joinedDate?: string;
// }

// const UserManagement: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [roleFilter, setRoleFilter] = useState<string>('All Roles');
//   const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     activeUsers: 0,
//     totalAgents: 0,
//     totalProperties: 0
//   });
//   const navigate = useNavigate();

//   const [newUserForm, setNewUserForm] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     role: 'user'
//   });

//   // Fetch users on component mount
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await authService.getAllUsers();
//       const data = response.data;

//       if (data.success && data.data) {
//         // Map the API response to our User interface
//         const mappedUsers: User[] = data.data.map((user: any) => ({
//           id: user._id || user.id,
//           _id: user._id,
//           userName: user.userName || user.fullName || 'Unknown',
//           name: user.userName || user.fullName,
//           email: user.email,
//           phone: user.phone || 'N/A',
//           role: user.role || 'user',
//           status: user.isOnline ? 'active' : 'inactive',
//           isVerified: user.isVerified,
//           createdAt: user.createdAt,
//           joinedDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
//             month: 'short',
//             day: 'numeric',
//             year: 'numeric'
//           }) : 'N/A'
//         }));

//         setUsers(mappedUsers);

//         // Calculate stats
//         const totalAgents = mappedUsers.filter(u => u.role === 'agent').length;
//         const activeUsers = mappedUsers.filter(u => u.status === 'active' || u.isVerified).length;

//         setStats({
//           totalUsers: data.total || mappedUsers.length,
//           activeUsers: activeUsers,
//           totalAgents: totalAgents,
//           totalProperties: 0 // This would need a separate API call
//         });
//       }
//     } catch (err: any) {
//       console.error('Error fetching users:', err);
//       setError(err.response?.data?.message || 'Failed to load users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (userId: string, userName: string) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: `This will permanently delete the user "${userName}" and cannot be undone.`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#dc2626',
//       cancelButtonColor: '#6b7280',
//       confirmButtonText: 'Delete',
//       cancelButtonText: 'Cancel',
//       customClass: {
//         popup: 'rounded-xl',
//         title: 'text-xl font-bold',
//         htmlContainer: 'text-gray-600',
//         confirmButton: 'px-6 py-2 rounded-lg font-semibold',
//         cancelButton: 'px-6 py-2 rounded-lg font-semibold'
//       }
//     });

//     if (result.isConfirmed) {
//       try {
//         const response = await authService.deleteUser(userId);

//         if (response.data.success) {
//           // Remove user from local state
//           setUsers(prevUsers => prevUsers.filter(user => user.id !== userId && user._id !== userId));

//           // Update stats
//           setStats(prev => ({
//             ...prev,
//             totalUsers: prev.totalUsers - 1
//           }));

//           Swal.fire({
//             title: 'Deleted!',
//             text: `User "${userName}" has been deleted.`,
//             icon: 'success',
//             confirmButtonColor: '#059669',
//             timer: 2000,
//             customClass: {
//               popup: 'rounded-l'
//             }
//           });
//         }
//       } catch (err: any) {
//         console.error('Error deleting user:', err);
//         Swal.fire({
//           title: 'Error!',
//           text: err.response?.data?.message || 'Failed to delete user. Please try again.',
//           icon: 'error',
//           confirmButtonColor: '#dc2626',
//           customClass: {
//             popup: 'rounded-xl'
//           }
//         });
//       }
//     }
//   };

//   const handleAddUser = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Navigate to AddUser page instead of modal submission
//     navigate('/adduser');
//   };

//   const handleNewUserInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setNewUserForm({
//       ...newUserForm,
//       [e.target.name]: e.target.value
//     });
//   };

//   const filteredUsers = users.filter(user => {
//     const displayName = user.userName || user.name || '';
//     const matchesSearch = displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (user.phone && user.phone.includes(searchQuery));
//     const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter.toLowerCase();
//     return matchesSearch && matchesRole;
//   });

//   // Get initials for avatar
//   const getInitials = (name: string) => {
//     if (!name) return '??';
//     return name
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   // Get role badge color
//   const getRoleBadgeClass = (role: string) => {
//     switch (role) {
//       case 'user':
//       case 'buyer':
//         return 'bg-orange-900';
//       case 'agent':
//       case 'seller':
//         return 'bg-orange-300';
//       case 'admin':
//         return 'bg-purple-500';
//       default:
//         return 'bg-gray-500';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 bg-primary">


//       {/* Page Header */}
//       <div className="bg-primary border-b border-gray-200 px-8 py-6 bg-secondary">
//         <div className="flex items-center space-x-3 mb-2">
//           <Shield className="w-8 h-8 text-gray-700" />
//           <h1 className="text-3xl font-bold text-secondary">Admin Dashboard</h1>
//         </div>
//         <p className="text-black ml-11 text-secondary">Manage users, agents, and monitor platform activity</p>
//       </div>

//       <div className="max-w-7xl mx-auto px-8 py-8 ">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {/* Total Users */}
//           <div className="bg-primary rounded-xl p-6 shadow-sm border border-gray-200 bg-secondary">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-l text-secondary mb-1">Total Users</p>
//                 <p className="text-3xl font-bold text-secondary">{stats.totalUsers}</p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-lg">
//                 <Users className="w-6 h-6 text-secondary" />
//               </div>
//             </div>
//           </div>

//           {/* Active Users */}
//           <div className="bg-primary rounded-xl p-6 shadow-sm border border-gray-200 bg-secondary">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-l text-secondary mb-1">Active Users</p>
//                 <p className="text-3xl font-bold text-secondary">{stats.activeUsers}</p>
//               </div>
//               <div className="bg-green-100 p-3 rounded-lg">
//                 <UserCheck className="w-6 h-6 text-secondary" />
//               </div>
//             </div>
//           </div>

//           {/* Total Agents */}
//           <div className="bg-primary rounded-xl p-6 shadow-sm border border-gray-200 bg-secondary">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-l text-secondary mb-1">Total Agents</p>
//                 <p className="text-3xl font-bold text-secondary">{stats.totalAgents}</p>
//               </div>
//               <div className="bg-purple-100 p-3 rounded-lg">
//                 <TrendingUp className="w-6 h-6 text-amber-900" />
//               </div>
//             </div>
//           </div>

//           {/* Total Properties */}
//           <div className="bg-primary rounded-xl p-6 shadow-sm border border-gray-200 bg-secondary">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-l text-secondary mb-1">Total Properties</p>
//                 <p className="text-3xl font-bold text-secondary">{stats.totalProperties}</p>
//               </div>
//               <div className="bg-orange-100 p-3 rounded-lg">
//                 <Home className="w-6 h-6 text-orange-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* User Management Section */}
//         <div className="bg-primary rounded-xl shadow-sm border border-gray-200 bg-secondary">
//           {/* Section Header */}
//           <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <Users className="w-5 h-5 text-secondary" />
//               <h2 className="text-lg font-semibold text-secondary">User Management</h2>
//             </div>
//           </div>

//           {/* Manage Users Header */}
//           <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
//             <h3 className="text-base font-semibold text-secondary">Manage Users</h3>
//             <button
//               onClick={() => navigate('/adduser')}
//               className="btn-primary hover:bg-orange-400 text-gray-800 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
//             >
//               <UserPlus className="w-4 h-4" />
//               <span>Add New User</span>
//             </button>
//           </div>

//           {/* Search and Filter */}
//           <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search users by name, email, or phone..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
//               />
//             </div>
//             <select
//               value={roleFilter}
//               onChange={(e) => setRoleFilter(e.target.value)}
//               className=" bg-primary px-7 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
//             >
//               <option>All Roles</option>
//               <option>User</option>
//               <option>Agent</option>
//               <option>Admin</option>
//             </select>
//           </div>

//           {/* Loading State */}
//           {loading && (
//             <div className="flex items-center justify-center py-12">
//               <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
//               <span className="ml-2 text-gray-600">Loading users...</span>
//             </div>
//           )}

//           {/* Error State */}
//           {error && !loading && (
//             <div className="px-6 py-8 text-center">
//               <p className="text-red-500 mb-4">{error}</p>
//               <button
//                 onClick={fetchUsers}
//                 className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
//               >
//                 Retry
//               </button>
//             </div>
//           )}

//           {/* Users Table */}
//           {!loading && !error && (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-orange-800 border-b border-gray-200">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-s font-semibold text-white uppercase tracking-wider">
//                       User
//                     </th>
//                     <th className="px-6 py-3 text-left text-s font-semibold text-white uppercase tracking-wider">
//                       Contact
//                     </th>
//                     <th className="px-6 py-3 text-left text-s font-semibold text-white uppercase tracking-wider">
//                       Role
//                     </th>
//                     <th className="px-6 py-3 text-left text-s font-semibold text-white uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-s font-semibold text-white uppercase tracking-wider">
//                       Joined Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-s font-semibold text-white uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-primary divide-y divide-gray-200">
//                   {filteredUsers.length === 0 ? (
//                     <tr>
//                       <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
//                         No users found
//                       </td>
//                     </tr>
//                   ) : (
//                     filteredUsers.map((user) => (
//                       <tr key={user.id} className="hover:bg-gray-100">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center space-x-3">
//                             <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-semibold text-gray-700">
//                               {getInitials(user.userName || user.name || '')}
//                             </div>
//                             <div>
//                               <div className="font-medium text-secondary">{user.userName || user.name}</div>
//                               <div className="text-sm text-gray-500 flex items-center">
//                                 <span className="mr-1">👤</span>
//                                 {user.role}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-black">{user.email}</div>
//                           <div className="text-sm text-gray-500">{user.phone || 'N/A'}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getRoleBadgeClass(user.role)}`}>
//                             {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${user.status === 'active' || user.isVerified ? 'bg-green-500' : 'bg-gray-400'}`}>
//                             {user.status === 'active' || user.isVerified ? 'Active' : 'Inactive'}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                           {user.joinedDate || 'N/A'}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <button
//                             onClick={() => handleDeleteUser(user.id, user.userName || user.name || 'User')}
//                             className="text-red-500 hover:text-red-700 transition-colors"
//                           >
//                             <Trash2 className="w-5 h-5" />
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Add New User Modal */}
//       {showAddUserModal && (
//         <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
//           <div className="bg-primary rounded-xl shadow-2xl max-w-md w-full p-6 relative dark:bg-primary">
//             <button
//               onClick={() => setShowAddUserModal(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//             >
//               <X className="w-6 h-6" />
//             </button>

//             <h2 className="text-2xl font-bold text-secondary mb-6">Add New User</h2>

//             <form onSubmit={handleAddUser} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-semibold text-secondary mb-2">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={newUserForm.fullName}
//                   onChange={handleNewUserInputChange}
//                   placeholder="John Doe"
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-secondary mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={newUserForm.email}
//                   onChange={handleNewUserInputChange}
//                   placeholder="john@example.com"
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-secondary mb-2">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={newUserForm.phone}
//                   onChange={handleNewUserInputChange}
//                   placeholder="+1 (555) 000-0000"
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-secondary mb-2">
//                   Role
//                 </label>
//                 <select
//                   name="role"
//                   value={newUserForm.role}
//                   onChange={handleNewUserInputChange}
//                   className="w-full px-4 py-3 bg-primary border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
//                 >
//                   <option value="user">User</option>
//                   <option value="agent">Agent</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </div>

//               <div className="flex space-x-3 mt-6">
//                 <button
//                   type="button"
//                   onClick={() => setShowAddUserModal(false)}
//                   className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex-1 px-4 py-3 btn-primary text-gray-800 rounded-lg font-semibold hover:bg-orange-400 transition-colors"
//                 >
//                   Add User
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserManagement;

import { useState, useEffect } from 'react';
import { Shield, Users, UserCheck, TrendingUp, Home, Search, Trash2, UserPlus, X, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { authService } from '../../services/auth.api';
import { useNavigate } from 'react-router-dom';

// Type definitions
interface User {
  id: string;
  _id?: string;
  userName: string;
  name?: string;
  email: string;
  phone?: string;
  role: 'user' | 'agent' | 'admin' | 'buyer' | 'seller';
  status?: 'online' | 'offline';
  isOnline?: boolean;
  isVerified?: boolean;
  createdAt?: string;
  joinedDate?: string;
}

const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('All Roles');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    onlineUsers: 0,
    totalAgents: 0,
    totalProperties: 0
  });
  const navigate = useNavigate();

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.getAllUsers();
      const data = response.data;

      if (data.success && data.data) {
        // Map the API response to our User interface
        const mappedUsers: User[] = data.data.map((user: any) => ({
          id: user._id || user.id,
          _id: user._id,
          userName: user.userName || user.fullName || 'Unknown',
          name: user.userName || user.fullName,
          email: user.email,
          phone: user.phone || 'N/A',
          role: user.role || 'buyer',
          status: user.isOnline ? 'online' : 'offline',
          isOnline: user.isOnline,
          isVerified: user.isVerified,
          createdAt: user.createdAt,
          joinedDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }) : 'N/A'
        }));

        setUsers(mappedUsers);

        // Calculate stats
        const totalAgents = mappedUsers.filter(u => 
          u.role === 'agent' || u.role === 'seller'
        ).length;
        
        const onlineUsers = mappedUsers.filter(u => u.isOnline === true).length;

        setStats({
          totalUsers: data.total || mappedUsers.length,
          onlineUsers: onlineUsers,
          totalAgents: totalAgents,
          totalProperties: 0 // This would need a separate API call
        });
      }
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    const result = await Swal.fire({
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
    });

    if (result.isConfirmed) {
      try {
        const response = await authService.deleteUser(userId);

        if (response.data.success) {
          // Remove user from local state
          setUsers(prevUsers => {
            const updatedUsers = prevUsers.filter(user => 
              user.id !== userId && user._id !== userId
            );
            
            // Recalculate stats after deletion
            const totalAgents = updatedUsers.filter(u => 
              u.role === 'agent' || u.role === 'seller'
            ).length;
            const onlineUsers = updatedUsers.filter(u => u.isOnline === true).length;
            
            setStats({
              totalUsers: updatedUsers.length,
              onlineUsers: onlineUsers,
              totalAgents: totalAgents,
              totalProperties: 0
            });
            
            return updatedUsers;
          });

          Swal.fire({
            title: 'Deleted!',
            text: `User "${userName}" has been deleted.`,
            icon: 'success',
            confirmButtonColor: '#059669',
            timer: 2000,
            customClass: {
              popup: 'rounded-xl'
            }
          });
        }
      } catch (err: any) {
        console.error('Error deleting user:', err);
        Swal.fire({
          title: 'Error!',
          text: err.response?.data?.message || 'Failed to delete user. Please try again.',
          icon: 'error',
          confirmButtonColor: '#dc2626',
          customClass: {
            popup: 'rounded-xl'
          }
        });
      }
    }
  };

  const filteredUsers = users.filter(user => {
    const displayName = user.userName || user.name || '';
    const matchesSearch = displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.phone && user.phone.includes(searchQuery));
    
    // Normalize role filtering to handle case-insensitive matching
    const matchesRole = roleFilter === 'All Roles' || 
      user.role.toLowerCase() === roleFilter.toLowerCase() ||
      (roleFilter.toLowerCase() === 'user' && user.role === 'buyer') ||
      (roleFilter.toLowerCase() === 'agent' && user.role === 'seller');
    
    return matchesSearch && matchesRole;
  });

  // Get initials for avatar
  const getInitials = (name: string) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get role badge color
  const getRoleBadgeClass = (role: string) => {
    switch (role.toLowerCase()) {
      case 'user':
      case 'buyer':
        return 'bg-orange-900';
      case 'agent':
      case 'seller':
        return 'bg-orange-300';
      case 'admin':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get status badge color based on isOnline
  const getStatusBadgeClass = (isOnline?: boolean) => {
    return isOnline ? 'bg-green-500' : 'bg-gray-400';
  };

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

      <div className="max-w-7xl mx-auto px-8 py-8">
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

          {/* Online Users - Changed from Active Users */}
          <div className="bg-primary rounded-xl p-6 shadow-sm border border-gray-200 bg-secondary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-l text-secondary mb-1">Online Users</p>
                <p className="text-3xl font-bold text-secondary">{stats.onlineUsers}</p>
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
              onClick={() => navigate('/adduser')}
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
              className="bg-primary px-7 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              <option>All Roles</option>
              <option>Buyer</option>
              <option>Seller</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
              <span className="ml-2 text-gray-600">Loading users...</span>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="px-6 py-8 text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={fetchUsers}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Users Table */}
          {!loading && !error && (
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
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-semibold text-gray-700 relative">
                              {getInitials(user.userName || user.name || '')}
                              {/* Online indicator dot */}
                              {user.isOnline && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-secondary">{user.userName || user.name}</div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <span className="mr-1">👤</span>
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-black">{user.email}</div>
                          <div className="text-sm text-gray-500">{user.phone || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getRoleBadgeClass(user.role)}`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusBadgeClass(user.isOnline)}`}>
                            {user.isOnline ? 'Online' : 'Offline'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.joinedDate || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteUser(user.id, user.userName || user.name || 'User')}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;