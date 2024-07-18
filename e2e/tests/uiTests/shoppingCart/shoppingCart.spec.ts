import {LoginPo} from '../../../pages/login/login.po';
import {ShoppingCartPo} from '../../../pages/shoppingCart/shoppingCart.po';
import {expect, test} from '@playwright/test';
import {IProductDataType, IUserDataType} from '../../../dataTypes/uiDataTypes/dataTypes';
import {StepUtils} from '../../../helpers/stepUtils';
import {ButtonsEnum} from '../../../enums/uiEnums/buttons.enum';
import {StringUtils} from '../../../helpers/stringUtils';

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

    await expect(await shoppingCartPo.getProductItemElement()).toBeVisible();
    await expect(await shoppingCartPo.getShoppingCartIconElement()).toBeVisible();
  });

  test.afterEach(`The Notepad Store login page is closed`, async ({ page }) => {
    await page.close();
  });

  test(`@Bug-1 @Test-1 @Regression - The user can open an empty Shopping cart`, async ({ page }) => {
    shoppingCartPo = new ShoppingCartPo(page);

    await StepUtils.addLog(`The user clicks on the Shopping cart icon`);
    await shoppingCartPo.clickOnShoppingCartIcon();

    await expect(await shoppingCartPo.getShoppingCartContainerElement()).toBeVisible();
  });

  test(`@Test-2 @Regression - The user can open a Shopping cart with one item without a discount`, async ({ page }) => {
    shoppingCartPo = new ShoppingCartPo(page);

    const productData: IProductDataType = shoppingCartPo.dataProvider.getProductTestData();

    await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.Buy}' button in the product cart without discount`);
    await shoppingCartPo.clickOnButtonByNameInProductItemWithoutDiscount(ButtonsEnum.Buy);

    await expect(await shoppingCartPo.getShoppingCartCountIconValue()).toEqual(1);

    await StepUtils.addLog(`The user clicks on the Shopping cart icon`);
    await shoppingCartPo.clickOnShoppingCartIcon();

    await expect(await shoppingCartPo.getShoppingCartContainerElement()).toBeVisible();
    await expect(await shoppingCartPo.getShoppingCartItemTitleElement()).toHaveText(productData.productName);
    await expect(await shoppingCartPo.getShoppingCartItemPriceValue()).toEqual(productData.productPrice);
    await expect(await shoppingCartPo.getShoppingCartTotalPriceElement()).toHaveText(StringUtils.getStringFromValue(productData.productPrice));

    await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.GoToBasket}' button in the Shopping cart`);
    await shoppingCartPo.clickOnShoppingCartButtonByName(ButtonsEnum.GoToBasket);
  });
});
