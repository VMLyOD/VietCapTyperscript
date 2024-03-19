import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Left from "~/assets/Images/img-top-left.svg";
import Right from "~/assets/Images/img-bottom-right.svg";
import VietCapLogo from "~/components/icon/VietCapLogo";
import ButtonDemo from "~/components/button/buttondemo";
import { IconArrowLeft } from "@tabler/icons-react";

const Login: React.FC = (): JSX.Element => {
  return (
    <div className="Container-body">
      <img className="w-[600px] relative top-[-140px]" src={Left} alt="lmao" />
      <div className="body">
        <div className="form">
          <div className="logo ">
            <VietCapLogo className="w-[100%] items-center h-[100%] justify-center flex ml-12" />
          </div>
          <div className="login-form">
            <h1>Đăng nhập tài khoản</h1>
            <input
              placeholder="Tên đăng nhập"
              id="username"
              name="username"
              type="text"
              value=""
            ></input>
            <input
              placeholder="Mật khẩu"
              id="password"
              name="password"
              type="password"
              value=""
            ></input>
            <ButtonDemo color="green">
              <Link className="text-white" to="/">
                Đăng nhập
              </Link>
            </ButtonDemo>
            <ButtonDemo color="none">
              <Link className="text-green-700" to="/">
                Quên mật khẩu
              </Link>
            </ButtonDemo>
          </div>
          <div className="flex justify-center mt-3">
            <h3 className="text-white">Quý khách chưa có tài khoản?</h3>
            <ButtonDemo color="none">
              <Link className="text-white" to="/">
                Mở tài khoản
              </Link>
            </ButtonDemo>
          </div>
          <div className="flex items-center justify-center mt-10">
            <ButtonDemo color="none">
              <Link
                className="text-white flex justify-center items-center"
                to="/"
              >
                <IconArrowLeft />
                <h3 className="ml-2">Quay lại</h3>
              </Link>
            </ButtonDemo>
          </div>
        </div>
      </div>
      <img
        className="w-[600px] relative bottom-[-140px] "
        src={Right}
        alt="lmao"
      />
    </div>
  );
};

export default Login;
