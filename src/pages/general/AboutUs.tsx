import React from 'react';
import OurStoryImg from "../../assets/Images/photo About.jpeg"

type IconType = React.ElementType; 

interface FeatureCardProps {
    IconComponent: IconType;
    title: string;
    description: string;
    colorClass: string;
}


const TargetIcon = () => (
    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
    </svg>
);

const HeartIcon = () => (
    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364l-1.5 1.5-1.5-1.5a4.5 4.5 0 00-6.364 0z"></path>
    </svg>
);

const ShieldIcon = () => (
    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.613-5.597A11.954 11.954 0 0012 3C6.48 3 2.053 6.94 1.097 12H1l.01.002L12 21l11.99-8.002H23c-.956-5.06-5.383-9.001-10.887-9.001z"></path>
    </svg>
);

const UserTieIcon = () => (
    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
    </svg>
);

const CheckCircleIcon = () => (
    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
);

const ChartLineIcon = () => (
    <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
    </svg>
);

const RedHeartIcon = () => (
    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364l-1.5 1.5-1.5-1.5a4.5 4.5 0 00-6.364 0z"></path>
    </svg>
);

const ClockIcon = () => (
    <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
);

function FeatureCard({ IconComponent, title, description, colorClass }: FeatureCardProps) {
    return (
        <div className="p-6 rounded-xl bg-gray-800 flex items-start space-x-4 shadow-xl h-full transition duration-300 hover:bg-gray-700/80">
            
            <div className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-xl ${colorClass}`}>
                <IconComponent />
            </div>
            
            <div>
                <h4 className="text-xl font-semibold mb-2 text-white">
                    {title}
                </h4>
                <p className="text-gray-400 text-sm">
                    {description}
                </p>
            </div>
        </div>
    );
}



function About() {
    return (
        <div className="bg-gray-900 text-white min-h-screen py-16">
            
            <div className="text-center py-10 max-w-2xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                    About EstateHub
                </h1>
                <h2 className="text-base md:text-lg text-blue-300 mt-4 leading-relaxed">
                    Your trusted partner in finding the perfect home. We're on a mission to make real estate simple, transparent, and accessible for everyone.
                </h2>
            </div>

            <hr className="max-w-4xl mx-auto border-gray-700 my-10" />

            <div className="max-w-6xl mx-auto mt-16 px-4 mb-20">
                <div className="md:flex md:gap-10 items-start">
                    <div className="md:w-1/2">
                        <h3 className="text-3xl font-bold text-white mb-6">Our Story</h3>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            Founded in 2020, EstateHub was born from a simple idea: finding your dream home shouldn't be complicated. We saw an industry that was often confusing, opaque, and difficult to navigate, and we knew there had to be a better way.
                        </p>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            Today, we've helped thousands of people find their perfect property. Our platform combines cutting-edge technology with personalized service, creating an experience that's both powerful and easy to use.
                        </p>
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0">
                        <img
                            className="rounded-xl shadow-2xl w-full h-auto object-cover border border-gray-700"
                            src={OurStoryImg}
                            alt="Luxury modern home with a pool, representing EstateHub's properties"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
            
            <div className="py-16 bg-gray-900">
                <h2 className="text-3xl font-bold text-center text-white mb-12">
                    Our Mission & Values
                </h2>
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    <div className="p-8 rounded-xl bg-gray-800 text-center shadow-lg">
                        <div className="mx-auto w-fit mb-6">
                            <div className="text-4xl text-blue-500 border-2 border-blue-500 p-3 rounded-full flex items-center justify-center mx-auto">
                                <TargetIcon />
                            </div>
                        </div>
                        <h4 className="text-xl font-semibold mb-3 text-white">Our Mission</h4>
                        <p className="text-gray-400 leading-relaxed">To revolutionize the real estate industry by making property search simple, transparent, and accessible to everyone.</p>
                    </div>
                    
                    <div className="p-8 rounded-xl bg-gray-800 text-center shadow-lg">
                        <div className="mx-auto w-fit mb-6">
                            <div className="text-4xl text-green-500 border-2 border-green-500 p-3 rounded-full flex items-center justify-center mx-auto">
                                <HeartIcon /> 
                            </div>
                        </div>
                        <h4 className="text-xl font-semibold mb-3 text-white">Customer First</h4>
                        <p className="text-gray-400 leading-relaxed">We put our customers at the heart of everything we do, ensuring their needs and satisfaction are our top priority.</p>
                    </div>

                    <div className="p-8 rounded-xl bg-gray-800 text-center shadow-lg">
                        <div className="mx-auto w-fit mb-6">
                            <div className="text-4xl text-purple-500 border-2 border-purple-500 p-3 rounded-full flex items-center justify-center mx-auto">
                                <ShieldIcon /> 
                            </div>
                        </div>
                        <h4 className="text-xl font-semibold mb-3 text-white">Trust & Integrity</h4>
                        <p className="text-gray-400 leading-relaxed">We maintain the highest standards of honesty and transparency in all our dealings and transactions.</p>
                    </div>
                    
                </div>
            </div>

            <div className="pt-16 pb-20 bg-gray-900">
                <h2 className="text-3xl font-bold text-center text-white mb-16">
                    Our Impact in Numbers
                </h2>
                <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <p className="text-4xl md:text-5xl font-extrabold text-white mb-1">1,500+</p>
                        <p className="text-sm md:text-lg text-blue-300">Properties Listed</p>
                    </div>
                    <div>
                        <p className="text-4xl md:text-5xl font-extrabold text-white mb-1">850+</p>
                        <p className="text-sm md:text-lg text-blue-300">Happy Clients</p>
                    </div>
                    <div>
                        <p className="text-4xl md:text-5xl font-extrabold text-white mb-1">50+</p>
                        <p className="text-sm md:text-lg text-blue-300">Expert Agents</p>
                    </div>
                    <div>
                        <p className="text-4xl md:text-5xl font-extrabold text-white mb-1">98%</p>
                        <p className="text-sm md:text-lg text-blue-300">Success Rate</p>
                    </div>
                </div>
            </div>
            
            <div className="py-20 bg-gray-900">
                <h2 className="text-3xl font-bold text-center text-white mb-12">
                    Why Choose EstateHub
                </h2>
                
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <FeatureCard
                        IconComponent={UserTieIcon}
                        title="Expert Guidance"
                        description="Work with experienced real estate professionals who understand your unique needs and preferences."
                        colorClass="bg-gray-900" 
                    />

                    <FeatureCard
                        IconComponent={CheckCircleIcon}
                        title="Verified Listings"
                        description="All our property listings are thoroughly verified to ensure accuracy and authenticity."
                        colorClass="bg-gray-900"
                    />

                    <FeatureCard
                        IconComponent={ChartLineIcon}
                        title="Market Insights"
                        description="Get access to real-time market data and trends to make informed decisions."
                        colorClass="bg-gray-900"
                    />

                    <FeatureCard
                        IconComponent={ShieldIcon}
                        title="Secure Transactions"
                        description="Your security is our priority. We ensure safe and transparent transactions."
                        colorClass="bg-gray-900"
                    />

                    <FeatureCard
                        IconComponent={RedHeartIcon}
                        title="Personalized Service"
                        description="Receive customized property recommendations based on your preferences."
                        colorClass="bg-gray-900"
                    />
                    
                    <FeatureCard
                        IconComponent={ClockIcon}
                        title="24/7 Support"
                        description="Our dedicated support team is always here to help you with any questions."
                        colorClass="bg-gray-900"
                    />
                    
                </div>
            </div>
            
        </div>
    )
}

export default About;