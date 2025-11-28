import React from "react";

const ContactHeader: React.FC = () => (
    <div className="text-center mb-12">
    <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
    <p className="text-gray-400 text-lg">
        Have a question or need assistance? We're here to help! Reach out to us
        and we'll respond as soon as possible.
    </p>
    </div>
);

const contactDetails = [
    {
    icon: "📞",
    title: "Phone",
    description: "Give us a call",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    },
    {
    icon: "✉️",
    title: "Email",
    description: "Send us an email",
    value: "info@estatehub.com",
    href: "mailto:info@estatehub.com",
    },
    {
    icon: "📍",
    title: "Office",
    description: "Visit us at",
    value: "123 Real Estate Street\nSan Francisco, CA 94102",
    },
];

const businessHours = [
    {
    icon: "🕒",
    title: "Business Hours",
    details:
        "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
    },
];

const ContactInfo: React.FC = () => (
    <div className="space-y-8 min-w-[300px] shrink-0">
    {contactDetails.map((item, index) => (
        <div key={index} className="flex items-start space-x-4">
        <div className="p-3 rounded-full bg-green-700/30 text-2xl">
            {item.icon}
        </div>
        <div>
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="text-gray-400 text-sm mb-1">{item.description}</p>
            {item.href ? (
            <a
                href={item.href}
                className="text-blue-400 hover:text-blue-300 transition-colors whitespace-pre-wrap"
            >
                {item.value}
            </a>
            ) : (
            <p className="text-gray-200 whitespace-pre-wrap">{item.value}</p>
            )}
        </div>
        </div>
    ))}

    {businessHours.map((item, index) => (
        <div
        key={index}
        className="flex items-start space-x-4 pt-4 border-t border-gray-700/50"
        >
        <div className="p-3 rounded-full bg-yellow-600/30 text-2xl">
            {item.icon}
        </div>
        <div>
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
            {item.details}
            </p>
        </div>
        </div>
    ))}
    </div>
);

const ContactForm: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted!");
    };

    return (
    <div className="grow p-8 bg-gray-800 rounded-lg shadow-xl ml-0 lg:ml-8">
        <h3 className="text-lg font-semibold text-white mb-6 border-b border-gray-700 pb-4">
        Send Us a Message
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
            type="text"
            placeholder="Your Name *"
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/50 transition-colors"
            required
            />
            <input
            type="email"
            placeholder="Email Address *"
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/50 transition-colors"
            required
            />
            <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/50 transition-colors"
            />
            <select
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/50 appearance-none transition-colors"
            defaultValue=""
            required
            >
            <option value="" disabled>
              Select a subject *
            </option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Technical Support">Technical Support</option>
            <option value="Billing">Billing</option>
            </select>
        </div>
        <textarea
          placeholder="Tell us how we can help you... *"
            rows={5}
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/50 resize-y transition-colors"
            required
        ></textarea>

        <div className="flex justify-end">
            <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
            <span>Send Message</span>
            <span className="text-xl">✉️</span>
            </button>
        </div>
        </form>
    </div>
    );
};

const ImmediateAssistance: React.FC = () => (
    <div className="mt-12 pt-12 border-t border-gray-700 text-center">
    <h3 className="text-xl font-semibold text-white mb-2">
        Need Immediate Assistance?
    </h3>
    <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
        For urgent matters, our support team is available 24/7 via phone.
        We're committed to providing you with the best service possible.
    </p>
    <div className="flex justify-center space-x-6">
        <a
        href="tel:+15551234567"
        className="px-6 py-3 border border-blue-600 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium"
        >
        Call Now
        </a>
        <a
        href="mailto:info@estatehub.com"
        className="px-6 py-3 border border-gray-600 text-gray-200 rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
        Email Us
        </a>
    </div>
    </div>
);

const Contact: React.FC = () => {
    return (
    <div className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
        <ContactHeader />

        <div className="flex flex-col lg:flex-row gap-12">
            <ContactInfo />

            <ContactForm />
        </div>

        <ImmediateAssistance />
        </div>
    </div>
    );
};

export default Contact;
