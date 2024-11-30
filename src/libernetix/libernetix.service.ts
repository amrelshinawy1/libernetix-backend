import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import { PaymentData, RefundData } from '../dto/create';

@Injectable()
export class PaymentService {

  constructor(private readonly paymentRepository: PaymentRepository) {}

  async processPurchase(paymentData: PaymentData) {
    try {
      if (!paymentData.amount || paymentData.amount <= 0) {
        throw new Error('Invalid payment amount');
      }
      const purchaseResult = await this.paymentRepository.createPurchase(paymentData);
      return purchaseResult;
    } catch (error) {
      throw new Error(`Error processing purchase: ${error.message}`);
    }
  }

  async fetchPurchaseDetails(purchaseId: string) {
    try {
      const details = await this.paymentRepository.getPurchaseDetails(purchaseId);
      return details;
    } catch (error) {
      throw new Error(`Error fetching purchase details: ${error.message}`);
    }
  }

  async processRefund(refundData: RefundData) {
    try {
      const refundResult = await this.paymentRepository.refundPurchase(refundData);
      return refundResult;
    } catch (error) {
      throw new Error(`Error processing refund: ${error.message}`);
    }
  }
}
