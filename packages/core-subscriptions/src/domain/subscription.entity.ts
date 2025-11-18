export type SubscriptionStatus = 'Ativa' | 'Atrasada' | 'Cancelada';

export class Subscription {
  id: string;
  userId: string;
  status: SubscriptionStatus;
  startDate: Date;
  dueDate: Date; // The day of the month the subscription is due

  constructor(props: {
    id: string;
    userId: string;
    status?: SubscriptionStatus;
    startDate?: Date;
    dueDate: Date;
  }) {
    this.id = props.id;
    this.userId = props.userId;
    this.status = props.status ?? 'Ativa';
    this.startDate = props.startDate ?? new Date();
    this.dueDate = props.dueDate;
  }

  public cancel(): void {
    if (this.status === 'Cancelada') {
      throw new Error('Subscription is already cancelled.');
    }
    this.status = 'Cancelada';
  }

  public markAsOverdue(): void {
    if (this.status === 'Cancelada') {
        throw new Error('Cannot mark a cancelled subscription as overdue.');
    }
    this.status = 'Atrasada';
  }

  public activate(): void {
    if (this.status === 'Cancelada') {
        throw new Error('Cannot activate a cancelled subscription.');
    }
    this.status = 'Ativa';
  }

  public isCancelled(): boolean {
    return this.status === 'Cancelada';
  }
}
