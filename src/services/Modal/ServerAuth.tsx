import axios, { AxiosResponse } from "axios";
import { Buffer } from "buffer";
import Cookies from "js-cookie";
import JSEncrypt from "jsencrypt";
import { TIMEOUT_API, TIMEOUT_ERROR_API } from "../customAxios/customAxios";
import { ProfileDetailResponse } from "~/hooks/Profile/Profile";

export interface ResponseData<T = any> {
  data: T;
  status: number;
  successful: boolean;
  code: number;
  msg: string;
  serverDateTime: string;
  exception?: string;
}

const GRANT_TYPE = import.meta.env.VITE_GRANT_TYPE;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const EXTERNAL_URL = import.meta.env.VITE_EXTERNAL_SERVICE_API;
const ENV_NAME = import.meta.env.VITE_ENV_NAME;

const PUBLIC_KEY: { [key: string]: string } = {
  eks: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8SN33j0L+h00RzfV0yKumiCvJCLzWZnW6uu6RyTpzcqmKq6ZTbJWAYcPovEQiEbTIGNMpkMr4twqx6xLTTLixAC/QzKnO85822KvuFiOijSVVRMzp8koVAXbGXItdNSwmCl3fuf7iC+s4LnR870i/Gtc2TGLIUftJullwv+X0yJ5Gm/hXOqpQyPrkekEogiMNobjheA84LR72sdcvDXNaszRD3yn6yGcZT2fni/jCFL5vJF5aGqdeeckR2fNpVOV0y5sKeeMslz+Z9M2rk7Ouo9prXvPHq0Jw4X5K9fZ+soMuxpHygVg+4XT8CynSFnduRfbjsFISFPFtIBDPSFJqQIDAQAB",
  qc: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8SN33j0L+h00RzfV0yKumiCvJCLzWZnW6uu6RyTpzcqmKq6ZTbJWAYcPovEQiEbTIGNMpkMr4twqx6xLTTLixAC/QzKnO85822KvuFiOijSVVRMzp8koVAXbGXItdNSwmCl3fuf7iC+s4LnR870i/Gtc2TGLIUftJullwv+X0yJ5Gm/hXOqpQyPrkekEogiMNobjheA84LR72sdcvDXNaszRD3yn6yGcZT2fni/jCFL5vJF5aGqdeeckR2fNpVOV0y5sKeeMslz+Z9M2rk7Ouo9prXvPHq0Jw4X5K9fZ+soMuxpHygVg+4XT8CynSFnduRfbjsFISFPFtIBDPSFJqQIDAQAB",
  dev: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8SN33j0L+h00RzfV0yKumiCvJCLzWZnW6uu6RyTpzcqmKq6ZTbJWAYcPovEQiEbTIGNMpkMr4twqx6xLTTLixAC/QzKnO85822KvuFiOijSVVRMzp8koVAXbGXItdNSwmCl3fuf7iC+s4LnR870i/Gtc2TGLIUftJullwv+X0yJ5Gm/hXOqpQyPrkekEogiMNobjheA84LR72sdcvDXNaszRD3yn6yGcZT2fni/jCFL5vJF5aGqdeeckR2fNpVOV0y5sKeeMslz+Z9M2rk7Ouo9prXvPHq0Jw4X5K9fZ+soMuxpHygVg+4XT8CynSFnduRfbjsFISFPFtIBDPSFJqQIDAQAB",
  uat: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtCVpVsCfgUg/GFpFY3xkIxXAIPVX/Nr5LBrbGScXm8X2LFVx/OSYq4zT/IzTCa3NYbsXItOyYnboIrmRdHjAnqe9SqJRk0JU/d6x6ymVHCr1+hCCI5AVEfHmtoVQ6NzWaoji/CAn1+7PUQFTrDA+EBM267guVCxuOzzXmcl+2hsgcSdqZvtRgTkbaXCgEg85Z20N5cInaS7WBcXLOLSmwxUZJHiN9ArA6688vn7n0O5/e3swXeX5Lwms9szFhUqZ0rtxQYMuzCNZkTI3v9L8KpBaswwyQ6ytOaVnSt2WAT2rut178+hRT2jrGjxCPzaF9r9slSczm1Jj97c+C91/jwIDAQAB",
  prod: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyLqeItKPOxG1ii3bA1wnKs58pke6AY79ixvfg/351Ydic2csbJK9puvG2r1kbRzHuDWv1n5uTG6ZQSlGYhe9V0ijDPDj3dJJ1dH0Ov3IuIVVo2m9Dm1PQQsfvE1ReY3EyPnyGGWYkP0IPwEIwy+waH1zP8iy1ihufbtbKrOHaOeT0tN6RQ4pktGqWk8ZD7mgqK+WFmPGrkU5akd2GM1pVSGIJJgpQOo5Hmm1vxAABq/5yV6TqIhj1cGg8/0MZnPlLcrHu7gpBAwj00gi7PYwZzsHttjm482oFfuAXV/TeWQiVvc5zo5B10KKQ0kOBYLdOskeXzB2sDXCqlBV5fnZzwIDAQAB",
};

interface ILoginRequest {
  username: string;
  password: string;
}
interface ILoginResponse {
  token: string;
}

interface IUser {
  role: string;
  email_verified: boolean;
  accountNo: string;
  phone_number: string;
  client_type: number;
  uuid: string;
  email: string;
  customerName: string;
  client_id: string;
  username: string;
  iat: number;
  exp: number;
}

console.log("EXTERNAL_URL", EXTERNAL_URL, ENV_NAME, CLIENT_SECRET, GRANT_TYPE);

class AuthService {
  private readonly COOKIE_AUTH_TOKEN = "authToken";
  private readonly TOKEN_EXPIRE = "token_expire";
  // private readonly NORMAL_ACCOUNT = '068';

  private _profile: ProfileDetailResponse | undefined = undefined;
  private _showedToast = true;

  public set profile(v: ProfileDetailResponse | undefined) {
    this._profile = v;
  }

  public get profile(): ProfileDetailResponse | undefined {
    return this._profile;
  }

  login = async (dataLogin: ILoginRequest) => {
    const encryptPassword = await this.generatePw(dataLogin.password);
    if (!encryptPassword) {
      return {
        status: 500,
        code: 100,
      };
    }

    try {
      const res = await axios.post<
        ILoginRequest,
        AxiosResponse<ResponseData<ILoginResponse>>
      >(
        `${EXTERNAL_URL}/v1/authentication/login`,
        { ...dataLogin, password: encryptPassword },
        {
          headers: {
            "grant-type": GRANT_TYPE,
            "client-id": CLIENT_ID,
            "client-secret": CLIENT_SECRET,
          },
          timeout: TIMEOUT_API,
          timeoutErrorMessage: TIMEOUT_ERROR_API,
        }
      );

      const { data, successful, status, code, exception } = res.data || {};

      if (!successful && status && code) {
        return {
          status,
          code,
          exception,
        };
      }
      if (data.token && successful) {
        const user: IUser = this.parseJwt(data.token);

        new Date(user.exp * 1000);
        let duration =
          new Date(user.exp * 1000).getTime() -
          new Date(`${res?.data?.serverDateTime}Z`)?.getTime();

        // nếu thời gian hết hạn token nhỏ hơn 2h thì lấy 2h
        const TWO_HOURS_MILLISECONDS = 7200000;
        if (duration < TWO_HOURS_MILLISECONDS) {
          duration = TWO_HOURS_MILLISECONDS;
        }
        this._showedToast = false;
        Cookies.set(this.COOKIE_AUTH_TOKEN, data.token);
        Cookies.set(
          this.TOKEN_EXPIRE,
          (new Date().getTime() + duration).toString(),
          {
            expires: new Date(new Date().getTime() + duration),
          }
        );
      }

      return {
        status,
        code,
        data: res.data,
      };
    } catch (error: any) {
      if (error?.message === TIMEOUT_ERROR_API) {
        return { status: 408, code: 100 };
      }
      return {
        status: 500,
        code: 100,
      };
    }
  };

  private parseJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        Buffer.from(base64, "base64")
          .toString("binary")
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  };

  // private generatePw = async (pw: string) => {
  //   try {
  //     const pubKey = PUBLIC_KEY[ENV_NAME];
  //     if (!pubKey) return null;

  //     const encrypt = new JSEncrypt();
  //     encrypt.setPublicKey(pubKey);

  //     return encrypt.encrypt(pw);
  //   } catch (error) {
  //     return null;
  //   }
  // };

  private generatePw = async (password: string) => {
    try {
      // const publicKeyData = await this.loadPrivateKeyFromFile(CERT_URL);
      const publicKeyPEM = `-----BEGIN PUBLIC KEY-----\n${PUBLIC_KEY[ENV_NAME || "prod"]}\n-----END PUBLIC KEY-----`;

      // Tạo phiên bản JSENCRYPT với khóa công khai
      const encrypt = new JSEncrypt();

      encrypt.setPublicKey(publicKeyPEM);

      // Encrypt the data
      const encryptedData = encrypt.encrypt(password);
      if (encryptedData) {
        const encryptedDataHex = Buffer.from(encryptedData, "base64")?.toString(
          "hex"
        );
        return encryptedDataHex; //pass
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  removeAuth = () => {
    this._showedToast = true;
    Cookies.set(this.COOKIE_AUTH_TOKEN, "");
    Cookies.set(this.TOKEN_EXPIRE, "");
    Cookies.set(COOKIE_AUTH_OTP, "");
    UserInformationModel.clearUserInfo();
  };
  checkTokenExpires() {
    const timeExpires = Cookies.get(this.TOKEN_EXPIRE);
    if (timeExpires && new Date().getTime() < Number(timeExpires)) return;
    if (!this._showedToast) {
      {
        autoClose: 5000;
      }
      UserInformationModel.clearUserInfo();
      this._showedToast = true;
    }
    this.removeAuth();
    return true;
  }
  get token(): string {
    return Cookies.get(this.COOKIE_AUTH_TOKEN) ?? "";
  }

  get getUser(): IUser {
    const token = this.token;
    if (!token) return {} as IUser;
    return this.parseJwt(token);
  }

  get isAuthenticated(): boolean {
    this.checkTokenExpires();
    return (
      !!Cookies.get(this.TOKEN_EXPIRE) && !!Cookies.get(this.COOKIE_AUTH_TOKEN)
    );
  }
}

const AuthServiceExport = new AuthService();
export default AuthServiceExport;

export class UserInformationModel {
  static isCallingUserInformation = false;

  static userInformation = { data: null };

  static subAccountRaws: any = { data: null };

  static clearUserInfo = () => {
    this.isCallingUserInformation = false;
    this.userInformation.data = null;
    this.subAccountRaws.data = null;
  };
}

export const COOKIE_AUTH_OTP = "authOtp";
export const C_STATUS_TOKEN_CANNOT_USE = 401;
export const C_TIME_OUT_ERROR_API = "408-100";
