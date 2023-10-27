import * as yup from "yup";
import {
  EditConfirmationContentDetails,
  EditInvoiceContentDetails,
  OfferEditContentDetails,
  ReceiptEditContentDetails,
} from "@/enums/content";

// Offer content edit details validation
export const generateOfferEditContentDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    [OfferEditContentDetails.contentName]: yup
      .string()
      .required("validation required"),

    [OfferEditContentDetails.addressLabel]: yup
      .string()
      .required("validation required"),

    [OfferEditContentDetails.offerTitle]: yup
      .string()
      .required(translate("validation required")),
    [OfferEditContentDetails.offerDescription]: yup
      .string()
      .required(translate("validation required")),
    [OfferEditContentDetails.emailBody]: yup
      .string()
      .required(translate("validation required")),
    [OfferEditContentDetails.attachments]: yup
      .string()
      .required(translate("validation required")),
  });
};

// Confirmation content edit details validation
export const generateEditConfirmationContentDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    [EditConfirmationContentDetails.confirmationTitle]: yup
      .string()
      .required("validation required"),

    [EditConfirmationContentDetails.confirmationDescription]: yup
      .string()
      .required("validation required"),

    [EditConfirmationContentDetails.emailBody]: yup
      .string()
      .required(translate("validation required")),
    [EditConfirmationContentDetails.attachments]: yup
      .string()
      .required(translate("validation required")),
  });
};

// Invoice content edit details validation
export const generateEditInvoiceContentDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    [EditInvoiceContentDetails.invoiceTitle]: yup
      .string()
      .required("validation required"),

    [EditInvoiceContentDetails.invoiceDescription]: yup
      .string()
      .required("validation required"),

    [EditInvoiceContentDetails.emailBody]: yup
      .string()
      .required(translate("validation required")),
    [EditInvoiceContentDetails.attachments]: yup
      .string()
      .required(translate("validation required")),
  });
};

// Receipt content edit details validation
export const generateEditReceiptContentDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    [ReceiptEditContentDetails.receiptTitle]: yup
      .string()
      .required("validation required"),

    [ReceiptEditContentDetails.receiptDescription]: yup
      .string()
      .required("validation required"),

    [ReceiptEditContentDetails.emailBody]: yup
      .string()
      .required(translate("validation required")),
    [ReceiptEditContentDetails.attachments]: yup
      .string()
      .required(translate("validation required")),
  });
};
