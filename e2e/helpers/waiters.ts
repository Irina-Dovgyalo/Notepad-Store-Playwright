import {ILocator} from '../dataTypes/uiDataTypes/dataTypes';
import {expect, Locator} from '@playwright/test';

export class Waiters {
  private static timeout: 15000;

  static async waitForElementToBeVisible(locator: ILocator, timeout: number = this.timeout, index: number = 0): Promise<void> {
    const pageElement: Locator = await locator.value.nth(index);

    await expect(pageElement, `The element with locator '${locator.value}' isn't visible after wait timeout`).toBeVisible({timeout});
  }

  static async waitForElementToBeNotVisible(locator: Locator, timeout: number = this.timeout, index: number = 0): Promise<void> {
    const pageElement: Locator = await locator.nth(index);

    await expect(pageElement, `The element with locator '${locator}' isn't visible after wait timeout`).toBeHidden({timeout});
  }

  static async waitForElementToBeEnabled(locator: ILocator, index: number = 0): Promise<void> {
    const pageElement: Locator = await locator.value.nth(index);

    await expect(pageElement, `The element with locator '${locator.value}' isn't visible after wait timeout`).toBeEnabled();
  }
}
