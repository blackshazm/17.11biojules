import { CreateSubscriptionUseCase } from '../create-subscription.use-case';
import { Subscription } from '../../domain/subscription.entity';
import { ISubscriptionRepository } from '../../domain/subscription.repository.interface';
import { IUserRepository } from 'core-users';
import { User } from 'core-users';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid');

const mockSubscriptionRepository: jest.Mocked<ISubscriptionRepository> = {
  findById: jest.fn(),
  findByUserId: jest.fn(),
  save: jest.fn(),
};

const mockUserRepository: jest.Mocked<IUserRepository> = {
    findById: jest.fn(),
    findByEmail: jest.fn(),
    findByCpf: jest.fn(),
    save: jest.fn(),
};

describe('CreateSubscriptionUseCase', () => {
  let createSubscriptionUseCase: CreateSubscriptionUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    createSubscriptionUseCase = new CreateSubscriptionUseCase(
      mockSubscriptionRepository,
      mockUserRepository
    );
    (uuidv4 as jest.Mock).mockReturnValue('a-unique-subscription-id');
  });

  it('should create a subscription successfully for a new user', async () => {
    const user = new User({ id: 'user-id', name: 'Test User', email: 'test@test.com', cpf: '12345678901', passwordHash: 'hash' });
    mockUserRepository.findById.mockResolvedValue(user);
    mockSubscriptionRepository.findByUserId.mockResolvedValue(null);
    mockSubscriptionRepository.save.mockResolvedValue(undefined);

    const input = {
      userId: 'user-id',
      dueDate: new Date(),
    };

    const subscription = await createSubscriptionUseCase.execute(input);

    expect(subscription).toBeInstanceOf(Subscription);
    expect(subscription.id).toBe('a-unique-subscription-id');
    expect(subscription.userId).toBe(input.userId);
    expect(subscription.status).toBe('Ativa');
    expect(mockSubscriptionRepository.save).toHaveBeenCalledWith(subscription);
  });

  it('should throw an error if the user already has an active subscription', async () => {
    const user = new User({ id: 'user-id', name: 'Test User', email: 'test@test.com', cpf: '12345678901', passwordHash: 'hash' });
    const existingSubscription = new Subscription({ id: 'sub-id', userId: 'user-id', dueDate: new Date() });
    mockUserRepository.findById.mockResolvedValue(user);
    mockSubscriptionRepository.findByUserId.mockResolvedValue(existingSubscription);

    const input = {
      userId: 'user-id',
      dueDate: new Date(),
    };

    await expect(createSubscriptionUseCase.execute(input)).rejects.toThrow(
      'User already has an active subscription.',
    );
  });

  it('should create a subscription if the user has a cancelled subscription', async () => {
    const user = new User({ id: 'user-id', name: 'Test User', email: 'test@test.com', cpf: '12345678901', passwordHash: 'hash' });
    const cancelledSubscription = new Subscription({ id: 'sub-id', userId: 'user-id', dueDate: new Date(), status: 'Cancelada' });
    mockUserRepository.findById.mockResolvedValue(user);
    mockSubscriptionRepository.findByUserId.mockResolvedValue(cancelledSubscription);
    mockSubscriptionRepository.save.mockResolvedValue(undefined);

    const input = {
      userId: 'user-id',
      dueDate: new Date(),
    };

    const subscription = await createSubscriptionUseCase.execute(input);
    expect(subscription).toBeInstanceOf(Subscription);
    expect(mockSubscriptionRepository.save).toHaveBeenCalledWith(subscription);
  });


  it('should throw an error if user is not found', async () => {
    mockUserRepository.findById.mockResolvedValue(null);

    const input = {
        userId: 'non-existent-user-id',
        dueDate: new Date(),
    };

    await expect(createSubscriptionUseCase.execute(input)).rejects.toThrow('User not found.');
  });
});
