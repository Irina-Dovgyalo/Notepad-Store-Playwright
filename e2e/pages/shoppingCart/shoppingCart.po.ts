import {BasePo} from '../common/base.po';
import {Locator, Page} from '@playwright/test';
import {ILocator} from '../../dataTypes/uiDataTypes/dataTypes';
import {ElementUtils} from '../../helpers/elementUtils';

export class ShoppingCartPo extends BasePo {
  private readonly shoppingCartTitle: ILocator;

  constructor(page: Page) {
    super(page);
    this.shoppingCartTitle = {value: page.locator(`div.site-error h1`), definition: `Shopping Cart Title`};
  }

  public async getShoppingCartTitleElement(): Promise<Locator> {
    return await ElementUtils.getElementByLocator(this.shoppingCartTitle);
  }
}
