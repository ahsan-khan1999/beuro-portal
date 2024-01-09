import * as yup from "yup";
import {
  AddReason,
  ChangeMailSetting,
  MailSettingsEmailTemplate,
  SettingProfile,
} from "@/enums/setting";

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
    [ChangeMailSetting.isOwnMailConfigration]: yup
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

export const generateQRCodeValdiation = (translate: Function) => {
  return yup.object().shape({
    "qrSettings": yup.array().of(yup.object().shape({
      "companyName": yup.string().required(translate("validationMessages.required")),
      "ibanNo": yup.string().required(translate("validationMessages.required")),
      "streetNumber": yup.string().required(translate("validationMessages.required")),
      "postalCode": yup.string().required(translate("validationMessages.required")),
      "city": yup.string().required(translate("validationMessages.required")),
    })).min(1).required(translate("validationMessages.required"))

  })
};

// Validation for add reason
export const generateProfileSettingValidation = (translate: Function) => {
  return yup.object().shape({
    [SettingProfile.fullName]: yup
      .string()
      .required(translate("validationMessages.required")),
    [SettingProfile.email]: yup
      .string()
      .required(translate("validationMessages.required")),
    "company": yup.object().shape({
      [SettingProfile.companyName]: yup
        .string()
        .required(translate("validationMessages.required")),
      [SettingProfile.phoneNumber]: yup
        .string()
        .required(translate(translate("validationMessages.required"))),
      [SettingProfile.mobileNumber]: yup
        .string()
        .required(translate(translate("validationMessages.required"))),
      [SettingProfile.website]: yup
        .string()
        .required(translate("validationMessages.required")),
      [SettingProfile.mwstNumber]: yup
        .number()
        .required(translate("validationMessages.required")),
      address: yup.object().shape({
        [SettingProfile.streetAddress]: yup
          .string()
          .required(translate("validationMessages.required")),
        [SettingProfile.postCode]: yup
          .string()
          .required(translate("validationMessages.required")),
        [SettingProfile.city]: yup
          .string()
          .required(translate("validationMessages.required")),
        [SettingProfile.houseAddress]: yup
          .string()
          .required(translate("validationMessages.required")),
      }),
      bankDetails: yup.object().shape({
        [SettingProfile.bankName]: yup
          .string()
          .required(translate("validationMessages.required")),
        [SettingProfile.accountNumber]: yup
          .string()
          .required(translate("validationMessages.required")),
        [SettingProfile.IBAN_number]: yup
          .string()
          .required(translate("validationMessages.required")),
      }),
    })
  });
};
// Validation for mail setting EMAIL_TEMPLATE
export const generateEmailTemplateValidation = (translate: Function) => {
  return yup.object().shape({
    [MailSettingsEmailTemplate.EMAIL]: yup
      .string()
      .required(translate("validationMessages.required")),
    [MailSettingsEmailTemplate.PHONE_NUMBER]: yup
      .string()
      .min(11, translate("validationMessages.string.min"))
      .required(translate(translate("validationMessages.required"))),
    [MailSettingsEmailTemplate.MOBILE_NUMBER]: yup
      .string()
      .min(11, translate("validationMessages.string.min"))
      .required(translate(translate("validationMessages.required"))),
    [MailSettingsEmailTemplate.FOOTER_COLOR]: yup
      .string()
      .required(translate("validationMessages.required")),
    [MailSettingsEmailTemplate.TEXT_COLOR]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};
