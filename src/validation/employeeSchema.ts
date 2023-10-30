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
      .required("validation required"),

    [EmployDetailsFields.designation]: yup
      .string()
      .required("validation required"),

    [EmployDetailsFields.email]: yup
      .string()
      .email()
      .required(translate("validation required")),

    [EmployDetailsFields.phoneNumber]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
      .required(translate("validation required")),

    [EmployDetailsFields.mobileNumber]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
      .required(translate("validation required")),
  });
};

// Password reset validation is here
export const generateEmployeeNewPasswordValidationSchema = (
  translate: Function
) => {
  return yup.object().shape({
    [createEMployeeNewPasswordFields.newPassword]: yup
      .string()
      .required(translate("validation required"))
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
      .required(translate("validation required"))
      .min(6, translate("validationMessages.string.min")),

    [employeePasswordResetFields.newPassword]: yup
      .string()
      .required(translate("validation required"))
      .min(6, translate("validationMessages.string.min")),

    [employeePasswordResetFields.confirmNewPassword]: yup
      .string()
      .oneOf([yup.ref("password")], translate("validationMessages.mixed.oneOf"))
      .required(translate("validationMessages.required")),
  });
};
