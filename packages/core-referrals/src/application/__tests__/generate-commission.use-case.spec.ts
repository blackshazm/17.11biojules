import { GenerateCommissionUseCase } from '../generate-commission.use-case';
import { IUserRepository, User } from 'core-users';
import { ICommissionRepository } from '../../domain/commission.repository.interface';
import { ISubscriptionRepository, Subscription } from 'core-subscriptions';
import { Payment } from 'core-payments';
import { Commission } from '../../domain/commission.entity';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid');

const mockUserRepository: jest.Mocked<IUserRepository> = {
  findById: jest.fn(),
  findByEmail: jest.fn(),
  findByCpf: jest.fn(),
  save: jest.fn(),
};

const mockCommissionRepository: jest.Mocked<ICommissionRepository> = {
  findById: jest.fn(),
  findByPaymentId: jest.fn(),
  save: jest.fn(),
};

const mockSubscriptionRepository: jest.Mocked<ISubscriptionRepository> = {
  findById: jest.fn(),
  findByUserId: jest.fn(),
  save: jest.fn(),
};

describe('GenerateCommissionUseCase', () => {
  let generateCommissionUseCase: GenerateCommissionUseCase;
  const validCpf1 = '12345678901';
  const validCpf2 = '10987654321';

  beforeEach(() => {
    jest.clearAllMocks();
    generateCommissionUseCase = new GenerateCommissionUseCase(
      mockUserRepository,
      mockCommissionRepository,
      mockSubscriptionRepository,
    );
    (uuidv4 as jest.Mock).mockReturnValue('a-unique-commission-id');
  });

  it('should not generate a commission for a first payment', async () => {
    const payment = new Payment({ id: 'payment-1', userId: 'payer-id', subscriptionId: 'sub-1', amount: 100, isFirstPayment: true });
    const commission = await generateCommissionUseCase.execute(payment);
    expect(commission).toBeNull();
    expect(mockCommissionRepository.save).not.toHaveBeenCalled();
  });

  it('should generate a commission with the default rate for a second payment', async () => {
    const payer = new User({ id: 'payer-id', name: 'Payer', email: 'payer@test.com', cpf: validCpf1, passwordHash: 'h', referrerId: 'beneficiary-id' });
    const beneficiary = new User({ id: 'beneficiary-id', name: 'Beneficiary', email: 'bene@test.com', cpf: validCpf2, passwordHash: 'h', commissionRate: 30 });
    const beneficiarySubscription = new Subscription({ id: 'sub-bene', userId: 'beneficiary-id', dueDate: new Date(), status: 'Ativa' });

    mockUserRepository.findById.mockResolvedValueOnce(payer).mockResolvedValueOnce(beneficiary);
    mockSubscriptionRepository.findByUserId.mockResolvedValue(beneficiarySubscription);

    const payment = new Payment({ id: 'payment-2', userId: 'payer-id', subscriptionId: 'sub-1', amount: 100, isFirstPayment: false });
    const commission = await generateCommissionUseCase.execute(payment);

    expect(commission).toBeInstanceOf(Commission);
    if(commission){
        expect(commission.amount).toBe(30); // 30% of 100
    }
    expect(mockCommissionRepository.save).toHaveBeenCalledWith(commission);
  });

  it('should apply a penalty rate if the beneficiary subscription is overdue', async () => {
    const payer = new User({ id: 'payer-id', name: 'Payer', email: 'payer@test.com', cpf: validCpf1, passwordHash: 'h', referrerId: 'beneficiary-id' });
    const beneficiary = new User({ id: 'beneficiary-id', name: 'Beneficiary', email: 'bene@test.com', cpf: validCpf2, passwordHash: 'h', commissionRate: 30 });
    const beneficiarySubscription = new Subscription({ id: 'sub-bene', userId: 'beneficiary-id', dueDate: new Date(), status: 'Atrasada' });

    mockUserRepository.findById.mockResolvedValueOnce(payer).mockResolvedValueOnce(beneficiary);
    mockSubscriptionRepository.findByUserId.mockResolvedValue(beneficiarySubscription);

    const payment = new Payment({ id: 'payment-2', userId: 'payer-id', subscriptionId: 'sub-1', amount: 100, isFirstPayment: false });
    const commission = await generateCommissionUseCase.execute(payment);

    expect(commission).toBeInstanceOf(Commission);
    if(commission){
        expect(commission.amount).toBe(10); // 10% penalty rate
    }
    expect(mockCommissionRepository.save).toHaveBeenCalledWith(commission);
  });

  it('should not generate a commission if the payer has no referrer', async () => {
    const payer = new User({ id: 'payer-id', name: 'Payer', email: 'payer@test.com', cpf: validCpf1, passwordHash: 'h' }); // No referrerId
    mockUserRepository.findById.mockResolvedValue(payer);

    const payment = new Payment({ id: 'payment-2', userId: 'payer-id', subscriptionId: 'sub-1', amount: 100, isFirstPayment: false });
    const commission = await generateCommissionUseCase.execute(payment);

    expect(commission).toBeNull();
    expect(mockCommissionRepository.save).not.toHaveBeenCalled();
  });
});
