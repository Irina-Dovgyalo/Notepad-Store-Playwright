import {Page} from '@playwright/test';
import {Waiters} from '../../helpers/waiters';
import {ElementUtils} from '../../helpers/elementUtils';
import {DataProvider} from '../../helpers/dataProvider';

export class BasePo {
  protected readonly page: Page;
  public waiters: Waiters;
  public elementUtils: ElementUtils;
  public dataProvider: DataProvider;

  constructor(page: Page) {
    this.page = page;
    this.waiters = new Waiters();
    this.elementUtils = new ElementUtils();
    this.dataProvider = new DataProvider();
  }
}
