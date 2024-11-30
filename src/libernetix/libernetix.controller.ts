import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { PaymentService } from './libernetix.service';
import { PaymentData, RefundData } from '../dto/create';

@Controller('')
export class PaymentController {

  constructor(private readonly paymentService: PaymentService) {}

  @Post('pay')
  async createPurchase(@Body() paymentData: PaymentData) {
    try {
      const result = await this.paymentService.processPurchase(paymentData);
      return { status: 'success', data: result };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Get('details/:purchaseId')
  async getPurchaseDetails(@Param('purchaseId') purchaseId: string) {
    try {
      const details = await this.paymentService.fetchPurchaseDetails(purchaseId);
      return { status: 'success', data: details };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Post('refund')
  async refundPurchase(@Body() refundData: RefundData) {
    try {
      const result = await this.paymentService.processRefund(refundData);
      return { status: 'success', data: result };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }
}
