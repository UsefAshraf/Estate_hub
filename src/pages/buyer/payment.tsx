import { useState, useEffect } from 'react';
import { CreditCard, Lock, Shield, CheckCircle2 } from 'lucide-react';
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom';
import { getPropertyById } from '@/services/property.api';
import type { Property } from '@/types/property.types';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Property state - fetched from backend
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [processing, setProcessing] = useState(false);

  const serviceFee = 99;
  const totalAmount = (property?.price || 0) + serviceFee;

  // Fetch property data from backend
  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No property ID provided',
          confirmButtonColor: '#dc2626',
        }).then(() => navigate('/homeBuyer'));
        return;
      }

      try {
        setLoading(true);
        const res = await getPropertyById(id);

        if (res.data.success && res.data.data) {
          setProperty(res.data.data);
        } else {
          throw new Error('Failed to load property');
        }
      } catch (error: any) {
        console.error('Error fetching property:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to load property details',
          confirmButtonColor: '#dc2626',
        }).then(() => navigate('/homeBuyer'));
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, navigate]);

  // --- Formatting Logic ---
  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    if (formatted.replace(/\//g, '').length <= 4) {
      setExpiry(formatted);
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    if (value.length <= 4) {
      setCvc(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    // Swal.fire({
    //   title: "Payment Successful!",
    //   text: "Thank you for your purchase. Redirecting in a moment...",
    //   icon: "success",
    //   position: "middle",
    //   toast: true,
    //   timer: 3000, 
    //   timerProgressBar: true,
    //   showConfirmButton: false,
    // });

    Swal.fire({
      title: "Payment Successful!",
      text: "Thank you for your purchase. Your property documents are being processed.",
      icon: "success",
      position: "center", // Use 'center' for a big popup
      // Remove: toast: true 
      // Add: Explicit width/size if needed, otherwise it defaults to a large size
      width: 600, // Optional: Set a specific width (default is ~310px wide for normal popups)
      timer: 5000, // Increased timer for better visibility of the large popup
      timerProgressBar: true,
      showConfirmButton: false, // Keep this if you want it to close automatically

      // Optional: You can also add custom classes for styling
      customClass: {
        popup: 'my-big-success-popup',
        title: 'text-3xl font-bold',
        htmlContainer: 'text-xl'
      }
    });
    setProcessing(false);
    await new Promise(resolve => setTimeout(resolve, 3000));
    navigate("/confirmPayment");
  };

  const isFormValid = cardNumber.replace(/\s/g, '').length === 16 &&
    expiry.length === 5 &&
    cvc.length >= 3 &&
    name.length > 0;

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-500 text-lg">Secure payment powered by industry-leading encryption</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN: Payment Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Payment Method</h2>
                  <p className="text-gray-500">Enter your card details below</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Card Number */}
                  <div className="space-y-2">
                    <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-700">
                      Card Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="cardNumber"
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Name on Card */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
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

                  {/* Expiry and CVC */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="expiry" className="block text-sm font-semibold text-gray-700">
                        Expiry Date
                      </label>
                      <input
                        id="expiry"
                        type="text"
                        className="block w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={handleExpiryChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="cvc" className="block text-sm font-semibold text-gray-700">
                        CVC
                      </label>
                      <input
                        id="cvc"
                        type="text"
                        className="block w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="123"
                        value={cvc}
                        onChange={handleCvcChange}
                        required
                      />
                    </div>
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
                        <span className="text-sm font-medium">Secure Payment</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isFormValid || processing}
                    className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg shadow-md transition-all duration-200 
                      ${!isFormValid || processing
                        ? 'bg-[#e0d0b8] cursor-not-allowed'
                        : 'bg-[#e0d0b8] xhover:bg-[#a68256] hover:shadow-lg transform hover:-translate-y-0.5'
                      }`}
                  >
                    {processing ? 'Processing...' : `Pay $${totalAmount.toLocaleString()}`}
                  </button>

                  <p className="text-xs text-gray-400 text-center mt-4">
                    By clicking Pay, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              </div>
            </div>

            {/* Additional Security Info */}
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

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-8 overflow-hidden">
              <div className="p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                {/* Property Card */}
                <div className="mb-8">
                  <div className="relative h-56 w-full rounded-xl overflow-hidden mb-5 shadow-sm">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{property.title}</h3>
                  <p className="text-gray-500 font-medium">{property.address}</p>
                </div>

                {/* Cost Breakdown */}
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

                {/* Total */}
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