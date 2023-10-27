import * as yup from "yup";
import { createInvoice } from "@/enums/invoice";

// Created invoice validation is here
export const generateCreateInvoiceValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [createInvoice.totalAmount]: yup
      .string()
      .required(translate("validation required")),

    [createInvoice.remainingAmount]: yup
      .string()
      .required(translate("validation required")),

    [createInvoice.enterAmount]: yup
      .string()
      .required(translate("validation required")),

    [createInvoice.paymentMethod]: yup
      .string()
      .required(translate("validation required")),

    [createInvoice.markItRecuring]: yup
      .string()
      .required(translate("validation required")),

    [createInvoice.date]: yup
      .string()
      .required(translate("validation required")),

    [createInvoice.frequency]: yup
      .string()
      .required(translate("validation required")),
  });
};
