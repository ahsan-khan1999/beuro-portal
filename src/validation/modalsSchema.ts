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
      .required(translate("validationMessage.required"))
      .min(6, translate("validationMessages.string.min")),

    [ChangePasswordField.newPassword]: yup
      .string()
      .required(translate("validationMessage.required"))
      .notOneOf([yup.ref("currentPassword")], translate("validationMessages.mixed.notOneOf"))

      .min(6, translate("validationMessages.string.min")),

    [ChangePasswordField.confirmNewPassword]: yup
      .string()
      .oneOf([yup.ref("newPassword")], translate("validationMessages.mixed.oneOf"))
      .notOneOf([yup.ref("currentPassword")], translate("validationMessages.mixed.notOneOf"))
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
      .number()
      .required(translate("validationMessages.required")),
  });
};

// Validation for Add new note
export const generateAddNewNoteValidation = (translate: Function) => {
  return yup.object().shape({
    [AddNewNote.noteMessage]: yup.string().required(translate("validationMessage.required")),
  });
};

// Validation for Edit payment details
export const generateEditPaymentDetailsValidation = (translate: Function) => {
  return yup.object().shape({
    [EditPaymentDetails.nameOnCard]: yup
      .string()
      .required(translate("validationMessage.required")),
    [EditPaymentDetails.expiry]: yup.string().required(translate("validationMessage.required")),
    [EditPaymentDetails.cardNumber]: yup
      .string()
      .required(translate("validationMessage.required")),
    [EditPaymentDetails.cvv]: yup.string().required(translate("validationMessage.required")),
  });
};


export const generateImageValidation = (translate: Function) => {
  return yup.object().shape({
    "upload_image1": yup.string().required(translate("validationMessages.required")),
    "upload_image2": yup.string().notRequired(),
    "upload_image3": yup.string().notRequired(),
    "upload_image4": yup.string().notRequired(),
    "upload_image5": yup.string().notRequired(),
    "upload_image6": yup.string().notRequired(),
    "upload_image7": yup.string().notRequired(),
    "upload_image8": yup.string().notRequired(),
    "upload_image9": yup.string().notRequired(),
    "upload_image10": yup.string().notRequired(),
    "upload_image11": yup.string().notRequired(),
    "upload_image12": yup.string().notRequired(),
    "upload_image13": yup.string().notRequired(),
    "upload_image14": yup.string().notRequired(),
    "upload_image15": yup.string().notRequired(),

  });
};