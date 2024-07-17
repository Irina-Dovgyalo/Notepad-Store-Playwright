import {expect, test} from '@playwright/test';
import {LoginPo} from '../../../pages/login/login.po';

let loginPo: LoginPo;

test.describe('Login Page @1', () => {
  test.beforeEach(`The login page is opened`, async ({ page }) => {
    loginPo = new LoginPo(page);
    await loginPo.openLoginPage('/login');
  });

  test.afterEach(`The login page is closed`, async ({ page }) => {
    await page.close();
  });

  test(`The login page title is displayed correctly`, async ({ page }) => {
    loginPo = new LoginPo(page);

    expect(await page.title()).toBe(loginPo.dataProvider.getLoginTestData().loginTitle);
    // await Assertions.expectToHaveTitle(page, title, `The '${title}' title is incorrect`);
  });

  test(`The login page heading text is displayed correctly`, async ({ page }) => {
    loginPo = new LoginPo(page);
    const loginHeading: string = loginPo.dataProvider.getLoginTestData().loginHeading;

    await expect(await loginPo.getLoginHeadingElementByName(loginHeading)).toBeVisible();
    // await Assertions.expectToDisplay(await loginPo.getLoginHeadingElementByName(loginHeading),  `The '${loginHeading}' heading text is not displayed`);
  });
});
