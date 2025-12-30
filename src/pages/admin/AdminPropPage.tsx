import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Edit, Loader2, Shield } from "lucide-react";
import {
  getAllProperties,
  deleteProperty,
} from "@/services/property.api";
import Swal from "sweetalert2";

export interface Property {
  _id: string;
  title: string;
  description: string;
  type: "villa" | "apartment" | "house" | "condo" | "townhouse" | "land";
  status: "rent" | "sale" | "sold";
  featured: boolean;
  price: number;
  priceNote?: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  builtYear: number;
  images: string[];
  features: Array<{ name: string }>;
  agentId: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filter, setFilter] = useState<"All" | "sale" | "rent" | "sold">("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllProperties();
      
      console.log("Fetched properties:", response.data);
      
      if (response.data.success) {
        setProperties(response.data.data);
      } else {
        setError("Failed to load properties");
      }
    } catch (err: any) {
      console.error("Failed to fetch properties", err);
      setError(err.response?.data?.message || "Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const filtered =
    filter === "All"
      ? properties
      : properties.filter((p) => p.status === filter);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p._id !== id));
      
      Swal.fire({
        title: "Deleted!",
        text: "Property has been deleted.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err: any) {
      console.error("Delete failed", err);
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Failed to delete property",
        icon: "error",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sale":
        return "bg-blue-100 text-blue-700";
      case "rent":
        return "bg-green-100 text-green-700";
      case "sold":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "sale":
        return "For Sale";
      case "rent":
        return "For Rent";
      case "sold":
        return "Sold";
      default:
        return status;
    }
  };

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* PAGE HEADER */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="w-8 h-8 text-gray-700" />
            <h1 className="text-3xl font-bold text-orange-900 text-secondary">Admin Dashboard</h1>
          </div>
          <p className="text-gray-600 ml-11">
            Manage properties, organize listings, and control operations
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-lg bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* PAGE HEADER */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center space-x-3 mb-2">
          <Shield className="w-8 h-8 text-gray-700" />
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <p className="text-gray-600 ml-11">
          Manage properties, organize listings, and control operations
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-3">
            {["All", "sale", "rent", "sold"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition
                  ${
                    filter === tab
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
              >
                {tab === "All" ? "All" : getStatusLabel(tab)}
              </button>
            ))}
          </div>

          <Link
            to="/admincreateProperty"
            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Property
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-sm text-gray-600 mb-1">Total Properties</div>
            <div className="text-2xl font-bold text-gray-900">{properties.length}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-sm text-gray-600 mb-1">For Sale</div>
            <div className="text-2xl font-bold text-blue-600">
              {properties.filter(p => p.status === "sale").length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-sm text-gray-600 mb-1">For Rent</div>
            <div className="text-2xl font-bold text-green-600">
              {properties.filter(p => p.status === "rent").length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-sm text-gray-600 mb-1">Sold</div>
            <div className="text-2xl font-bold text-red-600">
              {properties.filter(p => p.status === "sold").length}
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="p-4 text-left font-medium">Property</th>
                <th className="p-4 text-center font-medium">Type</th>
                <th className="p-4 text-center font-medium">Price</th>
                <th className="p-4 text-center font-medium">Address</th>
                <th className="p-4 text-center font-medium">Status</th>
                <th className="p-4 text-center font-medium">Featured</th>
                <th className="p-4 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  {/* PROPERTY */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images?.[0] || "https://via.placeholder.com/60"}
                        alt={p.title}
                        className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                      />
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">
                          {p.title}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {p.bedrooms} bed · {p.bathrooms} bath · {p.area} sqft
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 capitalize text-center text-gray-700">
                    {p.type}
                  </td>

                  <td className="p-4 text-center font-semibold text-gray-900">
                    ${p.price.toLocaleString()}
                  </td>

                  <td className="p-4 text-center text-gray-600 max-w-xs truncate">
                    {p.address}
                  </td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(p.status)}`}
                    >
                      {getStatusLabel(p.status)}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    {p.featured && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        Featured
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/seller/edit-property/${p._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* EMPTY STATE */}
          {filtered.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Shield className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg mb-2">No properties found</p>
              <p className="text-gray-400 text-sm mb-6">
                {filter === "All" 
                  ? "Get started by adding your first property"
                  : `No properties with status "${getStatusLabel(filter)}"`
                }
              </p>
              {filter === "All" && (
                <Link
                  to="/admincreateProperty"
                  className="inline-flex items-center gap-2 btn-primary text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add Property
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Properties Count */}
        {filtered.length > 0 && (
          <div className="mt-4 text-sm text-gray-600 text-center">
            Showing {filtered.length} of {properties.length} properties
          </div>
        )}
      </div>
    </div>
  );
} 