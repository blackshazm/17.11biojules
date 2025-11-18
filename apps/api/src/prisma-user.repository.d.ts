import { PrismaClient } from '@prisma/client';
import { User } from 'core-users/domain/user.entity';
import { IUserRepository } from 'core-users/domain/user.repository.interface';
export declare class PrismaUserRepository implements IUserRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByCpf(cpf: string): Promise<User | null>;
    save(user: User): Promise<void>;
}
