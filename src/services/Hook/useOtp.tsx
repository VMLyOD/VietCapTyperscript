import {
  CustomResponse,
  IOtpSetting,
  IParamsOTPNonAuth,
  OTPModalRef,
  OTPType,
} from "./typer";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { EOtpType } from "./useAxiosService";
import AxiosServices from "./AxiosServices";

interface AppContext {
  isMobile: boolean;
  otpRef: React.RefObject<OTPModalRef>;
  portfolioModalRef: React.RefObject<any>;
}
export const AppContext = React.createContext<AppContext | null>(null);

const { OTP_SERVICE_API, VITE_VERSION_API } = import.meta.env;
const endpoint = `${OTP_SERVICE_API}/${VITE_VERSION_API}`;

export const COOKIE_AUTH_OTP = "authOtp";
export const ORDER_UNIT = "(x1,000)";
export const TOTAL_CODE = "total";
export const C_OTP_EXCEED_ALLOWED_TIMES = "400-910";

export enum EOtpSendType {
  Sms = "sms",
  Email = "email",
}

interface IsSmartOTPResponse {
  isRegistered: boolean;
}
interface SendSmsOTPResponse {
  isSuccess: boolean;
  attempt: number;
  blocked: boolean;
}
interface ValidateOTPBody {
  otp: string;
  time: number;
  accountNo?: string;
  username?: string;
}

interface ValidateOTPResponse {
  attempt: null | number;
  blocked: null | boolean;
  isSuccess: boolean;
}

export type MaximumErrorMessageProps = {
  statusCode?: string;
  waitingTime: number;
};

const useOtp = (otpSetting?: IOtpSetting) => {
  const appContext: any = useContext(AppContext);
  const { i18n, t } = useTranslation("status-code");
  const [maximumErrorMessage, setMaximumErrorMessage] =
    useState<MaximumErrorMessageProps>();

  const handleResponse = async (promise: Promise<CustomResponse<any>>) => {
    const res = await promise;
    handleToastError(res);
    return res;
  };

  const checkIsSmartOTP = () => {
    return handleResponse(
      AxiosServices.get<IsSmartOTPResponse>(`${endpoint}/checkIOtpRegistered`)
    );
  };

  const sendSmsOTP = async (
    langCode = "vi",
    channel: EOtpSendType,
    forceSend = true,
    paramsOtpNonAuth?: IParamsOTPNonAuth
  ) => {
    let objParams: any = { langCode, forceSend, channel };
    if (paramsOtpNonAuth?.accountNo) {
      objParams = { ...objParams, ...paramsOtpNonAuth };
    }
    const params = new URLSearchParams(objParams);
    const url = paramsOtpNonAuth?.accountNo
      ? `${endpoint}/non-authen/sendOtp`
      : `${endpoint}/sendSmsOtp`;
    return handleResponse(
      AxiosServices.get<SendSmsOTPResponse>(`${url}?${params.toString()}`)
    );
  };

  const handleToastError = (res: CustomResponse<any>) => {
    if (!res.success && res?.status && res?.code) {
      const statusCode = `${res?.status}-${res?.code}`;
      let messageOtp = {};
      if (statusCode === C_OTP_EXCEED_ALLOWED_TIMES) {
        const exception = res?.exception;
        if (exception) {
          const waitingTime = Number(
            res?.exception?.toString().split("-")?.[1]
          );
          const minute = Math.floor(waitingTime / 60);
          const second = waitingTime % 60;
          messageOtp = {
            minute,
            second: !second && !minute ? 1 : second,
          };
          setMaximumErrorMessage({
            statusCode,
            waitingTime,
          });
        }
        t(`status-code-${statusCode}`, messageOtp);
      } else {
        t(`status-code-${statusCode}`);
      }
    }
  };

  const validateOTP = async (
    params: ValidateOTPBody,
    url = "/validateOtp",
    setting?: IOtpSetting
  ) => {
    if (params.accountNo) {
      const res = await handleResponse(
        AxiosServices.post<ValidateOTPResponse | null>(
          `${endpoint}/non-authen/validateOtp`,
          params
        )
      );
      if (setting?.actionWhenDoneOtp) {
        setting.actionWhenDoneOtp(res?.data as any);
      }
      return res;
    }
    return handleResponse(
      AxiosServices.post<ValidateOTPResponse | null>(
        `${endpoint}${url}`,
        params
      )
    );
  };

  const authenticationOTP = (
    paramsNonAuth?: IParamsOTPNonAuth
  ): Promise<boolean> => {
    const checkOTPType = async (): Promise<OTPType> => {
      if (paramsNonAuth?.accountNo) return "normal";
      const { data } = await checkIsSmartOTP();

      if (data?.isRegistered) return "smart";
      else return "normal";
    };

    return new Promise(async (resolve) => {
      const otpType = await checkOTPType();

      const otpSettingMapping = otpSetting || {
        urlOtp: "/validateOtp",
        countDown: 90,
      };
      return appContext?.otpRef.current?.openModal({
        type: otpType,
        setting: otpSettingMapping,
        paramsOtpNonAuth: paramsNonAuth,
        onSuccess: (data: any) => {
          if (otpSettingMapping.urlOtp === EOtpType.Session) {
            Cookies.set(COOKIE_AUTH_OTP, "true", {
              expires: new Date(data?.sessionValidTo * 1000),
            });
          }
          return resolve(true);
        },
        onFailed: () => resolve(false),
        onSendOtp: async (type: EOtpSendType) => {
          const data = await sendSmsOTP(
            i18n.language,
            type,
            true,
            paramsNonAuth
          );
          if (!data.success) {
            return resolve(false);
          }
        },
      });
    });
  };

  return {
    checkIsSmartOTP,
    sendSmsOTP,
    validateOTP,
    authenticationOTP,
    maximumErrorMessage,
  };
};

export default useOtp;
