export type CommissionStatus = 'Pendente' | 'Paga' | 'Cancelada';

export class Commission {
  id: string;
  beneficiaryId: string; // User receiving the commission
  payerId: string; // User whose payment generated the commission
  paymentId: string; // The ID of the payment that triggered this commission
  amount: number;
  status: CommissionStatus;
  generationDate: Date;
  releaseDate: Date; // When the commission is available to be paid out

  constructor(props: {
    id: string;
    beneficiaryId: string;
    payerId: string;
    paymentId: string;
    amount: number;
    status?: CommissionStatus;
    generationDate?: Date;
    releaseDate: Date;
  }) {
    this.id = props.id;
    this.beneficiaryId = props.beneficiaryId;
    this.payerId = props.payerId;
    this.paymentId = props.paymentId;
    this.amount = props.amount;
    this.status = props.status ?? 'Pendente';
    this.generationDate = props.generationDate ?? new Date();
    this.releaseDate = props.releaseDate;
  }

  public canBePaid(): boolean {
      return this.status === 'Pendente' && new Date() >= this.releaseDate;
  }
}
