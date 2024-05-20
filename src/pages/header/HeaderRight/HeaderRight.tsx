import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ButtonDemo from "~/components/button/buttondemo";
import FlagEN from "~/assets/Images/flag-en-circle.svg";
import FlagVN from "~/assets/Images/flag-vn-circle.svg";
import i18n from "~/translate/i18n";
import LightTheme from "/assets/light.svg";
import DarkTheme from "/assets/dark.svg";
import {
  useMantineColorScheme,
  useComputedColorScheme,
  Input,
} from "@mantine/core";
import AuthServiceExport from "~/services/Modal/ServerAuth";
import useProfile from "~/hooks/Profile/Profile";
import { IconChevronDown } from "@tabler/icons-react";
import DropDown from "~/components/dropdown/dropdown";

const HeaderRight: React.FC = () => {
  const { profile } = useProfile();
  const imgAvatar = profile?.profilePicture;
  const [isLogin, setIsLogin] = useState(AuthServiceExport.isAuthenticated);
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const handleChangeLng = (): void => {
    const newLanguage = currentLanguage === "en" ? "vi" : "en";
    i18n.changeLanguage(newLanguage).then(() => {
      localStorage.setItem("lng", newLanguage);
      setCurrentLanguage(newLanguage);
    });
  };

  console.log("profile", profile);

  return isLogin ? (
    <>
      {/* <Input.Dropdown
        name="profile"
        className={sliderClasses}
        onSelect={onSelect}
        optionDefs={{
          selectFormatter,
          optionFormatter
        }}
        options={[
          { label: t('profile'), value: 'profile' },
          { label: t('logout'), value: 'logout' }
        ]}
        placeholder
        enhanceClassName="options-enhance"
      /> */}
      <div className="myheader-right flex">
        <div className="class-profile flex h-[30px] w-[120px]">
          <img
            className="img-avatar"
            src={imgAvatar ? imgAvatar : "/assets/ic_user_primary.svg"}
          />
          <span className="text-black">{profile?.customerName}</span>
        </div>
      </div>
    </>
  ) : (
    <div className="myheader-right flex">
      <Link to="/testpage" className="Login-btn">
        <ButtonDemo color="btncpn-red" size="btncpn-medium" textColor="white">
          Open account
        </ButtonDemo>
      </Link>

      <Link to="/login" className="Login-btn">
        <ButtonDemo color="btncpn-green" size="btncpn-medium" textColor="white">
          Login
        </ButtonDemo>
      </Link>
      <img
        src={currentLanguage === "en" ? FlagEN : FlagVN}
        alt="images language"
        className="h-[24px] w-[24px] cursor-pointer"
        onClick={() => handleChangeLng()}
      />
      <div className="button-theme h-[24px] w-[24px] mr-3 flex items-center justify-center">
        <div
          onClick={() =>
            setColorScheme(computedColorScheme === "light" ? "dark" : "light")
          }
          className="h-6 w-6 bg-none"
        >
          <img
            className={`icon-theme ${computedColorScheme === "light" ? "LightBG" : "DarkBG"}`}
            src={computedColorScheme === "light" ? DarkTheme : LightTheme}
            alt="Theme Icon"
            style={{ height: "24px", width: "24px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderRight;
