export class DroneCommandModel {
  public timeoutId: NodeJS.Timeout | null = null;

  constructor(
    public priority: 1 | 0,
    public command: string
  ) {}

  public process(cb: () => void): void {
    this.timeoutId = setTimeout(() => {
      clearTimeout(this.timeoutId);
      cb();
    }, 200);
  }
}
