import { useEffect, useState } from "react";
// import useAxiosService from "./useAxiosService";
import { onReactive } from "@vcsc/react-reactive";
import AuthServiceExport from "~/services/Modal/ServerAuth";
import useAxiosService from "~/services/Hook/useAxiosService";

export interface ProfileDetailResponse {
  phoneNumber: string;
  address: string;
  manager: string;
  identityNumber: string;
  email: string;
  customerName: string;
  username: string;
  accountNo: string;
  consentDate: string;
  giveConsent: boolean;
  profilePicture: string;
}

export interface ReactiveData<T> {
  data: T | null;
}

export interface ProfileDetailResponse {
  phoneNumber: string;
  address: string;
  manager: string;
  identityNumber: string;
  email: string;
  customerName: string;
  username: string;
  accountNo: string;
  consentDate: string;
  giveConsent: boolean;
  profilePicture: string;
}
export interface IEditProfilePayload {
  profilePicture?: string;
}

const useProfile = () => {
  const brokerBase = `${import.meta.env.VITE_BROKER_INFO_SERVICE_API}/${import.meta.env.VITE_VERSION_API}`;
  const externalUrl = `${import.meta.env.VITE_EXTERNAL_SERVICE_API}/${import.meta.env.VITE_VERSION_API}`;
  console.log("externalUrl", externalUrl);
  const [profile, setProfile] = useState<ProfileDetailResponse | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const { get, put } = useAxiosService();

  const getBrokerInfo = async () => {
    const res = await get(`${brokerBase}/broker`);
    return res;
  };

  const handleSetProfile = (profile?: ProfileDetailResponse) => {
    setProfile(profile);
  };

  async function fetchProfile() {
    UserInformationModel.isCallingUserInformation = true;
    const res = await get<ProfileDetailResponse>(
      `${externalUrl}/user-information`
    );
    AuthServiceExport.profile = res?.data;
    UserInformationModel.userInformation.data = res?.data;
    handleSetProfile(res?.data ?? {});
    return res.data;
  }

  useEffect(() => {
    if (!AuthServiceExport.isAuthenticated) return;

    if (
      AuthServiceExport.profile?.username ===
      AuthServiceExport.getUser?.username
    ) {
      handleSetProfile(AuthServiceExport.profile);
      return;
    }

    if (UserInformationModel.userInformation?.data) {
      handleSetProfile(UserInformationModel.userInformation.data || undefined);
    } else {
      if (!UserInformationModel.isCallingUserInformation) {
        fetchProfile();
      }
    }
  }, [AuthServiceExport]);

  // useEffect(() => {
  //   const unWatcher = onReactive(
  //     UserInformationModel.userInformation,
  //     (data) => {
  //       setProfile({ ...data?.data } as ProfileDetailResponse);
  //     }
  //   );
  //   return () => {
  //     unWatcher?.();
  //   };
  // }, []);

  const isVCSCAccount = () => {
    const prefix = AuthServiceExport.profile?.username?.substring(0, 2);
    // If the prefix of user id is f:, it's 068C account, else social account.
    return prefix === "f:";
  };

  const editProfile = async (payload: IEditProfilePayload) => {
    setLoading(true);
    try {
      const res = await put(`${externalUrl}/edit-profile`, payload);
      if (res?.success) {
        UserInformationModel.userInformation.data = res?.data;
        AuthServiceExport.profile = res?.data;
        handleSetProfile(res?.data);
      }
      return res;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    isVCSCAccount,
    getBrokerInfo,
    refetchProfile: fetchProfile,
    editProfile,
    loading,
    setLoading,
  };
};

export default useProfile;

export class UserInformationModel {
  static isCallingUserInformation = false;

  static userInformation: ReactiveData<ProfileDetailResponse> = { data: null };

  static subAccountRaws: any = { data: null };

  static clearUserInfo = () => {
    this.isCallingUserInformation = false;
    this.userInformation.data = null;
    this.subAccountRaws.data = null;
  };
}
