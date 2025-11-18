import { Controller, Post, Body, Req, HttpStatus, HttpCode } from '@nestjs/common';
import { GenerateCommissionUseCase } from 'core-referrals';
import { Payment } from 'core-payments';

@Controller('payments')
export class PaymentController {
  constructor(private readonly generateCommissionUseCase: GenerateCommissionUseCase) {}

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(@Body() paymentData: any) {
    // In a real application, this would involve validating the webhook signature
    // and mapping the incoming data to our Payment entity.
    const payment = new Payment({
      id: paymentData.id,
      userId: paymentData.userId,
      subscriptionId: paymentData.subscriptionId,
      amount: paymentData.amount,
      isFirstPayment: paymentData.isFirstPayment,
    });

    await this.generateCommissionUseCase.execute(payment);
  }
}
