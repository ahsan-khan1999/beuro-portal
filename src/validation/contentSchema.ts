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
      .required(translate("validationMessages.required")),
    "offerContent": yup.object().shape({
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
        .array().of(yup.string().required()).required(translate("validationMessages.required")),
      [OfferEditContentDetails.address]: yup.array().of(yup.object().shape({ value: yup.string().required(translate("validationMessages.required")) })).required()
    })


  }).required()
};




export const generateContentAddressValidationSchema = (
  translate: Function,
  count: number
) => {

  const schemaObject: any = {};
  for (let i = 0; i < count; i++) {
    schemaObject[`${OfferEditContentDetails.addressLabel}_${i}`] = yup.string().required(translate("validationMessage.required"));
  }

  // const addressObj = yup.object().shape({
  //   offerContent: yup.object().shape(schemaObject).required(),
  // });
  let addressObj = yup.object().shape(schemaObject)
  return addressObj
};


export const mergeSchemas = (baseSchema: yup.ObjectSchema<any>, additionalSchema: yup.ObjectSchema<any>, translate: Function) => {
  return yup.object().shape({
    [OfferEditContentDetails.contentName]: yup
      .string()
      .required(translate("validationMessages.required")),

    "offerContent": yup.object().shape({
      ...baseSchema.fields,
      ...additionalSchema.fields,
    })

  });
};
// Confirmation content edit details validation
export const generateEditConfirmationContentDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    "confirmationContent": yup.object().shape({
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
        .array().of(yup.string().required(translate("validationMessage.required")))
        .required(translate("validationMessage.required")),
    }).required()

  });
};

// Invoice content edit details validation
export const generateEditInvoiceContentDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    "invoiceContent": yup.object().shape({
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
        .array().of(yup.string().required(translate("validationMessage.required")))
        .required(translate("validationMessage.required")),
    })

  });
};

// Receipt content edit details validation
export const generateEditReceiptContentDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    "receiptContent": yup.object().shape({
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
        .array().of(yup.string().required(translate("validationMessage.required")))
        .required(translate("validationMessage.required")),
    })
  });
};
