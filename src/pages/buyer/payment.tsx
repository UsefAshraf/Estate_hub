import { useState, useEffect } from "react";
import { Lock, Shield, CheckCircle2 } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { getPropertyById, markPropertyAsSold } from "@/services/property.api";
import { createPaymentIntent } from "@/services/stripe.api";
import type { Property } from "@/types/property.types";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Initialize Stripe with your publishable key
// Replace with your actual Stripe publishable key from your Stripe dashboard
const stripePromise = loadStripe("pk_test_51SebnV020wrLbjYwI2gOLIdtA3mMFs1TUexCj2M3mVjK9SqmMXIQRtZQ4rVHLsaBzjPuwzLH4MckOXPCDIHK803a00JT6xqE20");

// Card element styling options
const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1f2937",
      fontFamily: '"Inter", system-ui, sans-serif',
      "::placeholder": {
        color: "#9ca3af",
      },
      iconColor: "#6b7280",
    },
    invalid: {
      color: "#dc2626",
      iconColor: "#dc2626",
    },
  },
  hidePostalCode: true,
};

// The actual payment form component that uses Stripe hooks
interface CheckoutFormProps {
  property: Property;
  totalAmount: number;
  serviceFee: number;
}

function CheckoutForm({ property, totalAmount, serviceFee }: CheckoutFormProps) {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    setProcessing(true);
    setCardError(null);

    try {
      // Show processing message
      Swal.fire({
        title: "Processing Payment...",
        text: "Please wait while we process your payment",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Step 1: Create a Payment Intent on the backend
      const paymentIntentResponse = await createPaymentIntent({
        amount: Math.round(totalAmount * 100), // Stripe expects amount in cents
        propertyId: property._id,
        currency: "usd",
      });

      if (!paymentIntentResponse.success || !paymentIntentResponse.clientSecret) {
        throw new Error("Failed to initialize payment");
      }

      // Step 2: Confirm the payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        paymentIntentResponse.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: name,
            },
          },
        }
      );

      if (error) {
        // Payment failed
        throw new Error(error.message || "Payment failed");
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        // Step 3: Mark property as sold
        await markPropertyAsSold(property._id);

        // Close loading and show success
        await Swal.fire({
          title: "Payment Successful! 🎉",
          html: `
            <div class="text-left">
              <p class="mb-2">Congratulations on your new property!</p>
              <p class="text-sm text-gray-500">Property: <strong>${property.title}</strong></p>
              <p class="text-sm text-gray-500">Amount Paid: <strong>$${totalAmount.toLocaleString()}</strong></p>
            </div>
          `,
          icon: "success",
          position: "center",
          width: 600,
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        // Navigate to confirmation page with property data
        navigate("/confirmPayment", {
          state: {
            property: property,
            totalAmount: totalAmount,
            transactionDate: new Date().toISOString(),
            paymentIntentId: paymentIntent.id,
          },
        });
      }
    } catch (error: any) {
      console.error("Payment error:", error);

      // Check if property is already sold
      if (
        error.response?.status === 400 &&
        error.response?.data?.message?.includes("already")
      ) {
        Swal.fire({
          icon: "warning",
          title: "Property Unavailable",
          text: "This property has already been sold.",
          confirmButtonColor: "#f59e0b",
        }).then(() => navigate("/homeBuyer"));
      } else {
        setCardError(error.message || "Payment failed. Please try again.");
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: error.message || "Failed to complete the purchase. Please try again.",
          confirmButtonColor: "#dc2626",
        });
      }
    } finally {
      setProcessing(false);
    }
  };

  const isFormValid = stripe && elements && name.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name on Card */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-700"
        >
          Name on Card
        </label>
        <input
          id="name"
          type="text"
          className="block w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Stripe Card Element */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Card Details
        </label>
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
          <CardElement options={cardElementOptions} />
        </div>
        {cardError && (
          <p className="text-sm text-red-600 mt-1">{cardError}</p>
        )}
      </div>

      {/* Trust Badges */}
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
            <span className="text-sm font-medium">Powered by Stripe</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isFormValid || processing}
        className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg shadow-md transition-all duration-200 
          ${!isFormValid || processing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#C19A6B] hover:bg-[#a68256] hover:shadow-lg transform hover:-translate-y-0.5"
          }`}
      >
        {processing ? "Processing..." : `Pay $${totalAmount.toLocaleString()}`}
      </button>

      <p className="text-xs text-gray-400 text-center mt-4">
        By clicking Pay, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  );
}

// Main PaymentPage component
export default function PaymentPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Property state - fetched from backend
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  const serviceFee = 99;
  const totalAmount = (property?.price || 0) + serviceFee;

  // Fetch property data from backend
  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No property ID provided",
          confirmButtonColor: "#dc2626",
        }).then(() => navigate("/homeBuyer"));
        return;
      }

      try {
        setLoading(true);
        const res = await getPropertyById(id);

        if (res.data.success && res.data.data) {
          setProperty(res.data.data);
        } else {
          throw new Error("Failed to load property");
        }
      } catch (error: any) {
        console.error("Error fetching property:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.message || "Failed to load property details",
          confirmButtonColor: "#dc2626",
        }).then(() => navigate("/homeBuyer"));
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, navigate]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  // No Property Found
  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Page Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Payment
          </h1>
          <p className="text-gray-500 text-lg">
            Secure payment powered by Stripe
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Payment Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Payment Method
                  </h2>
                  <p className="text-gray-500">Enter your card details below</p>
                </div>

                {/* Stripe Elements Provider */}
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    property={property}
                    totalAmount={totalAmount}
                    serviceFee={serviceFee}
                  />
                </Elements>
              </div>
            </div>

            {/* Additional Security Info */}
            <div className="p-5 bg-[#FDFBF7] rounded-xl border border-[#E8DCC6] flex gap-4 items-start">
              <Shield className="w-6 h-6 text-[#C19A6B] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[#4A3B2A] font-semibold mb-1">
                  Your payment is secure
                </h4>
                <p className="text-sm text-[#8C7A63] leading-relaxed">
                  We use Stripe for secure payment processing. Your card details
                  are encrypted and never stored on our servers.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-8 overflow-hidden">
              <div className="p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                {/* Property Card */}
                <div className="mb-8">
                  <div className="relative h-56 w-full rounded-xl overflow-hidden mb-5 shadow-sm">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {property.title}
                  </h3>
                  <p className="text-gray-500 font-medium">
                    {property.address}
                  </p>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-4 py-6 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Property Price</span>
                    <span className="text-gray-900 font-medium">
                      ${property.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="text-gray-900 font-medium">
                      ${serviceFee}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-[#C19A6B]">
                    ${totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
