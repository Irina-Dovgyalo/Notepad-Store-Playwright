import {ILocator} from '../dataTypes/uiDataTypes/dataTypes';
import {Locator} from '@playwright/test';
import {ElementUtils} from './elementUtils';

export class Actions {
  private static timeout: 15000;

  static async clickByLocator(locator: ILocator, timeout: number = this.timeout, index: number = 0): Promise<void> {
    const pageElement: Locator = await ElementUtils.getElementByLocator(locator, index);
    await pageElement.click();
  }

  static async typeTextInLocatorSequentiallyAndPressEnter(locator: ILocator, text: string, index: number = 0): Promise<void> {
    const pageElement: Locator = await ElementUtils.getElementByLocator(locator, index);
    await pageElement.pressSequentially(text);
    await pageElement.press('Enter');
  }

  static async typeTextInLocator(locator: Locator, text: string, index: number = 0): Promise<void> {
    await locator.nth(index).click();
    await locator.nth(index).fill(text);
  }
}
