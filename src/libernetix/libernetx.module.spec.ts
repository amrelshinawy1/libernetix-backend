import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PaymentModule } from './libernetix.module';

describe('PaymentController (e2e)', () => {
  let app: INestApplication;

  const mockPaymentDto = {
    amount: 100,
    currency: 'EUR',
    paymentMethod: 'Payform',
    cardNumber: '1234567812345678',
    cardholderName: 'John Doe',
    expirationDate: '12/25',
    securityCode: '123',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PaymentModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /payment (success)', async () => {
    const mockResponse = { success: true, message: 'Payment processed successfully', data: { status: 'success' } };

    jest.spyOn(require('axios'), 'post').mockResolvedValueOnce({ data: mockResponse.data });

    const response = await request(app.getHttpServer())
      .post('/payment')
      .send(mockPaymentDto)
      .expect(201);

    expect(response.body).toEqual(mockResponse);
  });

  it('POST /payment (failure)', async () => {
    jest.spyOn(require('axios'), 'post').mockRejectedValueOnce({
      response: { data: { error: 'Invalid card details' } },
    });

    const response = await request(app.getHttpServer())
      .post('/payment')
      .send(mockPaymentDto)
      .expect(400);

    expect(response.body).toEqual({
      success: false,
      message: 'Payment failed. Please try again.',
      error: { error: 'Invalid card details' },
    });
  });
});
