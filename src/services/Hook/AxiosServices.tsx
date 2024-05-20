import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import {
  CustomResponse,
  ELoggerCategoryType,
  ELoggerEventType,
  ResponseData,
} from "./typer";
import { debounce } from "lodash";
// import { toastError } from 'components/toast';
import { t } from "i18next";

import AuthServiceExport from "../Modal/ServerAuth";
import { C_STATUS_TOKEN_CANNOT_USE } from "./useAxiosService";
import loggerService, { ErrorType } from "./logService";

export const TIMEOUT_API = 30000;
export const TIMEOUT_ERROR_API = "timeout-error-api";

const debounceToastError = debounce((message: string) => {
  message;
}, 500);
export class AxiosServices {
  private instance: AxiosInstance;
  private isGetRawData = false;
  private isNonAuthen = false;
  // isGetRawData: we return response direct to user without parsing data.
  // this one is usually used for old api.
  constructor(isGetRawData?: boolean, isNonAuthen?: boolean) {
    const instance = axios.create();

    instance.interceptors.response.use(
      this.handleSuccess.bind(this),
      this.handleError.bind(this)
    );
    instance.interceptors.request.use(this.handlePreRequest.bind(this));

    this.instance = instance;
    this.isNonAuthen = !!isNonAuthen;
    this.isGetRawData = !!isGetRawData;
  }

  handlePreRequest(req: AxiosRequestConfig) {
    const token = AuthServiceExport.token;

    if (token && !this.isNonAuthen) {
      req!.headers!.Authorization = `Bearer ${token}`;
      req!.timeout = TIMEOUT_API;
      req!.timeoutErrorMessage = TIMEOUT_ERROR_API;
    }

    return req;
  }

  handleSuccess(response: AxiosResponse): CustomResponse | AxiosResponse {
    const { data, msg, code, status, successful } =
      response.data as ResponseData;

    let customResponse: CustomResponse = {
      code,
      success: successful,
      status,
      error: undefined,
      data: undefined,
    };

    if (status == C_STATUS_TOKEN_CANNOT_USE && typeof window !== "undefined") {
      const statusCode = `${status}-${code}`;
      const messageError = t(`status-code-${statusCode}`);
      debounceToastError(t(messageError));
      AuthServiceExport.removeAuth();
      setTimeout(() => {
        window.location.assign("/login");
      }, 1000);
    }
    if (status !== 200) {
      customResponse.error = { code, message: msg };
    } else {
      customResponse.data = data;
    }

    if (this.isGetRawData) return response;

    return { ...response.data, ...customResponse };
  }

  handleError(error: AxiosError): Promise<AxiosError> | CustomResponse {
    if (error?.message === TIMEOUT_ERROR_API) {
      return {
        data: null,
        success: false,
        status: 408,
        code: 100,
        error: { code: 408, message: error.message },
      };
    }
    loggerService.logger({
      event: ELoggerEventType.ApiError,
      category: ELoggerCategoryType.ApiError,
      errorType: ErrorType.SERVER_ERROR,
      message: error.message,
    });
    return Promise.reject(error);
  }

  handleLoggerError = (url: string, body: any, error: any) => {
    loggerService.logger({
      event: ELoggerEventType.ApiErrorTryCatch,
      category: ELoggerCategoryType.ApiError,
      data: {
        url,
        payload: body,
        errorMessage: error?.message,
        status: error?.request?.status,
      },
    });
    return Promise.reject(error);
  };

  async get<TData = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<CustomResponse<TData>> {
    try {
      const res = await this.instance.get(url, { ...config, ...params });
      return res as any;
    } catch (error) {
      return this.handleLoggerError(url, params, error) as any;
    }
  }

  async post<TData = any>(
    url: string,
    body: any,
    config?: AxiosRequestConfig
  ): Promise<CustomResponse<TData>> {
    try {
      const res = await this.instance.post(url, body, config);
      return res as any;
    } catch (error) {
      return this.handleLoggerError(url, body, error) as any;
    }
  }

  async put<TData = any>(
    url: string,
    body: string
  ): Promise<CustomResponse<TData>> {
    try {
      const res = await this.instance.put(url, body);
      return res as any;
    } catch (error) {
      return this.handleLoggerError(url, body, error) as any;
    }
  }

  async patch<TData = any>(
    url: string,
    body: string
  ): Promise<CustomResponse<TData>> {
    try {
      const res = await this.instance.patch(url, body);
      return res as any;
    } catch (error) {
      return this.handleLoggerError(url, body, error) as any;
    }
  }

  all(apis: Array<any>) {
    return axios.all(apis);
  }
}

export default new AxiosServices();
export const AxiosServicesRawData = new AxiosServices(true);
export const AxiosServicesNonAuthen = new AxiosServices(false, true);
