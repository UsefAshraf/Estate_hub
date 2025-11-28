import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

type Property = {
  id: number;
  title: string;
  description: string;
  type: string;
  price: string;
  location: string;
  status: "For Sale" | "For Rent";
  details: string; // beds, baths, sqft
};

export default function AdminPropertiesPage() {
  const [filter, setFilter] = useState<"All" | "For Sale" | "For Rent">("All");

  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      title: "Modern Luxury Villa with Ocean View",
      description: "Modern Luxury Villa with Ocean View",
      type: "villa",
      price: "$2,500,000",
      location: "Malibu, CA",
      status: "For Sale",
      details: "5 bed · 4 bath · 4500 sqft",
    },
    {
      id: 2,
      title: "Contemporary Downtown Apartment",
      description: "Contemporary Downtown Apartment",
      type: "apartment",
      price: "$3,500/mo",
      location: "Downtown LA",
      status: "For Rent",
      details: "2 bed · 2 bath · 1200 sqft",
    },
    {
      id: 3,
      title: "Elegant Mediterranean Villa",
      description: "Elegant Mediterranean Villa",
      type: "villa",
      price: "$1,850,000",
      location: "Beverly Hills, CA",
      status: "For Sale",
      details: "4 bed · 3 bath · 3800 sqft",
    },
    {
      id: 4,
      title: "Spacious Family House",
      description: "Spacious Family House",
      type: "house",
      price: "$750,000",
      location: "Pasadena, CA",
      status: "For Sale",
      details: "4 bed · 2 bath · 2400 sqft",
    },
    {
      id: 5,
      title: "Modern Luxury Condo",
      description: "Modern Luxury Condo",
      type: "condo",
      price: "$4,200/mo",
      location: "Santa Monica, CA",
      status: "For Rent",
      details: "3 bed · 2 bath · 1600 sqft",
    },
    {
      id: 6,
      title: "Cozy Suburban Home",
      description: "Cozy Suburban Home",
      type: "house",
      price: "$650,000",
      location: "Glendale, CA",
      status: "For Sale",
      details: "3 bed · 2 bath · 1800 sqft",
    },
  ]);

  const filtered =
    filter === "All"
      ? properties
      : properties.filter((p) => p.status === filter);

  const handleDelete = (id: number) => {
    setProperties(properties.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* PAGE HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin - Properties</h1>
        <p className="text-gray-600">Manage all listed properties</p>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
        {/* FILTER BUTTONS */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            {["All", "For Sale", "For Rent"].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setFilter(tab as "All" | "For Sale" | "For Rent")
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium 
                            ${
                              filter === tab
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700"
                            }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <Plus className="w-4 h-4" /> Add Property
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-700">
                <th className="p-3 font-medium">Property</th>
                <th className="p-3 font-medium">Type</th>
                <th className="p-3 font-medium">Price</th>
                <th className="p-3 font-medium">Location</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-b hover:bg-gray-50 transition text-sm"
                >
                  <td className="p-3">
                    <div className="font-semibold text-gray-900">
                      {p.title}
                    </div>
                    <div className="text-gray-500">{p.details}</div>
                  </td>

                  <td className="p-3 capitalize">{p.type}</td>
                  <td className="p-3">{p.price}</td>
                  <td className="p-3">{p.location}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        p.status === "For Sale"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="p-3 flex gap-3">
                    <button title="Edit" className="text-blue-600 hover:text-blue-800">
                      <Pencil className="w-4 h-4" />
                    </button>

                    <button
                      title="Delete"
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
