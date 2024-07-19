export class StringUtils {
  static getStringBySplit(value: string, separator: string = '', index: number = 0): string {
    return value.split(separator)[index];
  }

  static replaceAllStringForValue(value: string, strToReplace: any, symbol: any = ''): string {
    const reg: RegExp = new RegExp(strToReplace, 'g');

    return value.replace(reg, `${symbol}`);
  }

  static getMatchStringByRegExp(stringForMatch: string, matcher: RegExp, index: number = 0): string {
    return stringForMatch.match(matcher)[index];
  }

  static getStringFromValue(value: any): string {
    return String(value);
  }

  static getStringByJoin(value: string[], separator: string = ''): string {
    return value.join(separator);
  }
}
