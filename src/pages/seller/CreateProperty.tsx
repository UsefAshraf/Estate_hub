import { useState } from "react";
import {
  Upload,
  X,
  Bed,
  Bath,
  Maximize,
  Calendar,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Plus,
  Trash2,
  User,
} from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { createProperty } from "@/services/property.api";
import type { CreatePropertyRequest } from "@/types/property.types";

interface PropertyForm {
  status: string;
  type: string;
  featured: boolean;
  title: string;
  address: string;
  price: string;
  priceNote: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  built: string;
  description: string;
  features: string[];
  agentId: string; // comes from db
}


const CreateProperty = () => {
  const [propertyForm, setPropertyForm] = useState<PropertyForm>({
    status: "sale",
    type: "villa",
    featured: false,
    title: "",
    address: "",
    price: "",
    priceNote: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    built: "",
    description: "",
    features: [],
    agentId: "", // fill from auth/user
  });
  const [images, setImages] = useState<File[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const navigate = useNavigate();

  // const [images, setImages] = useState<string[]>([]);
  // const [newFeature, setNewFeature] = useState("");
  // const [showSuccessModal, setShowSuccessModal] = useState(false);

  const availableFeatures = [
    "Swimming Pool",
    "Garden",
    "Garage",
    "Smart Home",
    "Security System",
    "Fireplace",
    "Gym",
    "Balcony",
    "Parking",
    "Air Conditioning",
    "Heating",
    "Elevator",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setPropertyForm({
      ...propertyForm,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages((prev) => [...prev, ...Array.from(files)]);
    }
  };
  const getPreviewUrl = (file: File) => URL.createObjectURL(file);

   const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleFeature = (feature: string) => {
    setPropertyForm((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const addCustomFeature = () => {
    if (newFeature.trim() && !propertyForm.features.includes(newFeature)) {
      setPropertyForm((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

 const handleSubmit = async () => {
  try {
    // Validate required fields
    if (!propertyForm.title || !propertyForm.address || !propertyForm.price) {
      Swal.fire("Error", "Please fill in all required fields", "error");
      return;
    }

    if (!propertyForm.bedrooms || !propertyForm.bathrooms || !propertyForm.area || !propertyForm.built) {
      Swal.fire("Error", "Please fill in all property details", "error");
      return;
    }

    if (images.length === 0) {
      Swal.fire("Error", "Please upload at least one image", "error");
      return;
    }

    // Get user data from localStorage
    const userDataStr = localStorage.getItem("user");
    
    if (!userDataStr) {
      Swal.fire("Error", "You must be logged in to create a property", "error");
      navigate("/login");
      return;
    }

    let userData;
    try {
      userData = JSON.parse(userDataStr);
    } catch (e) {
      Swal.fire("Error", "Invalid user data. Please log in again.", "error");
      navigate("/login");
      return;
    }

    const userId = userData.id;

    if (!userId) {
      Swal.fire("Error", "User ID not found. Please log in again.", "error");
      navigate("/login");
      return;
    }

    console.log("User ID:", userId);
    console.log("User role:", userData.role);

    // Build CreatePropertyRequest object
    const data: CreatePropertyRequest = {
      title: propertyForm.title,
      description: propertyForm.description,
      type: propertyForm.type as any,
      status: propertyForm.status as any,
      featured: propertyForm.featured,
      price: Number(propertyForm.price),
      priceNote: propertyForm.priceNote || undefined,
      address: propertyForm.address,
      bedrooms: Number(propertyForm.bedrooms),
      bathrooms: Number(propertyForm.bathrooms),
      area: Number(propertyForm.area),
      builtYear: Number(propertyForm.built),
      images: images,
      features: propertyForm.features.map((f) => ({ name: f })),
      agentId: userId, // Use the user ID from localStorage
    };

    console.log("Creating property with data:", {
      ...data,
      images: `${images.length} images`,
    });

    const res = await createProperty(data);

    console.log("Create property response:", res.data);

    if (res.data.success) {
      setShowSuccessModal(true);
      // // Navigate after showing success
      // setTimeout(() => {
      //   navigate("/sellerProperties");
      // }, 2000);
    } else {
      Swal.fire("Error", res.data.message || "Failed to create property", "error");
    }
  } catch (error: any) {
    console.error("Create property error:", error);
    console.error("Error response:", error.response?.data);
    
    let errorMessage = "Failed to create property";
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    Swal.fire("Error", errorMessage, "error");
  }
};
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Property
          </h1>
          <p className="text-gray-500 text-lg">Fill out the form below to list a new property.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="space-y-10">
            {/* Property Images */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Property Images
              </h2>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Upload className="w-12 h-12 text-gray-400" />
                  {/* CHANGED: Upload Button to Beige with Dark Text */}
                  <label className="cursor-pointer bg-[#E6D5B8] text-[#4A3B2A] px-6 py-3 rounded-lg hover:bg-[#C19A6B] hover:text-white transition-colors shadow-sm">
                    <span className="font-semibold">Upload Images</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-500">
                    Upload up to 10 images (JPG, PNG)
                  </p>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={getPreviewUrl(img)} // convert File to URL
                          alt={`Property ${idx + 1}`}
                          className="w-full h-32 object-cover rounded-lg shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={propertyForm.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Modern Luxury Villa with Pool"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C19A6B] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={propertyForm.price}
                    onChange={handleInputChange}
                    placeholder="e.g., $1,250,000"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C19A6B] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={propertyForm.status}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C19A6B] focus:border-transparent transition-all"
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Property Type *
                  </label>
                  <select
                    name="type"
                    value={propertyForm.type}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C19A6B] focus:border-transparent transition-all"
                  >
                    <option value="villa">Villa</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={propertyForm.address}
                    onChange={handleInputChange}
                    placeholder="e.g., 123 Palm Avenue, Los Angeles"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C19A6B] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price Note
                  </label>
                  <input
                    type="text"
                    name="priceNote"
                    value={propertyForm.priceNote}
                    onChange={handleInputChange}
                    placeholder="e.g., ~$5,000/mo est."
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C19A6B] focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex items-center space-x-3 self-end">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={propertyForm.featured}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[#C19A6B] focus:ring-[#C19A6B] rounded border-gray-300"
                  />
                  <label htmlFor="featured" className="text-sm font-semibold text-gray-700">
                    Mark as Featured Property
                  </label>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Property Details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Bed className="w-4 h-4 mr-2 text-gray-500" />
                    Bedrooms *
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={propertyForm.bedrooms}
                    onChange={handleInputChange}
                    placeholder="e.g., 5"
                    min="0"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C19A6B] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Bath className="w-4 h-4 mr-2 text-gray-500" />
                    Bathrooms *
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={propertyForm.bathrooms}
                    onChange={handleInputChange}
                    placeholder="e.g., 4"
                    min="0"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C19A6B] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Maximize className="w-4 h-4 mr-2 text-gray-500" />
                    Area (sqft) *
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={propertyForm.area}
                    onChange={handleInputChange}
                    placeholder="e.g., 3500"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C19A6B] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    Year Built *
                  </label>
                  <input
                    type="number"
                    name="built"
                    value={propertyForm.built}
                    onChange={handleInputChange}
                    placeholder="e.g., 2022"
                    min="1800"
                    max={new Date().getFullYear()}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C19A6B] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Property Description *
              </label>
              <textarea
                name="description"
                value={propertyForm.description}
                onChange={handleInputChange}
                placeholder="Provide a detailed description of the property..."
                rows={6}
                className="block w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C19A6B] focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Features & Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {availableFeatures.map((feature) => (
                  <label
                    key={feature}
                    className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                      propertyForm.features.includes(feature)
                        ? "border-[#C19A6B] bg-[#FDFBF7] ring-2 ring-[#C19A6B]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={propertyForm.features.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                      className="w-5 h-5 text-[#C19A6B] focus:ring-[#C19A6B] rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-800">
                      {feature}
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a custom feature (e.g., Ocean View)"
                  className="flex-1 block w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C19A6B] focus:border-transparent transition-all"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomFeature())}
                />
                {/* CHANGED: Plus Button to Beige with Dark Text */}
                <button
                  type="button"
                  onClick={addCustomFeature}
                  className="bg-[#E6D5B8] text-[#4A3B2A] px-5 py-3 rounded-lg hover:bg-[#C19A6B] hover:text-white transition-colors flex items-center justify-center shadow-sm"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {propertyForm.features.filter(f => !availableFeatures.includes(f)).length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {propertyForm.features
                    .filter(f => !availableFeatures.includes(f))
                    .map((feature) => (
                      <span
                        key={feature}
                        className="flex items-center space-x-2 bg-[#FDFBF7] text-[#4A3B2A] px-3 py-1 rounded-full border border-[#E8DCC6]"
                      >
                        <span className="text-sm font-medium">{feature}</span>
                        <button
                          type="button"
                          onClick={() => toggleFeature(feature)}
                          className="text-[#C19A6B] hover:text-[#a68256]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Cancel
              </button>
              {/* CHANGED: Create Property Button to Beige with Dark Text */}
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3 bg-[#E6D5B8] text-[#4A3B2A] rounded-lg font-bold hover:bg-[#C19A6B] hover:text-white transition-all shadow-md transform hover:-translate-y-0.5"
              >
                Create Property
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center transform transition-all scale-100 opacity-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Property Created!
            </h2>
            <p className="text-gray-600 mb-6">
              Your property listing has been successfully created and is now pending review.
            </p>
            {/* CHANGED: Modal Done Button to Beige with Dark Text */}
            <button
              onClick={
                () => setShowSuccessModal(false)}
              
              className="w-full bg-[#E6D5B8] text-[#4A3B2A] py-3 rounded-lg font-bold hover:bg-[#C19A6B] hover:text-white transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProperty;