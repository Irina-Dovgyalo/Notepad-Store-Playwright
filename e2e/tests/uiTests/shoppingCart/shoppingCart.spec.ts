import {LoginPo} from '../../../pages/login/login.po';
import {ShoppingCartPo} from '../../../pages/shoppingCart/shoppingCart.po';
import {expect, test} from '@playwright/test';
import {IProductDataType, IUserDataType} from '../../../dataTypes/uiDataTypes/dataTypes';
import {StepUtils} from '../../../helpers/stepUtils';
import {ButtonsEnum} from '../../../enums/uiEnums/buttons.enum';
import {StringUtils} from '../../../helpers/stringUtils';
import {ApiLogin} from '../../../api/apiLogin/apiLogin';
import {ApiShoppingCart} from '../../../api/apiShoppingCart/apiShoppingCart';

let loginPo: LoginPo;
let shoppingCartPo: ShoppingCartPo;
let apiLogin: ApiLogin;
let apiShoppingCart: ApiShoppingCart;

let userData: IUserDataType;
let productData: IProductDataType;

test.describe('@Regression - Shopping Cart', async () => {
  test.beforeEach(`The user can login to the Notepad Store app`, async ({ page }) => {
    loginPo = new LoginPo(page);
    shoppingCartPo = new ShoppingCartPo(page);
    apiLogin = new ApiLogin();
    apiShoppingCart = new ApiShoppingCart();

    userData = loginPo.dataProvider.getUserTestData();

    await StepUtils.addLog(`Save to environment token and cookie`);
    await apiLogin.saveToEnvTokenAndCookie();

    await StepUtils.addLog(`Clear Shopping cart`);
    await apiShoppingCart.clearAllShoppingCartData();

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

    productData = shoppingCartPo.dataProvider.getProductTestData();

    await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.Buy}' button in the product cart without discount '${productData.productName}'`);
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

    expect(page.url()).toEqual(`${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/basket`);
  });

  test(`@Test-3 @Regression - The user can open a Shopping cart with one item with discount`, async ({ page }) => {
    shoppingCartPo = new ShoppingCartPo(page);

    productData = shoppingCartPo.dataProvider.getProductTestData(2);

    await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.Buy}' button in the product cart with discount '${productData.productName}'`);
    await shoppingCartPo.clickOnButtonByNameInProductItemWithDiscount(ButtonsEnum.Buy);

    await expect(await shoppingCartPo.getShoppingCartCountIconValue()).toEqual(1);

    await StepUtils.addLog(`The user clicks on the Shopping cart icon`);
    await shoppingCartPo.clickOnShoppingCartIcon();

    await expect(await shoppingCartPo.getShoppingCartContainerElement()).toBeVisible();
    await expect(await shoppingCartPo.getShoppingCartItemTitleElement()).toHaveText(productData.productName);
    await expect(await shoppingCartPo.getShoppingCartItemPriceValue()).toEqual(productData.productPrice);
    await expect(await shoppingCartPo.getShoppingCartTotalPriceElement()).toHaveText(StringUtils.getStringFromValue(productData.productPrice));

    await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.GoToBasket}' button in the Shopping cart`);
    await shoppingCartPo.clickOnShoppingCartButtonByName(ButtonsEnum.GoToBasket);

    expect(page.url()).toEqual(`${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/basket`);
  });

  test(`@Test-5 @Regression - The user can go to the Shopping cart with 9 discounted products of the same name`, async ({ page }) => {
    shoppingCartPo = new ShoppingCartPo(page);

    await StepUtils.addLog(`The user adds 9 items to the Shopping cart`);
    await shoppingCartPo.clickOnSameProductButtonWithDiscountByButtonNameAndNumberOfClicks(ButtonsEnum.Buy, 9);

    await expect(await shoppingCartPo.getShoppingCartCountIconValue()).toEqual(9);

    await StepUtils.addLog(`The user clicks on the Shopping cart icon`);
    await shoppingCartPo.clickOnShoppingCartIcon();

    await expect(await shoppingCartPo.getShoppingCartContainerElement()).toBeVisible();
    await expect(await shoppingCartPo.getShoppingCartItemTitleElement()).toHaveText(await shoppingCartPo.getProductCartTitleNameText());
    await expect(await shoppingCartPo.getShoppingCartItemTitleElement()).toHaveCount(1);
    await expect(await shoppingCartPo.getShoppingCartItemPriceValue()).toEqual(await shoppingCartPo.getProductCartPriceValue() * 9);
    await expect(await shoppingCartPo.getShoppingCartTotalPriceElement()).toHaveText(StringUtils.getStringFromValue(await shoppingCartPo.getShoppingCartItemPriceValue()));

    await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.GoToBasket}' button in the Shopping cart`);
    await shoppingCartPo.clickOnShoppingCartButtonByName(ButtonsEnum.GoToBasket);

    expect(page.url()).toEqual(`${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/basket`);
  });
});

test(`@Test-4 @Regression - The user can go to the Shopping cart with 9 different products`, async ({ page }) => {
  loginPo = new LoginPo(page);
  shoppingCartPo = new ShoppingCartPo(page);
  apiLogin = new ApiLogin();
  apiShoppingCart = new ApiShoppingCart();

  userData = loginPo.dataProvider.getUserTestData();
  productData = shoppingCartPo.dataProvider.getProductTestData(3);

  await StepUtils.addLog(`Save to environment token and cookie`);
  await apiLogin.saveToEnvTokenAndCookie();

  await StepUtils.addLog(`Clear Shopping cart`);
  await apiShoppingCart.clearAllShoppingCartData();

  await StepUtils.addLog(`Add a new product '${productData.productName}' to the Shopping cart`);
  await apiShoppingCart.addProductToShoppingCart(productData);

  await StepUtils.addLog(`The user opens page by URL: ${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/login`);
  await loginPo.openLoginPage('/login');

  await StepUtils.addLog(`The user types the name '${userData.username}' and password '${userData.password}'`);
  await loginPo.loginToNotepadStore(userData.username, userData.password);

  await expect(await shoppingCartPo.getProductItemElement()).toBeVisible();
  await expect(await shoppingCartPo.getShoppingCartIconElement()).toBeVisible();

  await StepUtils.addLog(`The user adds 8 items to the Shopping cart`);
  await shoppingCartPo.clickOnDifferentProductButtonByNameAndNumberOfClicks(ButtonsEnum.Buy, 7);// 8

  await expect(await shoppingCartPo.getShoppingCartCountIconValue()).toEqual(8);// 9

  await StepUtils.addLog(`The user clicks on the Shopping cart icon`);
  await shoppingCartPo.clickOnShoppingCartIcon();

  let productNameList: string[] = await shoppingCartPo.getProductCartTitleNameTextList();
  productNameList.unshift(productData.productName);
  productNameList.pop();

  let productPriceList: number[] = await shoppingCartPo.getProductCartPriceValueList();
  productPriceList.unshift(productData.productPrice);
  productPriceList.pop();

  const totalValue: number = await shoppingCartPo.getCalculatedShoppingCartTotalPriceValue();

  await expect(await shoppingCartPo.getShoppingCartContainerElement()).toBeVisible();
  await expect(await shoppingCartPo.getShoppingCartItemTitleTextList()).toEqual(productNameList);
  await expect(await shoppingCartPo.getShoppingCartItemPriceValueList()).toEqual(productPriceList);
  await expect(await shoppingCartPo.getShoppingCartTotalPriceValue()).toEqual(totalValue);

  await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.GoToBasket}' button in the Shopping cart`);
  await shoppingCartPo.clickOnShoppingCartButtonByName(ButtonsEnum.GoToBasket);

  expect(page.url()).toEqual(`${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/basket`);
});
