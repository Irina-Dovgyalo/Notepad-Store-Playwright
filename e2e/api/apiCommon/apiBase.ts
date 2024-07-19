import {DataProvider} from '../../helpers/dataProvider';
import {IApiHeadersType} from '../../dataTypes/apiDataTypes/apiCommonDataTypes/apiBaseDataTypes';
import * as rax from 'retry-axios';
import axios from 'axios';

export class ApiBase {
  public dataProvider: DataProvider = new DataProvider();

  public async getMethodWithWholeResponse(endpoint: string, headersData: IApiHeadersType, errorMessage?: string): Promise<any> {
    let cfg: any = {};
    let bodyInfo: any = {};
    let status: any = {};
    let headers: any = {};

    rax.attach();
    await axios({
      method: 'get',
      url: endpoint,
      headers: headersData,
      raxConfig: {
        retry: 5,
        retryDelay: 1000,
        noResponseRetries: 4,
        statusCodesToRetry: [[100, 199], [300, 599]],
        onRetryAttempt: err => {
          cfg = rax.getConfig(err);
          return true;
        }
      }
    })
    .then((response) => {
      bodyInfo = response.data;
      status = response.status;
      headers = response.headers;
    })
    .catch(function(error) {
      if (error.response) {
        throw new Error(`Error from API call with GET method after ${cfg.retry} unsuccessful attempts.
              Error response data: ${error.response.data.status} - ${error.response.data.error}
              AQA message: ${errorMessage}
              URL: ${endpoint}
              Headers to be sent: ${JSON.stringify(headersData)}
              Request date and time: ${error.response.headers.date}`
        );
      } else if (error.request) {
        throw new Error(`API call with GET method doesn't return response.
              Error message: ${error.request}
              AQA message: ${errorMessage}
              URL: ${endpoint}
              Headers to be sent: ${JSON.stringify(headersData)}`
        );
      } else {
        throw new Error(`Something happened in setting up the GET request that triggered an Error
              Error message: ${error.message}
              AQA message: ${errorMessage}
              URL: ${endpoint}
              Headers to be sent: ${JSON.stringify(headersData)}`
        );
      }
    });
    return {bodyInfo: bodyInfo, status: status, headers: headers};
  }

  public async postMethod(endpoint: string, headersData: IApiHeadersType, bodyData: string | object, errorMessage?: string): Promise<any> {
    let cfg: any = {};
    let bodyInfo: any = {};

    rax.attach();
    await axios({
      method: 'post',
      url: endpoint,
      headers: headersData,
      data: bodyData,
      responseType: 'json',
      raxConfig: {
        retry: 5,
        retryDelay: 1000,
        noResponseRetries: 4,
        statusCodesToRetry: [[100, 199], [300, 599]],
        httpMethodsToRetry: ['POST'],
        onRetryAttempt: err => {
          cfg = rax.getConfig(err);
          return true;
        }
      }
    })
    .then((response) => {
      bodyInfo = response.data;
    })
    .catch(function(error) {
      if (error.response) {
        throw new Error(`Error from API call with POST method after ${cfg.retry} unsuccessful attempts.
              Error response data: ${error.response.data.status} - ${error.response.data.error}
              AQA message: ${errorMessage}
              URL: ${endpoint}
              Headers to be sent: ${JSON.stringify(headersData)}
              Body data: ${JSON.stringify(bodyData)}
              Request date and time: ${error.response.headers.date}`
        );
      } else if (error.request) {
        throw new Error(`API call with POST method doesn't return response.
              Error message: ${error.request}
              AQA message: ${errorMessage}
              URL: ${endpoint}
              Headers to be sent: ${JSON.stringify(headersData)}
              Body data: ${bodyData}`
        );
      } else {
        throw new Error(`Something happened in setting up the POST request that triggered an Error
              Error message: ${error.message}
              AQA message: ${errorMessage}
              URL: ${endpoint}
              Headers to be sent: ${JSON.stringify(headersData)}
              Body data: ${JSON.stringify(bodyData)}`
        );
      }
    });
    return bodyInfo;
  }

  public async postMethodWithRedirect(endpoint: string, headersData: IApiHeadersType, bodyData: string | object, errorMessage?: string): Promise<any> {
    let status: any = {};
    let headers: any = {};

    rax.attach();
    // @ts-ignore
    await axios({
      method: 'post',
      url: endpoint,
      headers: headersData,
      maxRedirects: 0,
      validateStatus: (status: number) => status === 302,
      data: bodyData,
      responseType: 'text/html'
    })
    .then((response) => {
      status = response.status;
      headers = response.headers;
    })
    .catch(function(error) {
      if (error.response) {
        throw new Error(`Error from API call with POST method.
              Error response data: ${error.response.data.status} - ${error.response.data.error}
              AQA message: ${errorMessage}
              URL: ${endpoint}
              Headers to be sent: ${JSON.stringify(headersData)}
              Request date and time: ${error.response.headers.date}`
        );
      } else if (error.request) {
        throw new Error(`API call with POST method doesn't return response.
              Error message: ${error.request}
              AQA message: ${errorMessage}
              URL: ${endpoint}
              Headers to be sent: ${JSON.stringify(headersData)}`
        );
      } else {
        throw new Error(`Something happened in setting up the POST request that triggered an Error
              Error message: ${error.message}
              AQA message: ${errorMessage}
              URL: ${endpoint}
              Headers to be sent: ${JSON.stringify(headersData)}`
        );
      }
    });
    return {status: status, headers: headers};
  }
}
