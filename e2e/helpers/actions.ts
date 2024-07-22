import {ILocator} from '../dataTypes/uiDataTypes/dataTypes';
import {Locator, test} from '@playwright/test';
import {ElementUtils} from './elementUtils';

export class Actions {
  static async clickByLocator(locator: ILocator, index: number = 0): Promise<void> {
    await test.step(`The user clicks on the '${locator.definition}' locator: '${locator.value}'`, async() => {
      const pageElement: Locator = await ElementUtils.getElementByLocator(locator, index);
      await pageElement.click();
    });
  }

  static async typeTextInLocatorSequentially(locator: ILocator, text: string, index: number = 0): Promise<void> {
    await test.step(`The user types the value '${text}' sequentially in the '${locator.definition}' locator: '${locator.value}'`, async() => {
      const pageElement: Locator = await ElementUtils.getElementByLocator(locator, index);
      await pageElement.pressSequentially(text);
    });
  }

  static async scrollIntoViewByLocator(locator: ILocator, index: number = 0): Promise<void> {
    await test.step(`The user scrolls to the '${locator.definition}' locator: '${locator.value}'`, async() => {
      const pageElement: Locator = await ElementUtils.getElementByLocator(locator, index);
      await pageElement.scrollIntoViewIfNeeded();
    });
  }
}
