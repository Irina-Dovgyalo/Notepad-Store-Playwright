import {BasePo} from '../common/base.po';
import {ILocator} from '../../dataTypes/uiDataTypes/dataTypes';
import {Locator, Page} from '@playwright/test';
import {ElementUtils} from '../../helpers/elementUtils';
import {Actions} from '../../helpers/actions';

export class LoginPo extends BasePo {
  private readonly loginInput: ILocator;
  private readonly passwordInput: ILocator;
  private readonly loginHeading: ILocator;
  private readonly submitButton: ILocator;

  constructor(page: Page) {
    super(page);
    this.loginInput = {value: page.getByPlaceholder('Логин клиента'), definition: 'Login Input Field'};
    this.passwordInput = {value: page.getByPlaceholder('Пароль клиента'), definition: 'Password Input Field'};
    this.submitButton = {value: page.locator('#login-form div').filter({ hasText: 'Вход' }), definition: 'Submit Button'};
    this.loginHeading = {value: page.getByRole('heading', { name: 'Авторизация' }), definition: 'Login Heading'};
  }

  public async openLoginPage(url: string): Promise<void> {
    await this.page.goto(url);
  }

  public async getLoginHeadingElement(): Promise<Locator> {
    return await ElementUtils.getElementByLocator(this.loginHeading);
  }

  public async loginToNotepadStore(login: string, password: string): Promise<void> {
    await Actions.typeTextInLocatorSequentiallyAndPressEnter(this.loginInput, login);
    await Actions.typeTextInLocatorSequentiallyAndPressEnter(this.passwordInput, password);
    await Actions.clickByLocator(this.submitButton);
  }
}
