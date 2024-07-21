export class ArrayUtils {
  static getArrayValueBySlice(arrayValue: any[], from: number, to?: number): any[] {
    return arrayValue.slice(from, to);
  }
}
