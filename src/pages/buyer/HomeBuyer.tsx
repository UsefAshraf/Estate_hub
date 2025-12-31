import React, {useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Bed,
  Square,
  Home,
  Calendar,
  Key,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StepCard from "../general/StepCard";
import CityCard from "../general/CityCard";
import CompanyCard from "../general/CompanyCard";
import PropertyCard from "../general/PropertyCard";
import MapSearch from "../general/MapSearch";

import { getAllProperties } from "@/services/property.api";
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

const HomeSellerMergedPage: React.FC = () => {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] =
    useState("All Properties");
  const [featuredFilter, setFeaturedFilter] = useState("All Properties");
  //////////
  const [mapSearchQuery, setMapSearchQuery] = useState("");

  // Backend properties
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

 // Fetch properties from backend
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await getAllProperties({});
        if (res.data.success) {
          setProperties(res.data.data);
        }
      } catch (error:any) {
         console.error("Error fetching properties:");
          console.log("message:", error.message);
          console.log("status:", error.response?.status);
          console.log("data:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

   // Filter properties based on featuredFilter
 const filteredProperties =
  featuredFilter === "All Properties"
    ? properties
    : featuredFilter === "Featured"
    ? properties.filter((p) => p.featured)
    : featuredFilter === "For Sale"
    ? properties.filter((p) => p.status === "sale")
    : featuredFilter === "For Rent"
    ? properties.filter((p) => p.status === "rent")
    : properties;

   // Search handlers
  const handleSearchClick = () => {
    const query = searchInput.trim()
      ? `?q=${encodeURIComponent(searchInput)}&type=${selectedPropertyType}`
      : `?type=${selectedPropertyType}`;
    navigate(`/searchBuyer${query}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearchClick();
  };

  // Add this handler function
  const handleMapAreaClick = (
    coordinates: [number, number],
    address: string
  ) => {
    console.log("Selected coordinates:", coordinates);
    console.log("Selected address:", address);

    // Navigate to search with location
    navigate(
      `/search?location=${encodeURIComponent(
        address
      )}&coords=${coordinates.join(",")}`
    );
  };

  const handlePropertyTypeClick = (type: string) => {
    setSelectedPropertyType(type);
    const query = searchInput.trim()
      ? `?q=${encodeURIComponent(searchInput)}&type=${type}`
      : `?type=${type}`;
    navigate(`/search${query}`);
  };

  // const handlePropertyClick = (id: string) => {
  //   console.log("Property:", id);
  //   //navigate(`/propertydetail/${id}`);
  //   navigate(`/propertydetailBuyer`);
  
  // };
  const handlePropertyClick = (propertyId: string) => {
    console.log("Navigating to property:", propertyId);
    navigate(`/propertydetailBuyer/${propertyId}`);
  };
  const fadeIn = (direction = "up") => {
    const variants = {
      hidden: {
        opacity: 0,
        x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
        y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      },
      show: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      },
    };
    return variants;
  };

  // Sample properties with coordinates for the map
  const propertiesWithCoords = [
    {
      id: 1,
      lat: 40.7589,
      lon: -73.9851,
      title: "Luxury Family Home",
      price: "$395,000",
    },
    {
      id: 2,
      lat: 40.7128,
      lon: -74.006,
      title: "Skyper Pool Apartment",
      price: "$280,000",
    },
    {
      id: 3,
      lat: 40.7614,
      lon: -73.9776,
      title: "North Dillard Street",
      price: "$250",
    },
  ];

  // ------- Cities Section Data -------
  const cities = [
    {
      id: 1,
      name: "New York",
      properties: 8,
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      name: "San Diego",
      properties: 0,
      image:
        "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=200&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Miami",
      properties: 2,
      image:
        "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=200&h=200&fit=crop",
    },
    {
      id: 4,
      name: "Los Angeles",
      properties: 1,
      image:
        "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=200&h=200&fit=crop",
    },
    {
      id: 5,
      name: "Chicago",
      properties: 2,
      image:
        "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=200&h=200&fit=crop",
    },
    {
      id: 6,
      name: "San Francisco",
      properties: 5,
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
  return (
    <>
      <motion.section
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative bg-cover bg-center bg-no-repeat py-20 h-[90vh]
        bg-[url('./src/assets/homebuyer.png')] 
        dark:bg-[url('./src/assets/darkbg.png')]"
      >
        <div className="relative max-w-7xl mx-auto px-6 text-center rounded-lg p-6 pt-20">
          <button className="px-4 py-1 border border-custom rounded-full text-sm mb-4 btn-primary hover:bg-accent-hover transition">
            LET US GUIDE YOUR HOME
          </button>

          <p className="text-secondary mb-2">
            We've more than 745,000 apartments, place & plot.
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Find Your Perfect Home
          </h1>

          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Enter Name, Keywords..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full rounded-full border border-custom py-3 px-6 shadow-sm focus:ring-2 focus:ring-accent bg-secondary text-primary relative z-10"
              />
              <button
                onClick={handleSearchClick}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent p-3 rounded-full hover:bg-accent-hover transition z-10"
              >
                <Search className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-4 relative z-10">
            {["All Properties", "For Sale", "For Rent"].map((t) => (
              <button
                key={t}
                onClick={() => handlePropertyTypeClick(t)}
                className={`px-4 py-2 border cursor-pointer border-custom rounded-full hover:bg-accent-hover transition ${
                  selectedPropertyType === t ? "bg-accent" : "btn-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        {/* </section> */}
      </motion.section>

      {/* ================= STEPS SECTION ================= */}
      <motion.section
        variants={fadeIn("left")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bg-primary py-20"
      >
        {/* <section className="bg-primary py-20"> */}
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Find Your Dream House as Easy as 1,2,3
          </h2>
          <p className="text-secondary mb-16 max-w-md mx-auto">
            Lorem ipsum dolor sit amet
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <StepCard
              icon={<Home className="w-8 h-8 text-primary" />}
              title="1. Search for your favorite house"
              description="Pellentesque egestas elementum."
              direction="left"
            />

            <StepCard
              icon={<Calendar className="w-8 h-8 text-primary" />}
              title="2. Make a visit appointment"
              description="Pellentesque egestas elementum."
              direction="bottom"
            />

            <StepCard
              icon={<Key className="w-8 h-8 text-primary" />}
              title="3. Get your dream house quickly"
              description="Pellentesque egestas elementum."
              direction="right"
            />
          </div>
        </div>
        {/* </section> */}
      </motion.section>

      {/* ================= CITIES SECTION (MERGED) ================= */}
      <motion.section
        variants={fadeIn("right")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20"
      >
        {/* <section className="py-20"> */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                Find Properties in These Cities
              </h2>
              <p className="text-secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
              <CityCard
                key={city.id}
                name={city.name}
                image={city.image}
                properties={city.properties}
                onClick={() => handleCityClick(city.name)}
              />
            ))}
          </div>
        </div>
        {/* </section> */}
      </motion.section>
      {/* ================= COMPANY LOGOS ================= */}
      <motion.section
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bg-secondary py-16 border-y border-custom"
      >
        {/* <section className="bg-secondary py-16 border-y border-custom"> */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-2xl text-secondary font-medium tracking-wide">
              Trusted by Leading Companies
            </p>
            <p className="mt-2 text-base text-secondary">
              Thousands of world's leading companies trust our platform
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {companies.map((company) => (
              <CompanyCard
                key={company.id}
                logo={company.logo}
                name={company.name}
              />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Explore Properties by Location
            </h2>
            <p className="text-secondary">
              Click anywhere on the map to search for properties in that area
            </p>
          </div>

          <div className="bg-primary rounded-2xl overflow-hidden shadow-lg p-4">
            <div className="h-[600px] w-full">
              <MapSearch
                onAreaClick={handleMapAreaClick}
                properties={properties.map((p) => ({
                  id: p._id,
                  lat: p.location?.coordinates[1] ?? 0,
                  lon: p.location?.coordinates[0] ?? 0,
                  title: p.title,
                  price: `$${p.price}`,
                }))}
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-secondary">
              💡 Tip: Click on any location to see available properties nearby
            </p>
          </div>
        </div>
      </motion.section>

      {/* ================= FEATURED PROPERTIES ================= */}
      <motion.section
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20"
      >
        {/* <section className="py-20"> */}
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                Featured Properties
              </h2>
              <p className="text-secondary">
                Explore our handpicked properties.
              </p>
            </div>

            <div className="flex gap-2">
              {["All Properties", "Featured", "For Sale", "For Rent"].map((t) => (
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

          {/* Property Cards Grid */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                onClick={() => handlePropertyClick(property.id)}
                className="bg-primary rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer group"
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
                            : tag === "FOR SALE"
                            ? "bg-green-600 text-white"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
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
          </div> */}
          {loading ? (
            <p className="text-center text-secondary">Loading properties...</p>
          ) : filteredProperties.length === 0 ? (
            <p className="text-center text-secondary">No properties found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property._id}
                  id={property._id}
                  image={property.images[0]}
                  title={property.title}
                  price={`$${property.price}`}
                  priceType={property.status}
                  address={property.address}
                  beds={property.bedrooms}
                  baths={property.bathrooms}
                  sqft={property.area}
                  tags={property.featured ? ["FEATURED"] : []}
                  onClick={() => handlePropertyClick(property._id)}
                />
              ))}
            </div>
          )}
        </div>
        {/* </section> */}
      </motion.section>
    </>
  );
};

export default HomeSellerMergedPage;
