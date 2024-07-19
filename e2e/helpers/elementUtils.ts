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

  static async getElementListByLocator(locator: ILocator): Promise<Locator[]> {
    try {
      return await locator.value.all();
    } catch (e) {
      throw new Error(`${e}. Unable to get locator '${locator.value}'`);
    }
  }

  static async getTextByLocator(locator: ILocator, index: number = 0): Promise<string> {
    try {
      const pageElement: any = await locator.value.nth(index);

      return await pageElement.textContent();
    } catch (e) {
      throw new Error(`${e}. Unable to get locator '${locator.value}'`);
    }
  }

  static async getTextListByLocator(locator: ILocator): Promise<string[]> {
    try {
     return await locator.value.allTextContents();
    } catch (e) {
      throw new Error(`${e}. Unable to get locator '${locator.value}'`);
    }
  }
}
