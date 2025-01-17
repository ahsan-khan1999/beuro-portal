import auth from "../slices/authSlice/auth";
import contactSupportSlice from "../slices/contactSupport/contactSupportSlice";
import contentSlice from "../slices/content/contentSlice";
import contractSlice from "../slices/contract/contractSlice";
import customerSlice from "../slices/customer/customerSlice";
import globalSlice from "../slices/globalSlice/global";
import invoiceSlice from "../slices/invoice/invoiceSlice";
import leadSlice from "../slices/lead/leadSlice";
import offerSlice from "../slices/offer/offerSlice";
// import userAccountSlice from "../slices/user/user-account-slice";
import EmployeeSlice from "../slices/employee/emplyeeSlice";
import serviceSlice from "../slices/service/serviceSlice";
import followUp from "../slices/followUp/followUp";
import noteSlice from "../slices/noteSlice/noteSlice";
import imageSlice from "../slices/imageSlice/image";
import settings from "../slices/settingSlice/settings";
import EmailSlice from "../slices/emailTracker/email";
import companySlice from "../slices/company/companySlice";
import appointmentSlice from "../slices/appointment/appointmentSlice";

const reducer = {
  auth,
  global: globalSlice,
  // user: userAccountSlice
  customer: customerSlice,
  lead: leadSlice,
  appointment: appointmentSlice,
  content: contentSlice,
  offer: offerSlice,
  contract: contractSlice,
  invoice: invoiceSlice,
  contactSupport: contactSupportSlice,
  employee: EmployeeSlice,
  service: serviceSlice,
  followUp: followUp,
  note: noteSlice,
  image: imageSlice,
  settings,
  emailSlice: EmailSlice,
  company: companySlice,
};

export default reducer;
