import axios, { AxiosRequestConfig } from "axios";
import { ErrorCustomResponse, IOtpSetting } from "./typer";
import { useTranslation } from "react-i18next";
import { AxiosServices } from "./AxiosServices";
import useOtp from "./useOtp";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

export const C_OTP_CODE_INVALID = ["400-900", "400-904"];
export const C_HAS_CHANGE_PASSWORD = "401-100";
export const C_STATUS_TOKEN_CANNOT_USE = 401;
export const C_TIME_OUT_ERROR_API = "408-100";

export enum EOtpType {
  Session = "/validateOtp",
  EveryTimes = "/validateCashTransferOtp",
  ForgotPassword = "/non-authen/sendOtp",
}

export interface CustomResponse<TData = any> {
  data: TData;
  success: boolean;
  status: number;
  code: number;
  exception?: string;
  error: ErrorCustomResponse | undefined;
  [key: string]: any;
}

export interface ConfigApi {
  noShowToastError?: boolean;
  alwayCheckOtp?: boolean;
  loggerSuccess?: boolean;
  configAxios?: AxiosRequestConfig;
  showToastException?: boolean;
}

const debounceToastError = debounce((message: string) => {
  toastError(message);
}, 1000);

const useAxiosService = (otpType?: EOtpType) => {
  const { t } = useTranslation("status-code");
  const navigate = useNavigate();
  const { t: tException } = useTranslation("exception");
  const { authenticationOTP } = useOtp(
    ((): IOtpSetting => {
      switch (otpType) {
        case EOtpType.EveryTimes:
          return { countDown: 90, urlOtp: otpType } as IOtpSetting;
        case EOtpType.Session:
          return { urlOtp: otpType, countDown: 90 } as IOtpSetting;
        default:
          return { urlOtp: EOtpType.Session, countDown: 90 } as IOtpSetting;
      }
    })()
  );

  const get = <TData = any,>(
    url: string,
    payload?: any,
    configApi?: ConfigApi
  ): Promise<CustomResponse<TData>> => {
    if (configApi?.alwayCheckOtp) {
      return handleAuthOtp(get, url, payload);
    }
    return handleResponse(
      AxiosServices.get(url, payload, configApi?.configAxios),
      get,
      url,
      payload,
      configApi
    );
  };

  const post = <TData = any,>(
    url: string,
    payload: any,
    configApi?: ConfigApi
  ): Promise<CustomResponse<TData>> => {
    if (configApi?.alwayCheckOtp) {
      return handleAuthOtp(post, url, payload);
    }
    return handleResponse(
      AxiosServices.post(url, payload, configApi?.configAxios),
      post,
      url,
      payload,
      configApi
    );
  };

  const put = <TData = any,>(
    url: string,
    payload?: any,
    configApi?: ConfigApi
  ): Promise<CustomResponse<TData>> => {
    if (configApi?.alwayCheckOtp) {
      return handleAuthOtp(post, url, payload);
    }
    return handleResponse(
      AxiosServices.put(url, payload),
      put,
      url,
      payload,
      configApi
    );
  };

  const patch = <TData = any,>(
    url: string,
    payload: any,
    configApi?: ConfigApi
  ): Promise<CustomResponse<TData>> => {
    if (configApi?.alwayCheckOtp) {
      return handleAuthOtp(post, url, payload);
    }
    return handleResponse(
      AxiosServices.patch(url, payload),
      put,
      url,
      payload,
      configApi
    );
  };

  const all = (apis: Array<any>) => {
    return handleResponseAll(axios.all<any>(apis)) as Promise<Array<any>>;
  };

  const handleResponse = async <TData = any,>(
    promise: Promise<CustomResponse<TData>>,
    httpFun: any,
    url: string,
    payload?: any,
    configApi?: ConfigApi
  ): Promise<CustomResponse<TData>> => {
    return promise.then((res) => {
      if (
        !res?.success &&
        C_OTP_CODE_INVALID.includes(`${res?.status}-${res?.code}`)
      ) {
        return handleAuthOtp(httpFun, url, payload);
      }
      if (
        !res?.success &&
        res?.status &&
        res?.code &&
        !configApi?.noShowToastError &&
        !(res?.exception && configApi?.showToastException)
      ) {
        const statusCode = `${res?.status}-${res?.code}`;
        const messageError = t(`status-code-${statusCode}`);

        if (C_STATUS_TOKEN_CANNOT_USE == res?.status) {
          // debounceToastError(t(messageError));
          // Auth.removeAuth();
          // navigate('/login');
          // Đã handle ở axiosServices
        } else {
          messageError;
        }
      }
      if (!res?.success && res?.exception && configApi?.showToastException) {
        tException(`exception-${res.exception}`);
      }
      return res;
    });
  };

  const handleAuthOtp = async (httpFun: any, url: string, payload: any) => {
    const res = await authenticationOTP();
    if (res) {
      return httpFun(url, payload);
    } else {
      return false;
    }
  };

  const handleResponseAll = (res: any, isNeedOtp?: boolean) => {
    return res;
  };

  return { get, post, put, all, patch };
};

export default useAxiosService;
