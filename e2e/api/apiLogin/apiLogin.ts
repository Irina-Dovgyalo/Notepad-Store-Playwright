import {ApiBase} from '../apiCommon/apiBase';
import * as querystring from 'querystring';
import {StringUtils} from '../../helpers/stringUtils';
import * as cheerio from 'cheerio';
import {ApiBaseHeadersTestData} from '../../testData/apiTestData/apiBaseHeadersTestData';
import {apiCookie, apiCsrfToken, setApiCookie, setApiCsrfToken} from '../../helpers/env';
import {IApiHeadersType} from '../../dataTypes/apiDataTypes/apiCommonDataTypes/apiBaseDataTypes';

export class ApiLogin extends ApiBase {
  public apiBaseHeadersTestData: ApiBaseHeadersTestData = new ApiBaseHeadersTestData();

  public async setLoginCsrfTokenAndCookieWithGetMethod(endpoint: string, header: IApiHeadersType): Promise<void> {
    const responseBody: any = await this.getMethod(endpoint, header, `Unable to get response by the URL '${endpoint}'`);
    const $: any = cheerio.load(`${responseBody.bodyInfo}`);
    const csrfToken: string = $('#login-form > input').attr('value');
    const loginHeadersResponseSetCookie: string[] = responseBody.headers['set-cookie'];
    let cookie: string = '';

    if (loginHeadersResponseSetCookie.length > 0) {
      cookie = StringUtils.getStringByJoin(loginHeadersResponseSetCookie.map((cookies: string) => StringUtils.getStringBySplit(cookies, ';') + '; '));
    }

    setApiCsrfToken(csrfToken);
    setApiCookie(cookie);
  }

  public async setUpdatedCsrfTokenWithGetMethod(endpoint: string, header: IApiHeadersType): Promise<void> {
    const responseBody: any = await this.getMethod(endpoint, header, `Unable to get response by the URL '${endpoint}'`);
    const $: any = cheerio.load(`${responseBody.bodyInfo}`);
    const csrfToken: string = $('form[action="/site/logout"] > input').attr('value');

    setApiCsrfToken(csrfToken);
  }

  public async updateLoginCookieAfterPostMethodWithRedirect(endpoint: string, header: IApiHeadersType, bodyData?: string | object): Promise<void> {
    const responseBody: any = await this.postMethodWithRedirect(endpoint, header, bodyData, `Unable to get response by the URL '${endpoint}'`);
    const loginHeadersResponseSetCookie: string[] = responseBody.headers['set-cookie'];
    let requestLoginCookie: string = '';

    if (loginHeadersResponseSetCookie.length > 0) {
      requestLoginCookie = StringUtils.getStringByJoin(loginHeadersResponseSetCookie.map((cookies: string) => StringUtils.getStringBySplit(cookies, ';') + '; '));
    }

    setApiCookie(requestLoginCookie);
  }

  public async saveToEnvTokenAndCookie(userIndex: number = 1): Promise<any> {
    await this.setLoginCsrfTokenAndCookieWithGetMethod(`${this.dataProvider.getUrlTestData().uiNotesPointSchool}/login`, {});

    const data: string = querystring.stringify({
      _csrf: apiCsrfToken,
      'LoginForm[username]': this.dataProvider.getUserTestData(userIndex).username,
      'LoginForm[password]': this.dataProvider.getUserTestData(userIndex).password,
      'LoginForm[rememberMe]': 0
    });

    await this.updateLoginCookieAfterPostMethodWithRedirect(`${this.dataProvider.getUrlTestData().uiNotesPointSchool}/login`,
      this.apiBaseHeadersTestData.getHeadersWithFormDataAndCookie(apiCookie), data);

    await this.setUpdatedCsrfTokenWithGetMethod(`${this.dataProvider.getUrlTestData().uiNotesPointSchool}/`,
      this.apiBaseHeadersTestData.getHeadersWithCookie(apiCookie));
  }
}
