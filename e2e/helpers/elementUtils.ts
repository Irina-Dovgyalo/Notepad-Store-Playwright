import {Locator} from '@playwright/test';
import {ILocator} from '../dataTypes/uiDataTypes/dataTypes';
import {Waiters} from './waiters';

export class ElementUtils {
  static async getElementByLocator(locator: ILocator, index: number = 0): Promise<Locator> {
    try {
      return await locator.value.nth(index);
    } catch (e) {
      throw new Error(`${e}. Unable to get locator '${locator.value}'`);
    }
  }

  static async getElementWithWaitByLocator(locator: ILocator, index: number = 0): Promise<Locator> {
    try {
      const pageElement: Locator = await locator.value.nth(index);
      await Waiters.waitForElementToBeVisible(locator, index);

      return pageElement;
    } catch (e) {
      throw new Error(`${e}. Unable to get locator`);
    }
  }
}
