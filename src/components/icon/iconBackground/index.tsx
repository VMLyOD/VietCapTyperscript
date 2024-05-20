import ButtonDemo from "~/components/button/buttondemo";
import { useTheme } from "~/context/ThemeContext";
import { Theme } from "~/context/ThemeContext/themes";
import "./style.css";
import { useComputedColorScheme } from "@mantine/core";

interface BackGroundLogin {
  children: any;
}

export const BackGroundLogin: React.FC<BackGroundLogin> = ({ children }) => {
  const computedColorScheme = useComputedColorScheme();
  return (
    <div className="background-login flex w-full h-full">
      <img
        className="absolute top-0 left-0 w-[33%] "
        src={
          computedColorScheme === "dark"
            ? "/assets/img/img-login-left.svg"
            : "/assets/img/img-top-light.svg"
        }
      />

      <div className="h-full w-full justify-center items-center flex">
        {children}
      </div>

      <img
        className="bottom-0 absolute right-0 w-[33%]"
        src={
          computedColorScheme === "dark"
            ? "/assets/img/img-login-right.svg"
            : "/assets/img/img-bot-light.svg"
        }
      />
    </div>
  );
};
