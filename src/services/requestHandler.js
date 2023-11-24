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
  profileNotifications: "/profile/notification-settings",
  customer: "/customer",
  readLead: "/lead",
  lead: "/lead/lead-step/",
  updateLead: "/lead/lead-step/",
  content: "/content",
  offer: "/offer",
  contract: "/contract",
  company: "/company",
  invoice: "/invoice",
  contactSupport: "/contactSupport",
  employee: "/employee",
  createEmployee: "/user/create-manager",
  updateEmployee: "/employee/profile",
  updateEmployeePassword: "/employee/password",
  service: "/service",
  offerService: "/offer-service",
  sendEmailOtp: "/otp/send-verify-email-link",
  followUp: "/followup",
  postPondNotes: "/followup/postpond",
  markComplete: "/followup/complete",
  leadNotes: "/lead/note/",
  notes: "/note"
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
const sendEmailOtp = (data) =>
  post(SERVICE_URLS.sendEmailOtp, data, { feature: featureConstants.login });
const profileStep1 = (data) =>
  put(SERVICE_URLS.profileStep1, data, { feature: featureConstants.login });
const profileStep2 = (data) =>
  put(SERVICE_URLS.profileStep2, data, { feature: featureConstants.login });
const profileStep3 = (data) =>
  put(SERVICE_URLS.profileStep3, data, { feature: featureConstants.login });
const generateOtp = (data) =>
  post(SERVICE_URLS.generateOtp, data, { feature: featureConstants.login });
const verifyEmailOtp = (data) =>
  post(`${SERVICE_URLS.verifyEmailOtp}`, { otp: data }, { feature: featureConstants.login });
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

// new Req method

const readCustomer = (params) =>
  get(SERVICE_URLS.customer, params, { feature: featureConstants.login }, { detail: false });

const readCustomerDetail = (params) =>
  get(SERVICE_URLS.customer, params, { feature: featureConstants.login }, { detail: true });

const createCustomer = (data) =>
  post(SERVICE_URLS.customer, data, { feature: featureConstants.login });

const updateCustomer = (data) =>
  put(SERVICE_URLS.customer + `/${data?.id}`, data, { feature: featureConstants.login });
const deleteCustomer = (data) =>
  del(SERVICE_URLS.customer + `/${data?.id}`, {}, { feature: featureConstants.login });
const readLead = (params) =>
  get(SERVICE_URLS.readLead, params, { feature: featureConstants.login }, { detail: false });
const readLeadDetail = (params) =>
  get(SERVICE_URLS.readLead, params, { feature: featureConstants.login }, { detail: true });
const createLead = (data) => {
  let route = data?.leadId ? data?.step + "/" + data?.leadId : data?.step
  return post(SERVICE_URLS.lead + route, data, { feature: featureConstants.login });

}

const updateLead = (data) =>
  put(SERVICE_URLS.updateLead + `${data?.step}/${data?.id}`, data, { feature: featureConstants.login });
const updateNotes = (data) =>
  put(SERVICE_URLS.leadNotes + `${data?.id}`, data, { feature: featureConstants.login });
const deleteLead = (data) =>
  del(SERVICE_URLS.readLead + `/${data?.id}`, {}, { feature: featureConstants.login });

const readContent = (data) =>
  get(SERVICE_URLS.content, data, { feature: featureConstants.login });

const createContent = (data) =>
  post(SERVICE_URLS.content, data, { feature: featureConstants.login });

const updateContent = (data) =>
  put(SERVICE_URLS.content, data, { feature: featureConstants.login });
const deleteContent = (data) =>
  del(SERVICE_URLS.content, data, { feature: featureConstants.login });

const readOffer = (data) =>
  get(SERVICE_URLS.offer, data, { feature: featureConstants.login });

const createOffer = (data) =>
  post(SERVICE_URLS.offer, data, { feature: featureConstants.login });

const updateOffer = (data) =>
  put(SERVICE_URLS.offer, data, { feature: featureConstants.login });
const deleteOffer = (data) =>
  del(SERVICE_URLS.offer, data, { feature: featureConstants.login });

const readContract = (data) =>
  get(SERVICE_URLS.contract, data, { feature: featureConstants.login });

const createContract = (data) =>
  post(SERVICE_URLS.contract, data, { feature: featureConstants.login });

const updateContract = (data) =>
  put(SERVICE_URLS.contract, data, { feature: featureConstants.login });
const deleteContract = (data) =>
  del(SERVICE_URLS.contract, data, { feature: featureConstants.login });

const readCompany = (data) =>
  get(SERVICE_URLS.company, data, { feature: featureConstants.login });

const createCompany = (data) =>
  post(SERVICE_URLS.company, data, { feature: featureConstants.login });

const updateCompany = (data) =>
  put(SERVICE_URLS.company, data, { feature: featureConstants.login });
const deleteCompany = (data) =>
  del(SERVICE_URLS.company, data, { feature: featureConstants.login });

const readInvoice = (data) =>
  get(SERVICE_URLS.invoice, data, { feature: featureConstants.login });

const createInvoice = (data) =>
  post(SERVICE_URLS.invoice, data, { feature: featureConstants.login });

const updateInvoice = (data) =>
  put(SERVICE_URLS.invoice, data, { feature: featureConstants.login });
const deleteInvoice = (data) =>
  del(SERVICE_URLS.invoice, data, { feature: featureConstants.login });

const readContactSupport = (data) =>
  get(SERVICE_URLS.contactSupport, data, { feature: featureConstants.login });

const createContactSupport = (data) =>
  post(SERVICE_URLS.contactSupport, data, { feature: featureConstants.login });

const updateContactSupport = (data) =>
  put(SERVICE_URLS.contactSupport, data, { feature: featureConstants.login });
const deleteContactSupport = (data) =>
  del(SERVICE_URLS.contactSupport, data, { feature: featureConstants.login });

const readEmployee = (params) =>
  get(SERVICE_URLS.employee, params, { feature: featureConstants.login }, { detail: false });
const readEmployeeDetail = (params) =>
  get(SERVICE_URLS.employee, params, { feature: featureConstants.login }, { detail: true });

const createEmployee = (data) =>
  post(SERVICE_URLS.createEmployee, data, { feature: featureConstants.login });

const updateEmployee = (data) =>
  put(SERVICE_URLS.updateEmployee + `/${data?.id}`, data, { feature: featureConstants.login });
const updateEmployeePassword = (data) =>
  patch(SERVICE_URLS.updateEmployeePassword + `/${data?.id}`, data, { feature: featureConstants.login });
const deleteEmployee = (data) =>
  del(SERVICE_URLS.employee + `/${data}`, {}, { feature: featureConstants.login });

const readService = (params) =>
  get(SERVICE_URLS.service, params, { feature: featureConstants.login }, { detail: false });
const readServiceDetails = (params) =>
  get(SERVICE_URLS.service, params, { feature: featureConstants.login }, { detail: true });

const createService = (data) =>
  post(SERVICE_URLS.service, data, { feature: featureConstants.login });

const updateService = (data) =>
  put(SERVICE_URLS.service + `/${data?.id}`, data, { feature: featureConstants.login });
const deleteService = (data) =>
  del(SERVICE_URLS.service + `/${data?.id}`, {}, { feature: featureConstants.login });

const readOfferService = (data) =>
  get(SERVICE_URLS.offerService, data, { feature: featureConstants.login });

const createOfferService = (data) =>
  post(SERVICE_URLS.offerService, data, { feature: featureConstants.login });

const updateOfferService = (data) =>
  put(SERVICE_URLS.offerService, data, { feature: featureConstants.login });
const deleteOfferService = (data) =>
  del(SERVICE_URLS.offerService, data, { feature: featureConstants.login });

const readFollowUp = (params) =>
  get(SERVICE_URLS.followUp, params, { feature: featureConstants.login }, { detail: false });

const readFollowUpDetail = (params) =>
  get(SERVICE_URLS.followUp, params, { feature: featureConstants.login }, { detail: true });

const createFollowUp = (data) =>
  post(SERVICE_URLS.followUp, data, { feature: featureConstants.login });

const createPostPondNotes = (data) =>
  put(SERVICE_URLS.postPondNotes + `/${data?.id}`, data, { feature: featureConstants.login });
const markComplete = (data) =>
  put(SERVICE_URLS.markComplete + `/${data?.id}`, data, { feature: featureConstants.login });

const updateFollowUp = (data) =>
  put(SERVICE_URLS.followUp + `/${data?.id}`, data, { feature: featureConstants.login });
const deleteFollowUp = (data) =>
  del(SERVICE_URLS.followUp + `/${data?.id}`, {}, { feature: featureConstants.login });
const readNotes = (params) =>
  get(SERVICE_URLS.notes + `/${params?.type}/${params?.id}`, {}, { feature: featureConstants.login }, { detail: false });
const createNotes = (params) =>
  post(SERVICE_URLS.notes + `/${params?.type}/${params?.id}`, params, { feature: featureConstants.login }, { detail: false });
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
  profileNotification,
  readCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  readLead,
  createLead,
  updateLead,
  deleteLead,
  readContent,
  createContent,
  updateContent,
  deleteContent,
  readOffer,
  createOffer,
  updateOffer,
  deleteOffer,
  readContract,
  createContract,
  updateContract,
  deleteContract,
  readCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  readInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  readContactSupport,
  createContactSupport,
  updateContactSupport,
  deleteContactSupport,
  readEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  readService,
  createService,
  updateService,
  deleteService,
  readOfferService,
  createOfferService,
  updateOfferService,
  deleteOfferService,
  readCustomerDetail,
  sendEmailOtp,
  readEmployeeDetail,
  updateEmployeePassword,
  readFollowUp,
  readFollowUpDetail,
  createFollowUp,
  updateFollowUp,
  deleteFollowUp,
  createPostPondNotes,
  markComplete,
  readLeadDetail,
  updateNotes,
  readServiceDetails,
  readNotes,
  createNotes
};
export default apiServices;
