import { Injectable } from '@nestjs/common';
import { PrismaClient, Subscription as PrismaSubscription } from '@prisma/client';
import { Subscription, SubscriptionStatus } from 'core-subscriptions';
import { ISubscriptionRepository } from 'core-subscriptions';

@Injectable()
export class PrismaSubscriptionRepository implements ISubscriptionRepository {
  constructor(private readonly prisma: PrismaClient) {}

    private toDomain(prismaSubscription: PrismaSubscription): Subscription {
        return new Subscription({
            ...prismaSubscription,
            status: prismaSubscription.status as SubscriptionStatus,
        });
    }

  async findById(id: string): Promise<Subscription | null> {
    const subscription = await this.prisma.subscription.findUnique({ where: { id } });
    return subscription ? this.toDomain(subscription) : null;
  }

  async findByUserId(userId: string): Promise<Subscription | null> {
    const subscription = await this.prisma.subscription.findUnique({ where: { userId } });
    return subscription ? this.toDomain(subscription) : null;
  }

  async save(subscription: Subscription): Promise<void> {
    const { id, ...data } = subscription;
    await this.prisma.subscription.upsert({
      where: { id },
      update: data,
      create: { id, ...data },
    });
  }
}
