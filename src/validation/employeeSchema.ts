import * as yup from "yup";
import {
  EmployDetailsFields,
  createEMployeeNewPasswordFields,
  employeePasswordResetFields,
} from "@/enums/employee";

// Generate employ details validation here
export const generateEmployDetailsValidation = (translate: Function) => {
  return yup.object().shape({
    [EmployDetailsFields.employName]: yup
      .string()
      .required(translate("validationMessage.required")),

    [EmployDetailsFields.designation]: yup
      .string()
      .required(translate("validationMessage.required")),

    [EmployDetailsFields.email]: yup
      .string()
      .email()
      .required(translate("validationMessage.required")),

    [EmployDetailsFields.phoneNumber]: yup
      .string()
      .required(translate("validationMessage.required")),

    [EmployDetailsFields.mobileNumber]: yup
      .string()
      .required(translate("validationMessage.required")),
  });
};

// Password reset validation is here
export const generateEmployeeNewPasswordValidationSchema = (
  translate: Function
) => {
  return yup.object().shape({
    [createEMployeeNewPasswordFields.newPassword]: yup
      .string()
      .required(translate("validationMessage.required"))
      .min(6, translate("validationMessages.string.min")),

    [createEMployeeNewPasswordFields.confirmNewPassword]: yup
      .string()
      .oneOf([yup.ref("password")], translate("validationMessages.mixed.oneOf"))
      .required(translate("validationMessages.required")),
  });
};

// Password reset validation is here
export const generateEmployeePasswordResetValidationSchema = (
  translate: Function
) => {
  return yup.object().shape({
    [employeePasswordResetFields.yourPassword]: yup
      .string()
      .required(translate("validationMessage.required"))
      .min(6, translate("validationMessages.string.min")),
    [employeePasswordResetFields.newPassword]: yup
      .string()
      .required(translate("validationMessage.required"))
      .min(6, translate("validationMessages.string.min")),

    [employeePasswordResetFields.confirmNewPassword]: yup
      .string()
      .oneOf([yup.ref("newPassword")], translate("validationMessages.mixed.oneOf"))
      .required(translate("validationMessages.required")),
  });
};
