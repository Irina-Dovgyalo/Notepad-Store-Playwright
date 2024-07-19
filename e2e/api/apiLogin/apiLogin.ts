import {ApiBase} from '../apiCommon/apiBase';
import * as querystring from 'querystring';
import {StringUtils} from '../../helpers/stringUtils';
import * as cheerio from 'cheerio';
import {ApiBaseTestData} from '../../testData/apiTestData/apiBaseTestData';
import {setApiCookie, setApiToken} from '../../helpers/env';

export class ApiLogin extends ApiBase {
  public apiBaseTestData: ApiBaseTestData = new ApiBaseTestData();

  public async saveToEnvTokenAndCookie(userIndex: number = 1): Promise<any> {
    const responseBody: any = await this.getMethodWithWholeResponse(`${this.dataProvider.getUrlTestData().uiNotesPointSchool}/login`, {}, `Unable to get Notes Point School login page`);
    const $: any = cheerio.load(`${responseBody.bodyInfo}`);
    const csrfToken: string = $('#login-form > input').attr('value');
    console.log('1 csrfToken -> ', csrfToken);
    const loginHeadersSetCookie: string[] = responseBody.headers['set-cookie'];
    console.log('2 loginHeadersSetCookie -> ', loginHeadersSetCookie);
    // Remove date and get CSRF-TOKEN and session values to set in cookie
    let loginCookie: string = '';

    if (loginHeadersSetCookie.length > 0) {
      loginCookie = StringUtils.getStringByJoin(loginHeadersSetCookie.map((cookies: string) => StringUtils.getStringBySplit(cookies, ';') + '; '));
    }

    console.log('3 loginCookie -> ', loginCookie);

    const data: any = querystring.stringify({
      _csrf: csrfToken,
      'LoginForm[username]': this.dataProvider.getUserTestData(userIndex).username,
      'LoginForm[password]': this.dataProvider.getUserTestData(userIndex).password,
      'LoginForm[rememberMe]': 0
    });

    console.log('4 POST data: ', data);

    // const response: any = await this.postMethodWithRedirect(`${this.dataProvider.getUrlTestData().uiNotesPointSchool}/login`,
    //   this.apiBaseTestData.getHeadersWithFormDataAndCookie(loginCookie), data,
    //   `Unable to set user credentials '${this.dataProvider.getUserTestData(userIndex).username}' via API when logging into Notes Point School`);
    //
    // const setCookie: string[] = response.headers['set-cookie'];
    // console.log(`6 setCookie ---> `, setCookie);
    // let cookie: string = '';
    // let loginToken: string = '';
    //
    // if (setCookie.length > 0) {
    //   for (const headerCookie of setCookie) {
    //     cookie += StringUtils.getStringBySplit(headerCookie, ';') + '; ';
    //   }
    //
    //   loginToken += decodeURIComponent(StringUtils.getStringBySplit(StringUtils.getStringBySplit(setCookie[0], ';'), '=', 1));
    // }
    //
    // console.log('111 cookie -> ', cookie);
    // console.log('222 loginToken -> ', loginToken);
    // setApiToken(loginToken);
    // setApiCookie(cookie);
  }
}
