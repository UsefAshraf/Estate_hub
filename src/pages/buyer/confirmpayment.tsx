import React from 'react';
import { CheckCircle2, Download, Home, ArrowRight } from 'lucide-react';

export default function PaymentSuccessPage() {
  const property = {
    title: "Luxury Beachfront Villa",
    location: "Malibu, California",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop"
  };
  const transactionId = "TXN-8842-XJ92";
  const amount = 2500099;
  const date = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleDownloadReceipt = () => {
    alert('Receipt download started...');
  };

  const onViewBookings = () => {
    alert('Navigating to bookings...');
  };

  const onBackToHome = () => {
    alert('Navigating home...');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl w-full">
        
        {/* Main Success Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8 sm:p-12 text-center">
            
            {/* Success Icon */}
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center animate-bounce-slow">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
            <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto">
              Your payment has been processed successfully. A confirmation email has been sent to your registered email address.
            </p>

            {/* Transaction Summary Box */}
            <div className="bg-gray-50 rounded-xl p-8 mb-10 text-left border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                Transaction Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-gray-500 font-medium">Property</span>
                  <span className="text-gray-900 font-semibold text-right max-w-xs">{property.title}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Location</span>
                  <span className="text-gray-900 font-medium text-right">{property.location}</span>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500 font-medium">Transaction ID</span>
                    <span className="font-mono text-sm text-gray-600 bg-white px-2 py-1 rounded border border-gray-200">
                      {transactionId}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Date</span>
                    <span className="text-gray-900 font-medium">{date}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
                  <span className="text-lg font-bold text-gray-900">Amount Paid</span>
                  <span className="text-2xl font-bold text-[#C19A6B]">
                    ${amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={onViewBookings}
                className="flex-1 bg-[#C19A6B] hover:bg-[#a68256] text-white font-bold py-4 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>View My Bookings</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button 
                onClick={handleDownloadReceipt}
                className="flex-1 bg-white border-2 border-gray-200 hover:border-[#C19A6B] hover:text-[#C19A6B] text-gray-700 font-bold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Receipt</span>
              </button>
            </div>

            {/* Back to Home Link */}
            <button 
              onClick={onBackToHome}
              className="text-gray-500 hover:text-[#C19A6B] font-medium flex items-center justify-center gap-2 mx-auto transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </button>

          </div>
          
          {/* Footer Area */}
          <div className="bg-gray-50 p-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@estatehub.com" className="text-[#C19A6B] hover:underline font-medium">
                support@estatehub.com
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}