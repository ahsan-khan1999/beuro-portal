import * as yup from "yup";
import { AddReason, ChangeMailSetting, SettingProfile } from "@/enums/setting";

// Validation for edit details
export const generateChangeMailSettingValidationSchema = (
  translate: Function
) => {
  return yup.object().shape({
    [ChangeMailSetting.mailDriver]: yup
      .string()
      .required(translate("validation required")),
    [ChangeMailSetting.mailHost]: yup
      .string()
      .required(translate("validation required")),
    [ChangeMailSetting.mailPort]: yup
      .string()
      .required(translate("validation required")),
    [ChangeMailSetting.mailEncryption]: yup
      .string()
      .required(translate("validation required")),
    [ChangeMailSetting.mailUsername]: yup
      .string()
      .required(translate("validation required")),
    [ChangeMailSetting.mailPassword]: yup
      .string()
      .required(translate("validation required")),
    [ChangeMailSetting.mailFormAddress]: yup
      .string()
      .required(translate("validation required")),
    [ChangeMailSetting.mailFormName]: yup
      .string()
      .required(translate("validation required")),
    [ChangeMailSetting.mail]: yup
      .string()
      .required(translate("validation required")),
  });
};

// Validation for add reason
export const generateAddReasonValidation = (translate: Function) => {
  return yup.object().shape({
    [AddReason.addReason]: yup.string().required("validation required"),
  });
};

// Validation for add reason
export const generateProfileSettingValidation = (translate: Function) => {
  return yup.object().shape({
    [SettingProfile.fullName]: yup.string().required("validation required"),
    [SettingProfile.companyName]: yup.string().required("validation required"),
    [SettingProfile.phoneNumber]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
      .required(translate("validation required")),
    [SettingProfile.mobileNumber]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
      .required(translate("validation required")),
    [SettingProfile.website]: yup.string().required("validation required"),
    [SettingProfile.mwstNumber]: yup.number().required("validation required"),
    [SettingProfile.streetAddress]: yup
      .string()
      .required("validation required"),
    [SettingProfile.postCode]: yup.number().required("validation required"),
    [SettingProfile.country]: yup.string().required("validation required"),
    [SettingProfile.bankName]: yup.string().required("validation required"),
    [SettingProfile.accountNumber]: yup
      .number()
      .required("validation required"),
    [SettingProfile.IBAN_number]: yup.number().required("validation required"),
    [SettingProfile.changePassword]: yup
      .string()
      .required("validation required"),
  });
};
