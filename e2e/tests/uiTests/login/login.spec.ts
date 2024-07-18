import {expect, test} from '@playwright/test';
import {LoginPo} from '../../../pages/login/login.po';
import {StepUtils} from '../../../helpers/stepUtils';

let loginPo: LoginPo;

test.describe('Login Page', () => {
  test.beforeEach(`The user can open the Notepad Store login page`, async ({ page }) => {
    loginPo = new LoginPo(page);

    await StepUtils.addLog(`The user opens page by URL: ${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/login`);
    await loginPo.openLoginPage('/login');
  });

  test.afterEach(`The Notepad Store login page is closed`, async ({ page }) => {
    await page.close();
  });

  test(`The Notepad Store login page title is displayed correctly`, async ({ page }) => {
    loginPo = new LoginPo(page);

    expect(await page.title()).toBe(loginPo.dataProvider.getLoginTestData().loginTitle);
  });

  test(`The Notepad Store login page heading text is displayed correctly`, async ({ page }) => {
    loginPo = new LoginPo(page);

    await expect(await loginPo.getLoginHeadingElement()).toBeVisible();
  });
});
