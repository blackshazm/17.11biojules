import { Module } from '@nestjs/common';
import { GenerateCommissionUseCase } from 'core-referrals';
import { PrismaCommissionRepository } from '../prisma-commission.repository';
import { ICommissionRepository } from 'core-referrals';
import { PrismaClient } from '@prisma/client';
import { IUserRepository } from 'core-users';
import { PrismaUserRepository } from '../prisma-user.repository';
import { ISubscriptionRepository } from 'core-subscriptions';
import { PrismaSubscriptionRepository } from '../prisma-subscription.repository';

@Module({
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
  ],
})
export class ReferralModule {}
