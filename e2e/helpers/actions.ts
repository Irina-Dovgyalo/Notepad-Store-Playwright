import {ILocator} from '../dataTypes/uiDataTypes/dataTypes';
import {Locator} from '@playwright/test';
import {ElementUtils} from './elementUtils';

export class Actions {
  static async clickByLocator(locator: ILocator, index: number = 0): Promise<void> {
    const pageElement: Locator = await ElementUtils.getElementByLocator(locator, index);
    await pageElement.click();
  }

  static async typeTextInLocatorSequentially(locator: ILocator, text: string, index: number = 0): Promise<void> {
    const pageElement: Locator = await ElementUtils.getElementByLocator(locator, index);
    await pageElement.pressSequentially(text);
  }

  static async typeTextInLocator(locator: ILocator, text: string, index: number = 0): Promise<void> {
    const pageElement: Locator = await ElementUtils.getElementByLocator(locator, index);
    await pageElement.clear();
    await pageElement.fill(text);
    await pageElement.click();
  }
}
