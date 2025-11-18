import { Commission } from './commission.entity';

export interface ICommissionRepository {
  findById(id: string): Promise<Commission | null>;
  findByPaymentId(paymentId: string): Promise<Commission | null>;
  save(commission: Commission): Promise<void>;
  // Additional methods might be needed for querying commissions
}
