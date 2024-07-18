import {LoginPo} from '../../../pages/login/login.po';
import {ShoppingCartPo} from '../../../pages/shoppingCart/shoppingCart.po';
import {expect, test} from '@playwright/test';
import {IUserDataType} from '../../../dataTypes/uiDataTypes/dataTypes';
import {StepUtils} from '../../../helpers/stepUtils';
import {ButtonsEnum} from '../../../enums/uiEnums/buttons.enum';

let loginPo: LoginPo;
let shoppingCartPo: ShoppingCartPo;

test.describe('Shopping Cart', () => {
  test.beforeEach(`The user can login to the Notepad Store app`, async ({ page }) => {
    loginPo = new LoginPo(page);
    shoppingCartPo = new ShoppingCartPo(page);

    const userData: IUserDataType = loginPo.dataProvider.getUserTestData();

    await StepUtils.addLog(`The user opens page by URL: ${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/login`);
    await loginPo.openLoginPage('/login');

    await StepUtils.addLog(`The user types the name '${userData.username}' and password '${userData.password}'`);
    await loginPo.loginToNotepadStore(userData.username, userData.password);

    await expect(await shoppingCartPo.getSiteNotepadItemElement()).toBeVisible();
    await expect(await shoppingCartPo.getShoppingCartElement()).toBeVisible();
  });

  test.afterEach(`The Notepad Store login page is closed`, async ({ page }) => {
    await page.close();
  });

  test(`@Bug-1 @Test-1 @Regression - The user can open an empty shopping cart`, async ({ page }) => {
    shoppingCartPo = new ShoppingCartPo(page);

    await StepUtils.addLog(`The user clicks on the shopping cart icon`);
    await shoppingCartPo.clickOnShoppingCartIcon();

    await expect(await shoppingCartPo.getShoppingCartContainerElement()).toBeVisible();
  });

  test(`@Test-2 @Regression - The user can open a cart with one item without a discount`, async ({ page }) => {
    shoppingCartPo = new ShoppingCartPo(page);

    await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.Buy}' button in the notepad cart without discount`);
    await shoppingCartPo.clickOnButtonByNameInCardWithoutDiscount(ButtonsEnum.Buy);

    await expect(await shoppingCartPo.getShoppingCartCountIconElement()).toHaveText('1');

    await StepUtils.addLog(`The user clicks on the shopping cart icon`);
    await shoppingCartPo.clickOnShoppingCartIcon();

    await expect(await shoppingCartPo.getShoppingCartContainerElement()).toBeVisible();
  });
});
