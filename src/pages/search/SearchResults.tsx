import React, { useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
} from "lucide-react";
import PropertyCardFav from "../general/PropertyCardFav";
import { useNavigate } from "react-router-dom";
import { getAllProperties } from "@/services/property.api";
import type { Property, PropertyFilters, PropertyType } from "@/types/property.types";

const SearchResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState<string>("All");
  const [propertyStatus, setPropertyStatus] = useState<string>("All");
  const [bedrooms, setBedrooms] = useState<string>("Any");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [properties, setProperties] = useState<Property[]>([]);
  const [allProperties, setAllProperties] = useState<Property[]>([]); // Store all properties for client-side filtering
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await getAllProperties({});
      if (res.data.success) {
        setAllProperties(res.data.data);
        setProperties(res.data.data);
      }
    } catch (error: any) {
      console.error("Error fetching properties:");
      console.log("message:", error.message);
      console.log("status:", error.response?.status);
      console.log("data:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // Client-side filtering
  const applyFilters = () => {
    let filtered = [...allProperties];

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(query) ||
          property.address.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query)
      );
    }

    // Property type filter
    if (propertyType !== "All") {
      filtered = filtered.filter(
        (property) => property.type.toLowerCase() === propertyType.toLowerCase()
      );
    }

    // Property status filter (rent/sale)
    if (propertyStatus !== "All") {
      filtered = filtered.filter(
        (property) => property.status.toLowerCase() === propertyStatus.toLowerCase()
      );
    }

    // Bedrooms filter
    if (bedrooms !== "Any") {
      const bedroomNum = parseInt(bedrooms.replace("+", ""));
      if (!isNaN(bedroomNum)) {
        filtered = filtered.filter((property) => property.bedrooms >= bedroomNum);
      }
    }

    // Price range filter
    if (minPrice) {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) {
        filtered = filtered.filter((property) => property.price >= min);
      }
    }
    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        filtered = filtered.filter((property) => property.price <= max);
      }
    }

    setProperties(filtered);
  };

  const handleApplyFilters = () => {
    applyFilters();
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setPropertyType("All");
    setPropertyStatus("All");
    setBedrooms("Any");
    setMinPrice("");
    setMaxPrice("");
    setProperties(allProperties);
    setShowFilters(false);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const handlePropertyClick = (id: string) => {
    console.log("Navigating to property:", id);
    navigate(`/propertydetailBuyer/${id}`); // Navigate with property ID
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  // Apply filters whenever any filter changes
  useEffect(() => {
    if (allProperties.length > 0) {
      applyFilters();
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen">
      {/* Header Search Bar */}
      <section className="bg-secondary border-b border-custom sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by location, property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-custom py-3 px-6 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent bg-primary text-primary"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent p-2.5 rounded-full hover:bg-accent-hover transition"
                >
                  <Search className="w-5 h-5 text-primary" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 border border-custom rounded-full btn-primary hover:bg-accent-hover transition"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
              {(propertyType !== "All" || propertyStatus !== "All" || bedrooms !== "Any" || minPrice || maxPrice) && (
                <span className="ml-1 bg-accent text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  !
                </span>
              )}
            </button>
          </form>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 p-6 bg-primary rounded-2xl border border-custom">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full rounded-lg border border-custom py-2 px-4 bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option>All</option>
                    <option>villa</option>
                    <option>apartment</option>
                    <option>house</option>
                    <option>condo</option>
                    <option>townhouse</option>
                    <option>land</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Status
                  </label>
                  <select
                    value={propertyStatus}
                    onChange={(e) => setPropertyStatus(e.target.value)}
                    className="w-full rounded-lg border border-custom py-2 px-4 bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option>All</option>
                    <option>sale</option>
                    <option>rent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Bedrooms
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full rounded-lg border border-custom py-2 px-4 bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option>Any</option>
                    <option>1+</option>
                    <option>2+</option>
                    <option>3+</option>
                    <option>4+</option>
                    <option>5+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Min Price
                  </label>
                  <input
                    type="number"
                    placeholder="$0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full rounded-lg border border-custom py-2 px-4 bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Max Price
                  </label>
                  <input
                    type="number"
                    placeholder="$5,000,000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full rounded-lg border border-custom py-2 px-4 bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-4">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-6 py-2 border border-custom rounded-lg text-primary hover:bg-secondary transition"
                >
                  Clear Filters
                </button>
                <button 
                  type="button"
                  onClick={handleApplyFilters}
                  className="px-6 py-2 bg-accent text-primary rounded-lg font-medium hover:bg-accent-hover transition"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Search Results
            </h1>
            <p className="text-secondary">
              {loading ? "Loading..." : `Found ${properties.length} properties matching your criteria`}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex border border-custom rounded-lg overflow-hidden">
              <button
                onClick={() => setViewType("grid")}
                className={`px-4 py-2 ${
                  viewType === "grid"
                    ? "bg-accent text-primary"
                    : "bg-secondary text-secondary"
                } transition`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewType("list")}
                className={`px-4 py-2 ${
                  viewType === "list"
                    ? "bg-accent text-primary"
                    : "bg-secondary text-secondary"
                } transition`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-secondary">Loading properties...</div>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-secondary mb-4">No properties found matching your criteria</p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-accent text-primary rounded-lg font-medium hover:bg-accent-hover transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-8 ${
              viewType === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {properties.map((property) => (
              
              <PropertyCardFav
              key={property._id}
              property={property}
              isFavorite={favorites.has(property._id)}
              onFavoriteChange={() => toggleFavorite(property._id)}
              onClick={() => handlePropertyClick(property._id)}
            />
            

            ))}
          </div>
        )}

        {/* Pagination - You can implement this later with backend pagination */}
        {!loading && properties.length > 0 && properties.length > 9 && (
          <div className="flex justify-center mt-12">
            <nav aria-label="Page navigation">
              <ul className="flex -space-x-px text-sm">
                <li>
                  <button className="flex items-center justify-center text-secondary bg-secondary border border-custom hover:bg-accent-hover hover:text-primary font-medium rounded-s-lg text-sm px-3 h-10 transition">
                    Previous
                  </button>
                </li>

                {[1].map((n) => (
                  <li key={n}>
                    <button
                      className="flex items-center justify-center border cursor-pointer border-custom text-sm w-10 h-10 transition text-accent bg-secondary font-semibold"
                    >
                      {n}
                    </button>
                  </li>
                ))}

                <li>
                  <button className="flex items-center justify-center text-secondary bg-secondary border border-custom hover:bg-accent-hover hover:text-primary font-medium rounded-e-lg text-sm px-3 h-10 transition">
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-secondary py-16 border-t border-custom">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Get Property Alerts
          </h2>
          <p className="text-secondary mb-8">
            Be the first to know about new properties matching your preferences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-custom py-3 px-6 bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button className="bg-accent text-primary px-8 py-3 rounded-lg font-medium hover:bg-accent-hover transition whitespace-nowrap">
              Subscribe
            </button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default SearchResultsPage;