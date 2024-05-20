export interface IOtpForgotPasswordRes {
  secretId: string;
  isSuccess: boolean;
}

export interface OTPModalRef {
  openModal: (params: OTPOpenParams) => void;
}

export interface ValidateOTPForgotPasswordBody {
  otp: string;
  accountNo: string;
}

export interface OTPOpenParams {
  type: OTPType;
  onSuccess?: Function;
  setting?: IOtpSetting;
  onFailed?: Function;
  onSendOtp?: Function;
  paramsOtpNonAuth?: IParamsOTPNonAuth;
}

export interface OTPModalRef {
  openModal: (params: OTPOpenParams) => void;
}

export type OTPType = "normal" | "smart" | undefined;

export interface IParamsOTPNonAuth {
  accountNo?: string;
  username?: string;
  identityNumber?: string;
}

export interface IOtpSetting {
  urlOtp: string;
  countDown: number;
  disableSmartOtp?: boolean;
  actionWhenDoneOtp?: (res: IOtpForgotPasswordRes) => void;
}

export interface ResponseData<T = any> {
  data: T;
  status: number;
  successful: boolean;
  code: number;
  msg: string;
  serverDateTime: string;
  exception?: string;
}

export interface ErrorCustomResponse {
  code: number;
  message: string;
}

export interface CustomResponse<TData = any> {
  data: TData;
  success: boolean;
  status: number;
  code: number;
  statusText?: string;
  headers?: any;
  config?: any;
  exception?: string;
  error: ErrorCustomResponse | undefined;
  [key: string]: any;
}

export interface ILoggerStream {
  stream: {
    namespace: string;
    user_agent: string;
    app_version: string;
  };
  values: Array<Array<string>>;
}

export interface IPageDataResponse<T> {
  elements: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasMore: boolean;
  hasPrevious: boolean;
}

export enum ELoggerCategoryType {
  Order = "order",
  Asset = "asset",
  CashAdvance = "cash-advance",
  MoneyTransfer = "money-transfer",
  RightSubscription = "right-subscription",
  Global = "global",
  Otp = "otp",
  SellMultiple = "sell-multiple",
  ApiError = "api-error",
}
export enum ELoggerEventType {
  EditOrderPress = "edit-order-press",
  OrderError = "order-error",
  OrderSubmit = "order-submit",
  AssetTabPress = "asset-tab-press",

  CashAdvanceError = "cash-advance-error",
  CashAdvanceSubmit = "cash-advance-submit",
  CashAdvanceSuccess = "cash-advance-success",

  OrderPriceBidAskPress = "order-price-bid-ask-press",
  OrderPriceMatchPricePress = "order-price-match-price-press",
  OrderPriceCeilingPress = "order-price-ceiling-press",
  OrderPriceFloorPress = "order-price-floor-press",
  OrderPriceReferencePress = "order-price-reference-press",
  OrderVolumeMaxBuyPress = "order-volume-max-buy-press",
  OrderVolumeMaxSellPress = "order-volume-max-sell-press",
  OrderSuccess = "order-success",
  OrderEditSuccess = "edit-order-success",
  OrderEditError = "edit-order-error",
  OrderCancelPress = "cancel-order-press",
  OrderCancelSuccess = "cancel-order-success",
  OrderCancelError = "cancel-order-error",

  OrderDerivativeError = "order-derivative-error",
  OrderDerivativeSuccess = "order-derivative-success",
  OrderDerivativePriceMatchPricePress = "order-derivative-price-match-price-press",
  OrderDerivativePriceBidAskPress = "order-derivative-price-bid-ask-press",
  OrderDerivativePriceCeilingPricePress = "order-derivative-price-ceiling-price-press",
  OrderDerivativePriceFloorPricePress = "order-derivative-price-floor-price-press",
  OrderDerivativePriceReferencePricePress = "order-derivative-price-reference-price-press",
  OrderDerivativeVolumeMaxBuyPress = "order-derivative-volume-max-buy-press",
  OrderDerivativeVolumeMaxSellPress = "order-derivative-volume-max-sell-press",
  OrderDerivativeEditSuccess = "derivative-edit-order-success",
  OrderDerivativeEditError = "derivative-edit-order-error",
  OrderDerivativeCancelPress = "cancel-derivative-order-Press",
  OrderDerivativeCancelSuccess = "cancel-derivative-order-success",
  OrderDerivativeCancelError = "cancel-derivative-order-error",

  OrderSellMultipleOpen = "order-sell-multiple-open",
  OrderSellMultiplePress = "order-sell-multiple-press",
  OrderSellMultipleDoubleCheckFeFailed = "order-sell-multiple-double-check-fe-failed",
  OrderSellMultipleAuthenticationOtpSuccess = "order-sell-multiple-authentication-otp-success",
  OrderSellMultipleCallApi = "order-sell-multiple-call-api",
  OrderSellMultipleSuccess = "order-sell-multiple-success",
  OrderSellMultipleFailed = "order-sell-multiple-failed",

  MoneyTransferError = "money-transfer-error",
  MoneyTransferSubmit = "money-transfer-submit",

  RightSubscriptionPress = "right-subscription-press",
  RightSubscriptionError = "right-subscription-error",
  RightSubscriptionSuccess = "right-subscription-success",
  RightSubscriptionConfirmPress = "right-subscription-confirm-press",
  RightSubscriptionScreenView = "right-subscription-screen-view",

  GlobalTickerView = "ticker-view",
  GlobalViewScreen = "view-screen",

  OtpValidation = "otp-validation",
  OtpValidationError = "otp-validation-error",
  OtpValidationSubmit = "otp-validation-submit",
  OtpValidationSuccess = "otp-validation-success",
  OtpRequestSend = "otp-request-send",

  ApiErrorTryCatch = "api-error-try-catch",
  ApiError = "api-error",
}

export enum ErrorType {
  CLIENT_ERROR = "CLIENT_ERROR",
  SERVER_ERROR = "SERVER_ERROR",
}

export interface ILoggerData {
  username?: string;
  category: ELoggerCategoryType;
  event: ELoggerEventType | string;
  errorType?: ErrorType;
  data?: { [key: string]: string | number | any } | null;
  message?: string;
  metadata?: {
    device?: string;
  };
}
