import {expect, test} from '@playwright/test';
import {LoginPo} from '../../../pages/login/login.po';
import {IUserDataType} from '../../../dataTypes/uiDataTypes/dataTypes';
import {ShoppingCartPo} from '../../../pages/shoppingCart/shoppingCart.po';

let loginPo: LoginPo;
let shoppingCartPo: ShoppingCartPo;

test.afterAll(`The login page is closed`, async ({ browser }) => {
  await browser.close();
});

test.describe('@Regression - Login Page', () => {
  test.beforeEach(`The login page is opened`, async ({ page }) => {
    loginPo = new LoginPo(page);
    await loginPo.openLoginPage('/login');
  });

  test(`The login page title is displayed correctly`, async ({ page }) => {
    loginPo = new LoginPo(page);

    expect(await page.title()).toBe(loginPo.dataProvider.getLoginTestData().loginTitle);
  });

  test(`The login page heading text is displayed correctly`, async ({ page }) => {
    loginPo = new LoginPo(page);

    await expect(await loginPo.getLoginHeadingElement()).toBeVisible();
  });

  test(`The user logins to the Notepad Store app - @1`, async ({ page }) => {
    loginPo = new LoginPo(page);
    shoppingCartPo = new ShoppingCartPo(page);

    const userData: IUserDataType = loginPo.dataProvider.getUserTestData();
    await loginPo.loginToNotepadStore(userData.username, userData.password);

    await expect(await shoppingCartPo.getShoppingContainerElement()).toBeVisible();
  });
});
