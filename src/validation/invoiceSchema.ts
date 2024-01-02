import * as yup from "yup";
import { createInvoice } from "@/enums/invoice";

// Created invoice validation is here
export const generateCreateInvoiceValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [createInvoice.totalAmount]: yup
      .number()
      .required(translate("validationMessage.required")),

    [createInvoice.remainingAmount]: yup
      .string()
      .required(translate("validationMessage.required")),


    [createInvoice.paymentMethod]: yup
      .string()
      .required(translate("validationMessage.required")),


  });
};
export const generateRecurringInvoiceValidationSchema = (translate: Function) => {
  return yup.object().shape({
    


    [createInvoice.paymentMethod]: yup
      .string()
      .required(translate("validationMessage.required")),


  });
};
export const generateCreateRecurringInvoiceValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [createInvoice.paymentMethod]: yup
      .string()
      .required(translate("validationMessage.required")),
  

    [createInvoice.date]: yup
      .string()
      .required(translate("validationMessage.required")),

    [createInvoice.frequency]: yup
      .number()
      .required(translate("validationMessage.required")),

  });
};


export const generateRecurringInvoiceFrequencyValidationSchema = (translate: Function) => {
  return yup.object().shape({
   

    [createInvoice.date]: yup
      .string()
      .required(translate("validationMessage.required")),

    [createInvoice.frequency]: yup
      .number()
      .required(translate("validationMessage.required")),

  });
};
