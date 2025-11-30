import React, { useState } from "react";
import { Heart, MapPin, Bed, Bath, Square, Trash2, Share2 } from "lucide-react";
import FavoriteCard from "../general/FavoriteCard";

const FavouritesBuyer: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<number>>(
    new Set([1, 3, 5, 7, 10])
  );

  // Sample favorite properties data
  const favoriteProperties = [
    {
      id: 1,
      image: "./src/assets/OIPp.webp",
      title: "Modern Family Home",
      location: "Beverly Hills, California",
      price: 2500000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3500,
      type: "House",
      featured: true,
      dateAdded: "2024-01-15",
    },
    {
      id: 3,
      image: "./src/assets/re.webp",
      title: "Beachfront Villa",
      location: "Miami, Florida",
      price: 4200000,
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4800,
      type: "Villa",
      featured: true,
      dateAdded: "2024-01-10",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=200&h=200&fit=crop",
      title: "Mountain View Retreat",
      location: "Aspen, Colorado",
      price: 3700000,
      bedrooms: 6,
      bathrooms: 5,
      sqft: 5200,
      type: "House",
      featured: true,
      dateAdded: "2024-01-20",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=200&h=200&fit=crop",
      title: "Contemporary Penthouse",
      location: "Los Angeles, California",
      price: 5800000,
      bedrooms: 4,
      bathrooms: 4,
      sqft: 4200,
      type: "Penthouse",
      featured: true,
      dateAdded: "2024-01-25",
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=200&h=200&fit=crop",
      title: "Historic Brownstone",
      location: "Boston, Massachusetts",
      price: 2100000,
      bedrooms: 5,
      bathrooms: 3,
      sqft: 3800,
      type: "House",
      featured: true,
      dateAdded: "2024-01-12",
    },
  ];

  const removeFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.delete(id);
      return newFavorites;
    });
  };

  const shareProperty = (property: (typeof favoriteProperties)[0]) => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this amazing property: ${property.title} in ${property.location}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `${property.title} - ${property.location} - $${(
          property.price / 1000000
        ).toFixed(2)}M`
      );
      alert("Property details copied to clipboard!");
    }
  };

  const clearAllFavorites = () => {
    if (window.confirm("Are you sure you want to remove all favorites?")) {
      setFavorites(new Set());
    }
  };



  // const FavoriteCard = ({
  //   property,
  // }: {
  //   property: (typeof favoriteProperties)[0];
  // }) => (
  //   <div className="favorite-card bg-secondary rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
  //     <div className="relative overflow-hidden">
  //       <div className="w-full h-64 bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center">
  //         <img
  //           src={property.image}
  //           alt={property.title}
  //           className="w-full h-64 object-cover"
  //         />{" "}
  //       </div>

  //       {property.featured && (
  //         <div className="absolute top-4 left-4 bg-accent text-primary px-3 py-1 rounded-full text-xs font-semibold">
  //           Featured
  //         </div>
  //       )}

  //       <div className="absolute top-4 right-4 flex gap-2">
  //         <button
  //           onClick={() => shareProperty(property)}
  //           className="bg-primary cursor-pointer backdrop-blur-sm p-2 rounded-full hover:bg-primary/20 transition-colors"
  //           title="Share property"
  //         >
  //           <Share2 className="w-4 h-4 text-secondary" />
  //         </button>
  //         <button
  //           onClick={() => removeFavorite(property.id)}
  //           className="bg-primary cursor-pointer backdrop-blur-sm p-2 rounded-full hover:bg-red-500 transition-colors group"
  //           title="Remove from favorites"
  //         >
  //           <Trash2 className="w-4 h-4 text-secondary" />
  //         </button>
  //       </div>

  //       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
  //         <div className="flex items-center space-x-1 text-white">
  //           <MapPin className="w-4 h-4" />
  //           <span className="text-sm font-medium">{property.location}</span>
  //         </div>
  //       </div>
  //     </div>

  //     <div className="p-6">
  //       <div className="flex items-start justify-between mb-4">
  //         <h3 className="text-xl font-bold text-primary transition-colors flex-1">
  //           {property.title}
  //         </h3>
  //         <Heart className="w-6 h-6 fill-red-500 text-red-500 ml-2 flex-shrink-0" />
  //       </div>

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

  //       <div className="mb-4">
  //         <p className="text-xs text-secondary">
  //           Added to favorites:{" "}
  //           {new Date(property.dateAdded).toLocaleDateString()}
  //         </p>
  //       </div>

  //       <div className="flex items-center justify-between pt-4 border-t border-custom">
  //         <div>
  //           <p className="text-2xl font-bold text-primary">
  //             ${(property.price / 1000000).toFixed(2)}M
  //           </p>
  //           <p className="text-xs text-secondary">{property.type}</p>
  //         </div>
  //         <div className="flex gap-2">
  //           <button className="bg-accent cursor-pointer text-primary px-2 py-1 rounded-lg font-medium hover:bg-accent-hover transition-colors">
  //             View Details
  //           </button>
  //           <button className="border hover:bg-accent cursor-pointer border-custom text-secondary px-2 py-1 rounded-lg font-medium transition-colors">
  //             Contact Agent
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  const filteredFavorites = favoriteProperties.filter((property) =>
    favorites.has(property.id)
  );

  // return (
  //   <div className="min-h-screen">
  //     {/* Header */}
  //     <section className="bg-secondary border-b border-custom">
  //       <div className="max-w-7xl mx-auto px-6 py-12">
  //         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
  //           <div>
  //             <h1 className="text-4xl font-bold text-primary mb-4 flex items-center gap-3">
  //               <Heart className="w-8 h-8 fill-red-500 text-red-500" />
  //               My Favorites
  //             </h1>
  //             <p className="text-secondary text-lg">
  //               {filteredFavorites.length === 0
  //                 ? "You haven't saved any properties yet"
  //                 : `You have ${filteredFavorites.length} favorite ${
  //                     filteredFavorites.length === 1 ? "property" : "properties"
  //                   }`}
  //             </p>
  //           </div>

  //           {filteredFavorites.length > 0 && (
  //             <div className="flex items-center gap-4">
  //               <button
  //                 onClick={clearAllFavorites}
  //                 className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
  //               >
  //                 <Trash2 className="w-4 h-4" />
  //                 Clear All
  //               </button>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </section>

  //     {/* Favorites Content */}
  //     <section className="max-w-7xl mx-auto px-6 py-12">
  //       {filteredFavorites.length === 0 ? (
  //         // Empty State
  //         <div className="text-center py-20">
  //           <div className="max-w-md mx-auto">
  //             <div className="mb-8">
  //               <Heart className="w-24 h-24 text-secondary/30 mx-auto mb-4" />
  //               <h2 className="text-2xl font-bold text-primary mb-4">
  //                 No Favorites Yet
  //               </h2>
  //               <p className="text-secondary mb-8">
  //                 Start exploring properties and click the heart icon to save
  //                 your favorites here.
  //               </p>
  //             </div>
  //             <div className="flex flex-col sm:flex-row gap-4 justify-center">
  //               <button
  //                 onClick={() => (window.location.href = "/search")}
  //                 className="bg-accent text-primary px-8 py-3 rounded-lg font-medium hover:bg-accent-hover transition-colors"
  //               >
  //                 Browse Properties
  //               </button>
  //               <button
  //                 onClick={() => (window.location.href = "/home")}
  //                 className="border border-custom text-secondary px-8 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
  //               >
  //                 Go to Home
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       ) : (
  //         // Favorites Grid
  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  //           {filteredFavorites.map((property) => (
  //             <FavoriteCard key={property.id} property={property} />
  //           ))}
  //         </div>
  //       )}
  //     </section>

  //     {/* Tips Section */}
  //     {filteredFavorites.length > 0 && (
  //       <section className="py-16 border-t border-custom">
  //         <div className="max-w-4xl mx-auto px-6">
  //           <h2 className="text-2xl font-bold text-primary mb-8 text-center">
  //             Make the Most of Your Favorites
  //           </h2>
  //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  //             <div className="text-center">
  //               <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
  //                 <Heart className="w-8 h-8 " />
  //               </div>
  //               <h3 className="font-semibold text-primary mb-2">Save More</h3>
  //               <p className="text-secondary text-sm">
  //                 Keep adding properties you love to compare and track price
  //                 changes.
  //               </p>
  //             </div>
  //             <div className="text-center">
  //               <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
  //                 <Share2 className="w-8 h-8 " />
  //               </div>
  //               <h3 className="font-semibold text-primary mb-2">Share</h3>
  //               <p className="text-secondary text-sm">
  //                 Share your favorite properties with family and friends for
  //                 their input.
  //               </p>
  //             </div>
  //             <div className="text-center">
  //               <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
  //                 <MapPin className="w-8 h-8 " />
  //               </div>
  //               <h3 className="font-semibold text-primary mb-2">Visit</h3>
  //               <p className="text-secondary text-sm">
  //                 Schedule viewings for your favorite properties to see them in
  //                 person.
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </section>
  //     )}
  //   </div>
  // );
    return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-secondary border-b border-custom">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-4 flex items-center gap-3">
                <Heart className="w-8 h-8 fill-red-500 text-red-500" />
                My Favorites
              </h1>
              <p className="text-secondary text-lg">
                {filteredFavorites.length === 0
                  ? "You haven't saved any properties yet"
                  : `You have ${filteredFavorites.length} favorite ${
                      filteredFavorites.length === 1 ? "property" : "properties"
                    }`}
              </p>
            </div>

            {filteredFavorites.length > 0 && (
              <button
                onClick={clearAllFavorites}
                className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Favorites Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {filteredFavorites.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-24 h-24 text-secondary/30 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-4">
              No Favorites Yet
            </h2>
            <p className="text-secondary mb-8">
              Start saving properties to see them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFavorites.map((property) => (
              <FavoriteCard
                key={property.id}
                property={property}
                shareProperty={shareProperty}
                removeFavorite={removeFavorite}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default FavouritesBuyer;

