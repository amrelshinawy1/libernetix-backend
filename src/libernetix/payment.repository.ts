import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PaymentData, RefundData } from '../dto/create';



@Injectable()
export class PaymentRepository {

    private readonly axiosInstance: AxiosInstance;

    constructor() {
        const API_URL = process.env.API_URL;
        const API_KEY = process.env.API_Key;
        // Initialize Axios instance
        this.axiosInstance = axios.create({
            baseURL: API_URL,
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        // Add request interceptor
        this.axiosInstance.interceptors.request.use(
            (config) => {
                // Modify request config before sending (e.g., add headers, log, etc.)
                console.log('Request sent:', config);
                return config; // Must return config
            },
            (error) => {
                // Handle request error
                console.error('Request error:', error);
                return Promise.reject(error);
            }
        );

        // Add response interceptor
        this.axiosInstance.interceptors.response.use(
            (response) => {
                // Modify response data before returning (e.g., logging, transforming, etc.)
                console.log('Response received:', response);
                return response; // Must return response
            },
            (error) => {
                // Handle response error
                console.error('Response error:', error.response || error.message);
                return Promise.reject(error); // Reject the promise with the error
            }
        );
    }

    // Example API call to create a purchase
    async createPurchase(paymentData: PaymentData) {
        try {
            const response = await this.axiosInstance.post('/purchases/', {
                "client": {
                    "email": "amr@test.com"
                },
                "purchase": {
                    "products": [
                        {
                            "name": "test",
                            "price": paymentData.amount
                        }
                    ]
                },
                "brand_id": process.env.Brand_ID
            });
            return response.data;
        } catch (error) {
            throw new Error(`Error creating purchase: ${error.response?.data || error.message}`);
        }
    }

    // Example API call to get purchase details
    async getPurchaseDetails(purchaseId: string) {
        try {
            const response = await this.axiosInstance.get(`/getPurchaseDetails/${purchaseId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching purchase details: ${error.response?.data || error.message}`);
        }
    }

    // Example API call to refund a purchase
    async refundPurchase(refundData: RefundData) {
        try {
            const response = await this.axiosInstance.post('/refundPurchase', refundData);
            return response.data;
        } catch (error) {
            throw new Error(`Error refunding purchase: ${error.response?.data || error.message}`);
        }
    }
}
