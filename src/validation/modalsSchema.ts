import { AddNewNote, AddTaxField, ChangePasswordField } from "@/enums/modals";
import * as yup from "yup";

// Password Change validation is here
export const generatePasswordChangeValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [ChangePasswordField.oldPassword]: yup
      .string()
      .required(translate("validation required"))
      .min(6, translate("validationMessages.string.min")),

    [ChangePasswordField.newPassword]: yup
      .string()
      .required(translate("validation required"))
      .min(6, translate("validationMessages.string.min")),

    [ChangePasswordField.confirmNewPassword]: yup
      .string()
      .oneOf([yup.ref("password")], translate("validationMessages.mixed.oneOf"))
      .required(translate("validationMessages.required")),
  });
};

// Add Tax validation is here
export const generateAddTaxValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [AddTaxField.name]: yup
      .string()
      .required(translate("validationMessages.required")),
    [AddTaxField.taxRate]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};

// Validation for Add new note
export const generateAddNewNoteValidation = (translate: Function) => {
  return yup.object().shape({
    [AddNewNote.noteMessage]: yup.string().required("validation required"),
  });
};
