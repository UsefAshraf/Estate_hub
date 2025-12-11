import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Bed, Square, Edit, Trash2 } from "lucide-react";

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

const SellerPropeties: React.FC = () => {
  const navigate = useNavigate();
  const myProperties = [
    {
      id: 1,
      title: "Cozy Downtown Apartment",
      address: "123 Main St, Anytown",
      price: "$1,500",
      priceType: "rent",
      beds: 2,
      baths: 1,
      sqft: 800,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
      status: "Published",
      tags: ["FOR RENT"],
    },
    {
      id: 2,
      title: "Suburban Family House",
      address: "456 Oak Ave, Suburbia",
      price: "$450,000",
      priceType: "sale",
      beds: 4,
      baths: 3,
      sqft: 2200,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400",
      status: "Published",
      tags: ["FOR SALE", "FEATURED"],
    },
    {
      id: 3,
      title: "Modern Loft",
      address: "789 Pine Ln, Metrovill",
      price: "$780,000",
      priceType: "sale",
      beds: 3,
      baths: 2,
      sqft: 1500,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      status: "Sold",
      tags: ["SOLD"],
    },
    {
      id: 4,
      title: "Lakeside Cabin",
      address: "101 Lakeview Dr, Clearwater",
      price: "$220,000",
      priceType: "sale",
      beds: 2,
      baths: 1,
      sqft: 1000,
      image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=400",
      status: "Under Review",
      tags: ["PENDING"],
    },
  ];

  const handleEditProperty = (id: number) => {
    console.log("Editing property:", id);
    // navigate(/edit-property/${id});
  };

  const handleDeleteProperty = (id: number) => {
    console.log("Deleting property:", id);
    // Add deletion logic here
  };

  return (
    <section className="bg-primary py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              My Properties
            </h1>
            <p className="text-secondary">
              Manage your published properties here.
            </p>
          </div>
          <button
            onClick={() => navigate("/createProperty")}
            className="px-6 py-3 rounded-full bg-accent text-primary font-semibold hover:bg-accent-hover transition shadow"
          >
            Add New Property
          </button>
        </div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProperties.map((property) => (
            <div
              key={property.id}
              className="bg-primary rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all group border border-custom"
            >
              <div className="relative h-56">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 text-xs font-semibold rounded ${
                        tag === "FEATURED"
                          ? "bg-accent text-primary"
                          : tag === "SOLD"
                          ? "bg-red-600 text-white"
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
                  <button onClick={() => handleEditProperty(property.id)} className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition">
                    <Edit className="w-6 h-6 text-gray-800" />
                  </button>
                  <button onClick={() => handleDeleteProperty(property.id)} className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition">
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
                    {property.price}
                    {property.priceType === "rent" && (
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
                    <span>{property.beds} Beds</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.baths} Baths</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Square className="w-4 h-4" />
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SellerPropeties;