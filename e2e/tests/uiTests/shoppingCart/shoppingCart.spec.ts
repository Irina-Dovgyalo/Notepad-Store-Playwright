import {LoginPo} from '../../../pages/login/login.po';
import {ShoppingCartDialogPo} from '../../../pages/shoppingCart/dialog/shoppingCartDialog.po';
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
let shoppingCartDialogPo: ShoppingCartDialogPo;
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
    shoppingCartDialogPo = new ShoppingCartDialogPo(page);

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
    shoppingCartDialogPo = new ShoppingCartDialogPo(page);

    await StepUtils.addLog(`The user clicks on the Shopping cart icon`);
    await navigationPo.clickOnShoppingCartIcon();

    await expect(await shoppingCartDialogPo.getShoppingCartContainerElement()).toBeVisible();
  });

  test(`@Test-2 @Regression - The user can open a Shopping cart with one item without a discount`, async ({ page }) => {
    navigationPo = new NavigationPo(page);
    productCatalogGridPo = new ProductCatalogGridPo(page);
    shoppingCartDialogPo = new ShoppingCartDialogPo(page);

    productData = shoppingCartDialogPo.dataProvider.getProductTestData();

    await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.Buy}' button in the product cart without discount '${productData.productName}'`);
    await productCatalogGridPo.clickOnBuyButtonInProductWithoutDiscount();

    await expect(await navigationPo.getShoppingCartCountIconValue()).toEqual(1);

    await StepUtils.addLog(`The user clicks on the Shopping cart icon`);
    await navigationPo.clickOnShoppingCartIcon();

    await expect(await shoppingCartDialogPo.getShoppingCartContainerElement()).toBeVisible();
    await expect(await shoppingCartDialogPo.getShoppingCartItemTitleElement()).toHaveText(productData.productName);
    await expect(await shoppingCartDialogPo.getShoppingCartItemPriceValue()).toEqual(productData.productPrice);
    await expect(await shoppingCartDialogPo.getShoppingCartTotalPriceElement()).toHaveText(StringUtils.getStringFromValue(productData.productPrice));

    await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.GoToBasket}' button in the Shopping cart`);
    await shoppingCartDialogPo.clickOnShoppingCartButtonByName(ButtonsEnum.GoToBasket);

    expect(page.url()).toEqual(`${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/basket`);
  });

  test(`@Test-3 @Regression - The user can open a Shopping cart with one item with discount`, async ({ page }) => {
    navigationPo = new NavigationPo(page);
    productCatalogGridPo = new ProductCatalogGridPo(page);
    shoppingCartDialogPo = new ShoppingCartDialogPo(page);

    productData = shoppingCartDialogPo.dataProvider.getProductTestData(2);

    await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.Buy}' button in the product cart with discount '${productData.productName}'`);
    await productCatalogGridPo.clickOnBuyButtonInProductWithDiscount();

    await expect(await navigationPo.getShoppingCartCountIconValue()).toEqual(1);

    await StepUtils.addLog(`The user clicks on the Shopping cart icon`);
    await navigationPo.clickOnShoppingCartIcon();

    await expect(await shoppingCartDialogPo.getShoppingCartContainerElement()).toBeVisible();
    await expect(await shoppingCartDialogPo.getShoppingCartItemTitleElement()).toHaveText(productData.productName);
    await expect(await shoppingCartDialogPo.getShoppingCartItemPriceValue()).toEqual(productData.productPrice);
    await expect(await shoppingCartDialogPo.getShoppingCartTotalPriceElement()).toHaveText(StringUtils.getStringFromValue(productData.productPrice));

    await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.GoToBasket}' button in the Shopping cart`);
    await shoppingCartDialogPo.clickOnShoppingCartButtonByName(ButtonsEnum.GoToBasket);

    expect(page.url()).toEqual(`${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/basket`);
  });

  test(`@Test-5 @Regression - The user can go to the Shopping cart with 9 discounted products of the same name`, async ({ page }) => {
    navigationPo = new NavigationPo(page);
    productCatalogGridPo = new ProductCatalogGridPo(page);
    shoppingCartDialogPo = new ShoppingCartDialogPo(page);

    await StepUtils.addLog(`The user adds 9 items to the Shopping cart`);
    await productCatalogGridPo.clickOnBuyButtonInSameProductWithDiscountByNumberOfClicks(9);

    await expect(await navigationPo.getShoppingCartCountIconValue()).toEqual(9);

    await StepUtils.addLog(`The user clicks on the Shopping cart icon`);
    await navigationPo.clickOnShoppingCartIcon();

    await expect(await shoppingCartDialogPo.getShoppingCartContainerElement()).toBeVisible();
    await expect(await shoppingCartDialogPo.getShoppingCartItemTitleElement()).toHaveText(await productCatalogGridPo.getProductCartTitleNameText());
    await expect(await shoppingCartDialogPo.getShoppingCartItemTitleElement()).toHaveCount(1);
    await expect(await shoppingCartDialogPo.getShoppingCartItemPriceValue()).toEqual(await productCatalogGridPo.getProductCartPriceValue() * 9);
    await expect(await shoppingCartDialogPo.getShoppingCartTotalPriceElement()).toHaveText(StringUtils.getStringFromValue(await shoppingCartDialogPo.getShoppingCartItemPriceValue()));

    await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.GoToBasket}' button in the Shopping cart`);
    await shoppingCartDialogPo.clickOnShoppingCartButtonByName(ButtonsEnum.GoToBasket);

    expect(page.url()).toEqual(`${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/basket`);
  });
});

test(`@Test-4 @Regression - The user can go to the Shopping cart with 9 different products`, async ({ page }) => {
  apiLogin = new ApiLogin();
  apiShoppingCart = new ApiShoppingCart();
  loginPo = new LoginPo(page);
  navigationPo = new NavigationPo(page);
  productCatalogGridPo = new ProductCatalogGridPo(page);
  shoppingCartDialogPo = new ShoppingCartDialogPo(page);

  userData = loginPo.dataProvider.getUserTestData();
  productData = shoppingCartDialogPo.dataProvider.getProductTestData(3);

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

  await expect(await shoppingCartDialogPo.getShoppingCartContainerElement()).toBeVisible();

  let productNameList: string[] = await productCatalogGridPo.getProductCartTitleNameTextList();
  productNameList.unshift(productData.productName);
  // productNameList.pop();
  let productPriceList: number[] = await productCatalogGridPo.getProductCartPriceValueList();
  productPriceList.unshift(productData.productPrice);
  // productPriceList.pop();
  const totalValue: number = await shoppingCartDialogPo.getCalculatedShoppingCartTotalPriceValue();

  await expect(await shoppingCartDialogPo.getShoppingCartItemTitleTextList()).toEqual(productNameList);
  await expect(await shoppingCartDialogPo.getShoppingCartItemPriceValueList()).toEqual(productPriceList);
  await expect(await shoppingCartDialogPo.getShoppingCartTotalPriceValue()).toEqual(totalValue);

  await StepUtils.addLog(`The user clicks on the '${ButtonsEnum.GoToBasket}' button in the Shopping cart`);
  await shoppingCartDialogPo.clickOnShoppingCartButtonByName(ButtonsEnum.GoToBasket);

  expect(page.url()).toEqual(`${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/basket`);
});
