import { useState } from "react";

type Visit = {
  id: number;
  propertyName: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
};

const VisitsPage = () => {
  const [visits] = useState<Visit[]>([
    {
      id: 1,
      propertyName: "Sunset Villa",
      date: "2025-03-01",
      time: "3:00 PM",
      status: "upcoming",
    },
    {
      id: 2,
      propertyName: "Palm Residence",
      date: "2025-02-20",
      time: "11:00 AM",
      status: "completed",
    },
    {
      id: 3,
      propertyName: "City Heights Apartment",
      date: "2026-03-05",
      time: "1:00 PM",
      status: "cancelled",
    },
    {
      id: 4,
      propertyName: "Efilo Office Space",
      date: "2026-03-15",
      time: "1:00 PM",
      status: "completed",
    },
  ]);

  const getStatusColor = (status: Visit["status"]) => {
    switch (status) {
      case "upcoming":
        return "text-blue-600 bg-blue-100";
      case "completed":
        return "text-green-600 bg-green-100";
      case "cancelled":
        return "text-red-600 bg-red-300";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 py-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Scheduled Visits
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visits.map((visit) => (
          <div
            key={visit.id}
            className="p-5 bg-red-100 shadow rounded-xl border border-gray-100 hover:shadow-md transition"
          >
            <h2 className="text-lg font-medium text-gray-900">
              {visit.propertyName}
            </h2>

            <div className="mt-3 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Date:</span> {visit.date}
              </p>
              <p>
                <span className="font-semibold">Time:</span> {visit.time}
              </p>
            </div>

            <div className="mt-4">
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(
                  visit.status
                )}`}
              >
                {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {visits.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No scheduled visits yet.
        </p>
      )}
    </div>
  );
};

export default VisitsPage;


























