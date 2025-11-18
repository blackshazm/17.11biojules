import { User } from '../domain/user.entity';
import { IUserRepository } from '../domain/user.repository.interface';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: {
    name: string;
    email: string;
    cpf: string;
    password;
    string;
    referrerId?: string;
  }): Promise<User> {
    const { name, email, cpf, password, referrerId } = input;

    if (!User.validateCpf(cpf)) {
      throw new Error('Invalid CPF');
    }

    const existingUserByEmail = await this.userRepository.findByEmail(email);
    if (existingUserByEmail) {
      throw new Error('User with this email already exists');
    }

    const existingUserByCpf = await this.userRepository.findByCpf(cpf);
    if (existingUserByCpf) {
      throw new Error('User with this CPF already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      id: uuidv4(),
      name,
      email,
      cpf,
      passwordHash,
      referrerId,
      commissionRate: 20, // Initial commission rate
      accountStatus: 'active',
    });

    await this.userRepository.save(user);

    return user;
  }
}
