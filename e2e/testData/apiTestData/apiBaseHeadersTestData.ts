import {ApiBase} from '../../api/apiCommon/apiBase';
import {IApiHeadersType} from '../../dataTypes/apiDataTypes/apiCommonDataTypes/apiBaseDataTypes';

export class ApiBaseHeadersTestData extends ApiBase {
  public getHeadersWithFormDataAndCookie(cookie: string): IApiHeadersType {
    return {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': cookie
    };
  }

  public getHeadersWithFormDataAndCookieAndCsrfToken(cookie: string, csrfToken: string): IApiHeadersType {
    return {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': cookie,
      'X-Csrf-Token': csrfToken
    };
  }

  public getHeadersWithCookie(cookie: string): IApiHeadersType {
    return {
      'cookie': cookie
    };
  }

  public getHeadersWithCookieAndCsrfToken(cookie: string, csrfToken: string): IApiHeadersType {
    return {
      'Accept': 'application/json',
      'cookie': cookie,
      'X-Csrf-Token': csrfToken
    };
  }
}
