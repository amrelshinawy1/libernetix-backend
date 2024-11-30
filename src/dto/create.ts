import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  paymentMethod: 'Payform' | 'S2S';

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{16}$/, { message: 'Card number must be 16 digits' })
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  cardholderName: string;

  @IsNotEmpty()
  @Matches(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Expiration date must be in MM/YY format' })
  expirationDate: string;

  @IsNotEmpty()
  @Matches(/^\d{3}$/, { message: 'Security code must be 3 digits' })
  securityCode: string;
}

export class ResponsePaymentDto {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export interface PaymentData {
  securityCode: string;
  expirationDate: string;
  cardholderName: string;
  cardNumber: string;
  paymentMethod: string;
  currency: string;
  amount: number;
}

export interface PurchaseDetails {
  purchaseId: string;
  status: string;
  amount: number;
  currency: string;
  cardholderName: string;
  createdAt: string;
}

export interface RefundData {
  purchaseId: string;
  amount: number;
}
