import axios from "axios";

const API_URL = "https://estatehub.duckdns.org";

const API = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach token automatically for authenticated requests
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface CreatePaymentIntentRequest {
    amount: number;
    propertyId: string;
    currency?: string;
}

export interface CreatePaymentIntentResponse {
    success: boolean;
    clientSecret: string;
    paymentIntentId: string;
}

export interface ConfirmPaymentRequest {
    paymentIntentId: string;
    propertyId: string;
}

export interface ConfirmPaymentResponse {
    success: boolean;
    message: string;
    data?: {
        transactionId: string;
        property: any;
        amount: number;
    };
}

/**
 * Create a Stripe Payment Intent on the backend
 */
export const createPaymentIntent = async (
    data: CreatePaymentIntentRequest
): Promise<CreatePaymentIntentResponse> => {
    const response = await API.post("/api/payments/create-payment-intent", {
        amount: data.amount,
    });
    return response.data;
};

/**
 * Confirm payment was successful and mark property as sold
 */
export const confirmPayment = async (
    data: ConfirmPaymentRequest
): Promise<ConfirmPaymentResponse> => {
    const response = await API.post("/api/payments/confirm-payment", data);
    return response.data;
};

export const stripeService = {
    createPaymentIntent,
    confirmPayment,
};
