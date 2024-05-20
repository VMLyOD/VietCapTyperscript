import React, { Fragment, ReactNode, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useTheme } from "~/context/ThemeContext";
import { Theme } from "~/context/ThemeContext/themes";

import { Dialog, Transition, Tab } from "@headlessui/react";
import IconsPublic from "~/components/icon/IconPublic";
import ButtonDemo from "~/components/button/buttondemo";
import { useListState } from "@mantine/hooks";
import { Checkbox } from "@mantine/core";
import { CTT, Db, Dm, Kl, TTS } from "~/shares/utils/Array";
import { Radio, Group } from "@mantine/core";
import { IndeterminateCheckbox } from "~/components/CheckBox/CheckBoxCPN";

export const MySetting: React.FC = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div style={{ height: "24px", width: "24px" }}>
      <div
        style={{
          // background: "var(--mantine-color-transparent_10-filled)",
          borderRadius: "4px",
        }}
      >
        <IconsPublic
          toolTip="Settings"
          imageUrl="/assets/icon/dark/icon-setting.svg"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        ></IconsPublic>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div
                  className={theme === Theme.Light ? "LightMode" : "DarkMode"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "var(--mantine-color-gray_60-filled)",
                    width: "720px",
                    height: "575px",
                    borderRadius: "4px",
                  }}
                >
                  <Dialog.Panel
                    className="w-[720px] h-[573px] rounded transform overflow-hidden align-middle shadow-xl transition-all"
                    style={{
                      background: "var(--mantine-color-gray5-filled)",
                    }}
                  >
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium h-[48px] flex items-center pl-3 justify-between pr-3"
                      style={{
                        background: "var(--mantine-color-gray_10-filled)",
                        color: "var(--mantine-color-gray_60-filled)",
                      }}
                    >
                      <h2>Cài đặt hiển thị</h2>
                      <button
                        onClick={closeModal}
                        className="close-modal justify-center flex items-center"
                        style={{
                          background: "var(--mantine-color-gray_2-filled)",
                        }}
                      >
                        <img
                          className="w-[20px] h-[20px] bg-slate-600 rounded-xl"
                          src="/assets/close-dark.svg"
                          alt=""
                        />
                      </button>
                    </Dialog.Title>
                    <div
                      className="h-[525px] w-[160px]"
                      style={{
                        background: "var(--mantine-color-gray_20-filled)",
                      }}
                    >
                      <Tab.Group defaultIndex={0}>
                        <div className="flex text-sm">
                          <TabHeadless />
                          <Tab.Panels>
                            <Tab.Panel>
                              <div className="w-[526px] h-[477px]  ml-[24px]  ">
                                <div className="w-[402px] h-[54px] pt-4 flex-col flex justify-end">
                                  <h2 className="flex">Kiểu danh sách</h2>
                                  <div className="flex justify-between">
                                    <InRadio />
                                  </div>
                                </div>
                                <div
                                  className="h-[1px] w-ful mt-4 mb-4"
                                  style={{
                                    background:
                                      "var(--mantine-color-primary-filled)",
                                  }}
                                ></div>
                                <div>
                                  <h2 className="flex">Cột hiển thị</h2>
                                  <div className="flex w-full">
                                    <ButtonView
                                      titleTab="Cơ sở"
                                      contenTab={
                                        <>
                                          <IndeterminateCheckbox
                                            textLable="TC - Trần - Sàn"
                                            labeData={TTS}
                                          />
                                          <IndeterminateCheckbox
                                            textLable="Cao - TB - Thấp"
                                            labeData={CTT}
                                          />
                                          <IndeterminateCheckbox
                                            textLable="Dư bán"
                                            labeData={Db}
                                          />
                                          <IndeterminateCheckbox
                                            textLable="Dư mua"
                                            labeData={Dm}
                                          />
                                          <IndeterminateCheckbox
                                            textLable="Khớp lệnh"
                                            labeData={Kl}
                                          />
                                          <div>
                                            <DefCheck Lable="GD NN (Mua, Bán, Room)" />
                                            <DefCheck Lable="KLGD & GTGD TT" />
                                          </div>
                                        </>
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <ButtonSave onClick={closeModal} />
                            </Tab.Panel>
                            <Tab.Panel>
                              <div className="w-[512px] h-[477px]  ml-[24px] ">
                                <div className="cot-hien-thi pt-4 overflow-y-auto grid grid-cols-2">
                                  <DefCheck Lable="VNI" />
                                  <DefCheck Lable="VN30" />
                                  <DefCheck Lable="HNX" />
                                  <DefCheck Lable="HNX30" />
                                  <DefCheck Lable="HNX30" />
                                  <DefCheck Lable="UPCOM" />
                                  <DefCheck Lable="UPCOM" />
                                </div>
                                <div
                                  className="h-[1px] w-full mt-4"
                                  style={{
                                    background:
                                      "var(--mantine-color-gray_20-filled)",
                                  }}
                                ></div>
                                <div className="cot-hien-thi pt-4 overflow-y-auto grid grid-cols-2">
                                  <DefCheck Lable="VN50" />
                                  <DefCheck Lable="VN100" />
                                  <DefCheck Lable="SmallCap" />
                                  <DefCheck Lable="MidCap" />
                                  <DefCheck Lable="VNShare" />
                                  <DefCheck Lable="AllShare" />
                                  <DefCheck Lable="VNDiamond" />
                                  <DefCheck Lable="Chỉ số toàn cầu" />
                                </div>
                              </div>
                              <ButtonSave onClick={closeModal} />
                            </Tab.Panel>
                          </Tab.Panels>
                        </div>
                      </Tab.Group>
                    </div>
                  </Dialog.Panel>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export const TabHeadless = () => {
  const { theme } = useTheme();

  return (
    <Tab.List className="text-white flex-col flex ">
      <Tab className="h-[38px] w-[160px] flex items-center text-sm" as="div">
        {({ selected }) => (
          <button
            className={selected ? "background-primary" : "background-gray"}
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              paddingLeft: "12px",
              alignItems: "center",
            }}
          >
            Bảng giá
          </button>
        )}
      </Tab>
      <Tab className="h-[38px] w-[160px] flex items-center text-sm" as="div">
        {({ selected }) => (
          <button
            className={selected ? "background-primary" : "background-gray"}
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              paddingLeft: "12px",
              alignItems: "center",
            }}
          >
            Chỉ số
          </button>
        )}
      </Tab>
    </Tab.List>
  );
};

interface ButtonSave {
  onClick?: () => void;
}

export const ButtonSave: React.FC<ButtonSave> = ({ onClick }) => {
  const { theme } = useTheme();
  return (
    <div className={theme === Theme.Light ? "LightMode" : "DarkMode"}>
      <div
        className="h-12 w-[560px] bg-slate-100 flex justify-end items-center"
        style={{
          background: "var(--mantine-color-gray_10-filled)",
          columnGap: "8px",
        }}
      >
        <div
          className="flex mr-2"
          style={{
            columnGap: "8px",
          }}
        >
          <ButtonDemo size="btncpn-120" color="btncpn-gray40" onClick={onClick}>
            Mặc định
          </ButtonDemo>
          <ButtonDemo
            size="btncpn-120"
            color="btncpn-green"
            onClick={onClick}
            textColor="white"
          >
            Lưu
          </ButtonDemo>
        </div>
      </div>
    </div>
  );
};

interface CheckboxItem {
  label: string;
  checked: boolean;
  key: string;
}

interface IndeterminateCheckboxProps {
  textLable: string;
  labeData: CheckboxItem[];
}

export const checkBoxTron = () => {
  return (
    <>
      <input type="checkbox" id="myCheckbox" className="round-checkbox" />
      <label htmlFor="myCheckbox"></label>
    </>
  );
};

interface DefaultChecked {
  Lable: string;
}

export const DefCheck: React.FC<DefaultChecked> = ({ Lable }) => {
  return (
    <div className="mt-3">
      <Checkbox
        defaultChecked
        label={Lable}
        color="var(--mantine-color-primary-filled)"
      />
    </div>
  );
};

export const InRadio = () => {
  return (
    <div className="h-full flex justify-between items-center">
      <Radio.Group name="favoriteFramework">
        <Group mt="xs" className="flex w-full justify-between items-center">
          <Radio variant="outline" value="ABC" label="Theo thứ tự ABC" />
          <Radio variant="outline" value="Dra" label="Tùy chỉnh kéo thả" />
        </Group>
      </Radio.Group>
    </div>
  );
};

interface GroupTab {
  titleTab: string;
  contenTab: ReactNode;
}

export const ButtonView2: React.FC<GroupTab> = ({ titleTab, contenTab }) => {
  return (
    <div className="flex-col flex mt-4 w-full">
      <Tab.Group defaultIndex={0}>
        <div>
          <Tab.List>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected ? "background-primary" : "background-gray"
                  }
                >
                  {titleTab}
                </button>
              )}
            </Tab>
          </Tab.List>
        </div>

        <Tab.Panel className="cot-hien-thi mt-4 h-[296px] w-full overflow-y-auto grid grid-cols-2">
          <div className="w-full">{contenTab}</div>
        </Tab.Panel>
      </Tab.Group>
    </div>
  );
};

export const ButtonView: React.FC<GroupTab> = ({ contenTab }) => {
  return (
    // <div className={theme === Theme.Light ? "LightMode" : "DarkMode"}>
    <div className="flex-col flex mt-4 w-full ">
      <Tab.Group defaultIndex={0}>
        <div>
          <Tab.List className="flex gap-x-1">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected ? "background-primary" : "background-gray"
                  }
                  style={{
                    height: "100%",
                    minWidth: "50px",
                    display: "flex",
                    paddingLeft: "12px",
                    alignItems: "center",
                    padding: "7px 12px 7px 12px",
                    borderRadius: "4px",
                  }}
                >
                  Cơ sở
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected ? "background-primary" : "background-gray"
                  }
                  style={{
                    height: "100%",
                    minWidth: "50px",
                    display: "flex",
                    paddingLeft: "12px",
                    alignItems: "center",
                    padding: "7px 12px 7px 12px",
                    borderRadius: "4px",
                  }}
                >
                  Phát sinh
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected ? "background-primary" : "background-gray"
                  }
                  style={{
                    height: "100%",
                    minWidth: "50px",
                    display: "flex",
                    paddingLeft: "12px",
                    alignItems: "center",
                    padding: "7px 12px 7px 12px",
                    borderRadius: "4px",
                  }}
                >
                  Chứng quyền
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected ? "background-primary" : "background-gray"
                  }
                  style={{
                    height: "100%",
                    minWidth: "50px",
                    display: "flex",
                    paddingLeft: "12px",
                    alignItems: "center",
                    padding: "7px 12px 7px 12px",
                    borderRadius: "4px",
                  }}
                >
                  Trái phiếu
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected ? "background-primary" : "background-gray"
                  }
                  style={{
                    height: "100%",
                    minWidth: "50px",
                    display: "flex",
                    paddingLeft: "12px",
                    alignItems: "center",
                    padding: "7px 12px 7px 12px",
                    borderRadius: "4px",
                  }}
                >
                  Lô lẻ
                </button>
              )}
            </Tab>
          </Tab.List>
        </div>

        <Tab.Panel className="cot-hien-thi mt-4 h-[296px] w-full overflow-y-auto grid grid-cols-2">
          {contenTab}
        </Tab.Panel>
      </Tab.Group>
    </div>
    // </div>
  );
};
