import { Module } from '@nestjs/common';
import { PaymentService } from './libernetix.service';
import { PaymentController } from './libernetix.controller';
import { PaymentRepository } from './payment.repository';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository],
})
export class PaymentModule {}

export class ResponsePaymentDto {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}
