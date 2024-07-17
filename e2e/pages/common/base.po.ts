import {Page} from '@playwright/test';
import {Waiters} from '../../helpers/waiters';
import {ElementUtils} from '../../helpers/elementUtils';
import {DataProvider} from '../../helpers/dataProvider';
import {Actions} from '../../helpers/actions';

export class BasePo {
  protected readonly page: Page;
  public waiters: Waiters;
  public elementUtils: ElementUtils;
  public actions: Actions;
  public dataProvider: DataProvider;

  constructor(page: Page) {
    this.page = page;
    this.waiters = new Waiters();
    this.elementUtils = new ElementUtils();
    this.actions = new Actions();
    this.dataProvider = new DataProvider();
  }
}
