import { Injectable } from '@nestjs/common';
import { PrismaClient, Commission as PrismaCommission } from '@prisma/client';
import { Commission, CommissionStatus } from 'core-referrals';
import { ICommissionRepository } from 'core-referrals';

@Injectable()
export class PrismaCommissionRepository implements ICommissionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  private toDomain(prismaCommission: PrismaCommission): Commission {
    return new Commission({
      ...prismaCommission,
      status: prismaCommission.status as CommissionStatus,
    });
  }

  async findById(id: string): Promise<Commission | null> {
    const commission = await this.prisma.commission.findUnique({ where: { id } });
    return commission ? this.toDomain(commission) : null;
  }

  async findByPaymentId(paymentId: string): Promise<Commission | null> {
    const commission = await this.prisma.commission.findUnique({ where: { paymentId } });
    return commission ? this.toDomain(commission) : null;
  }

  async save(commission: Commission): Promise<void> {
    const { id, ...data } = commission;
    await this.prisma.commission.upsert({
      where: { id },
      update: data,
      create: { id, ...data },
    });
  }
}
