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
import { CustomerDetailsFields, ServicesDetailFields } from "@/enums";
// import { PersonalDetailsProfile } from "@/enums/userAccount";

export const generateValidation = (translate: Function) => {
  return yup.object().shape({
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

export const generateCustomerValidation = (translate: Function) => {
  return yup.object().shape({
    [CustomerDetailsFields.firstName]: yup
      .string()
      .required("validation required"),
    [CustomerDetailsFields.lastName]: yup
      .string()
      .required("validation required"),
    [CustomerDetailsFields.customerType]: yup
      .string()
      .required(translate("validationMessages.required")),
    [CustomerDetailsFields.email]: yup
      .string()
      .email()
      .required(translate("validationMessages.required")),

    [CustomerDetailsFields.phone]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
      .required(translate("validationMessages.required")),
    [CustomerDetailsFields.mobile]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
      .required(translate("validationMessages.required")),
    [CustomerDetailsFields.streetNo]: yup
      .string()
      .required(translate("validationMessages.required")),
    [CustomerDetailsFields.postalCode]: yup
      .number()
      .required(translate("validationMessages.required")),
    [CustomerDetailsFields.country]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};

// generateServiceValidation here
export const generateServicesValidation = (translate: Function) => {
  return yup.object().shape({
    [ServicesDetailFields.serviceTitle]: yup
      .string()
      .required("validation required"),
    [ServicesDetailFields.unit]: yup
      .string()
      .required("validation required"),
    [ServicesDetailFields.price]: yup
      .string()
      .required(translate("validation required")),
    [ServicesDetailFields.description]: yup
      .string()
      .email()
      .required(translate("validation required")),
  });
};


export const detailScreensValidation = (translate: Function) => {
  return yup.object().shape({
    [CompanyFields.name]: yup.string().required("tdguy"),
    [CompanyFields.phoneNumber]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
      .required(translate("validationMessages.required")),
    [CompanyFields.mobileNumber]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
      .required(translate("validationMessages.required")),
    [CompanyFields.websiteUrl]: yup
      .string()
      .required(translate("validationMessages.required")),
    [CompanyFields.mwstNumber]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
      .required(translate("validationMessages.required")),
    [CompanyFields.companyLogo]: yup.object(),
  });
};
export const detailLocationValidation = (translate: Function) => {
  return yup.object().shape({
    [LocationFields.streetNumber]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
      .required(translate("validationMessages.required")),
    [LocationFields.houseNumber]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
      .required(translate("validationMessages.required")),
    [LocationFields.postalCode]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
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
      .number()
      .min(11, translate("validationMessages.string.min"))
      .required(translate("validationMessages.required")),
    [BankFields.ibanNumber]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
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

// export const generateSalutationValidationSchema = (translate: Function) => {
//     return yup.object().shape({
//         [PersonalDetailsProfile.salutation]: yup.string().required(translate("validationMessages.required")),

//     });
// }

// export const generateDobValidationSchema = (translate: Function) => {
//     return yup.object().shape({
//         [PersonalDetailsProfile.dob]: yup.string().required(translate("validationMessages.required")),

//     });
// }

// export const generateFullNameValidationSchema = (translate: Function) => {
//     return yup.object().shape({
//         [PersonalDetailsProfile.fullName]: yup.string().required(translate("validationMessages.required")),

//     });
// }

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
