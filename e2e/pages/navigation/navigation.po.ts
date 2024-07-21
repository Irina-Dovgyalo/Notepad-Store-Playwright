import {BasePo} from '../common/base.po';
import {ILocator} from '../../dataTypes/uiDataTypes/dataTypes';
import {Locator, Page} from '@playwright/test';
import {ElementUtils} from '../../helpers/elementUtils';
import {Actions} from '../../helpers/actions';

export class NavigationPo extends BasePo {
  private readonly shoppingCartIcon: ILocator;
  private readonly shoppingCartCountIcon: ILocator;

  constructor(page: Page) {
    super(page);
    this.shoppingCartIcon = {value: page.locator(`a#dropdownBasket`), definition: 'Shopping Cart Icon'};
    this.shoppingCartCountIcon = {value: page.locator(`#basketContainer .basket-count-items.badge-primary`), definition: 'Shopping Cart Count Icon'};
  }

  public async getShoppingCartIconElement(): Promise<Locator> {
    return await ElementUtils.getElementByLocator(this.shoppingCartIcon);
  }

  public async clickOnShoppingCartIcon(): Promise<void> {
    await Actions.clickByLocator(this.shoppingCartIcon);
  }

  public async getShoppingCartCountIconValue(): Promise<number> {
    await Actions.scrollIntoViewByLocator(this.shoppingCartCountIcon);
    return +(await ElementUtils.getTextByLocator(this.shoppingCartCountIcon));
  }
}
