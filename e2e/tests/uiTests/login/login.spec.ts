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

  test(`The user can see the correct title on the Notepad Store app`, async ({ page }) => {
    loginPo = new LoginPo(page);

    expect(await page.title()).toBe(/Авторизация/);
  });

  test(`The user can see the correct heading text on the Notepad Store app`, async ({ page }) => {
    loginPo = new LoginPo(page);

    await expect(await loginPo.getLoginHeadingElement()).toBeVisible();
  });
});
