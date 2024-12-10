import { del, get, patch, post, put } from "./HttpProvider";
import featureConstants from "./features-constants";

const SERVICE_URLS = {
  // service URL's (API End-Points)
  login: "/auth/login",
  logout: "/auth/logout",
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
  appointment: "/lead/report/report-step/",
  companyLeadAppointment: "/lead/appointment",
  appointmentStatus: "/lead/appointment/update-status",
  readReport: "/lead/report",
  content: "/content",
  contentDetails: "/content/content-step/",
  leadStatus: "/lead/update-lead-status",

  readOffer: "/offer",
  offer: "/offer/Offer-step/",

  contract: "/contract",
  contractTask: "/contract/task",
  updateContract: "/contract/",
  adminCompany: "/company",
  invoice: "/invoice",
  downloadInvoiceRoute: "/invoice/download-excel",
  invoiceCalculationRoute: "/invoice/calculations",
  mainInvoice: "/invoice/invoice-step/",

  contactSupport: "/contactSupport",
  employee: "/employee",
  createEmployee: "/user/create-manager",
  updateEmployee: "/employee/profile",
  updateEmployeePassword: "/employee/password",
  service: "/service",
  offerService: "/offer-service",
  sendEmailOtp: "/otp/send-verify-email-link",
  leadFollowUp: "/followup",
  postPondNotes: "/followup/postpond",
  markComplete: "/followup/complete",
  leadNotes: "/lead/note/",
  offerNotes: "/offer/note/",

  notes: "/note",
  offerStatus: "/offer/updateOfferStatus/",
  sendEmail: "/offer/updateOfferStatus/",
  offerPaymentStatus: "/offer/update-payment-status/",
  contractStatus: "/contract/updateContractStatus/",
  contractPaymentStatus: "/contract/update-payment-status/",
  invoiceCollection: "/invoice/invoice-collection",
  invoiceCollectionDetail: "/invoice/invoice-collection/read",

  createRecurringInvoice:
    "/invoice/invoice-collection/create-recurring-invoice/",
  updateRecurringInvoice: "/invoice/update-recurring-invoice/",
  updateInvoiceStatus:
    "/invoice/invoice-collection/update-invoiceCollection-status/",
  createInvoice: "/invoice/invoice-collection/",
  updateInvoicePaymentStatus:
    "/invoice/invoice-collection/update-payment-status/",
  updateInvoiceCollection: "/invoice/invoice-collection/",
  createInvoiceDetail: "/invoice/invoice-step/",

  image: "/lead/images/",
  accountSetting: "/setting/account-setting",
  updatePassword: "/setting/update-password/",
  systemSetting: "/setting/system-setting/",
  templates: "/setting/template",
  tax: "/setting/tax",
  addressSetting: "/setting/address-setting",
  notesSetting: "/setting/notes-setting",
  followUp: "/setting/follow-up-setting",
  mail: "/mailtracker",
  offerSendEmail: "/offer/send-email/",
  emailSettings: "/setting/mail-setting/mail-setting",
  createEmailSettings: "/setting/mail-setting/email-configration",
  composeEmail: "/contract/send-email/",
  composeInvoiceEmail: "/invoice/invoice-collection/send-email/",
  emailTemplate: "/setting/mail-setting/email-template",

  company: "/user/",
  choosePlan: "/user/choose-plan/",
  plan: "/plan",
  adminSettings: "/setting/update-admin-password/",
  changeStatus: "/user/change-status/",
  addSignature: "/offer/add-signature/",
  contractContent: "/contract/",
  invoiceContent: "/invoice/invoice-collection/update-content/",
  acceptOffer: "/offer/add-signature/",
  offerActivity: "/offer/activity",
  dashbaord: "/dashboard/company",
  adminDashboard: "/dashboard/admin",
  sendByPost: "/offer/send-By-Post/",

  sendByPostLead: "/lead/send-By-Post/",
  leadSendEmail: "/lead/send-email/",

  contractSendByPost: "/contract/send-By-Post/",
  invoiceSendByPost: "/invoice/invoice-collection/send-By-Post/",
  readOfferPublic: "/offer/public-read",
  rejectOfferPublic: "/offer/reject-offer",
  updateDiscount: "/offer/update-discount/",
  readContractQrCode: "/contract/generate-QrCode",
  readInvoiceQrCode: "/invoice/invoice-collection/generate-pdf",
  readMainInvoiceQrCode: "/invoice/generate-QrCode",
  settingsQrCode: "/setting/qrcode/qrCode-setting",
  offerContent: "/offer/update-content/",
  updateDate: "/offer/update-date/",
};

const login = (data) =>
  post(SERVICE_URLS.login, data, { feature: featureConstants.login });
const logoutUser = (data) =>
  del(SERVICE_URLS.logout, data, { feature: featureConstants.login });
const resetPassword = ({ otp, data }) =>
  post(
    SERVICE_URLS.resetPassword,
    { otp: otp, password: data?.password },
    { feature: featureConstants.login }
  );
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
  post(
    `${SERVICE_URLS.verifyEmailOtp}`,
    { otp: data },
    { feature: featureConstants.login }
  );
const readUserProfile = (data) =>
  get(SERVICE_URLS.readProfile, {}, { feature: featureConstants.login });
const updateProfile = (data) =>
  patch(
    `${SERVICE_URLS.updateProfile}${data?.key}`,
    data?.key === "password" ? data?.[data?.key] : data,
    { feature: featureConstants.login }
  );
const updateProfileAddress = (data) =>
  patch(`${SERVICE_URLS.updateAddress}`, data, {
    feature: featureConstants.login,
  });
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
  patch(`${SERVICE_URLS.changePassword}`, data, {
    feature: featureConstants.login,
  });
const commercialSellerRequest = (data) =>
  post(SERVICE_URLS.comericalSeller, data, { feature: featureConstants.login });
const idVarificationRequest = (data) =>
  post(SERVICE_URLS.idVarificationReq, data, {
    feature: featureConstants.login,
  });
const profileNotification = (data) =>
  put(SERVICE_URLS.profileNotifications, data, {
    feature: featureConstants.login,
  });

// new Req method
const readCustomer = (params) =>
  get(
    SERVICE_URLS.customer,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const readCustomerDetail = (params) =>
  get(
    SERVICE_URLS.customer,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );

const createCustomer = (data) =>
  post(SERVICE_URLS.customer, data, { feature: featureConstants.login });

const updateCustomer = (data) =>
  put(SERVICE_URLS.customer + `/${data?.id}`, data, {
    feature: featureConstants.login,
  });
const deleteCustomer = (data) =>
  del(
    SERVICE_URLS.customer + `/${data?.id}`,
    {},
    { feature: featureConstants.login }
  );
const readLead = (params) =>
  get(
    SERVICE_URLS.readLead,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );
const readLeadDetail = (params) =>
  get(
    SERVICE_URLS.readLead,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );
const createLead = (data) => {
  let route = data?.leadId ? data?.step + "/" + data?.leadId : data?.step;
  return post(SERVICE_URLS.lead + route, data, {
    feature: featureConstants.login,
  });
};

// company lead appointment create
const createCompanyAppointment = (params) =>
  post(SERVICE_URLS.companyLeadAppointment, params, {
    feature: featureConstants.login,
  });

const updateAppointment = (data) =>
  put(SERVICE_URLS.companyLeadAppointment + `/${data?.id}`, data, {
    feature: featureConstants.login,
  });

const readAppointment = (data) =>
  get(SERVICE_URLS.companyLeadAppointment + `/${data?.id}`, data, {
    feature: featureConstants.login,
  });

const readCompanyAppointments = (params) =>
  get(
    SERVICE_URLS.companyLeadAppointment,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const readAppointmentDetails = (params) =>
  get(
    SERVICE_URLS.companyLeadAppointment,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );

const updateAppointmentStatus = (data) =>
  put(SERVICE_URLS.appointmentStatus + `/${data?.id}`, data, {
    feature: featureConstants.login,
  });

const createAppointmentReport = (data) => {
  // let route = data?.appointmentID
  //   ? data?.step + "/" + data?.appointmentID
  //   : data?.step;
  return post(SERVICE_URLS.appointment + data.step, data, {
    feature: featureConstants.login,
  });
};

const readReportDetail = (params) =>
  get(
    SERVICE_URLS.readReport,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );

const updateAppointmentReport = (data) =>
  put(SERVICE_URLS.appointment + `${data?.step}/${data?.id}`, data, {
    feature: featureConstants.login,
  });

const updateLead = (data) =>
  put(SERVICE_URLS.updateLead + `${data?.step}/${data?.id}`, data, {
    feature: featureConstants.login,
  });

const updateLeadStatus = (data) =>
  put(SERVICE_URLS.leadStatus + `/${data?.id}`, data, {
    feature: featureConstants.login,
  });

const deleteLead = (data) =>
  del(
    SERVICE_URLS.readLead + `/${data?.id}`,
    {},
    { feature: featureConstants.login }
  );

const readContent = (params) =>
  get(
    SERVICE_URLS.content,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const readContentDetail = (params) =>
  get(
    SERVICE_URLS.content,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );

const createContent = (data) => {
  let route = data?.contentId ? data?.step + "/" + data?.contentId : data?.step;
  return post(SERVICE_URLS.contentDetails + route, data, {
    feature: featureConstants.login,
  });
};

const updateContent = (data) =>
  put(SERVICE_URLS.contentDetails + `${data?.step}/${data?.id}`, data, {
    feature: featureConstants.login,
  });
const deleteContent = (data) =>
  del(
    SERVICE_URLS.content + `/${data?.id}`,
    {},
    { feature: featureConstants.login }
  );

const readOffer = (params) =>
  get(
    SERVICE_URLS.readOffer,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );
const readOfferDetail = (params) =>
  get(
    SERVICE_URLS.readOffer,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );
const createOffer = (data) => {
  let route = data?.offerId ? data?.step + "/" + data?.offerId : data?.step;
  return post(SERVICE_URLS.offer + route, data, {
    feature: featureConstants.login,
  });
};
const updateOfferNotes = (data) =>
  put(SERVICE_URLS.offerNotes + `${data?.id}`, data, {
    feature: featureConstants.login,
  });

const updateOffer = (data) =>
  put(SERVICE_URLS.offer + `${data?.step}/${data?.id}`, data, {
    feature: featureConstants.login,
  });

const deleteOffer = (data) =>
  del(
    SERVICE_URLS.readOffer + `/${data?.id}`,
    {},
    { feature: featureConstants.login }
  );
const updateOfferStatus = (data) =>
  put(SERVICE_URLS.offerStatus + `${data?.id}`, data, {
    feature: featureConstants.login,
  });

const updatePaymentStatus = (data) =>
  put(SERVICE_URLS.offerPaymentStatus + `${data?.id}`, data, {
    feature: featureConstants.login,
  });
const sendOfferEmail = (data) =>
  put(SERVICE_URLS.offerSendEmail + `${data?.id}`, data, {
    feature: featureConstants.login,
  });
const readContract = (params) =>
  get(
    SERVICE_URLS.contract,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );
const readContractDetail = (params) =>
  get(
    SERVICE_URLS.contract,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );

const createContract = (data) =>
  post(SERVICE_URLS.contract, data, { feature: featureConstants.login });

const createContractTask = (data) =>
  post(SERVICE_URLS.contractTask, data, { feature: featureConstants.login });

const updateContractTask = (data) =>
  put(SERVICE_URLS.contractTask + `/${data?.id}`, data, {
    feature: featureConstants.login,
  });

const readContractTask = (params) =>
  get(
    SERVICE_URLS.contractTask,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const readContractTaskDetail = (params) =>
  get(
    SERVICE_URLS.contractTask,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );

const deleteContractTask = (data) =>
  del(
    SERVICE_URLS.contractTask + `/${data?.id}`,
    {},
    { feature: featureConstants.login }
  );

const updateContractDate = (data) =>
  put(SERVICE_URLS.updateDate + `${data?.id}`, data, {
    feature: featureConstants.login,
  });

const updateContractDetails = (data) =>
  put(SERVICE_URLS.updateContract + `${data?.id}`, data, {
    feature: featureConstants.login,
  });

const updateContract = (data) =>
  put(SERVICE_URLS.contract, data, { feature: featureConstants.login });
const updateContractStatus = (data) =>
  put(SERVICE_URLS.contractStatus + `${data?.id}`, data, {
    feature: featureConstants.login,
  });
const updateContractPaymentStatus = (data) =>
  put(SERVICE_URLS.contractPaymentStatus + `${data?.id}`, data, {
    feature: featureConstants.login,
  });
const deleteContract = (data) =>
  del(
    SERVICE_URLS.contract + `/${data?.id}`,
    {},
    { feature: featureConstants.login }
  );

const readInvoice = (params) =>
  get(
    SERVICE_URLS.invoice,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const downloadInvoice = (params) =>
  get(
    SERVICE_URLS.downloadInvoiceRoute,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const calculateInvoiceData = (params) =>
  get(
    SERVICE_URLS.invoiceCalculationRoute,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const readInvoiceDetails = (params) =>
  get(
    SERVICE_URLS.invoice,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );

const createInvoice = (data) =>
  post(SERVICE_URLS.invoice, data, { feature: featureConstants.login });

const updateInvoice = (data) =>
  put(SERVICE_URLS.updateInvoiceCollection + `${data?.id}`, data, {
    feature: featureConstants.login,
  });
const stopRecurringInvoice = (data) =>
  put(SERVICE_URLS.invoice + `/${data?.id}`, data, {
    feature: featureConstants.login,
  });

const deleteInvoice = (data) =>
  del(
    SERVICE_URLS.invoice + `/${data?.id}`,
    {},
    { feature: featureConstants.login }
  );

// create main invoice
const createMainInvoice = (data) => {
  let route = data?.invoiceId ? data?.step + "/" + data?.invoiceId : data?.step;
  return post(SERVICE_URLS.mainInvoice + route, data, {
    feature: featureConstants.login,
  });
};

// update main invoice
const updateMainInvoice = (data) =>
  put(SERVICE_URLS.mainInvoice + `${data?.step}/${data?.id}`, data, {
    feature: featureConstants.login,
  });

const readContactSupport = (params) =>
  get(
    SERVICE_URLS.contactSupport,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );
const readContactSupportDetail = (params) =>
  get(
    SERVICE_URLS.contactSupport,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );

const createContactSupport = (data) =>
  post(SERVICE_URLS.contactSupport, data, { feature: featureConstants.login });

const updateContactSupport = (data) =>
  put(SERVICE_URLS.contactSupport + `/${data?.id}`, data, {
    feature: featureConstants.login,
  });
const deleteContactSupport = (data) =>
  del(SERVICE_URLS.contactSupport, data, { feature: featureConstants.login });

const readEmployee = (params) =>
  get(
    SERVICE_URLS.employee,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );
const readEmployeeDetail = (params) =>
  get(
    SERVICE_URLS.employee,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );

const createEmployee = (data) =>
  post(SERVICE_URLS.createEmployee, data, { feature: featureConstants.login });

const updateEmployee = (data) =>
  put(SERVICE_URLS.updateEmployee + `/${data?.id}`, data, {
    feature: featureConstants.login,
  });
const updateEmployeePassword = (data) =>
  patch(SERVICE_URLS.updateEmployeePassword + `/${data?.id}`, data, {
    feature: featureConstants.login,
  });
const deleteEmployee = (data) =>
  del(
    SERVICE_URLS.employee + `/${data}`,
    {},
    { feature: featureConstants.login }
  );

const readService = (params) =>
  get(
    SERVICE_URLS.service,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );
const readServiceDetails = (params) =>
  get(
    SERVICE_URLS.service,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );

const createService = (data) =>
  post(SERVICE_URLS.service, data, { feature: featureConstants.login });

const updateService = (data) =>
  put(SERVICE_URLS.service + `/${data?.id}`, data, {
    feature: featureConstants.login,
  });
const deleteService = (data) =>
  del(
    SERVICE_URLS.service + `/${data?.id}`,
    {},
    { feature: featureConstants.login }
  );

const readOfferService = (data) =>
  get(SERVICE_URLS.offerService, data, { feature: featureConstants.login });

const createOfferService = (data) =>
  post(SERVICE_URLS.offerService, data, { feature: featureConstants.login });

const updateOfferService = (data) =>
  put(SERVICE_URLS.offerService, data, { feature: featureConstants.login });
const deleteOfferService = (data) =>
  del(SERVICE_URLS.offerService, data, { feature: featureConstants.login });

const readFollowUp = (params) =>
  get(
    SERVICE_URLS.leadFollowUp,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const readTableFollowUp = (params) =>
  get(
    SERVICE_URLS.leadFollowUp,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const readFollowUpDetail = (params) =>
  get(
    SERVICE_URLS.leadFollowUp,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );

const createFollowUp = (data) =>
  post(SERVICE_URLS.leadFollowUp, data, { feature: featureConstants.login });

const createPostPondNotes = (data) =>
  put(SERVICE_URLS.postPondNotes + `/${data?.id}`, data, {
    feature: featureConstants.login,
  });
const markComplete = (data) =>
  put(SERVICE_URLS.markComplete + `/${data?.id}`, data, {
    feature: featureConstants.login,
  });

const updateFollowUp = (data) =>
  put(SERVICE_URLS.leadFollowUp + `/${data?.id}`, data, {
    feature: featureConstants.login,
  });
const deleteFollowUp = (data) =>
  del(
    SERVICE_URLS.leadFollowUp + `/${data?.id}`,
    {},
    { feature: featureConstants.login }
  );
const readNotes = (params) =>
  get(
    SERVICE_URLS.notes + `/${params?.type}/${params?.id}`,
    {},
    { feature: featureConstants.login },
    { detail: false }
  );

const createNotes = (params) =>
  post(
    SERVICE_URLS.notes + `/${params?.type}/${params?.id}`,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const updateNotes = (params) =>
  put(SERVICE_URLS.notes + `/${params?.id}`, params, {
    feature: featureConstants.login,
  });

const deleteNote = (data) =>
  del(
    SERVICE_URLS.notes + `/${data?.id}`,
    {},
    { feature: featureConstants.login }
  );
const readCollectiveInvoices = (params) =>
  get(
    SERVICE_URLS.invoiceCollection + `/${params?.id}`,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );
const readCollectiveInvoicesDetails = (params) =>
  get(
    SERVICE_URLS.invoiceCollectionDetail,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );

const createRecurringInvoiceCollection = (data) =>
  post(SERVICE_URLS.createRecurringInvoice + `${data?.id}`, data, {
    feature: featureConstants.login,
  });
const createInvoiceCollection = (data) =>
  post(SERVICE_URLS.createInvoice + `${data?.id}`, data, {
    feature: featureConstants.login,
  });

const updateInvoiceCollection = (data) =>
  put(SERVICE_URLS.updateRecurringInvoice + `${data?.id}`, data, {
    feature: featureConstants.login,
  });
const updateInvoiceStatus = (data) =>
  put(SERVICE_URLS.updateInvoiceStatus + `${data?.id}`, data, {
    feature: featureConstants.login,
  });
const updateInvoicePaymentStatus = (data) =>
  put(SERVICE_URLS.updateInvoicePaymentStatus + `${data?.id}`, data, {
    feature: featureConstants.login,
  });

const readImage = (params) =>
  get(
    SERVICE_URLS.image + `${params?.type}/${params?.id}`,
    {},
    { feature: featureConstants.login },
    { detail: false }
  );
const createImage = (params) =>
  post(
    SERVICE_URLS.image + `${params?.type}/${params?.id}`,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );
const updateAccountSettings = (data) =>
  put(SERVICE_URLS.accountSetting, data, { feature: featureConstants.login });
const updatePassword = (params) =>
  put(SERVICE_URLS.updatePassword + `${params?.id}`, params, {
    feature: featureConstants.login,
  });
const updateSystemSettings = (params) =>
  put(SERVICE_URLS.systemSetting, params, { feature: featureConstants.login });
const getSystemSettings = (params) =>
  get(
    SERVICE_URLS.systemSetting,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );
const getTemplateSettings = (params) =>
  get(
    SERVICE_URLS.templates,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );
const updateTemplateSettings = (params) =>
  put(SERVICE_URLS.templates, params, { feature: featureConstants.login });

const getFollowUpSettings = (params) =>
  get(
    SERVICE_URLS.followUp,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );
const updateFollowUpSettings = (params) =>
  post(SERVICE_URLS.followUp, params, { feature: featureConstants.login });
const getEmails = (params) =>
  get(
    SERVICE_URLS.mail,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );
const getEmailDetails = (params) =>
  get(
    SERVICE_URLS.mail,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );
const deleteEmail = (data) =>
  del(
    SERVICE_URLS.mail + `/${data?.id}`,
    {},
    { feature: featureConstants.login }
  );
const readTaxSettings = (params) =>
  get(
    SERVICE_URLS.tax,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );
const createTaxSettings = (params) =>
  post(SERVICE_URLS.tax, params, { feature: featureConstants.login });

// read addresses
const getAddressSettings = (params) =>
  get(
    SERVICE_URLS.addressSetting,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

// update address
const updateAddressSettings = (params) =>
  post(SERVICE_URLS.addressSetting, params, {
    feature: featureConstants.login,
  });

// notes setting
const createNotesSettings = (params) =>
  post(SERVICE_URLS.notesSetting, params, {
    feature: featureConstants.login,
  });

// read notes
const readNotesSettings = (params) =>
  get(
    SERVICE_URLS.notesSetting,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

// update notes
const updateNotesSettings = (data) =>
  put(SERVICE_URLS.notesSetting + `/${data?.id}`, data, {
    feature: featureConstants.login,
  });

// delete notes
const deleteNotesSettings = (data) =>
  del(SERVICE_URLS.notesSetting + `/${data?.id}`, data, {
    feature: featureConstants.login,
  });

const readMailSettings = (params) =>
  get(
    SERVICE_URLS.emailSettings,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );
const createMailSettings = (params) =>
  post(SERVICE_URLS.createEmailSettings, params, {
    feature: featureConstants.login,
  });
const sendContractEmail = (params) =>
  put(SERVICE_URLS.composeEmail + `${params?.id}`, params, {
    feature: featureConstants.login,
  });
const sendInvoiceEmail = (params) =>
  put(SERVICE_URLS.composeInvoiceEmail + `${params?.id}`, params, {
    feature: featureConstants.login,
  });
const createEmailTemplateSettings = (params) =>
  post(SERVICE_URLS.emailTemplate, params, { feature: featureConstants.login });
const readEmailTemplateSettings = (params) =>
  get(SERVICE_URLS.emailTemplate, params, { feature: featureConstants.login });

const readCompany = (params) =>
  get(
    SERVICE_URLS.company,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const readCompanyDetail = (params) =>
  get(
    SERVICE_URLS.company,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );

const createCompany = (data) =>
  post(SERVICE_URLS.company, data, { feature: featureConstants.login });

const updateCompany = (data) =>
  put(SERVICE_URLS.adminCompany + `/${data?.id}`, data, {
    feature: featureConstants.login,
  });

const deleteCompany = (data) =>
  del(
    SERVICE_URLS.company + `/${data?.id}`,
    {},
    { feature: featureConstants.login }
  );

const readPlan = (params) =>
  get(
    SERVICE_URLS.plan,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const readPlanDetail = (params) =>
  get(
    SERVICE_URLS.plan,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );

const createPlan = (data) =>
  post(SERVICE_URLS.plan, data, { feature: featureConstants.login });

const updatePlan = (data) =>
  put(SERVICE_URLS.plan + `/${data?.id}`, data, {
    feature: featureConstants.login,
  });
const choosePlan = (data) =>
  put(SERVICE_URLS.choosePlan + `${data?.id}`, data, {
    feature: featureConstants.login,
  });
const deletePlan = (data) =>
  del(
    SERVICE_URLS.plan + `/${data?.id}`,
    {},
    { feature: featureConstants.login }
  );

const updateAdminSettings = (data) =>
  put(SERVICE_URLS.adminSettings + `${data?.id}`, data, {
    feature: featureConstants.login,
  });
const updateUserStatus = (data) =>
  put(SERVICE_URLS.changeStatus + `${data?.id}`, data, {
    feature: featureConstants.login,
  });

const createSignature = (data, formData) =>
  put(SERVICE_URLS.addSignature + `${data?.id}`, formData, {
    feature: featureConstants.login,
  });

const updateContractContent = (data) =>
  put(SERVICE_URLS.contractContent + `${data?.id}`, data, {
    feature: featureConstants.login,
  });
const updateInvoiceContent = (data) =>
  put(SERVICE_URLS.invoiceContent + `${data?.id}`, data, {
    feature: featureConstants.login,
  });

const acceptOffer = (data) =>
  put(SERVICE_URLS.acceptOffer + `${data?.id}`, data, {
    feature: featureConstants.login,
  });
const readOfferActivity = (params) => {
  return get(
    SERVICE_URLS.offerActivity,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );
};

const updateOfferContent = (data) =>
  put(SERVICE_URLS.offerContent + `${data?.id}`, data, {
    feature: featureConstants.login,
  });

const readAllOfferActivity = (params) =>
  get(
    SERVICE_URLS.offerActivity,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );
const readDashboard = (params) =>
  get(
    SERVICE_URLS.dashbaord,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );
const readAdminDashboard = (params) =>
  get(
    SERVICE_URLS.adminDashboard,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );

const offerSendByPost = (data) =>
  put(SERVICE_URLS.sendByPost + `${data?.id}`, data, {
    feature: featureConstants.login,
  });

const leadSendByPost = (data) =>
  put(SERVICE_URLS.sendByPostLead + `${data?.id}`, data, {
    feature: featureConstants.login,
  });

const sendLeadEmail = (data) =>
  put(SERVICE_URLS.leadSendEmail + `${data?.id}`, data, {
    feature: featureConstants.login,
  });

const contractSendByPost = (data) =>
  put(SERVICE_URLS.contractSendByPost + `${data?.id}`, data, {
    feature: featureConstants.login,
  });

const invoiceSendByPost = (data) =>
  put(SERVICE_URLS.invoiceSendByPost + `${data?.id}`, data, {
    feature: featureConstants.login,
  });

const readOfferDetailPublic = (params) =>
  get(
    SERVICE_URLS.readOfferPublic,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );
const rejectOfferPublic = (data) =>
  put(SERVICE_URLS.rejectOfferPublic + `/${data?.id}`, data, {
    feature: featureConstants.login,
  });

const updateDiscounts = (data) =>
  put(SERVICE_URLS.updateDiscount + `${data?.id}`, data, {
    feature: featureConstants.login,
  });

const readContractQRCode = (params) =>
  get(
    SERVICE_URLS.readContractQrCode,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );

const readInvoiceQRCode = (params) =>
  get(
    SERVICE_URLS.readInvoiceQrCode,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );

const readMainQRCode = (params) =>
  get(
    SERVICE_URLS.readMainInvoiceQrCode,
    params,
    { feature: featureConstants.login },
    { detail: true }
  );

const readSettingsQrCode = (params) =>
  get(
    SERVICE_URLS.settingsQrCode,
    params,
    { feature: featureConstants.login },
    { detail: false }
  );
const createSettingsQrCode = (data) =>
  post(SERVICE_URLS.settingsQrCode, data, { feature: featureConstants.login });

const createInvoiceDetail = (data) => {
  let route = data?.invoiceId ? data?.step + "/" + data?.invoiceId : data?.step;
  return post(SERVICE_URLS.createInvoiceDetail + route, data, {
    feature: featureConstants.login,
  });
};

const updateInvoiceDetails = (data) =>
  put(SERVICE_URLS.createInvoiceDetail + `${data?.step}/${data?.id}`, data, {
    feature: featureConstants.login,
  });

const deleteTax = (data) =>
  del(
    SERVICE_URLS.tax + `/${data?.id}`,
    {},
    { feature: featureConstants.login }
  );

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
  updateLeadStatus,
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
  createNotes,
  deleteNote,
  readContentDetail,
  readOfferDetail,
  updateOfferNotes,
  updateOfferStatus,
  sendOfferEmail,
  updatePaymentStatus,
  readContractDetail,
  updateContractStatus,
  updateContractPaymentStatus,
  readInvoiceDetails,
  readCollectiveInvoices,
  readCollectiveInvoicesDetails,
  createInvoiceCollection,
  updateInvoiceCollection,
  updateInvoiceStatus,
  createRecurringInvoiceCollection,
  stopRecurringInvoice,
  updateInvoicePaymentStatus,
  updateInvoice,
  readImage,
  createImage,
  updateAccountSettings,
  updatePassword,
  updateSystemSettings,
  getSystemSettings,
  getTemplateSettings,
  updateTemplateSettings,
  updateFollowUpSettings,
  getFollowUpSettings,
  getEmails,
  getEmailDetails,
  deleteEmail,
  readTaxSettings,
  createTaxSettings,
  readMailSettings,
  createMailSettings,
  sendContractEmail,
  sendInvoiceEmail,
  logoutUser,
  readEmailTemplateSettings,
  createEmailTemplateSettings,
  readCompanyDetail,
  readContactSupportDetail,
  readPlan,
  readPlanDetail,
  createPlan,
  updatePlan,
  deletePlan,
  updateAdminSettings,
  updateUserStatus,
  createSignature,
  choosePlan,
  updateContractContent,
  updateInvoiceContent,
  acceptOffer,
  readAllOfferActivity,
  readOfferActivity,
  readDashboard,
  readAdminDashboard,
  offerSendByPost,
  contractSendByPost,
  invoiceSendByPost,
  readOfferDetailPublic,
  rejectOfferPublic,
  updateDiscounts,
  readContractQRCode,
  readInvoiceQRCode,
  readSettingsQrCode,
  createSettingsQrCode,
  updateOfferContent,
  updateContractDate,
  updateInvoiceDetails,
  createInvoiceDetail,
  deleteTax,
  createMainInvoice,
  updateMainInvoice,
  readMainQRCode,
  updateContractDetails,
  downloadInvoice,
  getAddressSettings,
  updateAddressSettings,
  createNotesSettings,
  readNotesSettings,
  updateNotesSettings,
  deleteNotesSettings,
  calculateInvoiceData,
  readTableFollowUp,
  createCompanyAppointment,
  updateAppointment,
  readCompanyAppointments,
  readAppointment,
  readAppointmentDetails,
  updateAppointmentStatus,
  createAppointmentReport,
  updateAppointmentReport,
  readReportDetail,
  createContractTask,
  updateContractTask,
  readContractTask,
  readContractTaskDetail,
  deleteContractTask,
  leadSendByPost,
  sendLeadEmail,
};

export default apiServices;
