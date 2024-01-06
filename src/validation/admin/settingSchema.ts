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
      .required(translate("validationMessages.required")),
    [ChangeMailSetting.mailHost]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ChangeMailSetting.mailPort]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ChangeMailSetting.mailEncryption]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ChangeMailSetting.mailUsername]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ChangeMailSetting.mailPassword]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ChangeMailSetting.mailFormAddress]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ChangeMailSetting.mailFormName]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ChangeMailSetting.mail]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};

// Validation for add reason
export const generateAddReasonValidation = (translate: Function) => {
  return yup.object().shape({
    [AddReason.addReason]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};

// Validation for add reason
export const generateProfileSettingValidation = (translate: Function) => {
  return yup.object().shape({
    [SettingProfile.fullName]: yup
      .string()
      .required(translate("validationMessages.required")),
    [SettingProfile.oldPassword]: yup
      .string()
      .required(translate("validationMessages.required"))
      .min(6, translate("validationMessages.string.min")),

    [SettingProfile.newPassword]: yup
      .string()
      .required(translate("validationMessages.required"))
      .notOneOf(
        [yup.ref("currentPassword")],
        translate("validationMessages.mixed.notOneOf")
      )

      .min(6, translate("validationMessages.string.min")),

    [SettingProfile.confirmNewPassword]: yup
      .string()
      .oneOf(
        [yup.ref("newPassword")],
        translate("validationMessages.mixed.oneOf")
      )
      .notOneOf(
        [yup.ref("currentPassword")],
        translate("validationMessages.mixed.notOneOf")
      )
      .required(translate("validationMessages.required")),
  });
};
// Validation for add reason
export const generatePaymentSettingsValidation = (translate: Function) => {
  return yup.object().shape({
    [PaymentSettings.publishableKey]: yup
      .string()
      .required(translate("validationMessages.required")),

    [PaymentSettings.searchKey]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};
