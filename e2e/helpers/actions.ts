import {ILocator} from '../dataTypes/uiDataTypes/dataTypes';
import {Locator} from '@playwright/test';
import {ElementUtils} from './elementUtils';

export class Actions {
  private static timeout: 2000;

  static async clickByLocator(locator: ILocator, index: number = 0, options?: {}): Promise<void> {
    const pageElement: Locator = await ElementUtils.getElementByLocator(locator, index);
    await pageElement.click();
    await pageElement.waitFor(options);
  }

  static async pressEnterByLocator(locator: ILocator, index: number = 0): Promise<void> {
    const pageElement: Locator = await ElementUtils.getElementByLocator(locator, index);
    await pageElement.press('Enter');
  }

  static async typeTextInLocatorSequentially(locator: ILocator, text: string, index: number = 0): Promise<void> {
    const pageElement: Locator = await ElementUtils.getElementByLocator(locator, index);
    await pageElement.pressSequentially(text);
  }

  static async typeTextInLocator(locator: ILocator, text: string, index: number = 0): Promise<void> {
    const pageElement: Locator = await ElementUtils.getElementByLocator(locator, index);
    await pageElement.fill(text);
  }
}
