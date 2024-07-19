import {ApiBase} from '../apiCommon/apiBase';
import {ApiBaseTestData} from '../../testData/apiTestData/apiBaseTestData';
import {apiCookie, apiCsrfToken} from '../../helpers/env';
import {
  IApiClearShoppingCartResponseDataType,
  IApiShoppingCartResponseDataType
} from '../../dataTypes/apiDataTypes/apiShoppingCartDataTypes/apiShoppingCartDataTypes';
import {ApiFormDataKeyEnum} from '../../enums/apiEnums/apiFormDataKey.enum';
import {IProductDataType} from '../../dataTypes/uiDataTypes/dataTypes';
import * as querystring from 'querystring';

export class ApiShoppingCart extends ApiBase {
  private apiBaseTestData: ApiBaseTestData = new ApiBaseTestData();

  private getBasketGetEndpoint(): string {
    return `${this.dataProvider.getUrlTestData().uiNotesPointSchool}/basket/get`;
  }

  private getBasketCreateEndpoint(): string {
    return `${this.dataProvider.getUrlTestData().uiNotesPointSchool}/basket/create`;
  }

  private getBasketClearEndpoint(): string {
    return `${this.dataProvider.getUrlTestData().uiNotesPointSchool}/basket/clear`;
  }

  public async getShoppingCartData(): Promise<IApiShoppingCartResponseDataType> {
    return await this.postMethod(this.getBasketGetEndpoint(), this.apiBaseTestData.getHeadersWithCookieAndCsrfToken(apiCookie, apiCsrfToken),
      `Impossible to get basket data`);
  }

  public async clearShoppingCartData(): Promise<IApiClearShoppingCartResponseDataType> {
    return await this.postMethod(`${this.getBasketClearEndpoint()}`, this.apiBaseTestData.getHeadersWithCookieAndCsrfToken(apiCookie, apiCsrfToken),
      {}, `Impossible to clear basket data`);
  }

  public async createShoppingCartData(bodyData: string): Promise<IApiClearShoppingCartResponseDataType> {
    return await this.postMethod(`${this.getBasketCreateEndpoint()}`, this.apiBaseTestData.getHeadersWithFormDataAndCookieAndCsrfToken(apiCookie, apiCsrfToken), bodyData,
      `Impossible to add new product to the basket`);
  }

  public async addProductToShoppingCart(productData: IProductDataType): Promise<IApiClearShoppingCartResponseDataType> {
    const data: string = querystring.stringify({
      [ApiFormDataKeyEnum.Product]: productData.product,
      [ApiFormDataKeyEnum.Count]: productData.count
    });

    return await this.createShoppingCartData(data);
  }

  public async clearAllShoppingCartData(): Promise<void> {
    const shoppingCartData: IApiShoppingCartResponseDataType = await this.getShoppingCartData();

    if (shoppingCartData.basketCount !== 0) {
      await this.clearShoppingCartData();
    }
  }
}
