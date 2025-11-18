export type AccountStatus = 'active' | 'pending' | 'blocked';

export class User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  passwordHash: string;
  referrerId?: string;
  commissionRate: number;
  accountStatus: AccountStatus;

  constructor(props: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    passwordHash: string;
    referrerId?: string;
    commissionRate?: number;
    accountStatus?: AccountStatus;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.cpf = this.formatCpf(props.cpf);
    this.passwordHash = props.passwordHash;
    this.referrerId = props.referrerId;
    this.commissionRate = props.commissionRate ?? 20; // Default to 20%
    this.accountStatus = props.accountStatus ?? 'pending';
  }

  private formatCpf(cpf: string): string {
    const cleanedCpf = cpf.replace(/\D/g, '');
    if (cleanedCpf.length !== 11) {
      throw new Error('Invalid CPF format');
    }
    return cleanedCpf;
  }

  public static validateCpf(cpf: string): boolean {
    const cleanedCpf = cpf.replace(/\D/g, '');
    if (cleanedCpf.length !== 11 || /^(\d)\1+$/.test(cleanedCpf)) {
      return false;
    }
    let sum = 0;
    let remainder: number;
    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cleanedCpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cleanedCpf.substring(9, 10))) {
      return false;
    }
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cleanedCpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cleanedCpf.substring(10, 11))) {
      return false;
    }
    return true;
  }
}
