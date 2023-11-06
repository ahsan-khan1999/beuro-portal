import { CustomerDetailsFields } from "@/enums/customers";
import * as yup from "yup";

export const generateCustomerValidation = (translate: Function) => {
  return yup.object().shape({
    [CustomerDetailsFields.name]: yup
      .string()
      .required("validation required"),
    [CustomerDetailsFields.companyName]: yup
      .string()
      .required("validation required"),
    [CustomerDetailsFields.customerType]: yup
      .string()
      .required(translate("validationMessages.required")),
    [CustomerDetailsFields.email]: yup
      .string()
      .email()
      .required(translate("validationMessages.required")),

    [CustomerDetailsFields.phone]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
      .required(translate("validationMessages.required")),
    [CustomerDetailsFields.mobile]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
      .required(translate("validationMessages.required")),
    [CustomerDetailsFields.streetNo]: yup
      .string()
      .required(translate("validationMessages.required")),
    [CustomerDetailsFields.postCode]: yup
      .number()
      .required(translate("validationMessages.required")),
    [CustomerDetailsFields.country]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};
