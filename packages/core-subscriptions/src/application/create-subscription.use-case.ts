import { Subscription } from '../domain/subscription.entity';
import { ISubscriptionRepository } from '../domain/subscription.repository.interface';
import { v4 as uuidv4 } from 'uuid';
import { IUserRepository } from 'core-users';

export class CreateSubscriptionUseCase {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: { userId: string; dueDate: Date }): Promise<Subscription> {
    const { userId, dueDate } = input;

    const user = await this.userRepository.findById(userId);
    if (!user) {
        throw new Error('User not found.');
    }

    const existingSubscription = await this.subscriptionRepository.findByUserId(userId);
    if (existingSubscription && !existingSubscription.isCancelled()) {
      throw new Error('User already has an active subscription.');
    }

    const subscription = new Subscription({
      id: uuidv4(),
      userId,
      dueDate,
    });

    await this.subscriptionRepository.save(subscription);

    return subscription;
  }
}
