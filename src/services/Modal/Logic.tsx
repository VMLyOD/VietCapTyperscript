export interface ILogin {
  username: string;
  password: string;
}

export interface IError {
  status: number;
  code?: number;
  message: string;
  exception?: string;
}

export class LoginLogic {
  private data = {} as ILogin;
  constructor(data: ILogin) {
    this.data = data;
  }

  get checkField(): IError {
    const { username, password } = this.data;

    if (!username && !password) {
      return {
        status: 400,
        message: "Tài khoản và mật khẩu không được để trống",
      };
    }

    if (!username) {
      return {
        status: 400,
        message: "Tài khoản không được để trống",
      };
    }

    if (!password) {
      return {
        status: 400,
        message: "Mật khẩu không được để trống",
      };
    }

    if (password && password?.length > 8) {
      return {
        status: 400,
        message: "error-wrong-max-length",
      };
    }

    return {} as IError;
  }
}
