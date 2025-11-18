import { CompleteStepUseCase } from '../complete-step.use-case';
import { IJourneyRepository } from '../../domain/journey.repository.interface';
import { IUserRepository, User } from 'core-users';
import { Journey } from '../../domain/journey.entity';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid');

const mockJourneyRepository: jest.Mocked<IJourneyRepository> = {
  findByUserId: jest.fn(),
  save: jest.fn(),
};

const mockUserRepository: jest.Mocked<IUserRepository> = {
  findById: jest.fn(),
  findByEmail: jest.fn(),
  findByCpf: jest.fn(),
  save: jest.fn(),
};

describe('CompleteStepUseCase', () => {
  let completeStepUseCase: CompleteStepUseCase;
  const validCpf = '12345678901';

  beforeEach(() => {
    jest.clearAllMocks();
    completeStepUseCase = new CompleteStepUseCase(
      mockJourneyRepository,
      mockUserRepository,
    );
    (uuidv4 as jest.Mock).mockReturnValue('a-unique-journey-id');
  });

  it('should complete a step and increase commission rate', async () => {
    const user = new User({ id: 'user-id', name: 'Test User', email: 'test@test.com', cpf: validCpf, passwordHash: 'h', commissionRate: 20 });
    const journey = new Journey({ id: 'journey-id', userId: 'user-id', completedSteps: 0 });

    mockUserRepository.findById.mockResolvedValue(user);
    mockJourneyRepository.findByUserId.mockResolvedValue(journey);

    const updatedJourney = await completeStepUseCase.execute('user-id');

    expect(updatedJourney.completedSteps).toBe(1);
    expect(user.commissionRate).toBe(21);
    expect(mockUserRepository.save).toHaveBeenCalledWith(expect.objectContaining({ commissionRate: 21 }));
    expect(mockJourneyRepository.save).toHaveBeenCalledWith(updatedJourney);
  });

  it('should create a new journey if one does not exist', async () => {
    const user = new User({ id: 'user-id', name: 'Test User', email: 'test@test.com', cpf: validCpf, passwordHash: 'h', commissionRate: 20 });

    mockUserRepository.findById.mockResolvedValue(user);
    mockJourneyRepository.findByUserId.mockResolvedValue(null);

    const newJourney = await completeStepUseCase.execute('user-id');

    expect(newJourney.id).toBe('a-unique-journey-id');
    expect(newJourney.completedSteps).toBe(1);
    expect(user.commissionRate).toBe(21);
  });

  it('should cap the commission rate at 30%', async () => {
    const user = new User({ id: 'user-id', name: 'Test User', email: 'test@test.com', cpf: validCpf, passwordHash: 'h', commissionRate: 29 });
    const journey = new Journey({ id: 'journey-id', userId: 'user-id', completedSteps: 9 });

    mockUserRepository.findById.mockResolvedValue(user);
    mockJourneyRepository.findByUserId.mockResolvedValue(journey);

    await completeStepUseCase.execute('user-id');
    expect(user.commissionRate).toBe(30);

    // Complete another step
    await completeStepUseCase.execute('user-id');
    expect(user.commissionRate).toBe(30); // Should remain capped
  });
});
