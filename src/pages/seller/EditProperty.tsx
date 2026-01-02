import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPropertyById, updateProperty } from "@/services/property.api";
import type { Property, PropertyFeature } from "@/types/property.types";
import { ArrowLeft, Save, Loader2, CheckCircle, XCircle, Plus, X } from "lucide-react";

const EditProperty = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [newFeature, setNewFeature] = useState("");

    useEffect(() => {
        if (!id) return;
        fetchProperty();
    }, [id]);

    const fetchProperty = async () => {
        try {
            setLoading(true);
            const res = await getPropertyById(id!);
            console.log("Fetched property:", res.data.data);
            setProperty(res.data.data);
        } catch (err: any) {
            console.error("Fetch error:", err);
            setError("Failed to load property");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        if (!property) return;
        const target = e.target;

        setProperty((prev) => {
            if (!prev) return prev;

            if (target instanceof HTMLInputElement && target.type === "checkbox") {
                return { ...prev, [target.name]: target.checked };
            }

            if (target instanceof HTMLInputElement && target.type === "number") {
                return { ...prev, [target.name]: Number(target.value) };
            }

            return { ...prev, [target.name]: target.value };
        });
    };

    const addFeature = () => {
        if (!newFeature.trim() || !property) return;
        
        setProperty(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                features: [...prev.features, { name: newFeature.trim() }]
            };
        });
        setNewFeature("");
    };

    const removeFeature = (index: number) => {
        setProperty(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                features: prev.features.filter((_, i) => i !== index)
            };
        });
    };

    const handleSubmit = async () => {
        if (!property) return;

        try {
            setSaving(true);
            setError(null);
            setSuccessMessage(null);

            // Prepare update data without readonly fields
            const updateData: any = {
                title: property.title,
                description: property.description,
                price: property.price,
                status: property.status,
                type: property.type,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                area: property.area,
                builtYear: property.builtYear,
                address: property.address,
                featured: property.featured,
            };

            // Add priceNote if it exists
            if (property.priceNote) {
                updateData.priceNote = property.priceNote;
            }

            // Format features
            if (property.features && property.features.length > 0) {
                updateData.features = property.features.map(f => 
                    typeof f === "string" ? f : f.name
                );
            }

            console.log("Updating property with data:", updateData);

            const response = await updateProperty(property._id, updateData);

            console.log("Update response:", response.data);
            setSuccessMessage("Property updated successfully!");

            setTimeout(() => {
                navigate("/sellerProperties");
            }, 1500);
        } catch (err: any) {
            console.error("Update error:", err);
            setError(err.response?.data?.message || "Failed to update property");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-lg text-slate-700">Loading property...</p>
                </div>
            </div>
        );
    }

    if (error && !property) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-lg text-red-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2 mx-auto"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!property) return null;

    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back</span>
                        </button>
                        <h1 className="text-4xl font-bold text-slate-900">
                            Edit Property
                        </h1>
                        <p className="text-slate-600 mt-2">
                            Update your property information
                        </p>
                    </div>
                </div>

                {/* Success Alert */}
                {successMessage && (
                    <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg shadow-sm animate-in slide-in-from-top">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                            <p className="text-green-800 font-medium">{successMessage}</p>
                        </div>
                    </div>
                )}

                {/* Error Alert */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                            <XCircle className="w-6 h-6 text-red-600" />
                            <p className="text-red-800 font-medium">{error}</p>
                        </div>
                    </div>
                )}

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Basic Information */}
                    <div className="p-8 border-b border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">
                            Basic Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Property Title *
                                </label>
                                <input
                                    name="title"
                                    value={property.title}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    placeholder="e.g., Luxury 3-Bedroom Villa"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Price ($) *
                                </label>
                                <input
                                    name="price"
                                    type="number"
                                    value={property.price}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    placeholder="500000"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Price Note
                                </label>
                                <input
                                    name="priceNote"
                                    value={property.priceNote || ""}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    placeholder="e.g., Negotiable"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Status *
                                </label>
                                <select
                                    name="status"
                                    value={property.status}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                >
                                    <option value="sale">For Sale</option>
                                    <option value="rent">For Rent</option>
                                    <option value="sold">Sold</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Property Type *
                                </label>
                                <select
                                    name="type"
                                    value={property.type}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                >
                                    <option value="villa">Villa</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="house">House</option>
                                    <option value="condo">Condo</option>
                                    <option value="townhouse">Townhouse</option>
                                    <option value="land">Land</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Address *
                                </label>
                                <input
                                    name="address"
                                    value={property.address}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    placeholder="123 Main Street, Cairo"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Property Details */}
                    <div className="p-8 border-b border-slate-200 bg-slate-50">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">
                            Property Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Bedrooms *
                                </label>
                                <input
                                    type="number"
                                    name="bedrooms"
                                    value={property.bedrooms}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Bathrooms *
                                </label>
                                <input
                                    type="number"
                                    name="bathrooms"
                                    value={property.bathrooms}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Area (sqft) *
                                </label>
                                <input
                                    type="number"
                                    name="area"
                                    value={property.area}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Year Built *
                                </label>
                                <input
                                    type="number"
                                    name="builtYear"
                                    value={property.builtYear}
                                    onChange={handleChange}
                                    min="1800"
                                    max={new Date().getFullYear()}
                                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="p-8 border-b border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">
                            Description
                        </h2>

                        <textarea
                            name="description"
                            value={property.description}
                            onChange={handleChange}
                            rows={6}
                            className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                            placeholder="Describe your property in detail..."
                        />
                    </div>

                    {/* Features */}
                    <div className="p-8 border-b border-slate-200 bg-slate-50">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">
                            Features & Amenities
                        </h2>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {property.features.map((feature, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                >
                                    {typeof feature === 'string' ? feature : feature.name}
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        className="hover:bg-blue-200 rounded-full p-1 transition"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                                placeholder="Add a feature (e.g., Swimming Pool)"
                                className="flex-1 rounded-xl border-2 border-slate-200 px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />
                            <button
                                type="button"
                                onClick={addFeature}
                                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center gap-2 font-medium"
                            >
                                <Plus className="w-4 h-4" />
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Featured Toggle */}
                    <div className="p-8 border-b border-slate-200">
                        <label className="flex items-center gap-4 cursor-pointer group">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={property.featured}
                                onChange={handleChange}
                                className="w-6 h-6 text-blue-600 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            />
                            <div>
                                <span className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition">
                                    Featured Property
                                </span>
                                <p className="text-sm text-slate-600">
                                    Highlight this property on the homepage
                                </p>
                            </div>
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="p-8 bg-gradient-to-r from-slate-50 to-slate-100 flex justify-end gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            disabled={saving}
                            className="px-8 py-3 rounded-xl border-2 border-slate-300 text-slate-700 hover:bg-white hover:border-slate-400 transition font-medium disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSubmit}
                            disabled={saving}
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Update Property
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditProperty;