import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Bed,
  Square,
  ArrowRight,
  DollarSign,
  TrendingUp,
  ClipboardCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getSoldProperties } from "@/services/property.api";
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

const HomeSeller: React.FC = () => {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("Sell");
  const [featuredFilter, setFeaturedFilter] = useState("All Properties");
  
  // State for real properties
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch sold properties on component mount
  useEffect(() => {
    const fetchSoldProperties = async () => {
      try {
        setLoading(true);
        // Use the new dedicated sold properties endpoint
        const response = await getSoldProperties();
        
        if (response.data.success) {
          setProperties(response.data.data);
        }
      } catch (err: any) {
        console.error("Error fetching sold properties:", err);
        setError(err.response?.data?.message || "Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchSoldProperties();
  }, []);

  // Filter properties based on featuredFilter
  const filteredProperties =
    featuredFilter === "All Properties"
      ? properties
      : featuredFilter === "Featured"
      ? properties.filter((p) => p.featured)
      : properties;

  const handleSearchClick = () => {
    const query = searchInput.trim()
      ? `?q=${encodeURIComponent(searchInput)}&type=${selectedPropertyType}`
      : `?type=${selectedPropertyType}`;

    navigate(`/search${query}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearchClick();
  };

  const handlePropertyTypeClick = (type: string) => {
    setSelectedPropertyType(type);
  };


  // Cities Section Data
  const cities = [
    {
      id: 1,
      name: "New York",
      properties: 120,
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      name: "San Diego",
      properties: 45,
      image:
        "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=200&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Miami",
      properties: 67,
      image:
        "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=200&h=200&fit=crop",
    },
    {
      id: 4,
      name: "Los Angeles",
      properties: 89,
      image:
        "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=200&h=200&fit=crop",
    },
    {
      id: 5,
      name: "Chicago",
      properties: 34,
      image:
        "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=200&h=200&fit=crop",
    },
    {
      id: 6,
      name: "San Francisco",
      properties: 56,
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200&h=200&fit=crop",
    },
  ];

  const companies = [
    {
      id: 1,
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      id: 2,
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      id: 3,
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    },
    {
      id: 4,
      name: "Meta",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    },
    {
      id: 5,
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      id: 6,
      name: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    },
  ];

  const handleCityClick = (cityName: string) => {
    console.log(`City clicked: ${cityName}`);
  };

  const handleViewAllClick = () => {
    console.log("View All Cities clicked");
  };

  const handleAddProperty = () => {
    navigate("/CreateProperty");
  };

  return (
    <>
      {/* ================= HERO SEARCH SECTION ================= */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-20 h-[90vh]
             bg-[url('./src/assets/homebuyer.png')] 
             dark:bg-[url('./src/assets/darkbg.png')]"
      >
        <div className="relative max-w-7xl mx-auto px-6 text-center rounded-lg p-6 pt-20">
          <button className="px-4 py-1 border border-custom rounded-full text-sm mb-4 btn-primary hover:bg-accent-hover transition">
            LET US GUIDE YOUR SALE
          </button>

          <p className="text-secondary mb-2">
            Get the best value for your property with our expert guidance.
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Sell Your Property with Confidence
          </h1>

          <div className="flex justify-center mb-6">
            <div className="flex justify-center mb-6">
              <button
                onClick={handleAddProperty}
                className="px-6 py-3 rounded-full bg-accent text-primary font-semibold hover:bg-accent-hover transition shadow"
              >
                Add Property
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STEPS SECTION ================= */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Sell Your House as Easy as 1,2,3
          </h2>

          <p className="text-secondary mb-16 max-w-md mx-auto">
            We handle the entire selling process for you from listing to final
            deal.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="bg-accent rounded-full p-6 mb-6 w-20 h-20 flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-4">
                1. Add Your Property
              </h3>
              <p className="text-secondary text-sm leading-relaxed max-w-xs">
                Enter all the details of your apartment and submit it for
                review.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="bg-accent rounded-full p-6 mb-6 w-20 h-20 flex items-center justify-center">
                <ClipboardCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-4">
                2. We Showcase It
              </h3>
              <p className="text-secondary text-sm leading-relaxed max-w-xs">
                We list your property and present it to potential buyers
                professionally.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="bg-accent rounded-full p-6 mb-6 w-20 h-20 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-4">
                3. Close the Deal
              </h3>
              <p className="text-secondary text-sm leading-relaxed max-w-xs">
                We complete the sale securely and ensure you receive your
                payment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CITIES SECTION ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                High Demand Areas
              </h2>
              <p className="text-secondary">
                See where buyers are looking right now.
              </p>
            </div>

            <button
              onClick={handleViewAllClick}
              className="flex items-center gap-2 text-primary hover:text-[#DDC7BB] transition-colors font-medium"
            >
              View All Cities
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {cities.map((city) => (
              <div
                key={city.id}
                onClick={() => handleCityClick(city.name)}
                className="bg-secondary rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-primary truncate">
                      {city.name}
                    </h3>
                    <p className="text-sm text-secondary">
                      {city.properties}{" "}
                      {city.properties === 1 ? "Buyer" : "Buyers"} Active
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMPANY LOGOS ================= */}
      <section className="bg-secondary py-16 border-y border-custom">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-2xl text-secondary font-medium tracking-wide">
              Trusted by Leading Sellers
            </p>
            <p className="mt-2 text-base text-secondary">
              Thousands of homeowners trust our platform to sell their homes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {companies.map((company) => (
              <div
                key={company.id}
                className="flex items-center justify-center p-4 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="h-8 w-auto object-contain filter dark:invert"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SOLD PROPERTIES ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                Recently Sold Properties
              </h2>
              <p className="text-secondary">
                See what properties like yours are selling for.
              </p>
            </div>

            <div className="flex gap-2">
              {["All Properties", "Featured"].map((t) => (
                <button
                  key={t}
                  onClick={() => setFeaturedFilter(t)}
                  className={`px-4 py-2 border border-custom rounded-full cursor-pointer text-sm transition ${
                    featuredFilter === t
                      ? "bg-accent text-primary"
                      : "btn-primary hover:bg-accent hover:text-primary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-secondary">Loading sold properties...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-secondary">No sold properties found.</p>
            </div>
          )}

          {/* Property Cards Grid */}
          {!loading && !error && filteredProperties.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <div
                  key={property._id}
                  onClick={() => handlePropertyClick(property._id)}
                  className="bg-primary rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="relative h-56">
                    <img
                      src={property.images[0] || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400"}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 text-xs font-semibold rounded bg-red-600 text-white">
                        SOLD
                      </span>
                      {property.featured && (
                        <span className="px-3 py-1 text-xs font-semibold rounded bg-accent text-primary">
                          FEATURED
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-primary">
                        {property.title}
                      </h3>
                      <span className="text-xl font-bold text-red-500">
                        ${property.price.toLocaleString()}
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
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default HomeSeller;