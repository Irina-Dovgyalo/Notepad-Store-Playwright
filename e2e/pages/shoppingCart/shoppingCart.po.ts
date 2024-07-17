import {BasePo} from '../common/base.po';
import {Locator, Page} from '@playwright/test';
import {ElementUtils} from '../../helpers/elementUtils';
import {ILocator} from '../../dataTypes/uiDataTypes/dataTypes';

export class ShoppingCartPo extends BasePo {
  private readonly shoppingContainer: ILocator;

  constructor(page: Page) {
    super(page);
    this.shoppingContainer = {value: page.getByText('Корзина', { exact: true }), definition: 'Shopping Container'};
  }

  public async getShoppingContainerElement(): Promise<Locator> {
    return await ElementUtils.getElementByLocator(this.shoppingContainer);
  }
}
