import { IJourneyRepository } from '../domain/journey.repository.interface';
import { IUserRepository } from 'core-users';
import { Journey } from '../domain/journey.entity';
import { v4 as uuidv4 } from 'uuid';

export class CompleteStepUseCase {
  constructor(
    private readonly journeyRepository: IJourneyRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<Journey> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }

    let journey = await this.journeyRepository.findByUserId(userId);
    if (!journey) {
      journey = new Journey({ id: uuidv4(), userId });
    }

    if (journey.isComplete()) {
      return journey; // Already at max commission rate
    }

    journey.completeStep();

    // Each step increases commission rate by 1%, starting from 20% up to 30%.
    const newCommissionRate = 20 + journey.completedSteps;
    user.commissionRate = Math.min(newCommissionRate, 30); // Cap at 30%

    await this.userRepository.save(user);
    await this.journeyRepository.save(journey);

    return journey;
  }
}
