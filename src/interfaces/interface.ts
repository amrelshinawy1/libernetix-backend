export interface PaymentData {
    amount: number;
    currency: string;
    paymentMethod: 'Payform' | 'S2S';
    cardNumber: string;
    cardholderName: string;
    expirationDate: string;
    securityCode: string;
  }
  