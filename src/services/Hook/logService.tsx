import { debounce } from "lodash";
import { ILoggerStream, ILoggerData } from "./typer";
import axios, { AxiosRequestConfig } from "axios";
import AuthServiceExport from "../Modal/ServerAuth";

export enum UserAgent {
  Web = "web",
}

export enum ErrorType {
  CLIENT_ERROR = "CLIENT_ERROR",
  SERVER_ERROR = "SERVER_ERROR",
}

export class LoggerService {
  private loggerPayload: any = [];
  private loggerPath = import.meta.env.VITE_LOGGER_API;
  private app_version = import.meta.env.VITE_APP_VERSION;
  private loggerNamespace = import.meta.env.VITE_LOGGER_NAMESPACE;

  private postLogger = debounce(() => {
    if (!this.loggerPayload.length) return;

    const token = AuthServiceExport.token;
    const config = {
      url: this.loggerPath,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        streams: this.loggerPayload,
      },
    };

    axios(config as AxiosRequestConfig).finally(
      () => (this.loggerPayload = [])
    );
  }, 5000);

  logger(dataLogger: ILoggerData) {
    if (!AuthServiceExport.isAuthenticated) return;
    const values: Array<string> = [(new Date().getTime() * 1e6).toString()];
    let bodyRequest: ILoggerData = {
      username: AuthServiceExport.getUser.username,
      metadata: {
        device: window.navigator?.userAgent,
        ...dataLogger?.metadata,
      },
      ...dataLogger,
    };
    if (dataLogger) {
      bodyRequest = { ...bodyRequest, ...dataLogger };
    }
    values.push(JSON.stringify(bodyRequest).toString());
    const query: ILoggerStream = {
      stream: {
        namespace: this.loggerNamespace,
        user_agent: UserAgent.Web,
        app_version: this.app_version,
      },
      values: [values],
    };
    this.loggerPayload.push(query);
    this.postLogger();
  }
}

const loggerService = new LoggerService();
export default loggerService;
