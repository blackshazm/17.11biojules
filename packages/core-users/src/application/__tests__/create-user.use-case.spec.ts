import { CreateUserUseCase } from '../create-user.use-case';
import { User } from '../../domain/user.entity';
import { IUserRepository } from '../../domain/user.repository.interface';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

jest.mock('bcrypt');
jest.mock('uuid');

const mockUserRepository: jest.Mocked<IUserRepository> = {
  findById: jest.fn(),
  findByEmail: jest.fn(),
  findByCpf: jest.fn(),
  save: jest.fn(),
};

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(User, 'validateCpf').mockReturnValue(true);
    createUserUseCase = new CreateUserUseCase(mockUserRepository);
    (uuidv4 as jest.Mock).mockReturnValue('a-unique-id');
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
  });

  it('should create a user successfully', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.findByCpf.mockResolvedValue(null);
    mockUserRepository.save.mockResolvedValue(undefined);

    const input = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      cpf: '12345678901',
      password: 'password123',
    };

    const user = await createUserUseCase.execute(input);

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe('a-unique-id');
    expect(user.name).toBe(input.name);
    expect(user.email).toBe(input.email);
    expect(user.cpf).toBe(input.cpf);
    expect(user.passwordHash).toBe('hashed-password');
    expect(user.commissionRate).toBe(20);
    expect(user.accountStatus).toBe('active');
    expect(mockUserRepository.save).toHaveBeenCalledWith(user);
  });

  it('should throw an error if CPF is invalid', async () => {
    jest.spyOn(User, 'validateCpf').mockReturnValue(false);
    const input = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      cpf: '11111111111', // Invalid CPF
      password: 'password123',
    };
    await expect(createUserUseCase.execute(input)).rejects.toThrow('Invalid CPF');
  });

  it('should throw an error if email already exists', async () => {
    const existingUser = new User({
        id: 'existing-id',
        name: 'Jane Doe',
        email: 'john.doe@example.com',
        cpf: '98765432109',
        passwordHash: 'existing-hash'
    });
    mockUserRepository.findByEmail.mockResolvedValue(existingUser);

    const input = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      cpf: '12345678901',
      password: 'password123',
    };

    await expect(createUserUseCase.execute(input)).rejects.toThrow('User with this email already exists');
  });

  it('should throw an error if CPF already exists', async () => {
    const existingUser = new User({
        id: 'existing-id',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        cpf: '12345678901',
        passwordHash: 'existing-hash'
    });
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.findByCpf.mockResolvedValue(existingUser);

    const input = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      cpf: '12345678901',
      password: 'password123',
    };

    await expect(createUserUseCase.execute(input)).rejects.toThrow('User with this CPF already exists');
  });
});
