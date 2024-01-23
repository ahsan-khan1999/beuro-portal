import {
  LoginFields,
  CompanyFields,
  LocationFields,
  BankFields,
} from "@/enums/auth";
import * as yup from "yup";
import {
  RegisterationFields,
  PersonalDetailsFields,
  loginAndContactDetailsFields,
  addressDetailsFields,
  ResetPasswordFields,
  ChangePasswordFields,
} from "@/enums/registration";
// import { PersonalDetailsProfile } from "@/enums/userAccount";

export const generateValidation = (translate: Function) => {
  return yup.object().shape({
    [RegisterationFields.fullName]: yup
      .string()
      .required(translate("validationMessages.required")),
    [RegisterationFields.email]: yup
      .string()
      .email()
      .required(translate("validationMessages.required")),
    [RegisterationFields.password]: yup
      .string()
      .min(6, translate("validationMessages.string.min"))
      .required(translate("validationMessages.required")),
    [RegisterationFields.confirmPassword]: yup
      .string()
      .oneOf([yup.ref("password")], translate("validationMessages.mixed.oneOf"))
      .required(translate("validationMessages.required")),
  });
};

export const generateLoginValidation = (translate: Function) => {
  return yup.object().shape({
    [LoginFields.email]: yup
      .string()
      .email()
      .required(translate("validationMessages.required")),
    [LoginFields.password]: yup
      .string()
      .min(6, translate("validationMessages.string.min"))
      .required(translate("validationMessages.required")),
  });
};

export const detailScreensValidation = (translate: Function) => {
  return yup.object().shape({
    [CompanyFields.name]: yup.string().required("tdguy"),
    [CompanyFields.phoneNumber]: yup
      .string()
      .required(translate("validationMessages.required")),
    [CompanyFields.mobileNumber]: yup
      .string()
      .required(translate("validationMessages.required")),
    [CompanyFields.websiteUrl]: yup
      .string()
      .required(translate("validationMessages.required")),
    [CompanyFields.mwstNumber]: yup
      .string()
      .required(translate("validationMessages.required")),
    [CompanyFields.companyLogo]: yup.string().required(),
  });
};
export const detailLocationValidation = (translate: Function) => {
  return yup.object().shape({
    [LocationFields.streetNumber]: yup
      .string()
      .required(translate("validationMessages.required")),
    [LocationFields.houseNumber]: yup
      .string()
      .required(translate("validationMessages.required")),
    [LocationFields.postalCode]: yup
      .string()
      .required(translate("validationMessages.required")),
    [LocationFields.city]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};
export const detailBankValidation = (translate: Function) => {
  return yup.object().shape({
    [BankFields.currency]: yup
      .string()
      .required(translate("validationMessages.required")),
    [BankFields.bankName]: yup
      .string()
      .required(translate("validationMessages.required")),
    [BankFields.accountNumber]: yup
      .string()
      .required(translate("validationMessages.required")),
    [BankFields.ibanNumber]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};

export const generatePersonalDetailValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [PersonalDetailsFields.salutation]: yup
      .string()
      .required(translate("validationMessages.required")),
    [PersonalDetailsFields.fullName]: yup
      .string()
      .required(translate("validationMessages.required")),
    [PersonalDetailsFields.userName]: yup
      .string()
      .required(translate("validationMessages.required")),
    [PersonalDetailsFields.dateOfBirth]: yup
      .date()
      .required(translate("validationMessages.required"))
      .typeError(translate("validationMessages.invalid_format")),
  });
};

export const generateLoginAndContactDetailValidationSchema = (
  translate: Function
) => {
  return yup.object().shape({
    [loginAndContactDetailsFields.email]: yup
      .string()
      .email()
      .required(translate("validationMessages.required")),
    [loginAndContactDetailsFields.phone]: yup
      .string()
      .required(translate("validationMessages.required")),
    [loginAndContactDetailsFields.otp]: yup.string().notRequired(),
    [loginAndContactDetailsFields.password]: yup.string().notRequired(),
  });
};

export const generateLoginAndContactDetailOAuthValidationSchema = (
  translate: Function
) => {
  return yup.object().shape({
    [loginAndContactDetailsFields.email]: yup
      .string()
      .email()
      .required(translate("validationMessages.required")),
    [loginAndContactDetailsFields.phone]: yup
      .string()
      .required(translate("validationMessages.required")),
    [loginAndContactDetailsFields.otp]: yup.string().notRequired(),
    [loginAndContactDetailsFields.password]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};

export const generateaddressDetailValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [addressDetailsFields.street]: yup
      .string()
      .required(translate("validationMessages.required")),
    [addressDetailsFields.houseNo]: yup
      .string()
      .required(translate("validationMessages.required")),
    [addressDetailsFields.postalCode]: yup
      .string()
      .matches(/^\d{5}$/, "Postal code should be exactly 5 digits")
      .required(translate("validationMessages.required")),
    [addressDetailsFields.state]: yup
      .string()
      .required(translate("validationMessages.required")),
    [addressDetailsFields.country]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};

export const generateResetPasswordValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [ResetPasswordFields.email]: yup
      .string()
      .email()
      .required(translate("validationMessages.required")),
  });
};

export const generateChangePasswordValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [ChangePasswordFields.password]: yup
      .string()
      .required(translate("validationMessages.required"))
      .min(6, translate("validationMessages.string.min")),
    [ChangePasswordFields.confirmPassword]: yup
      .string()
      .oneOf([yup.ref("password")], translate("validationMessages.mixed.oneOf"))
      .required(translate("validationMessages.required")),
  });
};


export const generateProfileChangePasswordValidationSchema = (
  translate: Function
) => {
  return yup.object().shape({
    [ChangePasswordFields.currentPassword]: yup
      .string()
      .required(translate("validationMessages.required"))
      .min(6, translate("validationMessages.string.min")),
    [ChangePasswordFields.newPassword]: yup
      .string()
      .required(translate("validationMessages.required"))
      .min(6, translate("validationMessages.string.min")),
    [ChangePasswordFields.confirmPassword]: yup
      .string()
      .oneOf(
        [yup.ref("newPassword")],
        translate("validationMessages.mixed.oneOf")
      )
      .required(translate("validationMessages.required")),
  });
};
