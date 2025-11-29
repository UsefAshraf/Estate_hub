import React, { useState } from "react";
import {
  Search,
  SlidersHorizontal,
} from "lucide-react";
import PropertyCardFav from "../general/PropertyCardFav";

interface Property {
  id: number;
  image: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  featured: boolean;
}
const SearchResultsPage: React.FC = () => {
const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [bedrooms, setBedrooms] = useState("Any");
  const [showFilters, setShowFilters] = useState(false);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());


  // Sample property data
  // const properties = [
  //   {
  //     id: 1,
  //     image: "./property-1.jpg",
  //     title: "Modern Family Home",
  //     location: "Beverly Hills, California",
  //     price: 2500000,
  //     bedrooms: 4,
  //     bathrooms: 3,
  //     sqft: 3500,
  //     type: "House",
  //     featured: true
  //   },
  //   {
  //     id: 2,
  //     image: "./property-2.jpg",
  //     title: "Luxury Downtown Apartment",
  //     location: "San Francisco, California",
  //     price: 1850000,
  //     bedrooms: 3,
  //     bathrooms: 2,
  //     sqft: 2200,
  //     type: "Apartment",
  //     featured: false
  //   },
  //   {
  //     id: 3,
  //     image: "./property-3.jpg",
  //     title: "Beachfront Villa",
  //     location: "Miami, Florida",
  //     price: 4200000,
  //     bedrooms: 5,
  //     bathrooms: 4,
  //     sqft: 4800,
  //     type: "Villa",
  //     featured: true
  //   },
  //   {
  //     id: 4,
  //     image: "./property-4.jpg",
  //     title: "Cozy Studio Loft",
  //     location: "New York, New York",
  //     price: 650000,
  //     bedrooms: 1,
  //     bathrooms: 1,
  //     sqft: 800,
  //     type: "Apartment",
  //     featured: false
  //   },
  //   {
  //     id: 5,
  //     image: "./property-5.jpg",
  //     title: "Mountain View Retreat",
  //     location: "Aspen, Colorado",
  //     price: 3700000,
  //     bedrooms: 6,
  //     bathrooms: 5,
  //     sqft: 5200,
  //     type: "House",
  //     featured: true
  //   },
  //   {
  //     id: 6,
  //     image: "./property-6.jpg",
  //     title: "Urban Townhouse",
  //     location: "Chicago, Illinois",
  //     price: 1200000,
  //     bedrooms: 3,
  //     bathrooms: 2.5,
  //     sqft: 2800,
  //     type: "Townhouse",
  //     featured: false
  //   },
  //   {
  //     id: 7,
  //     image: "./property-7.jpg",
  //     title: "Contemporary Penthouse",
  //     location: "Los Angeles, California",
  //     price: 5800000,
  //     bedrooms: 4,
  //     bathrooms: 4,
  //     sqft: 4200,
  //     type: "Penthouse",
  //     featured: true
  //   },
  //   {
  //     id: 8,
  //     image: "./property-8.jpg",
  //     title: "Suburban Family Home",
  //     location: "Austin, Texas",
  //     price: 850000,
  //     bedrooms: 4,
  //     bathrooms: 3,
  //     sqft: 3200,
  //     type: "House",
  //     featured: false
  //   },
  //   {
  //     id: 9,
  //     image: "./property-9.jpg",
  //     title: "Waterfront Condo",
  //     location: "Seattle, Washington",
  //     price: 1450000,
  //     bedrooms: 2,
  //     bathrooms: 2,
  //     sqft: 1800,
  //     type: "Condo",
  //     featured: false
  //   },
  //   {
  //     id: 10,
  //     image: "./property-10.jpg",
  //     title: "Historic Brownstone",
  //     location: "Boston, Massachusetts",
  //     price: 2100000,
  //     bedrooms: 5,
  //     bathrooms: 3,
  //     sqft: 3800,
  //     type: "House",
  //     featured: true
  //   },
  //   {
  //     id: 11,
  //     image: "./property-11.jpg",
  //     title: "Desert Oasis Estate",
  //     location: "Phoenix, Arizona",
  //     price: 3200000,
  //     bedrooms: 5,
  //     bathrooms: 4,
  //     sqft: 4500,
  //     type: "Estate",
  //     featured: false
  //   },
  //   {
  //     id: 12,
  //     image: "./property-12.jpg",
  //     title: "Garden View Apartment",
  //     location: "Portland, Oregon",
  //     price: 720000,
  //     bedrooms: 2,
  //     bathrooms: 2,
  //     sqft: 1400,
  //     type: "Apartment",
  //     featured: false
  //   }
  // ];
  const properties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400",
      title: "Modern Family Home",
      location: "Beverly Hills, California",
      price: 2500000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3500,
      type: "House",
      featured: true,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=400",
      title: "Luxury Downtown Apartment",
      location: "San Francisco, California",
      price: 1850000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 2200,
      type: "Apartment",
      featured: false,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
      title: "Beachfront Villa",
      location: "Miami, Florida",
      price: 4200000,
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4800,
      type: "Villa",
      featured: true,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
      title: "Cozy Studio Loft",
      location: "New York, New York",
      price: 650000,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 800,
      type: "Apartment",
      featured: false,
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      title: "Mountain View Retreat",
      location: "Aspen, Colorado",
      price: 3700000,
      bedrooms: 6,
      bathrooms: 5,
      sqft: 5200,
      type: "House",
      featured: true,
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=400",
      title: "Urban Townhouse",
      location: "Chicago, Illinois",
      price: 1200000,
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 2800,
      type: "Townhouse",
      featured: false,
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400",
      title: "Contemporary Penthouse",
      location: "Los Angeles, California",
      price: 5800000,
      bedrooms: 4,
      bathrooms: 4,
      sqft: 4200,
      type: "Penthouse",
      featured: true,
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400",
      title: "Suburban Family Home",
      location: "Austin, Texas",
      price: 850000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3200,
      type: "House",
      featured: false,
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400", // reused URL for example
      title: "Waterfront Condo",
      location: "Seattle, Washington",
      price: 1450000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1800,
      type: "Condo",
      featured: false,
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400", // reused URL for example
      title: "Historic Brownstone",
      location: "Boston, Massachusetts",
      price: 2100000,
      bedrooms: 5,
      bathrooms: 3,
      sqft: 3800,
      type: "House",
      featured: true,
    },
    {
      id: 11,
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400",
      title: "Desert Oasis Estate",
      location: "Phoenix, Arizona",
      price: 3200000,
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4500,
      type: "Estate",
      featured: false,
    },
    {
      id: 12,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      title: "Garden View Apartment",
      location: "Portland, Oregon",
      price: 720000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1400,
      type: "Apartment",
      featured: false,
    },
  ];

  const toggleFavorite = (id: number) => {
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

  // const PropertyCard = ({ property }: { property: (typeof properties)[0] }) => (
  //   <div className="bg-secondary rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
  //     <div className="relative overflow-hidden">
  //       <div className="w-full h-64 bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center">
  //         <img
  //           src={property.image}
  //           alt={property.title}
  //           className="w-full h-64 object-cover"
  //         />
  //       </div>

  //       {property.featured && (
  //         <div className="absolute top-4 left-4 bg-accent text-primary px-3 py-1 rounded-full text-xs font-semibold">
  //           Featured
  //         </div>
  //       )}

  //       <button
  //         onClick={() => toggleFavorite(property.id)}
  //         className="absolute top-4 right-4 bg-primary/10 backdrop-blur-sm p-2 rounded-full cursor-pointer transition-colors"
  //       >
  //         <Heart
  //           className={`w-5 h-5 ${
  //             favorites.has(property.id)
  //               ? "fill-red-500 text-red-500"
  //               : "text-secondary"
  //           }`}
  //         />
  //       </button>

  //       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
  //         <div className="flex items-center space-x-1 text-white">
  //           <MapPin className="w-4 h-4" />
  //           <span className="text-sm font-medium">{property.location}</span>
  //         </div>
  //       </div>
  //     </div>

  //     <div className="p-6">
  //       <h3 className="text-xl font-bold text-primary mb-4 transition-colors">
  //         {property.title}
  //       </h3>

  //       <div className="flex items-center justify-between mb-4 text-sm text-secondary">
  //         <div className="flex items-center space-x-1">
  //           <Bed className="w-4 h-4" />
  //           <span>{property.bedrooms} Beds</span>
  //         </div>
  //         <div className="flex items-center space-x-1">
  //           <Bath className="w-4 h-4" />
  //           <span>{property.bathrooms} Baths</span>
  //         </div>
  //         <div className="flex items-center space-x-1">
  //           <Square className="w-4 h-4" />
  //           <span>{property.sqft.toLocaleString()} sq ft</span>
  //         </div>
  //       </div>

  //       <div className="flex items-center justify-between pt-4 border-t border-custom">
  //         <div>
  //           <p className="text-2xl font-bold text-primary">
  //             ${(property.price / 1000000).toFixed(2)}M
  //           </p>
  //           <p className="text-xs text-secondary">{property.type}</p>
  //         </div>
  //         <button className="bg-accent text-primary cursor-pointer px-6 py-2 rounded-lg font-medium hover:bg-accent-hover transition-colors">
  //           View Details
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  // return (
  //   <div className="min-h-screen">
  //     {/* Header Search Bar */}
  //     <section className="bg-secondary border-b border-custom sticky top-0 z-50 shadow-sm">
  //       <div className="max-w-7xl mx-auto px-6 py-6">
  //         <div className="flex flex-col lg:flex-row gap-4 items-center">
  //           <div className="flex-1 w-full">
  //             <div className="relative">
  //               <input
  //                 type="text"
  //                 placeholder="Search by location, property name..."
  //                 value={searchQuery}
  //                 onChange={(e) => setSearchQuery(e.target.value)}
  //                 className="w-full rounded-full border border-custom py-3 px-6 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent bg-primary text-primary"
  //               />
  //               <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent p-2.5 rounded-full hover:bg-accent-hover transition">
  //                 <Search className="w-5 h-5 text-primary" />
  //               </button>
  //             </div>
  //           </div>

  //           <button
  //             onClick={() => setShowFilters(!showFilters)}
  //             className="flex items-center space-x-2 px-6 py-3 border border-custom rounded-full btn-primary hover:bg-accent-hover transition"
  //           >
  //             <SlidersHorizontal className="w-5 h-5" />
  //             <span>Filters</span>
  //           </button>
  //         </div>

  //         {/* Filters Panel */}
  //         {showFilters && (
  //           <div className="mt-6 p-6 bg-primary rounded-2xl border border-custom">
  //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  //               <div>
  //                 <label className="block text-sm font-medium text-primary mb-2">
  //                   Property Type
  //                 </label>
  //                 <select
  //                   value={propertyType}
  //                   onChange={(e) => setPropertyType(e.target.value)}
  //                   className="w-full rounded-lg border border-custom py-2 px-4 bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
  //                 >
  //                   <option>All</option>
  //                   <option>House</option>
  //                   <option>Apartment</option>
  //                   <option>Villa</option>
  //                   <option>Condo</option>
  //                   <option>Townhouse</option>
  //                 </select>
  //               </div>

  //               <div>
  //                 <label className="block text-sm font-medium text-primary mb-2">
  //                   Bedrooms
  //                 </label>
  //                 <select
  //                   value={bedrooms}
  //                   onChange={(e) => setBedrooms(e.target.value)}
  //                   className="w-full rounded-lg border border-custom py-2 px-4 bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
  //                 >
  //                   <option>Any</option>
  //                   <option>1+</option>
  //                   <option>2+</option>
  //                   <option>3+</option>
  //                   <option>4+</option>
  //                   <option>5+</option>
  //                 </select>
  //               </div>

  //               <div>
  //                 <label className="block text-sm font-medium text-primary mb-2">
  //                   Min Price
  //                 </label>
  //                 <input
  //                   type="number"
  //                   placeholder="$0"
  //                   className="w-full rounded-lg border border-custom py-2 px-4 bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
  //                 />
  //               </div>

  //               <div>
  //                 <label className="block text-sm font-medium text-primary mb-2">
  //                   Max Price
  //                 </label>
  //                 <input
  //                   type="number"
  //                   placeholder="$5,000,000"
  //                   className="w-full rounded-lg border border-custom py-2 px-4 bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
  //                 />
  //               </div>
  //             </div>

  //             <div className="flex justify-end mt-6 space-x-4">
  //               <button
  //                 onClick={() => setShowFilters(false)}
  //                 className="px-6 py-2 border border-custom rounded-lg text-primary hover:bg-secondary transition"
  //               >
  //                 Cancel
  //               </button>
  //               <button className="px-6 py-2 bg-accent text-primary rounded-lg font-medium hover:bg-accent-hover transition">
  //                 Apply Filters
  //               </button>
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     </section>

  //     {/* Results Section */}
  //     <section className="max-w-7xl mx-auto px-6 py-12">
  //       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
  //         <div>
  //           <h1 className="text-3xl font-bold text-primary mb-2">
  //             Search Results
  //           </h1>
  //           <p className="text-secondary">
  //             Found {properties.length} properties matching your criteria
  //           </p>
  //         </div>

  //         <div className="flex items-center space-x-4">
  //           <div className="flex border border-custom rounded-lg overflow-hidden">
  //             <button
  //               onClick={() => setViewType("grid")}
  //               className={`px-4 py-2 ${
  //                 viewType === "grid"
  //                   ? "bg-accent text-primary"
  //                   : "bg-secondary text-secondary"
  //               } transition`}
  //             >
  //               Grid
  //             </button>
  //             <button
  //               onClick={() => setViewType("list")}
  //               className={`px-4 py-2 ${
  //                 viewType === "list"
  //                   ? "bg-accent text-primary"
  //                   : "bg-secondary text-secondary"
  //               } transition`}
  //             >
  //               List
  //             </button>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Property Grid */}
  //       <div
  //         className={`grid ${
  //           viewType === "grid"
  //             ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
  //             : "grid-cols-1"
  //         } gap-8`}
  //       >
  //         {properties.map((property) => (
  //           <PropertyCard key={property.id} property={property} />
  //         ))}
  //       </div>

  //       {/* Pagination */}
  //       <div className="flex justify-center mt-12">
  //         <nav aria-label="Page navigation">
  //           <ul className="flex -space-x-px text-sm">
  //             <li>
  //               <button className="flex items-center justify-center text-secondary bg-secondary border border-custom hover:bg-accent-hover hover:text-primary font-medium rounded-s-lg text-sm px-3 h-10 transition">
  //                 Previous
  //               </button>
  //             </li>

  //             {[1, 2, 3, 4, 5].map((n) => (
  //               <li key={n}>
  //                 <button
  //                   className={`flex items-center justify-center border cursor-pointer border-custom text-sm w-10 h-10 transition 
  //             ${
  //               n === 3
  //                 ? "text-accent bg-secondary font-semibold"
  //                 : "text-secondary bg-secondary hover:bg-accent-hover hover:text-primary"
  //             }`}
  //                 >
  //                   {n}
  //                 </button>
  //               </li>
  //             ))}

  //             <li>
  //               <button className="flex items-center justify-center text-secondary bg-secondary border border-custom hover:bg-accent-hover hover:text-primary font-medium rounded-e-lg text-sm px-3 h-10 transition">
  //                 Next
  //               </button>
  //             </li>
  //           </ul>
  //         </nav>
  //       </div>
  //     </section>

  //     {/* Newsletter CTA */}
  //     <section className="bg-secondary py-16 border-t border-custom">
  //       <div className="max-w-4xl mx-auto px-6 text-center">
  //         <h2 className="text-3xl font-bold text-primary mb-4">
  //           Get Property Alerts
  //         </h2>
  //         <p className="text-secondary mb-8">
  //           Be the first to know about new properties matching your preferences
  //         </p>
  //         <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
  //           <input
  //             type="email"
  //             placeholder="Enter your email"
  //             className="flex-1 rounded-lg border border-custom py-3 px-6 bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
  //           />
  //           <button className="bg-accent text-primary px-8 py-3 rounded-lg font-medium hover:bg-accent-hover transition whitespace-nowrap">
  //             Subscribe
  //           </button>
  //         </div>
  //       </div>
  //     </section>
  //   </div>
  // );


   return (
    <div className="min-h-screen">
      {/* Header Search Bar */}
      <section className="bg-secondary border-b border-custom sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by location, property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-custom py-3 px-6 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent bg-primary text-primary"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent p-2.5 rounded-full hover:bg-accent-hover transition">
                  <Search className="w-5 h-5 text-primary" />
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 border border-custom rounded-full btn-primary hover:bg-accent-hover transition"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 p-6 bg-primary rounded-2xl border border-custom">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Condo</option>
                    <option>Townhouse</option>
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
                    className="w-full rounded-lg border border-custom py-2 px-4 bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-6 py-2 border border-custom rounded-lg text-primary hover:bg-secondary transition"
                >
                  Cancel
                </button>
                <button className="px-6 py-2 bg-accent text-primary rounded-lg font-medium hover:bg-accent-hover transition">
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
              Found {properties.length} properties matching your criteria
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
        <div
          className={`grid gap-8 ${
            viewType === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {properties.map((property) => (
            <PropertyCardFav
              key={property.id}
              property={property}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav aria-label="Page navigation">
            <ul className="flex -space-x-px text-sm">
              <li>
                <button className="flex items-center justify-center text-secondary bg-secondary border border-custom hover:bg-accent-hover hover:text-primary font-medium rounded-s-lg text-sm px-3 h-10 transition">
                  Previous
                </button>
              </li>

              {[1, 2, 3, 4, 5].map((n) => (
                <li key={n}>
                  <button
                    className={`flex items-center justify-center border cursor-pointer border-custom text-sm w-10 h-10 transition ${
                      n === 3
                        ? "text-accent bg-secondary font-semibold"
                        : "text-secondary bg-secondary hover:bg-accent-hover hover:text-primary"
                    }`}
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
