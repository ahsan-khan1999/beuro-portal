import * as yup from "yup";
import {
  AddReason,
  ChangeMailSetting,
  PaymentSettings,
  SettingProfile,
} from "@/enums/admin/setting";

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
    [SettingProfile.oldPassword]: yup
      .string()
      .required(translate("validationMessage.required"))
      .min(6, translate("validationMessages.string.min")),

    [SettingProfile.newPassword]: yup
      .string()
      .required(translate("validationMessage.required"))
      .notOneOf([yup.ref("currentPassword")], translate("validationMessages.mixed.notOneOf"))

      .min(6, translate("validationMessages.string.min")),

    [SettingProfile.confirmNewPassword]: yup
      .string()
      .oneOf([yup.ref("newPassword")], translate("validationMessages.mixed.oneOf"))
      .notOneOf([yup.ref("currentPassword")], translate("validationMessages.mixed.notOneOf"))
      .required(translate("validationMessages.required")),
  });
};
// Validation for add reason
export const generatePaymentSettingsValidation = (translate: Function) => {
  return yup.object().shape({
    [PaymentSettings.publishableKey]: yup
      .string()
      .required("validation required"),

    [PaymentSettings.searchKey]: yup.string().required("validation required"),
  });
};
