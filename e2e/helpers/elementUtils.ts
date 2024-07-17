import {Locator} from '@playwright/test';
import {ILocator} from '../dataTypes/uiDataTypes/dataTypes';

export class ElementUtils {

  static async getElementByLocator(locator: ILocator, index: number = 0): Promise<Locator> {
    try {
      return await locator.value.nth(index);
    } catch (e) {
      throw new Error(`${e}. Unable to get locator '${locator.value}'`);
    }
  }
}
