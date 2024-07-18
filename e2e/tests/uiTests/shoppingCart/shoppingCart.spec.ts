import {LoginPo} from '../../../pages/login/login.po';
import {ShoppingCartPo} from '../../../pages/shoppingCart/shoppingCart.po';
import {expect, test} from '@playwright/test';
import {IUserDataType} from '../../../dataTypes/uiDataTypes/dataTypes';

let loginPo: LoginPo;
let shoppingCartPo: ShoppingCartPo;

test.describe('Shopping Cart', () => {
  test.beforeEach(`The user can login to the Notepad Store app`, async ({ page }) => {
    loginPo = new LoginPo(page);
    shoppingCartPo = new ShoppingCartPo(page);

    const userData: IUserDataType = loginPo.dataProvider.getUserTestData();
    await loginPo.openLoginPage('/login');
    await loginPo.loginToNotepadStore(userData.username, userData.password);

    await expect(await shoppingCartPo.getSiteNotepadItemElement()).toBeVisible();
    await expect(await shoppingCartPo.getShoppingCartElement()).toBeVisible();
  });

  test.afterEach(`The login page is closed`, async ({ page }) => {
    await page.close();
  });

  test(`@Bug-1 @Regression - The user can open an empty shopping cart`, async ({ page }) => {
    shoppingCartPo = new ShoppingCartPo(page);

    await shoppingCartPo.clickOnShoppingCartIcon();

    await expect(await shoppingCartPo.getShoppingCartContainerElement()).toBeVisible();
  });

  test(`@Regression - The user can open a cart with one item without a discount`, async ({ page }) => {
    shoppingCartPo = new ShoppingCartPo(page);

    await shoppingCartPo.clickOnBuyButtonInCardWithDiscount();
    await shoppingCartPo.clickOnShoppingCartIcon();

    await expect(await shoppingCartPo.getShoppingCartContainerElement()).toBeVisible();
  });
});
