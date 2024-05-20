import cl from "classnames";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TFunction } from "i18next";
import "./Login.css";
import Left from "~/assets/Images/img-top-left.svg";
import Right from "~/assets/Images/img-bottom-right.svg";
import ButtonDemo from "~/components/button/buttondemo";
import { IconArrowLeft } from "@tabler/icons-react";
import VietCapLogoLight from "/assets/logo/logo-light.svg";
import VietCapLogoDark from "/assets/logo/logo-dark.svg";
import { useTheme } from "~/context/ThemeContext";
import { Theme } from "~/context/ThemeContext/themes";
import Modal from "~/components/modal";
import { BackGroundLogin } from "~/components/icon/iconBackground";
import { InputComponent } from "~/components/input";
import { useComputedColorScheme } from "@mantine/core";
import { IError, ILogin, LoginLogic } from "~/services/Modal/Logic";
import AuthServiceExport from "~/services/Modal/ServerAuth";
import { C_TIME_OUT_ERROR_API } from "~/services/Hook/useAxiosService";
import { Trans, useTranslation } from "react-i18next";

const LoginForm: React.FC<{ tLogin: TFunction; tStatusCode: TFunction }> = ({
  tLogin,
  tStatusCode,
}) => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<IError>({} as IError);
  const [loginData, setLoginData] = useState<ILogin>({
    username: "",
    password: "",
  });
  const params = new URLSearchParams(window.location.search);
  // Cached param for callbackUrl
  const restParams = window.location.search
    .replace(/([&?])callbackUrl=[^&]+/, "")
    .replace(/^&/, "?");
  const callbackUrlValue = params.get("callbackUrl");
  const [count, setCount] = useState({ isCount: false, count: 0 });
  const { timer, setIsPlaying } = useCountdown(count.count, false, () => {
    setCount({ isCount: false, count: 0 });
  });

  const convertTime = (count: number): string => {
    let hours: string | number = Math.floor(count / 3600);
    let minutes: string | number = Math.floor(count / 60) - hours * 60;
    let seconds: string | number = parseFloat((count % 60).toFixed(0));

    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsSubmitted(true);
    const logicLogin = new LoginLogic(loginData);
    if (logicLogin.checkField?.status === 400) return;
    setIsLoading(true);
    const res = await AuthServiceExport.login(loginData);
    if (res?.status != 200) {
      if (`${res.status}-${res?.code}` === C_TIME_OUT_ERROR_API) {
        tStatusCode(`status-code-${res?.status}-${res?.code}`);
      }
      setError({
        status: res?.status,
        code: res?.code,
        message: `status-code-${res?.status}-${res?.code}`,
        exception: res.exception || "",
      });
    } else {
      setCount({ isCount: false, count: 0 });
      setIsPlaying(false);
      if (callbackUrlValue) {
        return navigate(`/${callbackUrlValue}${restParams}`);
      }
      return navigate(`/${restParams}`);
    }
    setIsLoading(false);
    return Promise.resolve(true);
  };
  const computedColorScheme = useComputedColorScheme();

  const errorMessage = useMemo(() => {
    const logicLogin = new LoginLogic(loginData);
    if (logicLogin.checkField?.status === 400) {
      return (
        <div className="login-error">
          {tLogin(logicLogin.checkField.message)}
        </div>
      );
    }

    if (error && error.status == 400 && error.code === 1209) {
      if (!count.isCount) {
        const timeDown = error.exception?.split("-");
        setCount({
          isCount: true,
          count: timeDown?.[1] ? Number(timeDown[1] || 0) : 0,
        });
        setIsPlaying(true);
      }
      return (
        <div>
          <div className="login-error">
            <span>
              {
                <Trans
                  t={tStatusCode}
                  i18nKey={error.message}
                  values={{
                    count: convertTime(timer),
                  }}
                  components={{
                    wrong: <span style={{ fontWeight: 600 }}></span>,
                  }}
                />
              }
            </span>
            <br />
            <span>
              {tLogin("or-contact")}{" "}
              <span className="contact">
                <a href="tel:+84 8888 2 6868">(+84) 2 8888 2 6868</a>
              </span>{" "}
              {tLogin("to-support")}
            </span>
          </div>
        </div>
      );
    }

    return <div className="login-error">{tStatusCode(error.message)}</div>;
  }, [loginData, error, timer]);

  return (
    <div className="Container-body-login">
      <BackGroundLogin>
        <div>
          <form className="form-login" onSubmit={handleSubmit}>
            <div className="flex items-center justify-center w-[404px] h-[100px] pb-5">
              <img
                className="h-full w-full"
                src={
                  computedColorScheme === "light"
                    ? VietCapLogoLight
                    : VietCapLogoDark
                }
                alt="logo-bruh"
              />
            </div>
            <div className="class-forgot-pass h-[370px] w-[404px] rounded items-center text-center justify-center flex">
              <div className="login-form">
                <h1 className="class-title-exame font-semibold">
                  Đăng nhập tài khoản
                </h1>
                <InputComponent
                  fontSize="inp-14"
                  type="text"
                  size="medium"
                  placeholder="Tên đăng nhập"
                  color="inp-nomal"
                  value={loginData.username}
                  onChange={(e) =>
                    setLoginData((prev) => ({
                      ...prev,
                      username: e.target.value?.trim(),
                    }))
                  }
                />
                <InputComponent
                  fontSize="inp-14"
                  type="text"
                  size="medium"
                  placeholder="Tên đăng nhập"
                  color="inp-nomal"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData((prev) => ({
                      ...prev,
                      password: e.target.value?.trim(),
                    }))
                  }
                />

                {/* <button
              className={cl({ "button-loading": isLoading })}
              type="submit"
              tabIndex={3}
            >
              
            </button> */}
                <ButtonDemo
                  color="btncpn-green"
                  buttonType="router-link"
                  isUppercase
                  textColor="gray"
                >
                  Đăng nhập
                  {isLoading && (
                    <img
                      className="spinner-loading"
                      src="/images/ic-loading.svg"
                    />
                  )}
                </ButtonDemo>

                {isSubmitted && errorMessage}

                <ButtonDemo
                  color="btncpn-none"
                  buttonType="router-link"
                  to="/forgot-password"
                >
                  Quên mật khẩu
                </ButtonDemo>
              </div>
            </div>
            <div>
              <div className="flex justify-center mt-3">
                <h3 style={{ color: "var(--mantine-color-gray_60-filled)" }}>
                  Quý khách chưa có tài khoản?
                </h3>
                <ButtonDemo
                  color="btncpn-none"
                  buttonType="link"
                  to="https://www.vietcap.com.vn/mo-tai-khoan"
                >
                  Open account
                </ButtonDemo>
              </div>
              <div className="flex items-center justify-center mt-10">
                <ButtonDemo color="btncpn-none">
                  <Link className=" flex justify-center items-center" to="/">
                    <IconArrowLeft />
                    <h3 className="ml-2">Quay lại</h3>
                  </Link>
                </ButtonDemo>
              </div>
            </div>
          </form>
        </div>
      </BackGroundLogin>
    </div>
  );
};

// const Login: React.FC = (): JSX.Element => {
//   const computedColorScheme = useComputedColorScheme();
//   return (
//     <div className="Container-body-login">
//       <BackGroundLogin>
//         <div>
//           <div className="flex items-center justify-center w-[404px] h-[100px] pb-5">
//             <img
//               className="h-full w-full"
//               src={
//                 computedColorScheme === "light"
//                   ? VietCapLogoLight
//                   : VietCapLogoDark
//               }
//               alt="logo-bruh"
//             />
//           </div>
//           <div className="class-forgot-pass h-[370px] w-[404px] rounded items-center text-center justify-center flex">
//             <div className="login-form">
//               <h1 className="class-title-exame font-semibold">
//                 Đăng nhập tài khoản
//               </h1>

//               {/* <InputComponent
//               fontSize="inp-14"
//               type="text"
//               size="medium"
//               placeholder="Tên đăng nhập"
//               color="inp-nomal"
//               value={loginData.username}
//               onChange={(e) =>
//                 setLoginData((prev) => ({
//                   ...prev,
//                   username: e.target.value?.trim(),
//                 }))
//               }
//             />
//             <InputComponent
//               fontSize="inp-14"
//               type="text"
//               size="medium"
//               placeholder="Tên đăng nhập"
//               color="inp-nomal"
//               value={loginData.password}
//               onChange={(e) =>
//                 setLoginData((prev) => ({
//                   ...prev,
//                   password: e.target.value?.trim(),
//                 }))
//               }
//             /> */}
//               <ButtonDemo
//                 color="btncpn-green"
//                 buttonType="router-link"
//                 to="/"
//                 isUppercase
//                 textColor="gray"
//               >
//                 Đăng Nhập
//               </ButtonDemo>

//               <ButtonDemo
//                 color="btncpn-none"
//                 buttonType="router-link"
//                 to="/forgot-password"
//               >
//                 Quên mật khẩu
//               </ButtonDemo>
//             </div>
//           </div>
//           <div>
//             <div className="flex justify-center mt-3">
//               <h3 style={{ color: "var(--mantine-color-gray_60-filled)" }}>
//                 Quý khách chưa có tài khoản?
//               </h3>
//               <ButtonDemo
//                 color="btncpn-none"
//                 buttonType="link"
//                 to="https://www.vietcap.com.vn/mo-tai-khoan"
//               >
//                 Open account
//               </ButtonDemo>
//             </div>
//             <div className="flex items-center justify-center mt-10">
//               <ButtonDemo color="btncpn-none">
//                 <Link className=" flex justify-center items-center" to="/">
//                   <IconArrowLeft />
//                   <h3 className="ml-2">Quay lại</h3>
//                 </Link>
//               </ButtonDemo>
//             </div>
//           </div>
//         </div>
//       </BackGroundLogin>
//     </div>
//   );
// };

// export default Login;

export default function Login() {
  const location = useLocation();
  const { t: tLogin } = useTranslation("login");
  const { t: tStatusCode } = useTranslation("status-code");
  const navigate = useNavigate();

  useEffect(() => {
    if (AuthServiceExport.isAuthenticated)
      navigate({
        ...location,
        pathname: "/",
      });
  }, [AuthServiceExport.isAuthenticated]);

  return !AuthServiceExport.isAuthenticated ? (
    <LoginForm tLogin={tLogin} tStatusCode={tStatusCode} />
  ) : (
    <></>
  );
}

export const useCountdown = (
  initialTimer: number,
  initialPlaying: boolean = false,
  expireTime?: () => void
): {
  timer: number;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
} => {
  const milisecond = useRef<number>(0);
  const previous = useRef<number>(0);
  const [timer, setTimer] = useState<number>(initialTimer);
  const [isPlaying, setIsPlaying] = useState<boolean>(initialPlaying);

  useEffect(() => {
    if (initialTimer > 0) {
      milisecond.current = initialTimer * 1000;
      previous.current = milisecond.current;
    }
  }, [initialTimer]);

  useEffect(() => {
    if (!isPlaying || milisecond.current <= 0) return;

    let effectInitialMs = milisecond.current;
    let effectInitialTimeStamp: number | undefined;
    let handle: number;

    const step = (timestampMs: number) => {
      if (effectInitialTimeStamp === undefined)
        effectInitialTimeStamp = timestampMs;
      const elapsed = timestampMs - effectInitialTimeStamp;
      milisecond.current = effectInitialMs - elapsed;

      if (milisecond.current <= 0) {
        setTimer(0);
        setIsPlaying(false);
        if (expireTime) expireTime();
        cancelAnimationFrame(handle);
      } else {
        const seconds = Math.floor(milisecond.current / 1000);
        const isUpdate = seconds !== Math.floor(previous.current / 1000);
        previous.current = milisecond.current;

        if (isUpdate) {
          setTimer(seconds);
        }

        if (isPlaying) {
          handle = window.requestAnimationFrame(step);
        }
      }
    };

    handle = window.requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(handle);
    };
  }, [isPlaying]);

  return {
    timer,
    isPlaying,
    setIsPlaying,
  };
};
