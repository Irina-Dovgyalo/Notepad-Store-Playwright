import {BasePo} from '../common/base.po';
import {Locator, Page} from '@playwright/test';
import {ElementUtils} from '../../helpers/elementUtils';
import {ILocator} from '../../dataTypes/uiDataTypes/dataTypes';
import {Actions} from '../../helpers/actions';
import {StringUtils} from '../../helpers/stringUtils';

export class ShoppingCartPo extends BasePo {
  private readonly shoppingCartIcon: ILocator;
  private readonly shoppingCartContainer: ILocator;
  private readonly shoppingCartCountIcon: ILocator;
  private readonly shoppingCartItemTitle: ILocator;
  private readonly shoppingCartItemPrice: ILocator;
  private readonly shoppingCartTotalPrice: ILocator;
  private readonly productItem: ILocator;
  private readonly productName: ILocator;
  private readonly productPrice: ILocator;

  constructor(page: Page) {
    super(page);
    this.shoppingCartIcon = {value: page.locator(`a#dropdownBasket`), definition: 'Shopping Cart Icon'};
    this.shoppingCartContainer = {value: page.locator(`#basketContainer > div.dropdown-menu.dropdown-menu-right.show`), definition: 'Shopping Cart Container'};
    this.shoppingCartCountIcon = {value: page.locator(`#basketContainer .basket-count-items.badge-primary`), definition: 'Shopping Cart Count Icon'};
    this.shoppingCartItemTitle = {value: page.locator(`#basketContainer .basket-item-title`), definition: 'Shopping Cart Item Title'};
    this.shoppingCartItemPrice = {value: page.locator(`#basketContainer .basket-item-price`), definition: 'Shopping Cart Item Price'};
    this.shoppingCartTotalPrice = {value: page.locator(`#basketContainer .basket_price`), definition: 'Shopping Cart Total Price'};
    this.productItem = {value: page.locator(`div.site-index div.note-item`), definition: 'Product Item'};
    this.productName = {value: page.locator(`div.note-item.card div.product_name`), definition: 'Product Name'};
    this.productPrice = {value: page.locator(`div.note-item.card span.product_price`), definition: 'Product Price'};
  }

  private buttonByNameAndIndexInProductItemWithDiscount(name: string, index: number = 1): ILocator {
    return {
      value: this.page.locator(
        `(//div[(contains(@class,'wrap-ribbon')) and not(contains(@class,'d-none'))]/parent::div/following-sibling::div/button[text()='${name}'])[${index}]`),
      definition: `Button By Name '${name}' In Product Item With Discount`
    }
  };

  private buttonByNameAndIndexInProductItemWithoutDiscount(name: string, index: number = 1): ILocator {
    return {
      value: this.page.locator(`(//div[(contains(@class,'wrap-ribbon d-none'))]/parent::div/following-sibling::div/button[text()='${name}'])[${index}]`),
      definition: `Button By Name '${name}' In Product Item Without Discount`
    }
  }

  private shoppingCartButtonByName(name: string): ILocator {
    return {value: this.page.locator(`//a[contains(text(), '${name}')]`), definition: `Shopping Cart Button By Name '${name}'`};
  }

  private productCartButtonByName(name: string): ILocator {
    return {value: this.page.locator(`//div[@class="note-list row"]//button[text()="${name}"]`), definition: `Product Cart Button By Name '${name}'`};
  }


  public async getProductItemElement(): Promise<Locator> {
    return await ElementUtils.getElementByLocator(this.productItem, 0);
  }

  public async getProductCartTitleNameText(): Promise<string> {
    return await ElementUtils.getTextByLocator(this.productName);
  }

  public async getProductCartPriceValue(): Promise<number> {
    return +StringUtils.getStringBySplit(await ElementUtils.getTextByLocator(this.productPrice), ' ');
  }

  public async getShoppingCartIconElement(): Promise<Locator> {
    return await ElementUtils.getElementByLocator(this.shoppingCartIcon);
  }

  public async getShoppingCartContainerElement(): Promise<Locator> {
    return await ElementUtils.getElementByLocator(this.shoppingCartContainer);
  }

  public async getShoppingCartCountIconValue(): Promise<number> {
    await ElementUtils.scrollIntoViewByLocator(this.shoppingCartCountIcon);
    return +(await ElementUtils.getTextByLocator(this.shoppingCartCountIcon));
  }

  public async getShoppingCartItemTitleElement(): Promise<Locator> {
    return await ElementUtils.getElementByLocator(this.shoppingCartItemTitle);
  }

  public async getShoppingCartItemTitleElementList(): Promise<Locator[]> {
    return await ElementUtils.getElementListByLocator(this.shoppingCartItemTitle);
  }

  public async getShoppingCartItemTitleTextList(): Promise<string[]> {
    return await ElementUtils.getTextListByLocator(this.shoppingCartItemTitle);
  }

  public async getShoppingCartItemPriceValue(): Promise<number> {
    return +StringUtils.getMatchStringByRegExp(await ElementUtils.getTextByLocator(this.shoppingCartItemPrice), /\d+/);
  }

  public async getShoppingCartTotalPriceElement(): Promise<Locator> {
    return await ElementUtils.getElementByLocator(this.shoppingCartTotalPrice);
  }

  public async clickOnShoppingCartIcon(): Promise<void> {
    await Actions.clickByLocator(this.shoppingCartIcon);
  }

  public async clickOnButtonByNameInProductItemWithDiscount(name: string): Promise<void> {
    await Actions.clickByLocator(this.buttonByNameAndIndexInProductItemWithDiscount(name));
  }

  public async clickOnButtonByNameInProductItemWithoutDiscount(name: string): Promise<void> {
    await Actions.clickByLocator(this.buttonByNameAndIndexInProductItemWithoutDiscount(name));
  }

  public async clickOnDifferentProductButtonByNameAndNumberOfClicks(name: string, clickCount: number): Promise<void> {
    let buttonIndex: number = 0;

    do {
      await Actions.clickByLocator(this.productCartButtonByName(name), buttonIndex);
      await this.page.waitForTimeout(500);
      buttonIndex++;
    } while ((buttonIndex < clickCount));
  }

  public async clickOnSameProductButtonWithDiscountByButtonNameAndNumberOfClicks(name: string, count: number): Promise<void> {
    let itemCount: number = 0;

    do {
      await Actions.clickByLocator(this.buttonByNameAndIndexInProductItemWithDiscount(name));
      await this.page.waitForTimeout(500);
      itemCount++;
    } while ((itemCount < count));
  }

  public async clickOnShoppingCartButtonByName(name: string): Promise<void> {
    await Actions.clickByLocator(this.shoppingCartButtonByName(name));
  }
}
