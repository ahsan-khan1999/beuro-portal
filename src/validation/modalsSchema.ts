import {
  AddNewNote,
  AddTaxField,
  ChangePasswordField,
  EditPaymentDetails,
} from "@/enums/modals";
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
      // .oneOf([yup.ref("password")], translate("validationMessages.mixed.oneOf"))
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

// Validation for Edit payment details
export const generateEditPaymentDetailsValidation = (translate: Function) => {
  return yup.object().shape({
    [EditPaymentDetails.nameOnCard]: yup
      .string()
      .required("validation required"),
    [EditPaymentDetails.expiry]: yup.string().required("validation required"),
    [EditPaymentDetails.cardNumber]: yup
      .string()
      .required("validation required"),
    [EditPaymentDetails.cvv]: yup.string().required("validation required"),
  });
};
