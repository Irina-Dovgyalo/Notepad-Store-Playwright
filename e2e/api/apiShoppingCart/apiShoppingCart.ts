import {ApiBase} from '../apiCommon/apiBase';
import {ApiBaseTestData} from '../../testData/apiTestData/apiBaseTestData';
import {apiCookie, apiToken} from '../../helpers/env';
import {
  IApiClearShoppingCartResponseDataType,
  IApiShoppingCartResponseDataType
} from '../../dataTypes/apiDataTypes/apiShoppingCartDataTypes/apiShoppingCartDataTypes';
import * as FormData from 'form-data';
import * as path from 'path';
import * as fs from 'fs';
import {ApiFormDataKeyEnum} from '../../enums/apiEnums/apiFormDataKey.enum';
import {IProductDataType} from '../../dataTypes/uiDataTypes/dataTypes';

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
    return await this.getMethodWithWholeResponse(this.getBasketGetEndpoint(), this.apiBaseTestData.getHeadersWithCookieAndToken(apiCookie, apiToken),
      `Impossible to get basket data`);
  }

  public async clearShoppingCartData(): Promise<IApiClearShoppingCartResponseDataType> {
    return await this.postMethod(`${this.getBasketClearEndpoint()}`, this.apiBaseTestData.getHeadersWithFormDataAndCookie(apiCookie),
      {}, `Impossible to clear basket data`);
  }

  public async createShoppingCartData(bodyData: FormData): Promise<IApiClearShoppingCartResponseDataType> {
    return await this.postMethod(`${this.getBasketCreateEndpoint()}`, this.apiBaseTestData.getHeadersWithBearerTokenAndFormData(bodyData),
      {}, `Impossible to clear basket data`);
  }

  public async addProductToShoppingCart(productData: IProductDataType): Promise<IApiClearShoppingCartResponseDataType> {
    const data: FormData = new FormData();
    data.append(ApiFormDataKeyEnum.Product, productData.product);
    data.append(ApiFormDataKeyEnum.Count, productData.count);

    return await this.createShoppingCartData(data);
  }
}
