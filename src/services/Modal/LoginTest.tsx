import cl from "classnames";
import { TFunction } from "i18next";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import AuthServiceExport, { C_TIME_OUT_ERROR_API } from "./ServerAuth";
import { IError, ILogin, LoginLogic } from "./Logic";

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
    <div>
      <img className="decorator top-left" src="/images/bg-pattern.svg" />
      <img className="decorator bottom-right" src="/images/bg-pattern.svg" />

      <div className="body">
        <form className="form-login" onSubmit={handleSubmit}>
          <img className="logo" src="/images/logo-login.svg" />
          <div className="form">
            <h1>{tLogin("login-title")}</h1>
            <input
              tabIndex={1}
              placeholder={tLogin("username")}
              id="username"
              name="username"
              type="text"
              autoFocus={true}
              value={loginData.username}
              onChange={(e) =>
                setLoginData((prev) => ({
                  ...prev,
                  username: e.target.value?.trim(),
                }))
              }
            />

            <input
              tabIndex={2}
              placeholder={tLogin("password")}
              id="password"
              name="password"
              type="password"
              value={loginData.password}
              maxLength={8}
              onChange={(e) =>
                setLoginData((prev) => ({
                  ...prev,
                  password: e.target.value?.trim(),
                }))
              }
            />

            <button
              className={cl({ "button-loading": isLoading })}
              type="submit"
              tabIndex={3}
            >
              {tLogin("login")}
              {isLoading && (
                <img className="spinner-loading" src="/images/ic-loading.svg" />
              )}
            </button>

            {isSubmitted && errorMessage}

            <div
              className="forgot-password"
              onClick={() => navigate("/forgot-password")}
            >
              {tLogin("forgot-password")}
            </div>
          </div>
          <div className="has-account">
            {tLogin("no-vcsc-account")}
            <a href="https://www.vcsc.com.vn/mo-tai-khoan" target="_blank">
              {tLogin("open-vcsc-account")}
            </a>
          </div>
          <div
            className="go-back"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/");
            }}
          >
            <img className="go-back-icon" src="/images/go-back.svg" />
            {tLogin("go-back")}
          </div>
        </form>
      </div>
    </div>
  );
};

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
