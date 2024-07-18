import {IProductDataType, IUrlDataType, IUserDataType} from '../dataTypes/uiDataTypes/dataTypes';

export class DataProvider {
  private userTestData: IUserDataType[] = require(`../testData/uiTestData/userTestData.json`);
  private productTestData: IProductDataType[] = require(`../testData/uiTestData/productTestData.json`);
  private urlTestData: IUrlDataType = require(`../testData/uiTestData/urlTestData.json`);

  public getUserTestData(userIndex: number = 1): IUserDataType {
    return this.userTestData.find((user: IUserDataType) => user.index === userIndex);
  }

  public getUrlTestData(): IUrlDataType {
    return this.urlTestData;
  }

  public getProductTestData(productIndex: number = 1): IProductDataType {
    return this.productTestData.find((product: IProductDataType) => product.index === productIndex);
  }
}
