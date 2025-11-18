import { IUserRepository } from 'core-users';
import { ICommissionRepository } from '../domain/commission.repository.interface';
import { Commission } from '../domain/commission.entity';
import { Payment } from 'core-payments';
import { v4 as uuidv4 } from 'uuid';
import { ISubscriptionRepository } from 'core-subscriptions';

export class GenerateCommissionUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly commissionRepository: ICommissionRepository,
    private readonly subscriptionRepository: ISubscriptionRepository,
  ) {}

  async execute(payment: Payment): Promise<Commission | null> {
    // Rule: Commission is only generated after the second payment.
    if (payment.isFirstPayment) {
      return null;
    }

    const payer = await this.userRepository.findById(payment.userId);
    if (!payer || !payer.referrerId) {
      return null; // No referrer, no commission.
    }

    const beneficiary = await this.userRepository.findById(payer.referrerId);
    if (!beneficiary) {
      return null; // Beneficiary not found.
    }

    const beneficiarySubscription = await this.subscriptionRepository.findByUserId(beneficiary.id);

    // Determine the commission rate based on the beneficiary's status.
    let commissionRate = beneficiary.commissionRate;
    if (beneficiarySubscription?.status === 'Atrasada') {
      // Penalty for late payment
      commissionRate = 10;
    }

    const commissionAmount = payment.amount * (commissionRate / 100);

    // Rule: Commission is released 30 days after generation.
    const releaseDate = new Date();
    releaseDate.setDate(releaseDate.getDate() + 30);

    const commission = new Commission({
      id: uuidv4(),
      beneficiaryId: beneficiary.id,
      payerId: payer.id,
      paymentId: payment.id,
      amount: commissionAmount,
      releaseDate,
    });

    await this.commissionRepository.save(commission);

    return commission;
  }
}
