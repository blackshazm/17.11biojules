import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { GenerateCommissionUseCase } from 'core-referrals';
import { ICommissionRepository } from 'core-referrals';
import { PrismaCommissionRepository } from '../prisma-commission.repository';
import { IUserRepository } from 'core-users';
import { PrismaUserRepository } from '../prisma-user.repository';
import { ISubscriptionRepository } from 'core-subscriptions';
import { PrismaSubscriptionRepository } from '../prisma-subscription.repository';
import { PrismaClient } from '@prisma/client';
import { ReferralModule } from '../referral/referral.module';

@Module({
  imports: [ReferralModule],
  controllers: [PaymentController],
  providers: [
    {
        provide: PrismaClient,
        useValue: new PrismaClient(),
    },
    {
        provide: 'ICommissionRepository',
        useClass: PrismaCommissionRepository,
    },
    {
        provide: 'IUserRepository',
        useClass: PrismaUserRepository,
    },
    {
        provide: 'ISubscriptionRepository',
        useClass: PrismaSubscriptionRepository,
    },
    {
        provide: GenerateCommissionUseCase,
        useFactory: (userRepository: IUserRepository, commissionRepository: ICommissionRepository, subscriptionRepository: ISubscriptionRepository) => {
            return new GenerateCommissionUseCase(userRepository, commissionRepository, subscriptionRepository);
        },
        inject: ['IUserRepository', 'ICommissionRepository', 'ISubscriptionRepository'],
    },
  ]
})
export class PaymentModule {}
