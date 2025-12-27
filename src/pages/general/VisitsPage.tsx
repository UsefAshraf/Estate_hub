import { useEffect, useState } from "react";
import { Calendar, Clock} from "lucide-react";
import { getUserVisits, updateVisitStatus } from "../../services/visits.services.ts";
import type { Visit } from "../../types/visits.types.ts";


const VisitsPage = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        setLoading(true);
        const res = await getUserVisits();
        setVisits(res.data.data);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch visits");
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

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
  const handleCancelVisit = async (visitId: string) => {
    try {
      await updateVisitStatus(visitId, "cancelled");
      // Update local state so UI reflects change
      setVisits((prev) =>
        prev.map((v) => (v._id === visitId ? { ...v, status: "cancelled" } : v))
      );
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to cancel visit");
    }
  };

  const filteredVisits = visits
    .filter((visit) => filterStatus === "all" || visit.status === filterStatus)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
          <h1 className="text-4xl font-bold text-primary mb-2">Property Visits</h1>
          <p className="text-secondary">Manage and track all your scheduled property viewings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {[
            { label: "All", count: statusCounts.all, color: "bg-secondary hover:bg-secondary/80", activeColor: "ring-accent", value: "all" },
            { label: "Pending", count: statusCounts.pending, color: "bg-amber-500/10 hover:bg-amber-500/20 text-amber-600", activeColor: "ring-amber-500", value: "pending" },
            { label: "Upcoming", count: statusCounts.upcoming, color: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-600", activeColor: "ring-blue-500", value: "upcoming" },
            { label: "Completed", count: statusCounts.completed, color: "bg-green-500/10 hover:bg-green-500/20 text-green-600", activeColor: "ring-green-500", value: "completed" },
            { label: "Cancelled", count: statusCounts.cancelled, color: "bg-red-500/10 hover:bg-red-500/20 text-red-600", activeColor: "ring-red-500", value: "cancelled" },
          ].map((stat) => (
            <button
              key={stat.value}
              onClick={() => setFilterStatus(stat.value)}
              className={`p-3 rounded-lg transition-all ${
                filterStatus === stat.value ? `${stat.color} ring-2 ring-offset-2 ${stat.activeColor}` : `${stat.color}`
              } shadow-md border border-custom`}
            >
              <div className="text-2xl font-bold text-primary">{stat.count}</div>
              <div className="text-xs font-medium mt-0.5">{stat.label}</div>
            </button>
          ))}
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
                        <Calendar className="w-4 h-4 " />
                        <span className="text-sm font-medium">
                          {new Date(visit.date).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-secondary">
                        <Clock className="w-4 h-4 " />
                        <span className="text-sm font-medium">{visit.time}</span>
                      </div>
                    </div>
                    {/* Cancel Button for upcoming visits */}
                    {visit.status === "upcoming" && (
                      <button
                        onClick={() => handleCancelVisit(visit._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
                      >
                        Cancel Visit
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-secondary rounded-2xl shadow-lg border border-custom p-12 text-center">
            <Calendar className="w-16 h-16 text-secondary mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-primary mb-2">No visits found</h3>
            <p className="text-secondary mb-6">{filterStatus !== "all" ? "Try adjusting your filters" : "You haven't scheduled any property visits yet"}</p>
            
          </div>
        )}
        
      </div>
    </div>
  );
};

export default VisitsPage;

