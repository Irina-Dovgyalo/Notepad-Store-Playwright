export class StepUtils {
  static async addLog(log: string): Promise<void> {
    /* eslint-disable no-console */
    await console.log(log);
    /* eslint-enable no-console */
  }
}
