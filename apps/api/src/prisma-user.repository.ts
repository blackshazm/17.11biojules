import { Injectable } from '@nestjs/common';
import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { User, AccountStatus } from 'core-users';
import { IUserRepository } from 'core-users';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  private toDomain(prismaUser: PrismaUser): User {
    return new User({
      ...prismaUser,
      accountStatus: prismaUser.accountStatus as AccountStatus,
    });
  }

  async findById(id: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({ where: { id } });
    return prismaUser ? this.toDomain(prismaUser) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({ where: { email } });
    return prismaUser ? this.toDomain(prismaUser) : null;
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({ where: { cpf } });
    return prismaUser ? this.toDomain(prismaUser) : null;
  }

  async save(user: User): Promise<void> {
    const prismaUserData = {
      ...user,
      referrerId: user.referrerId ?? null
    };

    await this.prisma.user.upsert({
      where: { id: user.id },
      update: prismaUserData,
      create: prismaUserData,
    });
  }
}
