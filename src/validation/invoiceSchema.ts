import * as yup from "yup";
import { createInvoice } from "@/enums/invoice";

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
