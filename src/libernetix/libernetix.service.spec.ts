import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './libernetix.service';
import axios from 'axios';
import { HttpException } from '@nestjs/common';
import { CreatePaymentDto } from '../dto/create';

jest.mock('axios');

describe('PaymentService', () => {
  let service: PaymentService;
  const mockApiUrl = 'https://mockapi.com';
  const mockPaymentDto: CreatePaymentDto = {
    amount: 100,
    currency: 'EUR',
    paymentMethod: 'Payform',
    cardNumber: '1234567812345678',
    cardholderName: 'John Doe',
    expirationDate: '12/25',
    securityCode: '123',
  };

  beforeEach(async () => {
    process.env.REACT_APP_API_URL = mockApiUrl;

    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should process payment successfully', async () => {
    const mockResponse = { data: { status: 'success' } };
    jest.spyOn(axios, 'post').mockResolvedValueOnce(mockResponse);

    const result = await service.processPurchase(mockPaymentDto);

    expect(axios.post).toHaveBeenCalledWith(`${mockApiUrl}/pay`, mockPaymentDto);
    expect(result).toEqual({
      success: true,
      message: 'Payment processed successfully',
      data: mockResponse.data,
    });
  });

  it('should handle payment failure', async () => {
    jest.spyOn(axios, 'post').mockRejectedValueOnce({
      response: { data: { error: 'Invalid card details' } },
    });

    await expect(service.processPurchase(mockPaymentDto)).rejects.toThrow(
      new HttpException(
        {
          success: false,
          message: 'Payment failed. Please try again.',
          error: { error: 'Invalid card details' },
        },
        400,
      ),
    );

    expect(axios.post).toHaveBeenCalledWith(`${mockApiUrl}/pay`, mockPaymentDto);
  });
});
