export class Payment {
  id: string;
  userId: string;
  subscriptionId: string;
  amount: number;
  paymentDate: Date;
  isFirstPayment: boolean; // This is a simplification; a real system would check payment history.

  constructor(props: {
    id: string;
    userId: string;
    subscriptionId: string;
    amount: number;
    paymentDate?: Date;
    isFirstPayment?: boolean;
  }) {
    this.id = props.id;
    this.userId = props.userId;
    this.subscriptionId = props.subscriptionId;
    this.amount = props.amount;
    this.paymentDate = props.paymentDate ?? new Date();
    this.isFirstPayment = props.isFirstPayment ?? false;
  }
}
