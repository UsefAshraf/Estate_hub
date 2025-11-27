import { useState } from 'react';
import { Heart, Share2, Maximize2, Bed, Bath, Maximize, Calendar, CheckCircle, Phone, Mail, CalendarDays, X } from 'lucide-react';
import Swal from 'sweetalert2';
import { motion } from "motion/react"

// Type definitions
interface Feature {
    name: string;
    icon: typeof CheckCircle;
}

interface Agent {
    name: string;
    title: string;
    phone: string;
    email: string;
    avatar: string;
}

interface PropertyData {
    status: string;
    type: string;
    featured: string;
    title: string;
    address: string;
    price: string;
    priceNote: string;
    bedrooms: number;
    bathrooms: number;
    area: string;
    built: number;
    description: string;
    features: Feature[];
    agent: Agent;
}

const Propertydetail: React.FC = () => {
    const [mainImage, setMainImage] = useState<number>(0);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
    //const [zoomedImage, setZoomedImage] = useState<string | null>(null);
    const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
    const [showContactModal, setShowContactModal] = useState<boolean>(false);



    const [scheduleForm, setScheduleForm] = useState({
        date: '',
        time: '',
        name: 'John Doe',
        phone: '+1 (555) 000-0000'
    });
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const images: string[] = [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
    ];

    const propertyData: PropertyData = {
        status: 'For Sale',
        type: 'villa',
        featured: 'Featured',
        title: 'Modern Luxury Villa with Pool',
        address: '123 Palm Avenue, Los Angeles',
        price: '$1,250,000',
        priceNote: '~$5,000/mo est.',
        bedrooms: 5,
        bathrooms: 4,
        area: '3500 sqft',
        built: 2022,
        description: 'Stunning modern villa featuring contemporary architecture, expansive living spaces, and a beautiful infinity pool. This property offers the ultimate in luxury living with high-end finishes throughout.',
        features: [
            { name: 'Swimming Pool', icon: CheckCircle },
            { name: 'Garden', icon: CheckCircle },
            { name: 'Garage', icon: CheckCircle },
            { name: 'Smart Home', icon: CheckCircle },
            { name: 'Security System', icon: CheckCircle },
            { name: 'Fireplace', icon: CheckCircle },
        ],
        agent: {
            name: 'Sarah Johnson',
            title: 'Real Estate Agent',
            phone: '+1 (555) 123-4567',
            email: 'sarah.johnson@estatehub.com',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
        }
    };

    const handleScheduleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Schedule form submitted:', scheduleForm);
        Swal.fire({
            title: 'Visit Scheduled!',
            text: 'The agent will contact you shortly.',
            icon: 'success',
            position: 'bottom',
            toast: true,
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false,
            customClass: {
                popup: 'custom-toast'
            }
        });


        setShowScheduleModal(false);
    };
    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Contact form submitted:', contactForm);

        Swal.fire({
            title: 'Message Sent!',
            text: 'The agent will contact you shortly.',
            icon: 'success',
            position: 'bottom',
            toast: true,
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false,
        });

        setShowContactModal(false);
        setContactForm({ name: '', email: '', phone: '', message: '' });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScheduleForm({
            ...scheduleForm,
            [e.target.name]: e.target.value
        });
    };
    const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // Use HTMLInputElement | HTMLTextAreaElement for compatibility with both
        setContactForm({
            ...contactForm,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-primary">
            {/* Header */}


            {/* Breadcrumb */}
            <div className="max-w-9xl mx-auto px-5 py-4 bg-primary mb-4 shadow-sm">
                <div className="flex items-center space-x-2 text-sm text-black">
                    <a href="#" className="hover:text-blue-600">Home</a>
                    <span>/</span>
                    <a href="#" className="hover:text-blue-600">Properties</a>
                    <span>/</span>
                    <span className="text-black">{propertyData.title}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image Gallery */}
                        <div className="bg-primary rounded-xl overflow-hidden shadow-sm">
                            <div className="relative">
                                <img
                                    src={images[mainImage]}
                                    alt="Property"
                                    className="w-full h-96 object-cover"
                                />
                                <div className="absolute top-4 right-4 flex space-x-2">
                                    <motion.button
                                        whileHover={{ scale: 1.4 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        onClick={() => {
                                            setIsFavorite(!isFavorite);

                                            Swal.fire({
                                                title: isFavorite ? 'Removed from Favorites' : 'Added to Favorites!',
                                                text: isFavorite
                                                    ? 'This property is no longer in your favorites list.'
                                                    : 'This property has been added to your favorites.',
                                                icon: 'success',
                                                position: 'bottom',
                                                toast: true,
                                                timer: 3000,
                                                timerProgressBar: true,
                                                showConfirmButton: false,
                                                customClass: {
                                                    popup: 'custom-toast'
                                                }
                                            });
                                        }}
                                        className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50"
                                    >
                                        <Heart
                                            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                                        />
                                    </motion.button>


                                    <motion.button className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50"
                                        whileHover={{ scale: 1.4 }}     // grows on hover
                                        whileTap={{ scale: 0.95 }}>
                                        <Share2 className="w-5 h-5 text-gray-600" />
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.4 }}     // grows on hover
                                        whileTap={{ scale: 0.95 }}      // shrinks when clicked
                                        onHoverStart={() => console.log('hover started!')}
                                        onClick={() => setZoomedImageIndex(mainImage)}
                                        className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50"
                                    >
                                        <Maximize2 className="w-5 h-5 text-gray-600" />
                                    </motion.button>

                                </div>
                            </div>
                            <div className="flex space-x-2 p-4">
                                {images.map((img: string, idx: number) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        onClick={() => setMainImage(idx)}
                                        className={`w-24 h-20 object-cover rounded-lg cursor-pointer border-2 ${mainImage === idx ? 'border-cyan-500' : 'border-transparent'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Property Info */}
                        <div className="bg-primary rounded-xl p-6 shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="bg-amber-900 text-white text-s px-3 py-1 rounded-full">{propertyData.status}</span>
                                        <span className="bg-gray-200 text-gray-700 text-s px-3 py-1 rounded-full">{propertyData.type}</span>
                                        <span className="bg-orange-500 text-white text-s px-3 py-1 rounded-full">{propertyData.featured}</span>
                                    </div>
                                    <h1 className="text-3xl font-bold text-secondary mb-2">{propertyData.title}</h1>
                                    <p className="text-gray-600 flex items-center">
                                        <span className="mr-2">📍</span>
                                        {propertyData.address}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-secondary">{propertyData.price}</div>
                                    <div className="text-sm text-gray-500">{propertyData.priceNote}</div>
                                </div>
                            </div>

                            {/* Property Stats */}
                            <div className="grid grid-cols-4 gap-4 py-6 border-t border-b border-gray-200">
                                <div className="flex items-center space-x-3">
                                    <Bed className="w-6 h-6 text-cyan-500" />
                                    <div>
                                        <div className="text-sm text-gray-500">Bedrooms</div>
                                        <div className="font-semibold text-secondary">{propertyData.bedrooms}</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Bath className="w-6 h-6 text-cyan-500" />
                                    <div>
                                        <div className="text-sm text-gray-500">Bathrooms</div>
                                        <div className="font-semibold text-secondary">{propertyData.bathrooms}</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Maximize className="w-6 h-6 text-cyan-500" />
                                    <div>
                                        <div className="text-sm text-gray-500">Area</div>
                                        <div className="font-semibold text-secondary">{propertyData.area}</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-6 h-6 text-cyan-500" />
                                    <div>
                                        <div className="text-sm text-gray-500">Built</div>
                                        <div className="font-semibold text-secondary">{propertyData.built}</div>
                                    </div>
                                </div>
                            </div>

                            {/* About Property */}
                            <div className="mt-6">
                                <h2 className="text-xl font-bold text-secondary mb-3">About This Property</h2>
                                <p className="text-gray-600 leading-relaxed">{propertyData.description}</p>
                            </div>

                            {/* Features & Amenities */}
                            <div className="mt-6">
                                <h2 className="text-xl font-bold text-secondary mb-4">Features & Amenities</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {propertyData.features.map((feature: Feature, idx: number) => (
                                        <div key={idx} className="flex items-center space-x-2">
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                            <span className="text-gray-700">{feature.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Agent */}
                        <div className="bg-primary rounded-xl p-6 shadow-sm sticky top-24">
                            <h3 className="text-lg font-bold text-secondary mb-4">Contact Agent</h3>

                            <div className="flex items-center space-x-4 mb-6">
                                <img
                                    src={propertyData.agent.avatar}
                                    alt={propertyData.agent.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-semibold text-gray-900">{propertyData.agent.name}</div>
                                    <div className="text-sm text-gray-500">{propertyData.agent.title}</div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center space-x-3 text-gray-600">
                                    <Phone className="w-5 h-5" />
                                    <span>{propertyData.agent.phone}</span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-600">
                                    <Mail className="w-5 h-5" />
                                    <span className="text-sm">{propertyData.agent.email}</span>
                                </div>
                            </div>

                            <button onClick={() => setShowContactModal(true)}
                                className="w-full rounded-3xl p-4 text-xl btn-primary hover:hover:bg-linear-to-r from-white to-orange-300 ">
                                📧 Send Message
                            </button>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h4 className="font-semibold text-black mb-3">Schedule a Visit</h4>
                                <p className="text-sm text-gray-600 mb-4">Book a viewing to see this property in person</p>
                                <button
                                    onClick={() => setShowScheduleModal(true)}
                                    className="w-full border border-gray-300 text-black py-3 rounded-lg font-semibold btn-primary flex items-center justify-center space-x-2 hover:bg-linear-to-r from-white to-orange-300"
                                >
                                    <CalendarDays className="w-5 h-5" />
                                    <span>Schedule Visit</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {zoomedImageIndex !== null && (
                <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 p-4">
                    {/* Close button */}
                    <button
                        onClick={() => setZoomedImageIndex(null)}
                        className="absolute top-4 right-4 text-white hover:text-gray-300"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Zoomed image */}
                    <div className="max-w-4xl w-full flex justify-center mb-4">
                        <motion.img
                            key={zoomedImageIndex} // ensures animation triggers on change
                            src={images[zoomedImageIndex]}
                            alt="Zoomed Property"
                            className="w-full h-auto object-contain rounded-lg shadow-lg"
                            initial={{ scale: 0.8, opacity: 0 }}   // start small + invisible
                            animate={{ scale: 1, opacity: 1 }}     // grow to full size + visible
                            exit={{ scale: 0.8, opacity: 0 }}      // optional: when closing modal
                            transition={{ type: "spring", stiffness: 150, damping: 20 }}
                        />

                    </div>

                    {/* Thumbnails */}
                    <div className="flex space-x-2 overflow-x-auto px-2">
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                onClick={() => setZoomedImageIndex(idx)}
                                className={`w-20 h-16 object-cover rounded-lg cursor-pointer border-2 ${zoomedImageIndex === idx ? 'border-cyan-500' : 'border-transparent'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Optional arrows */}
                    <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
                        <button
                            onClick={() =>
                                setZoomedImageIndex((prev) =>
                                    prev !== null ? (prev - 1 + images.length) % images.length : 0
                                )
                            }
                            className="text-white p-2 bg-white rounded-full hover:bg-black/70"
                        >
                            ◀
                        </button>
                    </div>
                    <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                        <button
                            onClick={() =>
                                setZoomedImageIndex((prev) =>
                                    prev !== null ? (prev + 1) % images.length : 0
                                )
                            }
                            className="text-white p-2 bg-white rounded-full hover:bg-black/70"
                        >
                            ▶
                        </button>
                    </div>
                </div>
            )}

            {/* Contact Agent Modal (UPDATED) */}
            {showContactModal && (
                <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
                    <div className="bg-primary rounded-xl shadow-2xl max-w-md w-full p-6 relative">
                        <button
                            onClick={() => setShowContactModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-bold text-secondary mb-6">Contact {propertyData.agent.name}</h2>

                        <form onSubmit={handleContactSubmit} className="space-y-4">

                            {/* 1. Name Input */}
                            <div>
                                <label className="block text-sm font-semibold text-secondary mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={contactForm.name}
                                    onChange={handleContactInputChange}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                                    required
                                />
                            </div>

                            {/* 2. Email Input */}
                            <div>
                                <label className="block text-sm font-semibold text-secondary mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={contactForm.email}
                                    onChange={handleContactInputChange}
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                                    required
                                />
                            </div>

                            {/* 3. Phone Input */}
                            <div>
                                <label className="block text-sm font-semibold text-secondary mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={contactForm.phone}
                                    onChange={handleContactInputChange}
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                                    required
                                />
                            </div>

                            {/* 4. Message Textarea */}
                            <div>
                                <label className="block text-sm font-semibold text-secondary mb-2">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={contactForm.message}
                                    onChange={handleContactInputChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
                                    placeholder="I'm interested in this property..."
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 resize-none"
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
                    <div className="bg-primary rounded-xl shadow-2xl max-w-md w-full p-6 relative">
                        <button
                            onClick={() => setShowScheduleModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h2 className="text-2xl font-bold text-secondary mb-6">Schedule a Property Visit</h2>

                        <form onSubmit={handleScheduleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Preferred Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={scheduleForm.date}
                                    onChange={handleInputChange}
                                    placeholder="dd/yyyy"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Preferred Time
                                </label>
                                <input
                                    type="time"
                                    name="time"
                                    value={scheduleForm.time}
                                    onChange={handleInputChange}
                                    placeholder="--:-- --"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={scheduleForm.name}
                                    onChange={handleInputChange}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={scheduleForm.phone}
                                    onChange={handleInputChange}
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full px-4 py-3 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
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