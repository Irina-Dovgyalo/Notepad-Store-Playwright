import {ApiBase} from '../../api/apiCommon/apiBase';
import {IApiHeadersType} from '../../dataTypes/apiDataTypes/apiCommonDataTypes/apiBaseDataTypes';
import {apiCookie, apiToken} from '../../helpers/env';

export class ApiBaseTestData extends ApiBase {
  public getHeadersWithFormDataAndCookie(cookie: string): IApiHeadersType {
    return {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': cookie
    };
  }

  public getHeadersWithCookieAndToken(cookie, token): IApiHeadersType {
    return {
      'content-type': 'application/jso',
      'cookie': cookie,
      'X-Csrf-Token': token
    };
  }


  public getHeadersWithBearerTokenAndFormData(data: any): IApiHeadersType {
    return {
      Authorization: `Bearer ${apiToken}`,
      accept: 'application/json',
      ...data.getHeaders()
    };
  }
}
