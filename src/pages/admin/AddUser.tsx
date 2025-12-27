import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, User, Mail, Phone, Lock, Eye, EyeOff, Loader2, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/auth.api";

// Zod Schema for Add User Form
const addUserSchema = z.object({
    userName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(6, "Phone number is required"),
    purpose: z.enum(["Buy/Rent a Property", "Sell a Property", "Both"]),
    role: z.enum(["user", "agent", "admin"]),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});

type AddUserFormData = z.infer<typeof addUserSchema>;

const AddUser: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<AddUserFormData>({
        resolver: zodResolver(addUserSchema),
        defaultValues: {
            purpose: "Buy/Rent a Property",
            role: "user"
        }
    });

    const onSubmit = async (data: AddUserFormData) => {
        setLoading(true);
        setApiError(null);
        setSuccessMessage(null);

        try {
            await authService.register(data);
            setSuccessMessage(`User "${data.userName}" has been created successfully!`);
            reset();

            // Redirect to users page after 2 seconds
            setTimeout(() => {
                navigate("/users");
            }, 2000);
        } catch (error: any) {
            // Try to extract the most specific error message from the server
            let errorMessage = "Failed to create user. Please try again.";

            if (error.response?.data) {
                const responseData = error.response.data;

                // Check if it's an HTML error response
                if (typeof responseData === 'string' && responseData.includes('<!DOCTYPE html>')) {
                    // Extract error message from HTML
                    const match = responseData.match(/Error:\s*([^<\n]+)/);
                    if (match && match[1]) {
                        errorMessage = match[1].trim();
                    }
                } else {
                    // Check multiple possible error message locations for JSON responses
                    errorMessage = responseData.message
                        || responseData.error
                        || responseData.msg
                        || (typeof responseData === 'string' ? responseData : errorMessage);
                }
            } else if (error.message) {
                errorMessage = error.message;
            }

            setApiError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200";

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-orange-100 p-3 rounded-lg">
                            <UserPlus className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Add New User</h1>
                            <p className="text-gray-600 text-sm">Create a new user account for the platform</p>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    {/* Success Message */}
                    {successMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            {successMessage}
                        </div>
                    )}

                    {/* Error Message */}
                    {apiError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                            {apiError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    {...register("userName")}
                                    className={inputClass}
                                />
                            </div>
                            {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    placeholder="user@example.com"
                                    {...register("email")}
                                    className={inputClass}
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    {...register("phone")}
                                    className={inputClass}
                                />
                            </div>
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                        </div>

                        {/* Purpose and Role - Side by Side */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Purpose */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Purpose <span className="text-red-500">*</span>
                                </label>
                                <select {...register("purpose")} className={inputClass}>
                                    <option>Buy/Rent a Property</option>
                                    <option>Sell a Property</option>
                                    <option>Both</option>
                                </select>
                                {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose.message}</p>}
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    User Role <span className="text-red-500">*</span>
                                </label>
                                <select {...register("role")} className={inputClass}>
                                    <option value="user">User</option>
                                    <option value="agent">Agent</option>
                                    <option value="admin">Admin</option>
                                </select>
                                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    {...register("password")}
                                    className={inputClass}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    {...register("confirmPassword")}
                                    className={inputClass}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin w-5 h-5" />
                                        Creating User...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="w-5 h-5" />
                                        Create User
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/users")}
                                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg transition-colors duration-200 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;