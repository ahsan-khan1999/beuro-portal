import * as yup from "yup";
import {
  EditConfirmationContentDetails,
  EditInvoiceContentDetails,
  LeadContentDetails,
  OfferEditContentDetails,
  ReceiptEditContentDetails,
} from "@/enums/content";

// lead content validation
export const generateLeadContentDetailsValidation = (translate: Function) => {
  return yup
    .object()
    .shape({
      leadContent: yup.object().shape({
        [LeadContentDetails.leadTitle]: yup
          .string()
          .required(translate("validationMessages.required")),

        [LeadContentDetails.emailBody]: yup
          .string()
          .required(translate("validationMessages.required")),
        [LeadContentDetails.attachments]: yup
          .array()
          .of(yup.string().notRequired())
          .notRequired(),
      }),
    })
    .required();
};

// Offer content edit details validation
export const generateOfferEditContentDetailsValidation = (
  translate: Function
) => {
  return yup
    .object()
    .shape({
      [OfferEditContentDetails.contentName]: yup
        .string()
        .required(translate("validationMessages.required")),
      offerContent: yup.object().shape({
        [OfferEditContentDetails.offerTitle]: yup
          .string()
          .required(translate("validationMessages.required")),
        [OfferEditContentDetails.offerDescription]: yup
          .string()
          .required(translate("validationMessages.required")),
        [OfferEditContentDetails.emailBody]: yup
          .string()
          .required(translate("validationMessages.required")),
        [OfferEditContentDetails.attachments]: yup
          .array()
          .of(yup.string().notRequired())
          .notRequired(),
      }),
    })
    .required();
};

export const generateContentAddressValidationSchema = (
  translate: Function,
  count: number
) => {
  const schemaObject: any = {};
  for (let i = 0; i < count; i++) {
    schemaObject[`${OfferEditContentDetails.addressLabel}_${i}`] = yup
      .string()
      .required(translate("validationMessage.required"));
  }

  // const addressObj = yup.object().shape({
  //   offerContent: yup.object().shape(schemaObject).required(),
  // });
  let addressObj = yup.object().shape(schemaObject);
  return addressObj;
};

export const mergeSchemas = (
  baseSchema: yup.ObjectSchema<any>,
  additionalSchema: yup.ObjectSchema<any>,
  translate: Function
) => {
  return yup.object().shape({
    [OfferEditContentDetails.contentName]: yup
      .string()
      .required(translate("validationMessages.required")),

    offerContent: yup.object().shape({
      ...baseSchema.fields,
      ...additionalSchema.fields,
    }),
  });
};
// Confirmation content edit details validation
export const generateEditConfirmationContentDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    confirmationContent: yup
      .object()
      .shape({
        [EditConfirmationContentDetails.confirmationTitle]: yup
          .string()
          .required(translate("validationMessages.required")),

        [EditConfirmationContentDetails.confirmationDescription]: yup
          .string()
          .required(translate("validationMessages.required")),

        [EditConfirmationContentDetails.emailBody]: yup
          .string()
          .required(translate("validationMessages.required")),
        [EditConfirmationContentDetails.attachments]: yup
          .array()
          .of(yup.string().notRequired())
          .notRequired(),
      })
      .required(),
  });
};

// Invoice content edit details validation
export const generateEditInvoiceContentDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    invoiceContent: yup.object().shape({
      [EditInvoiceContentDetails.invoiceTitle]: yup
        .string()
        .required(translate("validationMessages.required")),

      [EditInvoiceContentDetails.invoiceDescription]: yup
        .string()
        .required(translate("validationMessages.required")),

      [EditInvoiceContentDetails.emailBody]: yup
        .string()
        .required(translate("validationMessages.required")),
      [EditInvoiceContentDetails.attachments]: yup
        .array()
        .of(yup.string().notRequired())
        .notRequired(),
    }),
  });
};

// Receipt content edit details validation
export const generateEditReceiptContentDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    receiptContent: yup.object().shape({
      [ReceiptEditContentDetails.receiptTitle]: yup
        .string()
        .required(translate("validationMessages.required")),

      [ReceiptEditContentDetails.receiptDescription]: yup
        .string()
        .required(translate("validationMessages.required")),

      [ReceiptEditContentDetails.emailBody]: yup
        .string()
        .required(translate("validationMessages.required")),
      [ReceiptEditContentDetails.attachments]: yup
        .array()
        .of(yup.string().notRequired())
        .notRequired(),
    }),
  });
};
