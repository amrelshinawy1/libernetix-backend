import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './libernetix.controller';
import { PaymentService } from './libernetix.service';
import { CreatePaymentDto } from '../dto/create';

describe('PaymentController', () => {
  let controller: PaymentController;
  let service: PaymentService;

  const mockPaymentDto: CreatePaymentDto = {
    amount: 100,
    currency: 'EUR',
    paymentMethod: 'Payform',
    cardNumber: '1234567812345678',
    cardholderName: 'John Doe',
    expirationDate: '12/25',
    securityCode: '123',
  };

  const mockResponse = {
    success: true,
    message: 'Payment processed successfully',
    data: { status: 'success' },
  };

  const mockService = {
    processPayment: jest.fn().mockResolvedValue(mockResponse),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [{ provide: PaymentService, useValue: mockService }],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
    service = module.get<PaymentService>(PaymentService);
  });

  it('should process payment and return success', async () => {
    const result = await controller.createPurchase(mockPaymentDto);

    expect(service.processPurchase).toHaveBeenCalledWith(mockPaymentDto);
    expect(result).toEqual(mockResponse);
  });
});
