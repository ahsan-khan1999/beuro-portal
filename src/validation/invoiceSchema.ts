import * as yup from "yup";
import { createInvoice } from "@/enums/invoice";
import { LeadsCustomerEditDetails } from "@/enums/leads";
import { EditOfferDetails } from "@/enums/offers";

// Created invoice validation is here
export const generateCreateInvoiceValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [createInvoice.totalAmount]: yup
      .number()
      .required(translate("validationMessages.required")),

    [createInvoice.remainingAmount]: yup
      .string()
      .required(translate("validationMessages.required")),


    [createInvoice.paymentMethod]: yup
      .string()
      .required(translate("validationMessages.required")),


  });
};
export const generateRecurringInvoiceValidationSchema = (translate: Function) => {
  return yup.object().shape({
    


    [createInvoice.paymentMethod]: yup
      .string()
      .required(translate("validationMessages.required")),


  });
};
export const generateCreateRecurringInvoiceValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [createInvoice.paymentMethod]: yup
      .string()
      .required(translate("validationMessages.required")),
  

    [createInvoice.date]: yup
      .string()
      .required(translate("validationMessages.required")),

    [createInvoice.frequency]: yup
      .number()
      .required(translate("validationMessages.required")),

  });
};


export const generateRecurringInvoiceFrequencyValidationSchema = (translate: Function) => {
  return yup.object().shape({
   

    [createInvoice.date]: yup
      .string()
      .required(translate("validationMessages.required")),

    [createInvoice.frequency]: yup
      .number()
      .required(translate("validationMessages.required")),

  });
};


export const generateInvoiceDetailsValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [LeadsCustomerEditDetails.type]: yup
      .string()
      .required(translate("validationMessages.required")),
    [LeadsCustomerEditDetails.gender]: yup
      .number()
      .required(translate("validationMessages.required")),
    [LeadsCustomerEditDetails.customer]: yup.string().when("type", {
      is: (type: string) => type === "Existing Customer",
      then: () =>
        yup.string().required(translate("validationMessages.required")),
    }),

    [LeadsCustomerEditDetails.companyName]: yup.string().when("customerType", {
      is: (customerType: string) => customerType === "company",
      then: () =>
        yup.string().required(translate("validationMessages.required")),
    }),
    [EditOfferDetails.customerName]: yup
      .string()
      .required(translate("validationMessages.required")),

    [EditOfferDetails.email]: yup
      .string()
      .email()
      .notRequired(),


    [EditOfferDetails.offerTitle]: yup
      .string()
      .required(translate("validationMessages.required")),

    [EditOfferDetails.customerType]: yup
      .string()
      .required(translate("validationMessages.required")),

    [EditOfferDetails.phoneNumber]: yup
      .string()
      .notRequired(),

    [EditOfferDetails.mobileNumber]: yup
      .string()
      .notRequired(),

    [EditOfferDetails.content]: yup
      .string()
      .required(translate("validationMessages.required")),
    [LeadsCustomerEditDetails.address]: yup.object().shape({
      [EditOfferDetails.streetNumber]: yup
        .string()
        .required(translate("validationMessages.required")),
      [EditOfferDetails.postCode]: yup
        .string()
        .notRequired(),
      [EditOfferDetails.country]: yup
        .string()
        .required(translate("validationMessages.required")),
    }),
    [EditOfferDetails.date]: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            startDate: yup
              .string()
              .required(translate("validationMessages.required")),
            endDate: yup
              .string()
              .notRequired(),
          })
          .required(translate("validationMessages.required"))
      )
      .min(1)
      .required(translate("validationMessages.required")),
  });
};