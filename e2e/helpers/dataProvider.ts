import {ILoginDataType, IUrlDataType, IUserDataType} from '../dataTypes/uiDataTypes/dataTypes';

export class DataProvider {
  private userTestData: IUserDataType[] = require(`../testData/uiTestData/userTestData.json`);
  private loginTestData: ILoginDataType = require(`../testData/uiTestData/login.json`);
  private urlTestData: IUrlDataType = require(`../testData/uiTestData/urlTestData.json`);

  public getUserTestData(userIndex: number = 1): IUserDataType {
    return this.userTestData.find((user: IUserDataType) => user.index === userIndex);
  }

  public getLoginTestData(): ILoginDataType {
    return this.loginTestData;
  }

  public getUrlTestData(): IUrlDataType {
    return this.urlTestData;
  }
}
