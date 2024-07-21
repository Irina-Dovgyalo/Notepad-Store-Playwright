import {LoginPo} from '../../../pages/login/login.po';
import {ShoppingCartPopupPo} from '../../../pages/shoppingCart/shoppingCartPopup/shoppingCartPopup.po';
import {expect, test} from '@playwright/test';
import {IProductDataType, IUserDataType} from '../../../dataTypes/uiDataTypes/dataTypes';
import {StepUtils} from '../../../helpers/stepUtils';
import {ButtonsEnum} from '../../../enums/uiEnums/buttons.enum';
import {StringUtils} from '../../../helpers/stringUtils';
import {ApiLogin} from '../../../api/apiLogin/apiLogin';
import {ApiShoppingCart} from '../../../api/apiShoppingCart/apiShoppingCart';
import {NavigationPo} from '../../../pages/navigation/navigation.po';
import {ProductCatalogGridPo} from '../../../pages/productCatalogueGrid/productCatalogGrid.po';

let apiLogin: ApiLogin;
let apiShoppingCart: ApiShoppingCart;
let loginPo: LoginPo;
let navigationPo: NavigationPo;
let shoppingCartPopupPo: ShoppingCartPopupPo;
let productCatalogGridPo: ProductCatalogGridPo;

let userData: IUserDataType;
let productData: IProductDataType;

test.describe('@Regression - Shopping Cart', async () => {
  test.beforeEach(`The user can login to the Notepad Store app`, async ({ page }) => {
    apiLogin = new ApiLogin();
    apiShoppingCart = new ApiShoppingCart();
    loginPo = new LoginPo(page);
    navigationPo = new NavigationPo(page);
    productCatalogGridPo = new ProductCatalogGridPo(page);
    shoppingCartPopupPo = new ShoppingCartPopupPo(page);

    userData = loginPo.dataProvider.getUserTestData();

    await StepUtils.addLog(`Save to environment token and cookie`);
    await apiLogin.saveToEnvTokenAndCookie();

    await StepUtils.addLog(`Clear Shopping cart`);
    await apiShoppingCart.clearAllShoppingCartData();

    await StepUtils.addLog(`The user opens page by URL: ${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/login`);
    await loginPo.openLoginPage('/login');

    await StepUtils.addLog(`The user types the name '${userData.username}' and password '${userData.password}'`);
    await loginPo.loginToNotepadStore(userData.username, userData.password);

    await expect(await productCatalogGridPo.getProductItemElement()).toBeVisible();
    await expect(await navigationPo.getShoppingCartIconElement()).toBeVisible();
  });

  test.afterEach(`The Notepad Store login page is closed`, async ({ page }) => {
    await page.close();
  });

  test(`@Test-1 @Regression - The user can open an empty Shopping cart`, async ({ page }) => {
    navigationPo = new NavigationPo(page);
    shoppingCartPopupPo = new ShoppingCartPopupPo(page);

    await StepUtils.addLog(`The user clicks on the Shopping cart icon`);
    await navigationPo.clickOnShoppingCartIcon();

    await expect(await shoppingCartPopupPo.getShoppingCartContainerElement()).toBeVisible();
  });

  test(`@Test-2 @Regression - The user can open a Shopping cart with one item without a discount`, async ({ page }) => {
    navigationPo = new NavigationPo(page);
    productCatalogGridPo = new ProductCatalogGridPo(page);
    shoppingCartPopupPo = new ShoppingCartPopupPo(page);

    productData = shoppingCartPopupPo.dataProvider.getProductTestData();

    await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.Buy}' button in the product cart without discount '${productData.productName}'`);
    await productCatalogGridPo.clickOnBuyButtonInProductWithoutDiscount();

    await expect(await navigationPo.getShoppingCartCountIconValue()).toEqual(1);

    await StepUtils.addLog(`The user clicks on the Shopping cart icon`);
    await navigationPo.clickOnShoppingCartIcon();

    await expect(await shoppingCartPopupPo.getShoppingCartContainerElement()).toBeVisible();
    await expect(await shoppingCartPopupPo.getShoppingCartItemTitleElement()).toHaveText(productData.productName);
    await expect(await shoppingCartPopupPo.getShoppingCartItemPriceValue()).toEqual(productData.productPrice);
    await expect(await shoppingCartPopupPo.getShoppingCartTotalPriceElement()).toHaveText(StringUtils.getStringFromValue(productData.productPrice));

    await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.GoToBasket}' button in the Shopping cart`);
    await shoppingCartPopupPo.clickOnShoppingCartButtonByName(ButtonsEnum.GoToBasket);

    expect(page.url()).toEqual(`${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/basket`);
  });

  test(`@Test-3 @Regression - The user can open a Shopping cart with one item with discount`, async ({ page }) => {
    navigationPo = new NavigationPo(page);
    productCatalogGridPo = new ProductCatalogGridPo(page);
    shoppingCartPopupPo = new ShoppingCartPopupPo(page);

    productData = shoppingCartPopupPo.dataProvider.getProductTestData(2);

    await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.Buy}' button in the product cart with discount '${productData.productName}'`);
    await productCatalogGridPo.clickOnBuyButtonInProductWithDiscount();

    await expect(await navigationPo.getShoppingCartCountIconValue()).toEqual(1);

    await StepUtils.addLog(`The user clicks on the Shopping cart icon`);
    await navigationPo.clickOnShoppingCartIcon();

    await expect(await shoppingCartPopupPo.getShoppingCartContainerElement()).toBeVisible();
    await expect(await shoppingCartPopupPo.getShoppingCartItemTitleElement()).toHaveText(productData.productName);
    await expect(await shoppingCartPopupPo.getShoppingCartItemPriceValue()).toEqual(productData.productPrice);
    await expect(await shoppingCartPopupPo.getShoppingCartTotalPriceElement()).toHaveText(StringUtils.getStringFromValue(productData.productPrice));

    await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.GoToBasket}' button in the Shopping cart`);
    await shoppingCartPopupPo.clickOnShoppingCartButtonByName(ButtonsEnum.GoToBasket);

    expect(page.url()).toEqual(`${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/basket`);
  });

  test(`@Test-5 @Regression - The user can go to the Shopping cart with 9 discounted products of the same name`, async ({ page }) => {
    navigationPo = new NavigationPo(page);
    productCatalogGridPo = new ProductCatalogGridPo(page);
    shoppingCartPopupPo = new ShoppingCartPopupPo(page);

    await StepUtils.addLog(`The user adds 9 items to the Shopping cart`);
    await productCatalogGridPo.clickOnBuyButtonInSameProductWithDiscountByNumberOfClicks(9);

    await expect(await navigationPo.getShoppingCartCountIconValue()).toEqual(9);

    await StepUtils.addLog(`The user clicks on the Shopping cart icon`);
    await navigationPo.clickOnShoppingCartIcon();

    await expect(await shoppingCartPopupPo.getShoppingCartContainerElement()).toBeVisible();
    await expect(await shoppingCartPopupPo.getShoppingCartItemTitleElement()).toHaveText(await productCatalogGridPo.getProductCartTitleNameText());
    await expect(await shoppingCartPopupPo.getShoppingCartItemTitleElement()).toHaveCount(1);
    await expect(await shoppingCartPopupPo.getShoppingCartItemPriceValue()).toEqual(await productCatalogGridPo.getProductCartPriceValue() * 9);
    await expect(await shoppingCartPopupPo.getShoppingCartTotalPriceElement()).toHaveText(StringUtils.getStringFromValue(await shoppingCartPopupPo.getShoppingCartItemPriceValue()));

    await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.GoToBasket}' button in the Shopping cart`);
    await shoppingCartPopupPo.clickOnShoppingCartButtonByName(ButtonsEnum.GoToBasket);

    expect(page.url()).toEqual(`${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/basket`);
  });
});

test(`@Test-4 @Regression - The user can go to the Shopping cart with 9 different products`, async ({ page }) => {
  apiLogin = new ApiLogin();
  apiShoppingCart = new ApiShoppingCart();
  loginPo = new LoginPo(page);
  navigationPo = new NavigationPo(page);
  productCatalogGridPo = new ProductCatalogGridPo(page);
  shoppingCartPopupPo = new ShoppingCartPopupPo(page);

  userData = loginPo.dataProvider.getUserTestData();
  productData = shoppingCartPopupPo.dataProvider.getProductTestData(3);

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

  await expect(await productCatalogGridPo.getProductItemElement()).toBeVisible();
  await expect(await navigationPo.getShoppingCartIconElement()).toBeVisible();

  await StepUtils.addLog(`The user adds 8 items to the Shopping cart`);
  await productCatalogGridPo.clickOnBuyButtonInDifferentProductsByNumberOfClicks(8);

  await expect(await navigationPo.getShoppingCartCountIconValue()).toEqual(9);

  await StepUtils.addLog(`The user clicks on the Shopping cart icon`);
  await navigationPo.clickOnShoppingCartIcon();

  await expect(await shoppingCartPopupPo.getShoppingCartContainerElement()).toBeVisible();

  let productNameList: string[] = await productCatalogGridPo.getProductCartTitleNameTextList();
  productNameList.unshift(productData.productName);
  // productNameList.pop();
  let productPriceList: number[] = await productCatalogGridPo.getProductCartPriceValueList();
  productPriceList.unshift(productData.productPrice);
  // productPriceList.pop();
  const totalValue: number = await shoppingCartPopupPo.getCalculatedShoppingCartTotalPriceValue();

  await expect(await shoppingCartPopupPo.getShoppingCartItemTitleTextList()).toEqual(productNameList);
  await expect(await shoppingCartPopupPo.getShoppingCartItemPriceValueList()).toEqual(productPriceList);
  await expect(await shoppingCartPopupPo.getShoppingCartTotalPriceValue()).toEqual(totalValue);

  await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.GoToBasket}' button in the Shopping cart`);
  await shoppingCartPopupPo.clickOnShoppingCartButtonByName(ButtonsEnum.GoToBasket);

  expect(page.url()).toEqual(`${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/basket`);
});
