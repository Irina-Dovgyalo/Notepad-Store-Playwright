import {LoginPo} from '../../../pages/login/login.po';
import {ShoppingCartPopupPo} from '../../../pages/shoppingCart/shoppingCartPopup/shoppingCartPopup.po';
import {expect, test} from '@playwright/test';
import {IProductDataType, IUserDataType} from '../../../dataTypes/uiDataTypes/dataTypes';
import {ButtonsEnum} from '../../../enums/uiEnums/buttons.enum';
import {StringUtils} from '../../../helpers/stringUtils';
import {ApiLogin} from '../../../api/apiLogin/apiLogin';
import {ApiShoppingCart} from '../../../api/apiShoppingCart/apiShoppingCart';
import {NavigationPo} from '../../../pages/navigation/navigation.po';
import {ProductCatalogGridPo} from '../../../pages/productCatalogueGrid/productCatalogGrid.po';
import {ShoppingCartPo} from '../../../pages/shoppingCart/shoppingCart.po';

let apiLogin: ApiLogin;
let apiShoppingCart: ApiShoppingCart;
let loginPo: LoginPo;
let navigationPo: NavigationPo;
let shoppingCartPopupPo: ShoppingCartPopupPo;
let shoppingCartPo: ShoppingCartPo;
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

    userData = loginPo.dataProvider.getUserTestData();

    await test.step(`Save to environment token and cookie`, async() => {
      await apiLogin.saveToEnvTokenAndCookie();
    });

    await test.step(`Clear Shopping cart`, async() => {
      await apiShoppingCart.clearAllShoppingCartData();
    });

    await test.step(`The user opens page by URL: ${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/login`, async() => {
      await loginPo.openLoginPage('/login');
    });

    await test.step(`The user types the credentials and clicks the submit button`, async() => {
      await loginPo.loginToNotepadStore(userData.username, userData.password);

      await expect(await productCatalogGridPo.getProductItemElement()).toBeVisible();
      await expect(await navigationPo.getShoppingCartIconElement()).toBeVisible();
    });
  });

  test.afterEach(`The Notepad Store login page is closed`, async ({ page }) => {
    await page.close();
  });

  test(`@Test-1 @Regression - The user can open an empty Shopping Cart popup`, async ({ page }) => {
    navigationPo = new NavigationPo(page);
    shoppingCartPopupPo = new ShoppingCartPopupPo(page);

    await test.step(`The user clicks on the Shopping cart icon`, async() => {
      await navigationPo.clickOnShoppingCartIcon();

      await expect(await shoppingCartPopupPo.getShoppingCartPopupElement()).toBeVisible();
    });

    await test.step(`The user clicks on the '${ButtonsEnum.GoToBasket}' button in the Shopping cart`, async() => {
      await shoppingCartPopupPo.clickOnShoppingCartButtonByName(ButtonsEnum.GoToBasket);

      await expect(await page.url()).toEqual(`${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/basket`);
    });
  });

  test(`@Test-2 @Regression - The user can go to the Shopping Cart page with one item without a discount`, async ({ page }) => {
    navigationPo = new NavigationPo(page);
    productCatalogGridPo = new ProductCatalogGridPo(page);
    shoppingCartPopupPo = new ShoppingCartPopupPo(page);
    shoppingCartPo = new ShoppingCartPo(page);

    productData = shoppingCartPopupPo.dataProvider.getProductTestData();

    await test.step(`The user clicks on the '${ButtonsEnum.Buy}' button in the product cart without discount '${productData.productName}'`, async() => {
      await productCatalogGridPo.clickOnBuyButtonInProductWithoutDiscount();

      await expect(await navigationPo.getShoppingCartCountIconValue()).toEqual(1);
    });

    await test.step(`The user clicks on the Shopping cart icon`, async() => {
      await navigationPo.clickOnShoppingCartIcon();

      await expect(await shoppingCartPopupPo.getShoppingCartPopupElement()).toBeVisible();
      await expect(await shoppingCartPopupPo.getShoppingCartItemTitleElement()).toHaveText(productData.productName);
      await expect(await shoppingCartPopupPo.getShoppingCartItemPriceValue()).toEqual(productData.productPrice);
      await expect(await shoppingCartPopupPo.getShoppingCartTotalPriceElement()).toHaveText(StringUtils.getStringFromValue(productData.productPrice));
    });

    await test.step(`The user clicks on the '${ButtonsEnum.GoToBasket}' button in the Shopping cart`, async() => {
      await shoppingCartPopupPo.clickOnShoppingCartButtonByName(ButtonsEnum.GoToBasket);

      await expect(await page.url()).toEqual(`${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/basket`);
      await expect(await shoppingCartPo.getShoppingCartTitleElement()).not.toContainText('Server Error');
    });
  });

  test(`@Test-3 @Regression - The user can go to the Shopping Cart page with one discounted item`, async ({ page }) => {
    navigationPo = new NavigationPo(page);
    productCatalogGridPo = new ProductCatalogGridPo(page);
    shoppingCartPopupPo = new ShoppingCartPopupPo(page);
    shoppingCartPo = new ShoppingCartPo(page);

    productData = shoppingCartPopupPo.dataProvider.getProductTestData(2);

    await test.step(`The user clicks on the '${ButtonsEnum.Buy}' button in the product cart with discount '${productData.productName}'`, async() => {
      await productCatalogGridPo.clickOnBuyButtonInProductWithDiscount();

      await expect(await navigationPo.getShoppingCartCountIconValue()).toEqual(1);
    });

    await test.step(`The user clicks on the Shopping cart icon`, async() => {
      await navigationPo.clickOnShoppingCartIcon();

      await expect(await shoppingCartPopupPo.getShoppingCartPopupElement()).toBeVisible();
      await expect(await shoppingCartPopupPo.getShoppingCartItemTitleElement()).toHaveText(productData.productName);
      await expect(await shoppingCartPopupPo.getShoppingCartItemPriceValue()).toEqual(productData.productPrice);
      await expect(await shoppingCartPopupPo.getShoppingCartTotalPriceElement()).toHaveText(StringUtils.getStringFromValue(productData.productPrice));
    });

    await test.step(`The user clicks on the '${ButtonsEnum.GoToBasket}' button in the Shopping cart`, async() => {
      await shoppingCartPopupPo.clickOnShoppingCartButtonByName(ButtonsEnum.GoToBasket);

      await expect(await page.url()).toEqual(`${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/basket`);
      await expect(await shoppingCartPo.getShoppingCartTitleElement()).not.toContainText('Server Error');
    });
  });

  test(`@Test-5 @Regression - The user can go to the Shopping Card page with 9 discounted products of the same name`, async ({ page }) => {
    navigationPo = new NavigationPo(page);
    productCatalogGridPo = new ProductCatalogGridPo(page);
    shoppingCartPopupPo = new ShoppingCartPopupPo(page);

    await test.step(`The user adds 9 products of the same name with a discount to the shopping cart by clicking the '${ButtonsEnum.Buy}' button`, async() => {
      await productCatalogGridPo.clickOnBuyButtonInSameProductWithDiscountByNumberOfClicks(9);

      await expect(await navigationPo.getShoppingCartCountIconValue()).toEqual(9);
    });

    await test.step(`The user clicks on the Shopping cart icon`, async() => {
      await navigationPo.clickOnShoppingCartIcon();
      const totalValue: number = await shoppingCartPopupPo.getCalculatedShoppingCartTotalPriceValue();

      await expect(await shoppingCartPopupPo.getShoppingCartPopupElement()).toBeVisible();
      await expect(await shoppingCartPopupPo.getShoppingCartItemTitleElement()).toHaveText(await productCatalogGridPo.getProductCartTitleNameText());
      await expect(await shoppingCartPopupPo.getShoppingCartItemTitleElement()).toHaveCount(1);
      await expect(await shoppingCartPopupPo.getShoppingCartItemPriceValue()).toEqual(await productCatalogGridPo.getProductCartPriceValue() * 9);
      await expect(await shoppingCartPopupPo.getShoppingCartTotalPriceValue()).toEqual(totalValue);
    });

    await test.step(`The user clicks on the '${ButtonsEnum.GoToBasket}' button in the Shopping cart`, async() => {
      await shoppingCartPopupPo.clickOnShoppingCartButtonByName(ButtonsEnum.GoToBasket);

      await expect(await page.url()).toEqual(`${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/basket`);
    });
  });
});

test(`@Test-4 @Regression - The user can go to the Shopping Cart page with 9 different products`, async ({ page }) => {
  apiLogin = new ApiLogin();
  apiShoppingCart = new ApiShoppingCart();
  loginPo = new LoginPo(page);
  navigationPo = new NavigationPo(page);
  productCatalogGridPo = new ProductCatalogGridPo(page);
  shoppingCartPopupPo = new ShoppingCartPopupPo(page);

  userData = loginPo.dataProvider.getUserTestData();
  productData = shoppingCartPopupPo.dataProvider.getProductTestData(3);

  await test.step(`Save to environment token and cookie`, async() => {
    await apiLogin.saveToEnvTokenAndCookie();
  });

  await test.step(`Clear Shopping cart`, async() => {
    await apiShoppingCart.clearAllShoppingCartData();
  });

  await test.step(`Add a new product '${productData.productName}' to the Shopping cart`, async() => {
    await apiShoppingCart.addProductToShoppingCart(productData);
  });

  await test.step(`The user opens page by URL: ${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/login`, async() => {
    await loginPo.openLoginPage('/login');
  });

  await test.step(`The user types the credentials and clicks the submit button`, async() => {
    await loginPo.loginToNotepadStore(userData.username, userData.password);

    await expect(await productCatalogGridPo.getProductItemElement()).toBeVisible();
    await expect(await navigationPo.getShoppingCartIconElement()).toBeVisible();
  });

  const countOfProducts: number = 8;
  await test.step(`The user adds '${countOfProducts}' items to the Shopping cart`, async() => {
    await productCatalogGridPo.clickOnBuyButtonInDifferentProductsByNumberOfClicks(countOfProducts);

    await expect(await navigationPo.getShoppingCartCountIconValue()).toEqual(9);
  });

  await test.step(`The user clicks on the Shopping cart icon`, async() => {
    await navigationPo.clickOnShoppingCartIcon();

    await expect(await shoppingCartPopupPo.getShoppingCartPopupElement()).toBeVisible();

    let productNameList: string[] = await productCatalogGridPo.getProductCartTitleNameTextListByCountOfProducts(countOfProducts);
    productNameList.unshift(productData.productName);
    let productPriceList: number[] = await productCatalogGridPo.getProductCartPriceValueListByCountOfProducts(countOfProducts);
    productPriceList.unshift(productData.productPrice);
    const totalValue: number = await shoppingCartPopupPo.getCalculatedShoppingCartTotalPriceValue();

    await expect(await shoppingCartPopupPo.getShoppingCartItemTitleTextList()).toEqual(productNameList);
    await expect(await shoppingCartPopupPo.getShoppingCartItemPriceValueList()).toEqual(productPriceList);
    await expect(await shoppingCartPopupPo.getShoppingCartTotalPriceValue()).toEqual(totalValue);
  });

  await test.step(`The user clicks on the '${ButtonsEnum.GoToBasket}' button in the Shopping cart`, async() => {
    await shoppingCartPopupPo.clickOnShoppingCartButtonByName(ButtonsEnum.GoToBasket);

    await expect(await page.url()).toEqual(`${loginPo.dataProvider.getUrlTestData().uiNotesPointSchool}/basket`);
  });
});
