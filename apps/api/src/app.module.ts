import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ReferralModule } from './referral/referral.module';
import { PaymentModule } from './payment/payment.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [UserModule, SubscriptionModule, ReferralModule, PaymentModule],
  providers: [
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
  ],
})
export class AppModule {}
