import * as yup from "yup";
import { createInvoice } from "@/enums/invoice";

// Created invoice validation is here
export const generateCreateInvoiceValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [createInvoice.totalAmount]: yup
      .number()
      .required(translate("validation required")),

    [createInvoice.remainingAmount]: yup
      .string()
      .required(translate("validation required")),


    [createInvoice.paymentMethod]: yup
      .string()
      .required(translate("validation required")),


  });
};
export const generateCreateRecurringInvoiceValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [createInvoice.paymentMethod]: yup
      .string()
      .required(translate("validation required")),
  

    [createInvoice.date]: yup
      .string()
      .required(translate("validation required")),

    [createInvoice.frequency]: yup
      .number()
      .required(translate("validation required")),

  });
};


export const generateRecurringInvoiceFrequencyValidationSchema = (translate: Function) => {
  return yup.object().shape({
   

    [createInvoice.date]: yup
      .string()
      .required(translate("validation required")),

    [createInvoice.frequency]: yup
      .number()
      .required(translate("validation required")),

  });
};
