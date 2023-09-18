import { del, get, patch, post, put } from "./HttpProvider";
import featureConstants from "./features-constants";

const SERVICE_URLS = {
  // service URL's (API End-Points)
  login: "/auth/login",
  resetPassword: "/auth/reset-password",
  forgotPassword: "/auth/forgot-password",
  loginGoogle: "/auth/oauth/google/auth",
  loginFacebook: "/auth/oauth/facebook/auth",
  loginInstagram: "/auth/instagram/",
  userSignup: "/user/signup",
  profileStep1: "/profile/complete-profile/1",
  profileStep2: "/profile/complete-profile/2",
  profileStep3: "/profile/complete-profile/3",
  generateOtp: "/otp/send-verify-phone-otp",
  verifyEmailOtp: "/otp/verify-email",
  readProfile: "/profile/me",
  updateProfile: "/profile/update-profile/",
  updateAddress: "/profile/update-profile/address",
  connectGoogle: "/auth/oauth/google",
  connectFb: "/auth/oauth/facebook",
  verifyPhone: "/otp/verify-phone",
  changePassword: "/profile/update-profile/password",
  comericalSeller: "/profile/commercial-seller-request",
  idVarificationReq: "/profile/id-verification-request",
  profileNotifications: "/profile/notification-settings"
};

const login = (data) =>
  post(SERVICE_URLS.login, data, { feature: featureConstants.login });
const resetPassword = ({ otp, data }) =>
  post(SERVICE_URLS.resetPassword, { otp: otp, password: data?.password }, { feature: featureConstants.login });
const forgotPassword = (data) =>
  post(SERVICE_URLS.forgotPassword, data, { feature: featureConstants.login });
const loginGoogle = (data) =>
  post(SERVICE_URLS.loginGoogle, data, { feature: featureConstants.login });
const loginFaceBook = (data) =>
  post(SERVICE_URLS.loginFacebook, data, { feature: featureConstants.login });
const loginInstagram = (data) =>
  post(SERVICE_URLS.loginInstagram, data, { feature: featureConstants.login });
const singUp = (data) =>
  post(SERVICE_URLS.userSignup, data, { feature: featureConstants.login });
const profileStep1 = (data) =>
  put(SERVICE_URLS.profileStep1, data, { feature: featureConstants.login });
const profileStep2 = (data) =>
  put(SERVICE_URLS.profileStep2, data, { feature: featureConstants.login });
const profileStep3 = (data) =>
  put(SERVICE_URLS.profileStep3, data, { feature: featureConstants.login });
const generateOtp = (data) =>
  post(SERVICE_URLS.generateOtp, data, { feature: featureConstants.login });
const verifyEmailOtp = (data) =>
  post(`${SERVICE_URLS.verifyEmailOtp}?otp=${data}`, { otp: data }, { feature: featureConstants.login });
const readUserProfile = (data) =>
  get(SERVICE_URLS.readProfile, {}, { feature: featureConstants.login });
const updateProfile = (data) =>
  patch(`${SERVICE_URLS.updateProfile}${data?.key}`, data?.key === "password" ? data?.[data?.key] : data, { feature: featureConstants.login });
const updateProfileAddress = (data) =>
  patch(`${SERVICE_URLS.updateAddress}`, data, { feature: featureConstants.login });
const connectGoogle = (data) =>
  post(SERVICE_URLS.connectGoogle, data, { feature: featureConstants.login });
const disConnectGoogle = (data) =>
  del(SERVICE_URLS.connectGoogle, data, { feature: featureConstants.login });
const disConnectFacebook = (data) =>
  del(SERVICE_URLS.connectFb, data, { feature: featureConstants.login });
const connectFb = (data) =>
  post(SERVICE_URLS.connectFb, data, { feature: featureConstants.login });
const verifyPhone = (data) =>
  post(SERVICE_URLS.verifyPhone, data, { feature: featureConstants.login });
const changePassword = (data) =>
  patch(`${SERVICE_URLS.changePassword}`, data, { feature: featureConstants.login });
const commercialSellerRequest = (data) =>
  post(SERVICE_URLS.comericalSeller, data, { feature: featureConstants.login });
const idVarificationRequest = (data) =>
  post(SERVICE_URLS.idVarificationReq, data, { feature: featureConstants.login });
const profileNotification = (data) =>
  put(SERVICE_URLS.profileNotifications, data, { feature: featureConstants.login });
const apiServices = {
  login,
  singUp,
  loginGoogle,
  loginFaceBook,
  loginInstagram,
  forgotPassword,
  resetPassword,
  profileStep1,
  profileStep2,
  profileStep3,
  generateOtp,
  verifyEmailOtp,
  readUserProfile,
  updateProfile,
  updateProfileAddress,
  connectGoogle,
  connectFb,
  disConnectGoogle,
  disConnectFacebook,
  verifyPhone,
  commercialSellerRequest,
  idVarificationRequest,
  profileNotification
};
export default apiServices;
