import { Journey } from './journey.entity';

export interface IJourneyRepository {
  findByUserId(userId: string): Promise<Journey | null>;
  save(journey: Journey): Promise<void>;
}
