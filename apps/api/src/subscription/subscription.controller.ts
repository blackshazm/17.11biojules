import { Controller, Post, Body, ConflictException, HttpStatus, HttpCode, Req } from '@nestjs/common';
import { CreateSubscriptionUseCase } from 'core-subscriptions';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly createSubscriptionUseCase: CreateSubscriptionUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() request: any, @Body() body: { dueDate: string }) {
    try {
      // In a real application, the userId would come from an authentication guard
      const userId = request.user.id;
      const subscription = await this.createSubscriptionUseCase.execute({ userId, dueDate: new Date(body.dueDate) });
      return subscription;
    } catch (error: any) {
      if (error.message.includes('already has an active subscription')) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }
}
