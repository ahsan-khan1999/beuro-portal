import {
  AddCalendarTask,
  AddGeneralAddressField,
  AddGeneralNoteField,
  AddNewNote,
  AddTaxField,
  ChangePasswordField,
  EditPaymentDetails,
  EnterComponayNameField,
  UpdateNoteId,
} from "@/enums/modals";
import moment from "moment";
import * as yup from "yup";

// Password Change validation is here
export const generatePasswordChangeValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [ChangePasswordField.oldPassword]: yup
      .string()
      .required(translate("validationMessages.required"))
      .min(6, translate("validationMessages.string.min")),

    [ChangePasswordField.newPassword]: yup
      .string()
      .required(translate("validationMessages.required"))
      .notOneOf(
        [yup.ref("currentPassword")],
        translate("validationMessages.mixed.notOneOf")
      )

      .min(6, translate("validationMessages.string.min")),

    [ChangePasswordField.confirmNewPassword]: yup
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
    [AddNewNote.noteType]: yup
      .string()
      .required(translate("validationMessages.required")),
    [AddNewNote.noteMessage]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};

export const generateUpdateNoteValidation = (translate: Function) => {
  return yup.object().shape({
    [UpdateNoteId.noteMessage]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};

export const generateRejectOfferValidation = (translate: Function) => {
  return yup.object().shape({
    reason: yup.string().required(translate("validationMessages.required")),
  });
};

// Validation for Edit payment details
export const generateEditPaymentDetailsValidation = (translate: Function) => {
  return yup.object().shape({
    [EditPaymentDetails.nameOnCard]: yup
      .string()
      .required(translate("validationMessages.required")),
    [EditPaymentDetails.expiry]: yup
      .string()
      .required(translate("validationMessages.required")),
    [EditPaymentDetails.cardNumber]: yup
      .string()
      .required(translate("validationMessages.required")),
    [EditPaymentDetails.cvv]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};

export const generateImageValidation = (translate: Function) => {
  return yup.object().shape({
    upload_image1: yup.string().notRequired(),
    upload_image2: yup.string().notRequired(),
    upload_image3: yup.string().notRequired(),
    upload_image4: yup.string().notRequired(),
    upload_image5: yup.string().notRequired(),
    upload_image6: yup.string().notRequired(),
    upload_image7: yup.string().notRequired(),
    upload_image8: yup.string().notRequired(),
    upload_image9: yup.string().notRequired(),
    upload_image10: yup.string().notRequired(),
    upload_image11: yup.string().notRequired(),
    upload_image12: yup.string().notRequired(),
    upload_image13: yup.string().notRequired(),
    upload_image14: yup.string().notRequired(),
    upload_image15: yup.string().notRequired(),
  });
};

// Add general address validation
export const generateAddGeneralAddressValidationSchema = (
  translate: Function
) => {
  return yup.object().shape({
    [AddGeneralAddressField.addresses]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};
export const generateAddGeneralNoteValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [AddGeneralNoteField.noteType]: yup
      .string()
      .required(translate("validationMessages.required")),
    [AddGeneralNoteField.description]: yup.string().notRequired(),
  });
};

export const generateEnterCompanyNameValidationSchema = (
  translate: Function
) => {
  return yup.object().shape({
    [EnterComponayNameField.companyName]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};

export const generateAddTaskValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [AddCalendarTask.title]: yup
      .string()
      .required(translate("validationMessages.required")),
    [AddCalendarTask.date]: yup
      .array()
      .of(
        yup.object().shape({
          startDate: yup
            .string()
            .required(translate("validationMessages.required")),
          endDate: yup
            .string()
            .required(translate("validationMessages.required")),
        })
      )
      .test(
        "endDate-greater-than-startDate",
        translate("validationMessages.endDateGreater"),
        (dates) => {
          if (!dates || !Array.isArray(dates)) return false;

          return dates.every((dateItem) =>
            moment(dateItem.endDate).isAfter(moment(dateItem.startDate))
          );
        }
      )
      .min(1, translate("validationMessages.required")),
    [AddCalendarTask.colour]: yup
      .string()
      .required(translate("validationMessages.required")),
    [AddCalendarTask.alertTime]: yup.number().notRequired(),
    [AddCalendarTask.note]: yup.string().notRequired(),
  });
};
