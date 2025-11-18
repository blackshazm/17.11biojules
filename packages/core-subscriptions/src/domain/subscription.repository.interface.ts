import { Subscription } from './subscription.entity';

export interface ISubscriptionRepository {
  findById(id: string): Promise<Subscription | null>;
  findByUserId(userId: string): Promise<Subscription | null>;
  save(subscription: Subscription): Promise<void>;
}
