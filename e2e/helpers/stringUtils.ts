export class StringUtils {
  static getStringBySplit(value: string, separator: string = '', index: number = 0): string {
    return value.split(separator)[index];
  }
}
