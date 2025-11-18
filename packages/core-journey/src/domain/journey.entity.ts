export class Journey {
  id: string;
  userId: string;
  completedSteps: number;
  totalSteps: number;

  constructor(props: {
    id: string;
    userId: string;
    completedSteps?: number;
    totalSteps?: number;
  }) {
    this.id = props.id;
    this.userId = props.userId;
    this.completedSteps = props.completedSteps ?? 0;
    this.totalSteps = props.totalSteps ?? 10;
  }

  public completeStep(): void {
    if (this.isComplete()) {
      throw new Error('Journey is already complete.');
    }
    this.completedSteps++;
  }

  public isComplete(): boolean {
    return this.completedSteps >= this.totalSteps;
  }

  public getProgress(): number {
    return (this.completedSteps / this.totalSteps) * 100;
  }
}
