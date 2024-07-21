import {BasePo} from '../common/base.po';
import {ILocator} from '../../dataTypes/uiDataTypes/dataTypes';
import {Locator, Page} from '@playwright/test';
import {ButtonsEnum} from '../../enums/uiEnums/buttons.enum';
import {ElementUtils} from '../../helpers/elementUtils';
import {StringUtils} from '../../helpers/stringUtils';
import {Actions} from '../../helpers/actions';
import {ArrayUtils} from '../../helpers/arrayUtils';

export class ProductCatalogGridPo extends BasePo {
  private readonly productItem: ILocator;
  private readonly productName: ILocator;
  private readonly productPrice: ILocator;

  constructor(page: Page) {
    super(page);
    this.productItem = {value: page.locator(`div.site-index div.note-item`), definition: 'Product Item'};
    this.productName = {value: page.locator(`div.note-list.row div.card-body div.product_name`), definition: 'Product Name'};
    this.productPrice = {value: page.locator(`div.note-list.row div.card-body span.product_price`), definition: 'Product Price'};
  }

  private buyButtonInProductItemWithDiscountByIndex(index: number = 1): ILocator {
    return {
      value: this.page.locator(
        `(//div[(contains(@class,'wrap-ribbon')) and not(contains(@class,'d-none'))]/parent::div/following-sibling::div/button[text()='${ButtonsEnum.Buy}'])[${index}]`),
      definition: `'${ButtonsEnum.Buy}' Button In Product Item With Discount By '${index}'`
    }
  };

  private buyButtonInProductItemWithoutDiscountByIndex(index: number = 1): ILocator {
    return {
      value: this.page.locator(`(//div[(contains(@class,'wrap-ribbon d-none'))]/parent::div/following-sibling::div/button[text()='${ButtonsEnum.Buy}'])[${index}]`),
      definition: `'${ButtonsEnum.Buy}' Button In Product Item With Discount By '${index}'`
    }
  }

  private productCartButton(): ILocator {
    return {value: this.page.locator(`//div[@class="note-list row"]//button[text()="${ButtonsEnum.Buy}"]`), definition: `'Product Cart '${ButtonsEnum.Buy}' Button`};
  }

  public async getProductItemElement(): Promise<Locator> {
    return await ElementUtils.getElementByLocator(this.productItem, 0);
  }

  public async getProductCartTitleNameText(): Promise<string> {
    return await ElementUtils.getTextByLocator(this.productName);
  }

  public async getProductCartTitleNameTextListByCountOfProducts(countOfProducts: number): Promise<string[]> {
    const productNameTextList: string[] = await ElementUtils.getTextListByLocator(this.productName);

    return ArrayUtils.getArrayValueBySlice(productNameTextList, 0, countOfProducts);
  }

  public async getProductCartPriceValue(): Promise<number> {
    return +StringUtils.getStringBySplit(await ElementUtils.getTextByLocator(this.productPrice), ' ');
  }

  public async getProductCartPriceValueListByCountOfProducts(countOfProducts: number): Promise<number[]> {
    const productPriceTextList: string[] = await ElementUtils.getTextListByLocator(this.productPrice);
    const productPriceValueList: number[] = productPriceTextList.map((price: string) => +StringUtils.getStringBySplit(price, ' '));

    return ArrayUtils.getArrayValueBySlice(productPriceValueList, 0, countOfProducts);
  }

  public async clickOnBuyButtonInProductWithDiscount(): Promise<void> {
    await Actions.clickByLocator(this.buyButtonInProductItemWithDiscountByIndex());
    await this.page.waitForTimeout(1000);
  }

  public async clickOnBuyButtonInProductWithoutDiscount(): Promise<void> {
    await Actions.clickByLocator(this.buyButtonInProductItemWithoutDiscountByIndex());
    await this.page.waitForTimeout(1000);
  }

  public async clickOnBuyButtonInDifferentProductsByNumberOfClicks(clickCount: number): Promise<void> {
    let buttonIndex: number = 0;

    do {
      await Actions.clickByLocator(this.productCartButton(), buttonIndex);
      await this.page.waitForTimeout(500);
      buttonIndex++;
    } while ((buttonIndex < clickCount));
  }

  public async clickOnBuyButtonInSameProductWithDiscountByNumberOfClicks(count: number): Promise<void> {
    let itemCount: number = 0;

    do {
      await Actions.clickByLocator(this.buyButtonInProductItemWithDiscountByIndex());
      await this.page.waitForTimeout(500);
      itemCount++;
    } while ((itemCount < count));
  }
}
