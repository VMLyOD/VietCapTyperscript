import ButtonDemo from "~/components/button/buttondemo";
import { BackGroundLogin } from "~/components/icon/iconBackground";
import { InputComponent } from "~/components/input";
import "./Login.css";

export const ForgotPassword = () => {
  return (
    <BackGroundLogin>
      <div className="class-forgot-pass h-[370px] w-[404px] rounded items-center text-center justify-center flex">
        <div className="w-[340px] h-[80%]">
          <div className="class-title-exame pb-4">
            <h1 className="text-xl font-semibold">Quên mật khẩu</h1>
            <h2 className="text-sm">
              Vui lòng cung cấp thông tin của Bạn như bên dưới:
            </h2>
          </div>
          <InputComponent
            fontSize="inp-14"
            type="text"
            size="medium"
            placeholder="Tên đăng nhập"
            color="inp-nomal"
          />
          <InputComponent
            fontSize="inp-14"
            type="number"
            size="medium"
            placeholder="Số CMND/CCCD"
            color="inp-nomal"
          />
          <div className="class-exame text-left pb-4 text-sm">
            <h2>Ví dụ</h2>
            <h2>Tên đăng nhập: 068C123456 hoặc 123456</h2>
            <h2>Số CMND: 021345987</h2>
          </div>

          <div className="flex w-full justify-between">
            <ButtonDemo
              buttonType="router-link"
              color="btncpn-gray"
              size="btncpn-Vlarge"
              fontSize="14"
              to="/login"
              textColor="gray"
              isUppercase
            >
              hủy
            </ButtonDemo>
            <ButtonDemo
              buttonType="router-link"
              color="btncpn-green"
              size="btncpn-Vlarge"
              fontSize="14"
              to="/login"
              textColor="white"
              isUppercase
            >
              tiếp tục
            </ButtonDemo>
          </div>
        </div>
      </div>
    </BackGroundLogin>
  );
};
