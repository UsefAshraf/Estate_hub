import React, { useState, useEffect } from "react";
import { Heart, Trash2 } from "lucide-react";
import FavoriteCard from "../general/FavoriteCard";
import { useNavigate } from "react-router-dom";
import { getUserFavorites, removeFavorite } from "../../services/favourites.services";
import type { Favorite } from "../../types/favourites.types";
import Swal from "sweetalert2";

const FavouritesBuyer: React.FC = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorites from backend
  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await getUserFavorites();
      
      if (res.data.success) {
        setFavorites(res.data.data);
      }
    } catch (error: any) {
      console.error("Failed to fetch favorites:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to load favorites",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (propertyId: string) => {
    try {
      await removeFavorite(propertyId);
      
      // Update local state
      setFavorites((prev) => prev.filter((fav) => fav.propertyId._id !== propertyId));
      
      Swal.fire({
        title: "Removed from Favorites",
        text: "Property has been removed from your favorites.",
        icon: "success",
        position: "bottom",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error: any) {
      console.error("Failed to remove favorite:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to remove favorite",
      });
    }
  };

  const shareProperty = (property: any) => {
    const shareData = {
      title: property.title,
      text: `Check out this amazing property: ${property.title} in ${property.address}`,
      url: `${window.location.origin}/propertydetailBuyer/${property._id}`,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((error) => {
        console.error("Error sharing:", error);
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `${property.title} - ${property.address} - $${property.price.toLocaleString()}`
      );
      Swal.fire({
        title: "Copied!",
        text: "Property details copied to clipboard!",
        icon: "success",
        position: "bottom",
        toast: true,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const clearAllFavorites = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove all favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, clear all",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        // Remove all favorites one by one
        await Promise.all(
          favorites.map((fav) => removeFavorite(fav.propertyId._id))
        );
        
        setFavorites([]);
        
        Swal.fire({
          title: "All Cleared!",
          text: "All favorites have been removed.",
          icon: "success",
          position: "bottom",
          toast: true,
          timer: 3000,
          showConfirmButton: false,
        });
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to clear all favorites",
        });
      }
    }
  };

  const onPropertyClick = (id: string) => {
    navigate(`/propertydetailBuyer/${id}`);
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading favorites...</p>
        </div>
      </div>
    );
  }

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
                {favorites.length === 0
                  ? "You haven't saved any properties yet"
                  : `You have ${favorites.length} favorite ${
                      favorites.length === 1 ? "property" : "properties"
                    }`}
              </p>
            </div>

            {favorites.length > 0 && (
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
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-24 h-24 text-secondary/30 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-4">
              No Favorites Yet
            </h2>
            <p className="text-secondary mb-8">
              Start saving properties to see them here.
            </p>
            <button
              onClick={() => navigate("/homeBuyer")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((favorite) => (
              <FavoriteCard
                key={favorite._id}
                property={{
                  id: favorite.propertyId._id,
                  image: favorite.propertyId.images[0],
                  title: favorite.propertyId.title,
                  location: favorite.propertyId.address,
                  price: favorite.propertyId.price,
                  bedrooms: favorite.propertyId.bedrooms,
                  bathrooms: favorite.propertyId.bathrooms,
                  sqft: favorite.propertyId.area,
                  type: favorite.propertyId.type,
                  featured: favorite.propertyId.featured,
                  dateAdded: new Date(favorite.createdAt).toLocaleDateString(),
                }}
                shareProperty={() => shareProperty(favorite.propertyId)}
                removeFavorite={() => handleRemoveFavorite(favorite.propertyId._id)}
                onPropertyClick={() => onPropertyClick(favorite.propertyId._id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default FavouritesBuyer;

// import React, { useState } from "react";
// import { Heart, MapPin, Bed, Bath, Square, Trash2, Share2 } from "lucide-react";
// import FavoriteCard from "../general/FavoriteCard";
// import { useNavigate } from "react-router-dom";

// const FavouritesBuyer: React.FC = () => {
//   const [favorites, setFavorites] = useState<Set<number>>(
//     new Set([1, 3, 5, 7, 10])
//   );

//   // Sample favorite properties data
//   const favoriteProperties = [
//     {
//       id: 1,
//       image: "./src/assets/OIPp.webp",
//       title: "Modern Family Home",
//       location: "Beverly Hills, California",
//       price: 2500000,
//       bedrooms: 4,
//       bathrooms: 3,
//       sqft: 3500,
//       type: "House",
//       featured: true,
//       dateAdded: "2024-01-15",
//     },
//     {
//       id: 3,
//       image: "./src/assets/re.webp",
//       title: "Beachfront Villa",
//       location: "Miami, Florida",
//       price: 4200000,
//       bedrooms: 5,
//       bathrooms: 4,
//       sqft: 4800,
//       type: "Villa",
//       featured: true,
//       dateAdded: "2024-01-10",
//     },
//     {
//       id: 5,
//       image:
//         "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=200&h=200&fit=crop",
//       title: "Mountain View Retreat",
//       location: "Aspen, Colorado",
//       price: 3700000,
//       bedrooms: 6,
//       bathrooms: 5,
//       sqft: 5200,
//       type: "House",
//       featured: true,
//       dateAdded: "2024-01-20",
//     },
//     {
//       id: 7,
//       image:
//         "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=200&h=200&fit=crop",
//       title: "Contemporary Penthouse",
//       location: "Los Angeles, California",
//       price: 5800000,
//       bedrooms: 4,
//       bathrooms: 4,
//       sqft: 4200,
//       type: "Penthouse",
//       featured: true,
//       dateAdded: "2024-01-25",
//     },
//     {
//       id: 10,
//       image:
//         "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=200&h=200&fit=crop",
//       title: "Historic Brownstone",
//       location: "Boston, Massachusetts",
//       price: 2100000,
//       bedrooms: 5,
//       bathrooms: 3,
//       sqft: 3800,
//       type: "House",
//       featured: true,
//       dateAdded: "2024-01-12",
//     },
//   ];

//   const removeFavorite = (id: number) => {
//     setFavorites((prev) => {
//       const newFavorites = new Set(prev);
//       newFavorites.delete(id);
//       return newFavorites;
//     });
//   };

//   const shareProperty = (property: (typeof favoriteProperties)[0]) => {
//     if (navigator.share) {
//       navigator.share({
//         title: property.title,
//         text: `Check out this amazing property: ${property.title} in ${property.location}`,
//         url: window.location.href,
//       });
//     } else {
//       // Fallback for browsers that don't support Web Share API
//       navigator.clipboard.writeText(
//         `${property.title} - ${property.location} - $${(
//           property.price / 1000000
//         ).toFixed(2)}M`
//       );
//       alert("Property details copied to clipboard!");
//     }
//   };

//   const clearAllFavorites = () => {
//     if (window.confirm("Are you sure you want to remove all favorites?")) {
//       setFavorites(new Set());
//     }
//   };


//   // const onPropertyClick = (id:number) => {
//   //   console.log(id)
//   //   navigate("/propertydetailBuyer");
//   // }

//   const navigate = useNavigate();

//   const onPropertyClick = (id: number) => {
//     navigate(`/propertydetailBuyer`);
//   };

 
//   const filteredFavorites = favoriteProperties.filter((property) =>
//     favorites.has(property.id)
//   );

//     return (
//     <div className="min-h-screen">
//       {/* Header */}
//       <section className="bg-secondary border-b border-custom">
//         <div className="max-w-7xl mx-auto px-6 py-12">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//             <div>
//               <h1 className="text-4xl font-bold text-primary mb-4 flex items-center gap-3">
//                 <Heart className="w-8 h-8 fill-red-500 text-red-500" />
//                 My Favorites
//               </h1>
//               <p className="text-secondary text-lg">
//                 {filteredFavorites.length === 0
//                   ? "You haven't saved any properties yet"
//                   : `You have ${filteredFavorites.length} favorite ${
//                       filteredFavorites.length === 1 ? "property" : "properties"
//                     }`}
//               </p>
//             </div>

//             {filteredFavorites.length > 0 && (
//               <button
//                 onClick={clearAllFavorites}
//                 className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 Clear All
//               </button>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Favorites Grid */}
//       <section className="max-w-7xl mx-auto px-6 py-12">
//         {filteredFavorites.length === 0 ? (
//           <div className="text-center py-20">
//             <Heart className="w-24 h-24 text-secondary/30 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-primary mb-4">
//               No Favorites Yet
//             </h2>
//             <p className="text-secondary mb-8">
//               Start saving properties to see them here.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredFavorites.map((property) => (
//               <FavoriteCard
//                 key={property.id}
//                 property={property}
//                 shareProperty={shareProperty}
//                 removeFavorite={removeFavorite}
//                 onPropertyClick={onPropertyClick}
//               />
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default FavouritesBuyer;

