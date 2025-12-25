import React, { useState, useEffect } from 'react';
// FIX: Added 'type' keyword to satisfy verbatimModuleSyntax
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Lock, Shield, CheckCircle2 } from 'lucide-react';
import Swal from "sweetalert2";
// import { useNavigate } from 'react-router-dom'; // Uncomment if you need to redirect manually

// Initialize Stripe
// REPLACE THIS with your actual Publishable Key (pk_test_...)
const stripePromise = loadStripe(""); 

// --- TYPES ---
interface PropertyData {
  title: string;
  location: string;
  price: number;
  image: string;
}

interface CheckoutFormProps {
  totalAmount: number;
  property: PropertyData;
}

// --- INNER FORM COMPONENT ---
const CheckoutForm: React.FC<CheckoutFormProps> = ({ totalAmount, property }) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    // 1. ATTEMPT PAYMENT
    // This function submits the data from the PaymentElement directly to Stripe
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // 2. SUCCESS BEHAVIOR
        // If payment succeeds, Stripe immediately redirects the user here:
        return_url: `${window.location.origin}/confirmPayment`,
      },
    });

    // 3. FAILURE BEHAVIOR
    // If code reaches here, it means the payment FAILED (or card was declined)
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "An unexpected error occurred.");
        Swal.fire("Payment Failed", error.message, "error");
      } else {
        setMessage("An unexpected error occurred.");
        Swal.fire("Error", "An unexpected error occurred.", "error");
      }
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="min-h-[200px]">
         {/* The secure inputs for Card/Expiry/CVC live inside this element */}
         <PaymentElement id="payment-element" options={{layout: "tabs"}} />
      </div>

      <div className="pt-2 pb-2">
        <div className="flex flex-wrap gap-6 items-center text-gray-500">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-medium">SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">PCI Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-medium">Secure Payment</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg shadow-md transition-all duration-200 
          ${isLoading || !stripe 
            ? 'bg-[#e0d0b8] cursor-not-allowed' 
            : 'bg-[#e0d0b8] hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
      >
        {isLoading ? 'Processing...' : `Pay $${totalAmount.toLocaleString()}`}
      </button>

      {message && <div className="text-red-500 text-sm text-center mt-2">{message}</div>}
      
      <p className="text-xs text-gray-400 text-center mt-4">
        By clicking Pay, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState("");
  
  const property: PropertyData = {
    title: "Luxury Beachfront Villa",
    location: "Malibu, California",
    price: 25000,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop" 
  };
  const serviceFee = 99;
  const totalAmount = property.price + serviceFee;

  useEffect(() => {
    // Fetch the PaymentIntent Client Secret as soon as the page loads
    fetch("http://localhost:3000/api/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalAmount]);

  const appearance = {
    theme: 'stripe' as const, 
    variables: {
      colorPrimary: '#C19A6B',
    },
  };

  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-500 text-lg">Secure payment powered by Stripe</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Payment Method</h2>
                  <p className="text-gray-500">Enter your card details below</p>
                </div>

                {clientSecret && (
                  <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm totalAmount={totalAmount} property={property} />
                  </Elements>
                )}
              </div>
            </div>
             <div className="p-5 bg-[#FDFBF7] rounded-xl border border-[#E8DCC6] flex gap-4 items-start">
              <Shield className="w-6 h-6 text-[#C19A6B] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[#4A3B2A] font-semibold mb-1">Your payment is secure</h4>
                <p className="text-sm text-[#8C7A63] leading-relaxed">
                  We use bank-level encryption to protect your card information. Your data is never stored on our servers.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-8 overflow-hidden">
              <div className="p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="mb-8">
                  <div className="relative h-56 w-full rounded-xl overflow-hidden mb-5 shadow-sm">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{property.title}</h3>
                  <p className="text-gray-500 font-medium">{property.location}</p>
                </div>
                <div className="space-y-4 py-6 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Property Price</span>
                    <span className="text-gray-900 font-medium">${property.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="text-gray-900 font-medium">${serviceFee}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-[#C19A6B]">${totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}