// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// import {
//   Heart,
//   Share2,
//   Maximize2,
//   Bed,
//   Bath,
//   Maximize,
//   Calendar,
//   CheckCircle,
//   Phone,
//   Mail,
//   CalendarDays,
//   X,
//   MapPin,
//   ShoppingCart,
// } from "lucide-react";
// import Swal from "sweetalert2";
// import { motion } from "motion/react";
// import MortgageCalculator from "./mortgagecalculator";
// import PropertyLocationMap from "@/pages/general/PropertyLocationMap";
// import { getPropertyById } from "@/services/property.api";
// import type { Property } from "@/types/property.types";

// // Type definitions

// interface Agent {
//   name: string;
//   title: string;
//   phone: string;
//   email: string;
//   avatar: string;
// }

// const agent:Agent= {
//       name: "Youssef Ashraf",
//       title: "Real Estate Agent",
//       phone: "+201143148742",
//       email: "usefmoez@gmail.com",
//       avatar:
//         "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
// }

// // ---------- Form Interfaces ----------
// interface ScheduleForm {
//   date: string;
//   time: string;
//   name: string;
//   phone: string;
// }

// interface ContactForm {
//   name: string;
//   email: string;
//   phone: string;
//   message: string;
// }

// //import { useNavigate } from "react-router-dom";

// const Propertydetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   //states
//   const [property, setProperty] = useState<Property | null>(null);
//   const [loading, setLoading] = useState(true);

//   const [mainImage, setMainImage] = useState<number>(0);

//   const [isFavorite, setIsFavorite] = useState<boolean>(false);
//   const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
//   //const [zoomedImage, setZoomedImage] = useState<string | null>(null);
//   const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
//   const [showContactModal, setShowContactModal] = useState<boolean>(false);

//   const [scheduleForm, setScheduleForm] = useState<ScheduleForm>({
//     date: "",
//     time: "",
//     name: "",
//     phone: "",
//   });

//   const [contactForm, setContactForm] = useState<ContactForm>({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   // ---------- Fetch Property ----------
//   useEffect(() => {
//     if (id) fetchPropertyData();
//   }, [id]);

//   const fetchPropertyData = async () => {
//     try {
//       setLoading(true);
//       const res = await getPropertyById(id!);

//       if (res.data.success) {
//         setProperty(res.data.data);
//       } else {
//         throw new Error("Failed to load property");
//       }
//     } catch (error: any) {
//       console.error("Error fetching property:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.response?.data?.message || "Failed to load property details",
//         confirmButtonColor: "#dc2626",
//       }).then(() => navigate("/homeBuyer"));
//     } finally {
//       setLoading(false);
//     }
//   };


//   /////handlers
//   const handleScheduleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!property) return;

//     const payload = {
//       ...scheduleForm,
//       propertyId: property._id,
//       agentId: property.agentId,
//     };

//     console.log("Schedule form submitted:", payload);
//     Swal.fire({
//       title: "Visit Scheduled!",
//       text: "The agent will contact you shortly.",
//       icon: "success",
//       position: "bottom",
//       toast: true,
//       timer: 4000,
//       timerProgressBar: true,
//       showConfirmButton: false,
//       customClass: {
//         popup: "custom-toast",
//       },
//     });

//     setShowScheduleModal(false);
//     setScheduleForm({
//       date: "",
//       time: "",
//       name: "",
//       phone: "",
//     });
//   };

//   const handleContactSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!property) return;

//     const payload = {
//       ...contactForm,
//       propertyId: property._id,
//       agentId: property.agentId,
//     };

//     console.log("Contact form submitted:", payload);

//     Swal.fire({
//       title: "Message Sent!",
//       text: "The agent will contact you shortly.",
//       icon: "success",
//       position: "bottom",
//       toast: true,
//       timer: 4000,
//       timerProgressBar: true,
//       showConfirmButton: false,
//     });

//     setShowContactModal(false);
//     setContactForm({ name: "", email: "", phone: "", message: "" });
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setScheduleForm({
//       ...scheduleForm,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const handleContactInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     // Use HTMLInputElement | HTMLTextAreaElement for compatibility with both
//     setContactForm({
//       ...contactForm,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const handleBuyProperty = () => {
//     navigate("/paymentBuyer");
//     Swal.fire({
//       title: "Redirecting to Payment!",
//       text: "Please complete your purchase.",
//       icon: "info",
//       position: "bottom",
//       toast: true,
//       timer: 3000,
//       timerProgressBar: true,
//       showConfirmButton: false,
//     });
//   };
//   return (


//     <div className="min-h-screen bg-gray-50 bg-primary pb-4">
//       {/* Header */}
//       {property && (

//         <div className="max-w-7xl mx-auto px-4 pb-12 mt-2">

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Main Content */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Image Gallery */}
//               <div className="bg-primary rounded-xl overflow-hidden shadow-sm bg-secondary">
//                 <div className="relative">
//                   <img
//                     src={property.images[mainImage]}
//                     alt={property.title}
//                     className="w-full h-96 object-cover"
//                   />

//                   <div className="absolute top-4 right-4 flex space-x-2">
//                     <motion.button
//                       whileHover={{ scale: 1.4 }}
//                       whileTap={{ scale: 0.95 }}
//                       transition={{ type: "spring", stiffness: 300 }}
//                       onClick={() => {
//                         setIsFavorite(!isFavorite);

//                         Swal.fire({
//                           title: isFavorite
//                             ? "Removed from Favorites"
//                             : "Added to Favorites!",
//                           text: isFavorite
//                             ? "This property is no longer in your favorites list."
//                             : "This property has been added to your favorites.",
//                           icon: "success",
//                           position: "bottom",
//                           toast: true,
//                           timer: 3000,
//                           timerProgressBar: true,
//                           showConfirmButton: false,
//                           customClass: {
//                             popup: "custom-toast",
//                           },
//                         });
//                       }}
//                       className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50"
//                     >
//                       <Heart
//                         className={`w-5 h-5 ${isFavorite
//                           ? "fill-red-500 text-red-500"
//                           : "text-gray-600"
//                           }`}
//                       />
//                     </motion.button>

//                     <motion.button
//                       className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50"
//                       whileHover={{ scale: 1.4 }} // grows on hover
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <Share2 className="w-5 h-5 text-gray-600" />
//                     </motion.button>

//                     <motion.button
//                       whileHover={{ scale: 1.4 }} // grows on hover
//                       whileTap={{ scale: 0.95 }} // shrinks when clicked
//                       onHoverStart={() => console.log("hover started!")}
//                       onClick={() => setZoomedImageIndex(mainImage)}
//                       className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50"
//                     >
//                       <Maximize2 className="w-5 h-5 text-gray-600" />
//                     </motion.button>
//                   </div>
//                 </div>
//                 <div className="flex space-x-2 p-4">
//                   {property.images.map((img, idx) => (
//                     <img
//                       key={idx}
//                       src={img}
//                       alt={`Thumbnail ${idx + 1}`}
//                       onClick={() => setMainImage(idx)}
//                       className={`w-24 h-20 object-cover rounded-lg cursor-pointer border-2 ${mainImage === idx
//                         ? "border-cyan-500"
//                         : "border-transparent"
//                         }`}
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* Property Info */}
//               <div className="bg-primary rounded-xl p-6 shadow-sm bg-secondary">
//                 <div className="flex items-start justify-between mb-4">
//                   <div>
//                     <div className="flex items-center space-x-2 mb-2">
//                       <span className="bg-amber-900 text-white text-s px-3 py-1 rounded-full">
//                         {property.status}
//                       </span>
//                       <span className="bg-gray-200 text-gray-700 text-s px-3 py-1 rounded-full">
//                         {property.type}
//                       </span>

//                       {property.featured && (
//                         <span className="bg-orange-500 text-white px-3 py-1 rounded-full">
//                           Featured
//                         </span>
//                       )}

//                     </div>
//                     <h1 className="text-3xl font-bold text-secondary mb-2">
//                       {property.title}
//                     </h1>
//                     <p className="text-gray-600 flex items-center text-secondary">
//                       <span className="mr-2">📍</span>
//                       {property.address}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-3xl font-bold text-secondary">
//                       ${property.price.toLocaleString()}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {property.priceNote}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Property Stats */}
//                 <div className="grid grid-cols-4 gap-4 py-6 border-t border-b border-gray-200">
//                   <div className="flex items-center space-x-3">
//                     <Bed className="w-6 h-6 text-cyan-500" />
//                     <div>
//                       <div className="text-sm text-gray-500 text-secondary">Bedrooms</div>
//                       <div className="font-semibold text-secondary">
//                         {property.bedrooms}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <Bath className="w-6 h-6 text-cyan-500" />
//                     <div>
//                       <div className="text-sm text-gray-500 text-secondary">Bathrooms</div>
//                       <div className="font-semibold text-secondary">
//                         {property.bathrooms}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <Maximize className="w-6 h-6 text-cyan-500" />
//                     <div>
//                       <div className="text-sm text-gray-500 text-secondary">Area</div>
//                       <div className="font-semibold text-secondary">
//                         {property.area}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <Calendar className="w-6 h-6 text-cyan-500" />
//                     <div>
//                       <div className="text-sm text-gray-500 text-secondary">Built</div>
//                       <div className="font-semibold text-secondary">
//                         {property.builtYear}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* About Property */}
//                 <div className="mt-6">
//                   <h2 className="text-xl font-bold text-secondary mb-3">
//                     About This Property
//                   </h2>
//                   <p className="text-gray-600 leading-relaxed text-secondary">
//                     {property.description}
//                   </p>
//                 </div>

//                 {/* Features & Amenities */}
//                 <div className="mt-6">
//                   <h2 className="text-xl font-bold text-secondary mb-4">
//                     Features & Amenities
//                   </h2>
//                   <div className="grid grid-cols-2 gap-4">
//                     {property.features.map((feature, idx) => (
//                       <div key={idx} className="flex items-center space-x-2">
//                         <CheckCircle className="w-5 h-5 text-green-500" />
//                         <span>{feature.name}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Sidebar */}
//             <div className="space-y-6">
//               {/* Contact Agent */}
//               <div className="bg-primary rounded-xl p-6 shadow-sm sticky top-24 bg-secondary">
//                 <h3 className="text-lg font-bold text-secondary mb-4">
//                   Contact Agent
//                 </h3>

//                 <div className="flex items-center space-x-4 mb-6">
//                   <img
//                     src={agent.avatar}
//                     alt={agent.name}
//                     className="w-16 h-16 rounded-full object-cover"
//                   />
//                   <div>
//                     <div className="font-bold text-gray-900 text-secondary">
//                       {agent.name}
//                     </div>
//                     <div className="text-sm text-gray-500 text-secondary">
//                       {agent.title}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-3 mb-6">
//                   <div className="flex items-center space-x-3 text-gray-600 text-secondary">
//                     <Phone className="w-5 h-5" />
//                     <span>{agent.phone}</span>
//                   </div>
//                   <div className="flex items-center space-x-3 text-gray-600 text-secondary">
//                     <Mail className="w-5 h-5" />
//                     <span className="text-sm">{agent.email}</span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => setShowContactModal(true)}
//                   className="w-full border border-gray-300 text-black py-3 rounded-lg font-semibold btn-primary flex items-center justify-center space-x-2 hover:bg-linear-to-r from-white to-orange-300 "
//                 >
//                   <Mail className="w-5 h-5" />
//                   <span>Send Message</span>
//                 </button>

//                 <div className="mt-6 pt-6 border-t border-gray-200">
//                   <h4 className="font-semibold text-black mb-3 dark:text-primary">
//                     Schedule a Visit
//                   </h4>
//                   <p className="text-sm text-gray-600 mb-4 text-secondary ">
//                     Book a viewing to see this property in person
//                   </p>
//                   <button
//                     onClick={() => setShowScheduleModal(true)}
//                     className="w-full border border-gray-300 text-black py-3 rounded-lg font-semibold btn-primary flex items-center justify-center space-x-2 hover:bg-linear-to-r from-white to-orange-300"
//                   >
//                     <CalendarDays className="w-5 h-5" />
//                     <span>Schedule Visit</span>
//                   </button>
//                   <button
//                     onClick={() => handleBuyProperty()}
//                     className="w-full border mt-2 border-gray-300 text-black py-3 rounded-lg font-semibold btn-primary flex items-center justify-center space-x-2 hover:bg-linear-to-r from-white to-orange-300"
//                   >
//                     <ShoppingCart className="w-5 h-5" />
//                     <span>Buy Property</span>
//                   </button>

//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* ============ ADD THIS MAP SECTION HERE ============ */}

//       {property && (
//         <div className="max-w-7xl mx-auto px-4 pb-12">

//           <div className="bg-primary rounded-xl p-6 shadow-sm bg-secondary">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-2xl font-bold text-secondary mb-2">
//                   Property Location
//                 </h2>
//                 <p className="text-gray-600 flex items-center text-secondary">
//                   <MapPin className="w-4 h-4 mr-2 dark:text-white" />
//                   {property.address}
//                 </p>
//               </div>
//             </div>

//             <div className="h-[500px] rounded-xl overflow-hidden border border-gray-200 shadow-inner">
//               <PropertyLocationMap
//                 lat={34.0522}
//                 lon={-118.2437}
//                 propertyTitle={property.title}
//                 propertyAddress={property.address}
//               />
//             </div>

//             <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
//                 <h4 className="font-semibold text-secondary mb-2">
//                   🏫 Schools Nearby
//                 </h4>
//                 <p className="text-sm text-gray-600">3 schools within 2 miles</p>
//               </div>
//               <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
//                 <h4 className="font-semibold text-secondary mb-2">🏪 Shopping</h4>
//                 <p className="text-sm text-gray-600">Mall within 1.5 miles</p>
//               </div>
//               <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
//                 <h4 className="font-semibold text-secondary mb-2">🚇 Transit</h4>
//                 <p className="text-sm text-gray-600">Metro station 0.8 miles</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Mortgage Calculator - Add here for main content area */}
//       <MortgageCalculator propertyPrice={1250000} />



//       {zoomedImageIndex !== null && (

//         <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 p-4">
//           {/* Close button */}
//           <button
//             onClick={() => setZoomedImageIndex(null)}
//             className="absolute top-4 right-4 text-white hover:text-gray-300"
//           >
//             <X className="w-6 h-6" />
//           </button>

//           {/* Zoomed image */}
//           {property && (
//             <div className="max-w-4xl w-full flex justify-center mb-4">
//               <motion.img
//                 key={zoomedImageIndex} // ensures animation triggers on change
//                 src={property.images[zoomedImageIndex]}
//                 alt="Zoomed Property"
//                 className="w-full h-auto object-contain rounded-lg shadow-lg"
//                 initial={{ scale: 0.8, opacity: 0 }} // start small + invisible
//                 animate={{ scale: 1, opacity: 1 }} // grow to full size + visible
//                 exit={{ scale: 0.8, opacity: 0 }} // optional: when closing modal
//                 transition={{ type: "spring", stiffness: 150, damping: 20 }}
//               />
//             </div>
//           )}
//           {/* Thumbnails */}

//           {property && (
//             <div className="flex space-x-2 overflow-x-auto px-2">

//               {
//                 property.images.map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={img}
//                     alt={`Thumbnail ${idx + 1}`}
//                     onClick={() => setZoomedImageIndex(idx)}
//                     className={`w-20 h-16 object-cover rounded-lg cursor-pointer border-2 ${zoomedImageIndex === idx
//                       ? "border-cyan-500"
//                       : "border-transparent"
//                       }`}
//                   />
//                 ))
//               }
//             </div>
//           )}
//           {/* Optional arrows */}


//           <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
//             {property && (
//               <button
//                 onClick={() =>
//                   setZoomedImageIndex((prev) =>
//                     prev !== null ? (prev - 1 + property.images.length) % property.images.length : 0
//                   )
//                 }
//                 className="text-white p-2 bg-white rounded-full hover:bg-black/70"
//               >
//                 ◀
//               </button>
//             )}
//           </div>
//           {property && (
//             <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
//               <button
//                 onClick={() =>
//                   setZoomedImageIndex((prev) =>
//                     prev !== null ? (prev + 1) % property.images.length : 0
//                   )
//                 }
//                 className="text-white p-2 bg-white rounded-full hover:bg-black/70"
//               >
//                 ▶
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Contact Agent Modal (UPDATED) */}
//       {showContactModal && (
//         <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
//           <div className="bg-primary rounded-xl shadow-2xl max-w-md w-full p-6 relative bg-secondary">
//             <button
//               onClick={() => setShowContactModal(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//             >
//               <X className="w-6 h-6" />
//             </button>
//             <h2 className="text-xl font-bold text-secondary mb-6">
//               Contact {agent.name}
//             </h2>

//             <form onSubmit={handleContactSubmit} className="space-y-4">
//               {/* 1. Name Input */}
//               <div>
//                 <label className="block text-sm font-semibold text-secondary mb-2">
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={contactForm.name}
//                   onChange={handleContactInputChange}
//                   placeholder="John Doe"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 text-black"
//                   required
//                 />
//               </div>

//               {/* 2. Email Input */}
//               <div>
//                 <label className="block text-sm font-semibold text-secondary mb-2">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={contactForm.email}
//                   onChange={handleContactInputChange}
//                   placeholder="john@example.com"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 text-black"
//                   required
//                 />
//               </div>

//               {/* 3. Phone Input */}
//               <div>
//                 <label className="block text-sm font-semibold text-secondary mb-2">
//                   Phone
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={contactForm.phone}
//                   onChange={handleContactInputChange}
//                   placeholder="+1 (555) 000-0000"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 text-black"
//                   required
//                 />
//               </div>

//               {/* 4. Message Textarea */}
//               <div>
//                 <label className="block text-sm font-semibold text-secondary mb-2">
//                   Message
//                 </label>
//                 <textarea
//                   name="message"
//                   value={contactForm.message}
//                   onChange={
//                     handleContactInputChange as (
//                       e: React.ChangeEvent<HTMLTextAreaElement>
//                     ) => void
//                   }
//                   placeholder="I'm interested in this property..."
//                   rows={4}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 resize-none "
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full btn-primary text-white py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-green-600 transition-all"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Schedule Visit Modal */}
//       {showScheduleModal && (
//         <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
//           <div className="bg-primary rounded-xl shadow-2xl max-w-md w-full p-6 relative bg-secondary">
//             <button
//               onClick={() => setShowScheduleModal(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//             >
//               <X className="w-6 h-6" />
//             </button>

//             <h2 className="text-2xl font-bold text-secondary mb-6">
//               Schedule a Property Visit
//             </h2>

//             <form onSubmit={handleScheduleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2 text-secondary">
//                   Preferred Date
//                 </label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={scheduleForm.date}
//                   onChange={handleInputChange}
//                   placeholder="dd/yyyy"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 text-black"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2 text-secondary">
//                   Preferred Time
//                 </label>
//                 <input
//                   type="time"
//                   name="time"
//                   value={scheduleForm.time}
//                   onChange={handleInputChange}
//                   placeholder="--:-- --"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 text-black"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2 text-secondary">
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={scheduleForm.name}
//                   onChange={handleInputChange}
//                   placeholder="John Doe"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 text-black"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2 text-secondary">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={scheduleForm.phone}
//                   onChange={handleInputChange}
//                   placeholder="+1 (555) 000-0000"
//                   className="w-full px-4 py-3 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 text-black"
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full btn-primary text-white py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-green-600 transition-all mt-6"
//               >
//                 Confirm Visit
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Propertydetail;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  Share2,
  Maximize2,
  Bed,
  Bath,
  Maximize,
  Calendar,
  CheckCircle,
  Phone,
  Mail,
  CalendarDays,
  X,
  MapPin,
  ShoppingCart,
} from "lucide-react";
import Swal from "sweetalert2";
import { motion } from "motion/react";
import MortgageCalculator from "./mortgagecalculator";
import PropertyLocationMap from "@/pages/general/PropertyLocationMap";
import { getPropertyById } from "@/services/property.api";
import type { Property } from "@/types/property.types";


interface Agent {
  name: string;
  title: string;
  phone: string;
  email: string;
  avatar: string;
}

const agent: Agent = {
  name: "Youssef Ashraf",
  title: "Real Estate Agent",
  phone: "+201143148742",
  email: "usefmoez@gmail.com",
  avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
};

interface ScheduleForm {
  date: string;
  time: string;
  name: string;
  phone: string;
}

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}


const Propertydetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
  const [showContactModal, setShowContactModal] = useState<boolean>(false);

  const [scheduleForm, setScheduleForm] = useState<ScheduleForm>({
    date: "",
    time: "",
    name: "",
    phone: "",
  });

  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (id) {
      fetchPropertyData();
    }
  }, [id]);
 

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      console.log("Fetching property with ID:", id);
      
      const res = await getPropertyById(id!);
      console.log("API Response:", res.data);

      if (res.data.success && res.data.data) {
        setProperty(res.data.data);
        console.log("Property set:", res.data.data);
      } else {
        throw new Error("Failed to load property");
      }
    } catch (error: any) {
      console.error("Error fetching property:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to load property details",
        confirmButtonColor: "#dc2626",
      }).then(() => navigate("/homeBuyer"));
    } finally {
      setLoading(false);
    }
  };

 

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;

    const payload = {
      ...scheduleForm,
      propertyId: property._id,
      agentId: property.agentId,
    };

    console.log("Schedule form submitted:", payload);
    Swal.fire({
      title: "Visit Scheduled!",
      text: "The agent will contact you shortly.",
      icon: "success",
      position: "bottom",
      toast: true,
      timer: 4000,
      timerProgressBar: true,
      showConfirmButton: false,
    });

    setShowScheduleModal(false);
    setScheduleForm({ date: "", time: "", name: "", phone: "" });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;

    const payload = {
      ...contactForm,
      propertyId: property._id,
      agentId: property.agentId,
    };

    console.log("Contact form submitted:", payload);
    Swal.fire({
      title: "Message Sent!",
      text: "The agent will contact you shortly.",
      icon: "success",
      position: "bottom",
      toast: true,
      timer: 4000,
      timerProgressBar: true,
      showConfirmButton: false,
    });

    setShowContactModal(false);
    setContactForm({ name: "", email: "", phone: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScheduleForm({
      ...scheduleForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleBuyProperty = () => {
    navigate("/paymentBuyer");
    Swal.fire({
      title: "Redirecting to Payment!",
      text: "Please complete your purchase.",
      icon: "info",
      position: "bottom",
      toast: true,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading property details...</p>
        </div>
      </div>
    );
  }

  // No Property Found
  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Property Not Found
          </h2>
          <button
            onClick={() => navigate("/homeBuyer")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 bg-primary pb-4">
     

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-primary rounded-xl overflow-hidden shadow-sm bg-secondary">
              <div className="relative">
                <img
                  src={property.images[mainImage]}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsFavorite(!isFavorite);
                      Swal.fire({
                        title: isFavorite ? "Removed from Favorites" : "Added to Favorites!",
                        text: isFavorite
                          ? "This property is no longer in your favorites list."
                          : "This property has been added to your favorites.",
                        icon: "success",
                        position: "bottom",
                        toast: true,
                        timer: 3000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                      });
                    }}
                    className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </motion.button>
                  <motion.button
                    className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50"
                    whileHover={{ scale: 1.4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setZoomedImageIndex(mainImage)}
                    className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50"
                  >
                    <Maximize2 className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </div>
              </div>
              <div className="flex space-x-2 p-4 overflow-x-auto">
                {property.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => setMainImage(idx)}
                    className={`w-24 h-20 object-cover rounded-lg cursor-pointer border-2 flex-shrink-0 ${
                      mainImage === idx ? "border-cyan-500" : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-primary rounded-xl p-6 shadow-sm bg-secondary">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-amber-900 text-white text-xs px-3 py-1 rounded-full capitalize">
                      {property.status === "sale" ? "For Sale" : "For Rent"}
                    </span>
                    <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full capitalize">
                      {property.type}
                    </span>
                    {property.featured && (
                      <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-secondary mb-2">
                    {property.title}
                  </h1>
                  <p className="text-gray-600 flex items-center text-secondary">
                    <MapPin className="w-4 h-4 mr-2" />
                    {property.address}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-secondary">
                    ${property.price.toLocaleString()}
                  </div>
                  {property.priceNote && (
                    <div className="text-sm text-gray-500">{property.priceNote}</div>
                  )}
                  {property.status === "rent" && (
                    <div className="text-sm text-gray-500">/month</div>
                  )}
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-4 gap-4 py-6 border-t border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <Bed className="w-6 h-6 text-cyan-500" />
                  <div>
                    <div className="text-sm text-gray-500 text-secondary">Bedrooms</div>
                    <div className="font-semibold text-secondary">{property.bedrooms}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Bath className="w-6 h-6 text-cyan-500" />
                  <div>
                    <div className="text-sm text-gray-500 text-secondary">Bathrooms</div>
                    <div className="font-semibold text-secondary">{property.bathrooms}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Maximize className="w-6 h-6 text-cyan-500" />
                  <div>
                    <div className="text-sm text-gray-500 text-secondary">Area</div>
                    <div className="font-semibold text-secondary">{property.area} sqft</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-cyan-500" />
                  <div>
                    <div className="text-sm text-gray-500 text-secondary">Built</div>
                    <div className="font-semibold text-secondary">{property.builtYear}</div>
                  </div>
                </div>
              </div>

              {/* About Property */}
              <div className="mt-6">
                <h2 className="text-xl font-bold text-secondary mb-3">
                  About This Property
                </h2>
                <p className="text-gray-600 leading-relaxed text-secondary">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xl font-bold text-secondary mb-4">
                    Features & Amenities
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {property.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-secondary">{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-primary rounded-xl p-6 shadow-sm sticky top-24 bg-secondary">
              <h3 className="text-lg font-bold text-secondary mb-4">Contact Agent</h3>
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-gray-900 text-secondary">{agent.name}</div>
                  <div className="text-sm text-gray-500 text-secondary">{agent.title}</div>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-gray-600 text-secondary">
                  <Phone className="w-5 h-5" />
                  <span>{agent.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 text-secondary">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">{agent.email}</span>
                </div>
              </div>
              <button
                onClick={() => setShowContactModal(true)}
                className="w-full border border-gray-300 text-black py-3 rounded-lg font-semibold btn-primary flex items-center justify-center space-x-2 hover:bg-gray-50"
              >
                <Mail className="w-5 h-5" />
                <span>Send Message</span>
              </button>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-black mb-3 dark:text-primary">
                  Schedule a Visit
                </h4>
                <p className="text-sm text-gray-600 mb-4 text-secondary">
                  Book a viewing to see this property in person
                </p>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="w-full border border-gray-300 text-black py-3 rounded-lg font-semibold btn-primary flex items-center justify-center space-x-2 hover:bg-gray-50 mb-2"
                >
                  <CalendarDays className="w-5 h-5" />
                  <span>Schedule Visit</span>
                </button>
                {property.status === "sale" && (
                  <button
                    onClick={handleBuyProperty}
                    className="w-full border border-gray-300 text-black py-3 rounded-lg font-semibold btn-primary flex items-center justify-center space-x-2 hover:bg-gray-50"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Buy Property</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Location Map */}
      {property.location && (
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="bg-primary rounded-xl p-6 shadow-sm bg-secondary">
            <h2 className="text-2xl font-bold text-secondary mb-2">Property Location</h2>
            <p className="text-gray-600 flex items-center text-secondary mb-6">
              <MapPin className="w-4 h-4 mr-2" />
              {property.address}
            </p>
            <div className="h-[500px] rounded-xl overflow-hidden border border-gray-200 shadow-inner">
              <PropertyLocationMap
                lat={property.location.coordinates[1]}
                lon={property.location.coordinates[0]}
                propertyTitle={property.title}
                propertyAddress={property.address}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mortgage Calculator */}
      {property.status === "sale" && (
        <MortgageCalculator propertyPrice={property.price} />
      )}

      {/* Zoomed Image Modal */}
      {zoomedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 p-4">
          <button
            onClick={() => setZoomedImageIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl w-full flex justify-center mb-4">
            <motion.img
              key={zoomedImageIndex}
              src={property.images[zoomedImageIndex]}
              alt="Zoomed Property"
              className="w-full h-auto object-contain rounded-lg shadow-lg max-h-[80vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto px-2">
            {property.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                onClick={() => setZoomedImageIndex(idx)}
                className={`w-20 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                  zoomedImageIndex === idx ? "border-cyan-500" : "border-transparent"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() =>
              setZoomedImageIndex((prev) =>
                prev !== null ? (prev - 1 + property.images.length) % property.images.length : 0
              )
            }
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-2 bg-white/20 rounded-full hover:bg-white/40"
          >
            ◀
          </button>
          <button
            onClick={() =>
              setZoomedImageIndex((prev) =>
                prev !== null ? (prev + 1) % property.images.length : 0
              )
            }
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-2 bg-white/20 rounded-full hover:bg-white/40"
          >
            ▶
          </button>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
          <div className="bg-primary rounded-xl shadow-2xl max-w-md w-full p-6 relative bg-secondary">
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-secondary mb-6">Contact {agent.name}</h2>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactInputChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={contactForm.phone}
                  onChange={handleContactInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">Message</label>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactInputChange}
                  placeholder="I'm interested in this property..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 resize-none text-black"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full btn-primary text-white py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-green-600 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Visit Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
          <div className="bg-primary rounded-xl shadow-2xl max-w-md w-full p-6 relative bg-secondary">
            <button
              onClick={() => setShowScheduleModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-secondary mb-6">Schedule a Property Visit</h2>
            <form onSubmit={handleScheduleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-secondary">Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={scheduleForm.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-secondary">Preferred Time</label>
                <input
                  type="time"
                  name="time"
                  value={scheduleForm.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-secondary">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={scheduleForm.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-secondary">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={scheduleForm.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 text-black"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full btn-primary text-white py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-green-600 transition-all mt-6"
              >
                Confirm Visit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Propertydetail;