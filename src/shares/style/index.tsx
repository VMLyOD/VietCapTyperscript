import { indicatorsContainerCSS } from "node_modules/react-select/dist/declarations/src/components/containers";
import { indicatorSeparatorCSS } from "node_modules/react-select/dist/declarations/src/components/indicators";

export const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    height: "28px ",
    lineHeight: "28px ", // Đặt dòng chữ căn giữa
    width: "128px",
    minHeight: "28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "var(--mantine-color-gray_10-filled)",
    boxShadow: state.isFocused ? "none" : "none",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    lineHeight: "5px",
    width: "100%",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    background: state.isFocused ? "#f0f0f0" : "transparent",
    "&:hover": {
      background: "var(--mantine-color-primary-filled)",
    },
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    minWidth: "200px",
    width: "100%",
    background: "var(--mantine-color-gray_10-filled)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "var(--mantine-color-gray_10-filled)",
    overflow: "hidden",
    "&::-webkit-scrollbar": {
      width: "8px", // Chiều rộng của thanh cuộn
      height: "8px", // Chiều cao của thanh cuộn
      backgroundColor: "#007bff", // Màu nền của thanh cuộn
    },
    "&::-webkit-scrollbar-thumb": {
      // Định dạng con của thanh cuộn cho các trình duyệt dựa trên WebKit
      backgroundColor: "#007bff", // Màu của nút cuộn
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#007bff",
    },
  }),
  input: (provided: any, state: any) => ({
    ...provided,
    // background: "#234559",
    height: "24px",
    lineHeight: "24px",
    color: "var(--mantine-color-gray_60-filled)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&::hover": {
      backgroundColor: "none",
    },
  }),
  valueContainer: (provided: any, state: any) => ({
    ...provided,
    // background: "#007bff",
    height: "24px",
    padding: "0 8px",
    // display: "flex",
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    // background: "#007bff",
    // display: "flex",
    color: "var(--mantine-color-gray_60-filled)",
    alignItems: "center",
  }),
  selectContainer: (provided: any, state: any) => ({
    ...provided,
    // background: "#007bff",
    display: "flex",
    alignItems: "center",
    height: "24px",
  }),
  indicatorSeparator: (provided: any, state: any) => ({
    ...provided,
    background: "none",
    display: "flex",
    alignItems: "center",
  }),
  indicatorsContainer: (provided: any, state: any) => ({
    ...provided,
    background: "none",
    display: "flex",
    marginRight: "5px",
    alignItems: "center",
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    // background: "#007bff",
    display: "flex",
    height: "28px",

    // justifyContent: "center",
  }),
  // control: (provided, state) => ({
  //   ...provided,
  //   border: '1px solid #ccc',
  //   borderRadius: '4px',
  //   boxShadow: state.isFocused ? '0 0 0 1px #007bff' : 'none',
  //   '&:hover': {
  //     borderColor: '#007bff'
  //   }
  // }),
  // option: (provided, state) => ({
  //   ...provided,
  //   background: state.isFocused ? '#f0f0f0' : 'transparent',
  //   '&:hover': {
  //     background: '#f0f0f0'
  //   }
  // })
};
