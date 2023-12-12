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
    [SettingProfile.fullName]: yup.string().required(translate("validationMessages.required")),
    [SettingProfile.companyName]: yup.string().required(translate("validationMessages.required")),
    [SettingProfile.phoneNumber]: yup
      .string()
      .min(11, translate("validationMessages.string.min"))
      .required(translate(translate("validationMessages.required"))),
    [SettingProfile.mobileNumber]: yup
      .string()
      .min(11, translate("validationMessages.string.min"))
      .required(translate(translate("validationMessages.required"))),
    [SettingProfile.website]: yup.string().required(translate("validationMessages.required")),
    [SettingProfile.mwstNumber]: yup.number().required(translate("validationMessages.required")),
    "address": yup.object().shape({
      [SettingProfile.streetAddress]: yup
        .string()
        .required(translate("validationMessages.required")),
      [SettingProfile.postCode]: yup.string().required(translate("validationMessages.required")),
      [SettingProfile.city]: yup.string().required(translate("validationMessages.required")),
      [SettingProfile.houseAddress]: yup.string().required(translate("validationMessages.required")),

    }),
    "bankDetails": yup.object().shape({
      [SettingProfile.bankName]: yup.string().required(translate("validationMessages.required")),
      [SettingProfile.accountNumber]: yup
        .string()
        .required(translate("validationMessages.required")),
      [SettingProfile.IBAN_number]: yup.string().required(translate("validationMessages.required")),
    })
  });
};
