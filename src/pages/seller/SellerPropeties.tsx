import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Bed, Square, Edit, Trash2 } from "lucide-react";
import { getAllProperties, deleteProperty } from "@/services/property.api";

import type { Property } from "@/types/property.types";

// Bath icon component
const Bath: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1 2.5V10h15V6a1.5 1.5 0 0 0-1-2.5L17 6" />
    <path d="M22 10v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5" />
    <path d="M4 15v3" />
    <path d="M20 15v3" />
  </svg>
);

const SellerProperties: React.FC = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

     // GET agentId from localStorage user object
  const getCurrentAgentId = (): string => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return "";
      
      const user = JSON.parse(userStr);
      console.log("User from localStorage:", user);
      
      return user.id || "";
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return "";
    }
  };

  const currentAgentId = getCurrentAgentId();
  console.log("agentId:", currentAgentId);

  useEffect(() => {
    if (!currentAgentId) {
      setError("Please log in to view your properties");
      setLoading(false);
      return;
    }
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllProperties();
      console.log("🔹 All properties from API:", response.data.data);

      // Filter by agentId
      const myProperties = response.data.data.filter((property) => {
        const propertyAgentId = String(property.agentId);
        console.log(`Comparing: "${propertyAgentId}" === "${currentAgentId}"`);
        return propertyAgentId === currentAgentId;
      });

      console.log("Filtered properties:", myProperties);
      setProperties(myProperties);
    } catch (err: any) {
      console.error("Error fetching properties:", err);
      setError(err.response?.data?.message || "Failed to load properties");
    } finally {
      setLoading(false);
    }
  };


  const handleEditProperty = (id: string) => {
    navigate(`/edit-property/${id}`);
  };

  const handleDeleteProperty = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }

    try {
      await deleteProperty(id);
      // Remove from state after successful deletion
      setProperties(properties.filter((p) => p._id !== id));
    } catch (err: any) {
      console.error("Error deleting property:", err);
      alert(err.response?.data?.message || "Failed to delete property");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyTags = (property: Property) => {
    const tags: string[] = [];

    if (property.status === "rent") {
      tags.push("FOR RENT");
    } else if (property.status === "sale") {
      tags.push("FOR SALE");
    }

    if (property.featured) {
      tags.push("FEATURED");
    }

    return tags;
  };

  if (loading) {
    return (
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-secondary">Loading properties...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-red-600">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-primary py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              My Properties
            </h1>
            <p className="text-secondary">
              Manage your {properties.length} published {properties.length === 1 ? 'property' : 'properties'} here.
            </p>
          </div>
          <button
            onClick={() => navigate("/createProperty")}
            className="px-6 py-3 rounded-full bg-accent text-primary font-semibold hover:bg-accent-hover transition shadow"
          >
            Add New Property
          </button>
        </div>

        {/* Empty State */}
        {properties.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-secondary mb-6">
              You haven't added any properties yet.
            </p>
            <button
              onClick={() => navigate("/createProperty")}
              className="px-8 py-3 rounded-full bg-accent text-primary font-semibold hover:bg-accent-hover transition shadow"
            >
              Add Your First Property
            </button>
          </div>
        ) : (
          /* Property Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => {
              const tags = getPropertyTags(property);
              const mainImage = property.images[0] || "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=400";

              return (
                <div
                  key={property._id}
                  className="bg-primary rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all group border border-custom"
                >
                  <div className="relative h-56">
                    <img
                      src={mainImage}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 text-xs font-semibold rounded ${tag === "FEATURED"
                              ? "bg-accent text-primary"
                              : tag === "FOR SALE"
                                ? "bg-blue-600 text-white"
                                : tag === "FOR RENT"
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-500 text-white"
                            }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="absolute top-6 right-6 flex gap-2">
                      <button
                        onClick={() => handleEditProperty(property._id)}
                        className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition"
                        title="Edit property"
                      >
                        <Edit className="w-6 h-6 text-gray-800" />
                      </button>
                      <button
                        onClick={() => handleDeleteProperty(property._id)}
                        className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition"
                        title="Delete property"
                      >
                        <Trash2 className="w-6 h-6 text-red-600" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-primary">
                        {property.title}
                      </h3>
                      <span className="text-xl font-bold text-red-500">
                        {formatPrice(property.price)}
                        {property.status === "rent" && (
                          <span className="text-sm text-secondary">/month</span>
                        )}
                      </span>
                    </div>

                    <p className="text-secondary text-sm mb-4 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.address}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-secondary border-t border-custom pt-4">
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>{property.bedrooms} Beds</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>{property.bathrooms} Baths</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Square className="w-4 h-4" />
                        <span>{property.area} sqft</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SellerProperties;