import {BasePo} from '../../common/base.po';
import {Locator, Page} from '@playwright/test';
import {ElementUtils} from '../../../helpers/elementUtils';
import {ILocator} from '../../../dataTypes/uiDataTypes/dataTypes';
import {Actions} from '../../../helpers/actions';
import {StringUtils} from '../../../helpers/stringUtils';

export class ShoppingCartPopupPo extends BasePo {
  private readonly shoppingCartPopup: ILocator;
  private readonly shoppingCartItemTitle: ILocator;
  private readonly shoppingCartItemPrice: ILocator;
  private readonly shoppingCartItemCount: ILocator;
  private readonly shoppingCartTotalPrice: ILocator;

  constructor(page: Page) {
    super(page);
    this.shoppingCartPopup = {value: page.locator(`#basketContainer > div.dropdown-menu.dropdown-menu-right.show`), definition: 'Shopping Cart Popup'};
    this.shoppingCartItemTitle = {value: page.locator(`#basketContainer .basket-item-title`), definition: 'Shopping Cart Item Title'};
    this.shoppingCartItemPrice = {value: page.locator(`#basketContainer .basket-item-price`), definition: 'Shopping Cart Item Price'};
    this.shoppingCartTotalPrice = {value: page.locator(`#basketContainer .basket_price`), definition: 'Shopping Cart Total Price'};
    this.shoppingCartItemCount = {value: page.locator(`#basketContainer .basket-item-count`), definition: 'Shopping Cart Total Price'};
  }

  private shoppingCartButtonByName(name: string): ILocator {
    return {value: this.page.locator(`//a[contains(text(), '${name}')]`), definition: `Shopping Cart Button By Name '${name}'`};
  }

  public async getShoppingCartPopupElement(): Promise<Locator> {
    return await ElementUtils.getElementByLocator(this.shoppingCartPopup);
  }

  public async getShoppingCartItemTitleElement(): Promise<Locator> {
    return await ElementUtils.getElementByLocator(this.shoppingCartItemTitle);
  }

  public async getShoppingCartItemTitleTextList(): Promise<string[]> {
    return await ElementUtils.getTextListByLocator(this.shoppingCartItemTitle);
  }

  public async getShoppingCartItemPriceValue(): Promise<number> {
    return +StringUtils.getMatchStringByRegExp(await ElementUtils.getTextByLocator(this.shoppingCartItemPrice), /\d+/);
  }

  public async getShoppingCartItemPriceValueList(): Promise<number[]> {
    const priceTextList: string[] = await ElementUtils.getTextListByLocator(this.shoppingCartItemPrice);

    return priceTextList.map((price: string) => +StringUtils.getMatchStringByRegExp(price, /\d+/));
  }

  public async getShoppingCartTotalPriceElement(): Promise<Locator> {
    return await ElementUtils.getElementByLocator(this.shoppingCartTotalPrice);
  }

  public async getShoppingCartTotalPriceValue(): Promise<number> {
    return +(await ElementUtils.getTextByLocator(this.shoppingCartTotalPrice));
  }

  public async getCalculatedShoppingCartTotalPriceValue(): Promise<number> {
    const priceTextList: string[] = await ElementUtils.getTextListByLocator(this.shoppingCartItemPrice);
    const priceValueList: number[] = priceTextList.map((price: string) => +StringUtils.getMatchStringByRegExp(price, /\d+/));
    // const priceCountTextList: string[] = await ElementUtils.getTextListByLocator(this.shoppingCartItemCount);
    // const priceCountValueList: number[] = priceCountTextList.map((price: string) => +price);
    // const totalPriceList: number[] = priceValueList.map((price: number, count: number) => price * priceCountValueList[count]);

    return priceValueList.reduce((acc: number, number: number) => acc + number);
  }

  public async clickOnShoppingCartButtonByName(name: string): Promise<void> {
    await Actions.clickByLocator(this.shoppingCartButtonByName(name));
  }
}
