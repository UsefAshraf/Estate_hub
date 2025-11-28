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
  images?: string[];
  agent?: string;
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
      images: [],
      agent: "Sarah Johnson",
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
      images: [],
      agent: "Michael Chen",
    },
    // ...rest properties
  ]);

  const filtered =
    filter === "All"
      ? properties
      : properties.filter((p) => p.status === filter);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this property?")) {
      setProperties(properties.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin - Properties</h1>
        <p className="text-gray-600">Manage all listed properties</p>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-4 md:p-6">
        {/* FILTER + ADD BUTTON */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 mb-4">
          <div className="flex gap-2 flex-wrap">
            {["All", "For Sale", "For Rent"].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setFilter(tab as "All" | "For Sale" | "For Rent")
                }
                className={`px-3 md:px-4 py-1 md:py-2 rounded-lg text-sm md:text-base font-medium 
                  ${filter === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 md:px-4 py-1 md:py-2 rounded-lg"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5" /> Add Property
          </button>
        </div>

        {/* PROPERTY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div key={p.id} className="bg-gray-50 rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              {p.images && p.images[0] ? (
                <img src={p.images[0]} alt={p.title} className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">{p.title}</h2>
                <p className="text-gray-500 text-sm">{p.details}</p>
                <p className="mt-1 text-gray-700">{p.price}</p>
                <p className="text-gray-500 text-sm">{p.location}</p>
                <p className="text-gray-500 text-sm">Agent: {p.agent}</p>
                <span
                  className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded 
                    ${p.status === "For Sale" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}
                >
                  {p.status}
                </span>

                {/* ACTIONS */}
                <div className="flex gap-3 mt-3">
                  <button title="Edit" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                  <button
                    title="Delete"
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}




























// import { useState } from "react";
// import { Pencil, Trash2, Plus } from "lucide-react";

// type Property = {
//   id: number;
//   title: string;
//   description: string;
//   type: string;
//   price: string;
//   location: string;
//   status: "For Sale" | "For Rent";
//   details: string; // beds, baths, sqft
// };

// export default function AdminPropertiesPage() {
//   const [filter, setFilter] = useState<"All" | "For Sale" | "For Rent">("All");

//   const [properties, setProperties] = useState<Property[]>([
//     {
//       id: 1,
//       title: "Modern Luxury Villa with Ocean View",
//       description: "Modern Luxury Villa with Ocean View",
//       type: "villa",
//       price: "$2,500,000",
//       location: "Malibu, CA",
//       status: "For Sale",
//       details: "5 bed · 4 bath · 4500 sqft",
//     },
//     {
//       id: 2,
//       title: "Contemporary Downtown Apartment",
//       description: "Contemporary Downtown Apartment",
//       type: "apartment",
//       price: "$3,500/mo",
//       location: "Downtown LA",
//       status: "For Rent",
//       details: "2 bed · 2 bath · 1200 sqft",
//     },
//     {
//       id: 3,
//       title: "Elegant Mediterranean Villa",
//       description: "Elegant Mediterranean Villa",
//       type: "villa",
//       price: "$1,850,000",
//       location: "Beverly Hills, CA",
//       status: "For Sale",
//       details: "4 bed · 3 bath · 3800 sqft",
//     },
//     {
//       id: 4,
//       title: "Spacious Family House",
//       description: "Spacious Family House",
//       type: "house",
//       price: "$750,000",
//       location: "Pasadena, CA",
//       status: "For Sale",
//       details: "4 bed · 2 bath · 2400 sqft",
//     },
//     {
//       id: 5,
//       title: "Modern Luxury Condo",
//       description: "Modern Luxury Condo",
//       type: "condo",
//       price: "$4,200/mo",
//       location: "Santa Monica, CA",
//       status: "For Rent",
//       details: "3 bed · 2 bath · 1600 sqft",
//     },
//     {
//       id: 6,
//       title: "Cozy Suburban Home",
//       description: "Cozy Suburban Home",
//       type: "house",
//       price: "$650,000",
//       location: "Glendale, CA",
//       status: "For Sale",
//       details: "3 bed · 2 bath · 1800 sqft",
//     },
//   ]);

//   const filtered =
//     filter === "All"
//       ? properties
//       : properties.filter((p) => p.status === filter);

//   const handleDelete = (id: number) => {
//     setProperties(properties.filter((p) => p.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* PAGE HEADER */}
//       <div className="max-w-6xl mx-auto mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Admin - Properties</h1>
//         <p className="text-gray-600">Manage all listed properties</p>
//       </div>

//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
//         {/* FILTER BUTTONS */}
//         <div className="flex items-center justify-between">
//           <div className="flex gap-4">
//             {["All", "For Sale", "For Rent"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() =>
//                   setFilter(tab as "All" | "For Sale" | "For Rent")
//                 }
//                 className={`px-4 py-2 rounded-lg text-sm font-medium 
//                             ${
//                               filter === tab
//                                 ? "bg-blue-600 text-white"
//                                 : "bg-gray-100 text-gray-700"
//                             }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <button
//             className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
//           >
//             <Plus className="w-4 h-4" /> Add Property
//           </button>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto mt-6">
//           <table className="w-full min-w-[900px] border-collapse">
//             <thead>
//               <tr className="bg-gray-100 text-left text-sm text-gray-700">
//                 <th className="p-3 font-medium">Property</th>
//                 <th className="p-3 font-medium">Type</th>
//                 <th className="p-3 font-medium">Price</th>
//                 <th className="p-3 font-medium">Location</th>
//                 <th className="p-3 font-medium">Status</th>
//                 <th className="p-3 font-medium">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filtered.map((p) => (
//                 <tr
//                   key={p.id}
//                   className="border-b hover:bg-gray-50 transition text-sm"
//                 >
//                   <td className="p-3">
//                     <div className="font-semibold text-gray-900">
//                       {p.title}
//                     </div>
//                     <div className="text-gray-500">{p.details}</div>
//                   </td>

//                   <td className="p-3 capitalize">{p.type}</td>
//                   <td className="p-3">{p.price}</td>
//                   <td className="p-3">{p.location}</td>
//                   <td className="p-3">{p.agent}</td>

//                   <td className="p-3">
//                     <span
//                       className={`px-2 py-1 rounded text-xs font-medium ${
//                         p.status === "For Sale"
//                           ? "bg-blue-100 text-blue-700"
//                           : "bg-green-100 text-green-700"
//                       }`}
//                     >
//                       {p.status}
//                     </span>
//                   </td>

//                   <td className="p-3 flex gap-3">
//                     <button title="Edit" className="text-blue-600 hover:text-blue-800">
//                       <Pencil className="w-4 h-4" />
//                     </button>

//                     <button
//                       title="Delete"
//                       onClick={() => handleDelete(p.id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
