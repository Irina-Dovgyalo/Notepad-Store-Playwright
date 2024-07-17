import {BasePo} from '../common/base.po';
import {ILocator} from '../../dataTypes/uiDataTypes/dataTypes';
import {Locator, Page} from '@playwright/test';
import {ElementUtils} from '../../helpers/elementUtils';

export class LoginPo extends BasePo {
  private loginInput: ILocator;
  private passwordInput: ILocator;
  private loginHeading: ILocator;
  private submitButton: ILocator;

  constructor(page: Page) {
    super(page);
    this.loginInput = {value: page.locator('#loginform-username'), definition: 'Login Input Field'};
    this.passwordInput = {value: page.locator('#loginform-password'), definition: 'Password Input Field'};
    this.submitButton = {value: page.locator('button[name="login-button"]'), definition: 'Submit Button'};
    this.loginHeading = {value: page.locator('.site-login > h1'), definition: 'Login Heading'};
  }

  private loginHeadingByName(name: string): ILocator {
    return {value: this.page.getByRole('heading', { name: name }), definition: `Login Heading By Name '${name}'`};
  }

  public async openLoginPage(url: string): Promise<void> {
    await this.page.goto(url);
  }

  public async getLoginHeadingElementByName(name: string): Promise<Locator> {
    return await ElementUtils.getElementByLocator(this.loginHeadingByName(name));
  }
}
