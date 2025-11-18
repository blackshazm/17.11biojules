import { Module } from '@nestjs/common';
import { CreateSubscriptionUseCase } from 'core-subscriptions';
import { PrismaSubscriptionRepository } from '../prisma-subscription.repository';
import { ISubscriptionRepository } from 'core-subscriptions';
import { PrismaClient } from '@prisma/client';
import { IUserRepository } from 'core-users';
import { PrismaUserRepository } from '../prisma-user.repository';
import { SubscriptionController } from './subscription.controller';

@Module({
  controllers: [SubscriptionController],
  providers: [
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
    {
      provide: 'ISubscriptionRepository',
      useClass: PrismaSubscriptionRepository,
    },
    {
        provide: 'IUserRepository',
        useClass: PrismaUserRepository,
    },
    {
      provide: CreateSubscriptionUseCase,
      useFactory: (subscriptionRepository: ISubscriptionRepository, userRepository: IUserRepository) => {
        return new CreateSubscriptionUseCase(subscriptionRepository, userRepository);
      },
      inject: ['ISubscriptionRepository', 'IUserRepository'],
    },
  ],
})
export class SubscriptionModule {}
