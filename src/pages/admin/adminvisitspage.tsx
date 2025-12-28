import { useEffect, useState } from "react";
import { Calendar, Clock, Check, X } from "lucide-react";
import {
  getAllVisits,
  acceptVisit,
  cancelVisitByAdmin,
} from "@/services/visits.services";
import type { Visit } from "@/types/visits.types";

const AdminVisitsPage = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [filterStatus, setFilterStatus] =
    useState<Visit["status"] | "all">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    try {
      setLoading(true);
      const res = await getAllVisits();
      setVisits(res.data.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch visits");
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status: Visit["status"]) => {
    switch (status) {
      case "upcoming":
        return { color: "text-blue-600 bg-blue-500/10", borderColor: "border-blue-500", dotColor: "bg-blue-500" };
      case "completed":
        return { color: "text-green-600 bg-green-500/10", borderColor: "border-green-500", dotColor: "bg-green-500" };
      case "cancelled":
        return { color: "text-red-600 bg-red-500/10", borderColor: "border-red-500", dotColor: "bg-red-500" };
      case "pending":
        return { color: "text-amber-600 bg-amber-500/10", borderColor: "border-amber-500", dotColor: "bg-amber-500" };
      default:
        return { color: "text-secondary bg-primary/5", borderColor: "border-custom", dotColor: "bg-secondary" };
    }
  };

  const handleAccept = async (id: string) => {
    if (!confirm("Accept this visit?")) return;

    try {
      await acceptVisit(id);
      setVisits((prev) =>
        prev.map((v) =>
          v._id === id ? { ...v, status: "upcoming" } : v
        )
      );
    } catch {
      alert("Failed to accept visit");
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm("Cancel this visit?")) return;

    try {
      await cancelVisitByAdmin(id);
      setVisits((prev) =>
        prev.map((v) =>
          v._id === id ? { ...v, status: "cancelled" } : v
        )
      );
    } catch {
      alert("Failed to cancel visit");
    }
  };

  const filteredVisits = visits
    .filter((v) => filterStatus === "all" || v.status === filterStatus)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

  const statusCounts = {
    all: visits.length,
    pending: visits.filter((v) => v.status === "pending").length,
    upcoming: visits.filter((v) => v.status === "upcoming").length,
    completed: visits.filter((v) => v.status === "completed").length,
    cancelled: visits.filter((v) => v.status === "cancelled").length,
  };

  if (loading) return <p className="text-center mt-8">Loading visits...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

  return (
    <div className="min-h-screen bg-primary px-4 sm:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Admin - Property Visits</h1>
          <p className="text-secondary">Manage and track all scheduled property viewings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {Object.entries(statusCounts).map(([key, count]) => {
            const colors: Record<string, string> = {
              all: "bg-secondary hover:bg-secondary/80",
              pending: "bg-amber-500/10 hover:bg-amber-500/20 text-amber-600",
              upcoming: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-600",
              completed: "bg-green-500/10 hover:bg-green-500/20 text-green-600",
              cancelled: "bg-red-500/10 hover:bg-red-500/20 text-red-600",
            };
            const activeColors: Record<string, string> = {
              all: "ring-accent",
              pending: "ring-amber-500",
              upcoming: "ring-blue-500",
              completed: "ring-green-500",
              cancelled: "ring-red-500",
            };
            return (
              <button
                key={key}
                onClick={() => setFilterStatus(key as Visit["status"] | "all")}
                className={`p-3 rounded-lg transition-all ${
                  filterStatus === key ? `${colors[key]} ring-2 ring-offset-2 ${activeColors[key]}` : colors[key]
                } shadow-md border border-custom`}
              >
                <div className="text-2xl font-bold text-primary">{count}</div>
                <div className="text-xs font-medium mt-0.5">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
              </button>
            );
          })}
        </div>

        {/* Visits Grid */}
        {filteredVisits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVisits.map((visit) => {
              const config = getStatusConfig(visit.status);

              return (
                <div key={visit._id} className="bg-secondary rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                  <div className="p-6">
                    {/* Status Badge */}
                    <div className="mb-4">
                      <div className={`inline-flex items-center gap-1.5 ${config.color} px-3 py-1 rounded-full text-xs font-semibold border ${config.borderColor}`}>
                        <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
                        {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                      </div>
                    </div>

                    {/* Property Name */}
                    <h3 className="text-xl font-bold text-primary mb-3 transition-colors">{visit.propertyName}</h3>

                    {/* Date and Time */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-secondary">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {new Date(visit.date).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-secondary">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{visit.time}</span>
                      </div>
                    </div>

                    {/* Admin Action Buttons */}
                    <div className="flex gap-2">
                      {visit.status === "pending" && (
                        <button
                          onClick={() => handleAccept(visit._id)}
                          className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-1"
                        >
                          <Check className="w-4 h-4" />
                          Accept
                        </button>
                      )}
                      {(visit.status === "pending" || visit.status === "upcoming") && (
                        <button
                          onClick={() => handleCancel(visit._id)}
                          className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center justify-center gap-1"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-secondary rounded-2xl shadow-lg border border-custom p-12 text-center">
            <Calendar className="w-16 h-16 text-secondary mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-primary mb-2">No visits found</h3>
            <p className="text-secondary mb-6">{filterStatus !== "all" ? "Try adjusting your filters" : "No property visits scheduled yet"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVisitsPage;

// import { useEffect, useState } from "react";
// import { Calendar, Clock, Check, X } from "lucide-react";
// import {
//   getAllVisits,
//   acceptVisit,
//   cancelVisitByAdmin,
// } from "@/services/visits.services";
// import type { Visit } from "@/types/visits.types";

// const AdminVisitsPage = () => {
//   const [visits, setVisits] = useState<Visit[]>([]);
//   const [filterStatus, setFilterStatus] =
//     useState<Visit["status"] | "all">("all");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchVisits();
//   }, []);

//   const fetchVisits = async () => {
//     try {
//       setLoading(true);
//       const res = await getAllVisits();
//       setVisits(res.data.data);
//     } catch (err: any) {
//       setError(err?.response?.data?.message || "Failed to fetch visits");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAccept = async (id: string) => {
//     if (!confirm("Accept this visit?")) return;

//     try {
//       await acceptVisit(id);
//       setVisits((prev) =>
//         prev.map((v) =>
//           v._id === id ? { ...v, status: "upcoming" } : v
//         )
//       );
//     } catch {
//       alert("Failed to accept visit");
//     }
//   };

//   const handleCancel = async (id: string) => {
//     if (!confirm("Cancel this visit?")) return;

//     try {
//       await cancelVisitByAdmin(id);
//       setVisits((prev) =>
//         prev.map((v) =>
//           v._id === id ? { ...v, status: "cancelled" } : v
//         )
//       );
//     } catch {
//       alert("Failed to cancel visit");
//     }
//   };

//   const filteredVisits = visits
//     .filter((v) => filterStatus === "all" || v.status === filterStatus)
//     .sort(
//       (a, b) =>
//         new Date(b.createdAt).getTime() -
//         new Date(a.createdAt).getTime()
//     );

//   const statusCounts = {
//     all: visits.length,
//     pending: visits.filter((v) => v.status === "pending").length,
//     upcoming: visits.filter((v) => v.status === "upcoming").length,
//     completed: visits.filter((v) => v.status === "completed").length,
//     cancelled: visits.filter((v) => v.status === "cancelled").length,
//   };

//   if (loading) return <p className="text-center mt-8">Loading visits...</p>;
//   if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

//   return (
//     <div className="min-h-screen bg-primary px-4 sm:px-8 py-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold mb-6">Admin – All Visits</h1>

//         {/* Filters */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
//           {Object.entries(statusCounts).map(([key, count]) => (
//             <button
//               key={key}
//               onClick={() =>
//                 setFilterStatus(key as Visit["status"] | "all")
//               }
//               className={`p-3 rounded-lg border ${
//                 filterStatus === key ? "ring-2 ring-accent" : ""
//               }`}
//             >
//               <div className="text-xl font-bold">{count}</div>
//               <div className="text-xs capitalize">{key}</div>
//             </button>
//           ))}
//         </div>

//         {/* Visits */}
//         {filteredVisits.length ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredVisits.map((visit) => (
//               <div
//                 key={visit._id}
//                 className="bg-secondary rounded-xl p-6 shadow"
//               >
//                 <h3 className="text-lg font-bold mb-2">
//                   {visit.propertyName}
//                 </h3>

//                 <div className="flex items-center gap-2 text-sm">
//                   <Calendar size={14} />
//                   {new Date(visit.date).toDateString()}
//                 </div>
//                 <div className="flex items-center gap-2 text-sm">
//                   <Clock size={14} /> {visit.time}
//                 </div>

//                 <p className="mt-2 text-sm">
//                   Status:{" "}
//                   <strong className="capitalize">
//                     {visit.status}
//                   </strong>
//                 </p>

//                 {/* Admin Actions */}
//                 <div className="flex gap-2 mt-4">
//                   {visit.status === "pending" && (
//                     <button
//                       onClick={() => handleAccept(visit._id)}
//                       className="flex-1 bg-green-600 text-white p-2 rounded"
//                     >
//                       <Check size={16} />
//                     </button>
//                   )}

//                   {(visit.status === "pending" ||
//                     visit.status === "upcoming") && (
//                     <button
//                       onClick={() => handleCancel(visit._id)}
//                       className="flex-1 bg-red-600 text-white p-2 rounded"
//                     >
//                       <X size={16} />
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No visits found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminVisitsPage;


// // import { useEffect, useState } from "react";
// // import { Calendar, Clock, Check, X, User, Home, Phone, Mail } from "lucide-react";

// // // Define types inline since imports aren't supported in artifacts
// // interface Visit {
// //   _id: string;
// //   userId: {
// //     _id: string;
// //     userName: string;
// //     email: string;
// //     phone: string;
// //   };
// //   agentId: {
// //     _id: string;
// //     userName: string;
// //     email: string;
// //     phone: string;
// //   };
// //   propertyId: {
// //     _id: string;
// //     title: string;
// //     address: string;
// //     images: string[];
// //   };
// //   propertyName: string;
// //   date: string;
// //   time: string;
// //   status: "pending" | "upcoming" | "completed" | "cancelled";
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // interface VisitsResponse {
// //   success: boolean;
// //   count: number;
// //   data: Visit[];
// // }

// // interface VisitResponse {
// //   success: boolean;
// //   message: string;
// //   data: Visit;
// // }

// // const AdminVisitsPage = () => {
// //   const [visits, setVisits] = useState<Visit[]>([]);
// //   const [filterStatus, setFilterStatus] = useState<Visit["status"] | "all">("all");
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string>("");

// //   // API calls inline
// //   const API_URL = "http://localhost:3000";
  
// //   const getAuthHeaders = () => {
// //     const token = localStorage.getItem("accessToken");
// //     return {
// //       "Content-Type": "application/json",
// //       "Authorization": token ? `Bearer ${token}` : ""
// //     };
// //   };

// //   const getAllVisits = async (): Promise<VisitsResponse> => {
// //     const response = await fetch(`${API_URL}/visits/admin/all`, {
// //       method: "GET",
// //       headers: getAuthHeaders()
// //     });
// //     return response.json();
// //   };

// //   const acceptVisit = async (visitId: string): Promise<VisitResponse> => {
// //     const response = await fetch(`${API_URL}/visits/admin/${visitId}/accept`, {
// //       method: "PATCH",
// //       headers: getAuthHeaders()
// //     });
// //     return response.json();
// //   };

// //   const cancelVisitByAdmin = async (visitId: string): Promise<VisitResponse> => {
// //     const response = await fetch(`${API_URL}/visits/admin/${visitId}/cancel`, {
// //       method: "PATCH",
// //       headers: getAuthHeaders()
// //     });
// //     return response.json();
// //   };

// //   useEffect(() => {
// //     fetchVisits();
// //   }, []);

// //   const fetchVisits = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await getAllVisits();
// //       // ✅ FIX: Access the data correctly from the response
// //       if (res.success && res.data) {
// //         setVisits(res.data);
// //       } else {
// //         setError("Failed to load visits");
// //       }
// //     } catch (err: any) {
// //       console.error("Fetch visits error:", err);
// //       setError(err?.message || "Failed to fetch visits");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleAcceptVisit = async (visitId: string) => {
// //     if (!confirm("Accept this visit request?")) return;
    
// //     try {
// //       await acceptVisit(visitId);
// //       setVisits((prev) =>
// //         prev.map((v) => (v._id === visitId ? { ...v, status: "upcoming" as const } : v))
// //       );
// //     } catch (err: any) {
// //       alert(err?.message || "Failed to accept visit");
// //     }
// //   };

// //   const handleCancelVisit = async (visitId: string) => {
// //     if (!confirm("Cancel this visit?")) return;
    
// //     try {
// //       await cancelVisitByAdmin(visitId);
// //       setVisits((prev) =>
// //         prev.map((v) => (v._id === visitId ? { ...v, status: "cancelled" as const } : v))
// //       );
// //     } catch (err: any) {
// //       alert(err?.message || "Failed to cancel visit");
// //     }
// //   };

// //   const getStatusConfig = (status: Visit["status"]) => {
// //     switch (status) {
// //       case "upcoming":
// //         return { color: "text-blue-600 bg-blue-500/10", borderColor: "border-blue-500", dotColor: "bg-blue-500" };
// //       case "completed":
// //         return { color: "text-green-600 bg-green-500/10", borderColor: "border-green-500", dotColor: "bg-green-500" };
// //       case "cancelled":
// //         return { color: "text-red-600 bg-red-500/10", borderColor: "border-red-500", dotColor: "bg-red-500" };
// //       case "pending":
// //         return { color: "text-amber-600 bg-amber-500/10", borderColor: "border-amber-500", dotColor: "bg-amber-500" };
// //       default:
// //         return { color: "text-gray-600 bg-gray-500/10", borderColor: "border-gray-500", dotColor: "bg-gray-500" };
// //     }
// //   };

// //   const filteredVisits = visits
// //     .filter((visit) => filterStatus === "all" || visit.status === filterStatus)
// //     .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

// //   const statusCounts = {
// //     all: visits.length,
// //     pending: visits.filter((v) => v.status === "pending").length,
// //     upcoming: visits.filter((v) => v.status === "upcoming").length,
// //     completed: visits.filter((v) => v.status === "completed").length,
// //     cancelled: visits.filter((v) => v.status === "cancelled").length,
// //   };

// //   if (loading) return <div className="text-center mt-8 text-white">Loading visits...</div>;
// //   if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;

// //   return (
// //     <div className="min-h-screen bg-gray-900 px-4 sm:px-8 py-8">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="mb-8">
// //           <h1 className="text-4xl font-bold text-white mb-2">Admin - All Visits</h1>
// //           <p className="text-gray-400">Manage all property visit requests</p>
// //         </div>

// //         {/* Stats Cards */}
// //         <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
// //           {Object.entries(statusCounts).map(([key, count]) => {
// //             const colors: Record<string, string> = {
// //               all: "bg-gray-800 hover:bg-gray-700",
// //               pending: "bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/30",
// //               upcoming: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/30",
// //               completed: "bg-green-500/10 hover:bg-green-500/20 text-green-400 border-green-500/30",
// //               cancelled: "bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/30",
// //             };
// //             const activeColors: Record<string, string> = {
// //               all: "ring-gray-500",
// //               pending: "ring-amber-500",
// //               upcoming: "ring-blue-500",
// //               completed: "ring-green-500",
// //               cancelled: "ring-red-500",
// //             };
// //             return (
// //               <button
// //                 key={key}
// //                 onClick={() => setFilterStatus(key as Visit["status"] | "all")}
// //                 className={`p-3 rounded-lg transition-all border ${
// //                   filterStatus === key ? `${colors[key]} ring-2 ring-offset-2 ring-offset-gray-900 ${activeColors[key]}` : colors[key]
// //                 } shadow-md`}
// //               >
// //                 <div className="text-2xl font-bold text-white">{count}</div>
// //                 <div className="text-xs font-medium mt-0.5">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
// //               </button>
// //             );
// //           })}
// //         </div>

// //         {/* Visits Grid */}
// //         {filteredVisits.length > 0 ? (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {filteredVisits.map((visit) => {
// //               const config = getStatusConfig(visit.status);

// //               return (
// //                 <div key={visit._id} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700">
// //                   <div className="p-6">
// //                     {/* Status Badge */}
// //                     <div className="mb-4">
// //                       <div className={`inline-flex items-center gap-1.5 ${config.color} px-3 py-1 rounded-full text-xs font-semibold border ${config.borderColor}`}>
// //                         <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
// //                         {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
// //                       </div>
// //                     </div>

// //                     {/* Property Info */}
// //                     <div className="mb-4">
// //                       <div className="flex items-start gap-2 mb-2">
// //                         <Home className="w-4 h-4 text-gray-400 mt-1" />
// //                         <h3 className="text-lg font-bold text-white">{visit.propertyName}</h3>
// //                       </div>
// //                       {visit.propertyId && (
// //                         <p className="text-sm text-gray-400 ml-6">{visit.propertyId.address}</p>
// //                       )}
// //                     </div>

// //                     {/* User Info */}
// //                     {visit.userId && (
// //                       <div className="mb-4 pb-4 border-b border-gray-700">
// //                         <div className="flex items-center gap-2 mb-2">
// //                           <User className="w-4 h-4 text-gray-400" />
// //                           <span className="text-sm font-semibold text-white">{visit.userId.userName}</span>
// //                         </div>
// //                         <div className="flex items-center gap-2 ml-6 text-xs text-gray-400">
// //                           <Mail className="w-3 h-3" />
// //                           <span>{visit.userId.email}</span>
// //                         </div>
// //                         <div className="flex items-center gap-2 ml-6 text-xs text-gray-400">
// //                           <Phone className="w-3 h-3" />
// //                           <span>{visit.userId.phone}</span>
// //                         </div>
// //                       </div>
// //                     )}

// //                     {/* Date and Time */}
// //                     <div className="space-y-2 mb-4">
// //                       <div className="flex items-center gap-2 text-gray-300">
// //                         <Calendar className="w-4 h-4" />
// //                         <span className="text-sm font-medium">
// //                           {new Date(visit.date).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
// //                         </span>
// //                       </div>
// //                       <div className="flex items-center gap-2 text-gray-300">
// //                         <Clock className="w-4 h-4" />
// //                         <span className="text-sm font-medium">{visit.time}</span>
// //                       </div>
// //                     </div>

// //                     {/* Action Buttons */}
// //                     <div className="flex gap-2">
// //                       {visit.status === "pending" && (
// //                         <button
// //                           onClick={() => handleAcceptVisit(visit._id)}
// //                           className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2"
// //                         >
// //                           <Check className="w-4 h-4" />
// //                           Accept
// //                         </button>
// //                       )}
// //                       {(visit.status === "pending" || visit.status === "upcoming") && (
// //                         <button
// //                           onClick={() => handleCancelVisit(visit._id)}
// //                           className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2"
// //                         >
// //                           <X className="w-4 h-4" />
// //                           Cancel
// //                         </button>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         ) : (
// //           <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-12 text-center">
// //             <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" />
// //             <h3 className="text-xl font-semibold text-white mb-2">No visits found</h3>
// //             <p className="text-gray-400">{filterStatus !== "all" ? "Try adjusting your filters" : "No property visits scheduled yet"}</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminVisitsPage;