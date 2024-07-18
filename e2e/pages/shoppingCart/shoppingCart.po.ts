import {BasePo} from '../common/base.po';
import {Locator, Page} from '@playwright/test';
import {ElementUtils} from '../../helpers/elementUtils';
import {ILocator} from '../../dataTypes/uiDataTypes/dataTypes';
import {Actions} from '../../helpers/actions';

export class ShoppingCartPo extends BasePo {
  private readonly shoppingCartIcon: ILocator;
  private readonly shoppingCartContainer: ILocator;
  private readonly siteNotepadItem: ILocator;

  constructor(page: Page) {
    super(page);
    this.shoppingCartIcon = {value: page.getByText('Корзина', { exact: true }), definition: 'Shopping Cart Icon'};
    this.shoppingCartContainer = {value: page.locator(`#basketContainer > div.dropdown-menu.dropdown-menu-right.show`), definition: 'Shopping Cart Container'};
    this.siteNotepadItem = {value: page.locator(`div.site-index div.note-item`), definition: 'Site Notepad Item'};
  }

  private buyButtonInCardWithDiscountByIndex(index: number = 1): ILocator {
    return {
      value: this.page.locator(
        `(//div[(contains(@class,'wrap-ribbon')) and not(contains(@class,'d-none'))]/parent::div/following-sibling::div/button[text()='Купить'])[${index}]`),
      definition: `Buy Button In Card With Discount`
    }
  };

  private buyButtonInCardWithoutDiscountByIndex(index: number = 1): ILocator {
    return {
      value: this.page.locator(`(//div[(contains(@class,'wrap-ribbon d-none'))]/parent::div/following-sibling::div/button[text()='Купить'])[${index}]`),
      definition: `Buy Button In Card Without Discount`
    }
  }

  public async getSiteNotepadItemElement(): Promise<Locator> {
    return await ElementUtils.getElementByLocator(this.siteNotepadItem, 0);
  }

  public async getShoppingCartElement(): Promise<Locator> {
    return await ElementUtils.getElementByLocator(this.shoppingCartIcon);
  }

  public async getShoppingCartContainerElement(): Promise<Locator> {
    return await ElementUtils.getElementByLocator(this.shoppingCartContainer);
  }

  public async clickOnShoppingCartIcon(): Promise<void> {
    await Actions.clickByLocator(this.shoppingCartIcon);
  }

  public async clickOnBuyButtonInCardWithDiscount(): Promise<void> {
    await Actions.clickByLocator(this.buyButtonInCardWithDiscountByIndex());
  }

  public async clickOnBuyButtonInCardWithoutDiscount(): Promise<void> {
    await Actions.clickByLocator(this.buyButtonInCardWithoutDiscountByIndex());
  }
}
