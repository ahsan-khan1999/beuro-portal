import { CustomerDetailsFields } from "@/enums/customers";
import * as yup from "yup";

export const generateCustomerValidation = (translate: Function) => {
  return yup.object().shape({
    [CustomerDetailsFields.name]: yup
      .string()
      .required(translate("validationMessages.required")),
    [CustomerDetailsFields.customerType]: yup
      .string()
      .required(translate("validationMessages.required")),
    [CustomerDetailsFields.companyName]: yup
      .string().when('customerType', {
        is: (customerType:string) => customerType === 'company' ,
        then: () => yup.string().required(translate("validationMessages.required")),
      }),

    [CustomerDetailsFields.email]: yup
      .string()
      .email()
      .required(translate("validationMessages.required")),

    [CustomerDetailsFields.phone]: yup
      .string()
      
      .required(translate("validationMessages.required")),
    [CustomerDetailsFields.mobile]: yup
      .string()
      
      .required(translate("validationMessages.required")),
    [CustomerDetailsFields.address]: yup.object({
      [CustomerDetailsFields.streetNo]: yup
        .string()
        .required(translate("validationMessages.required")),
      [CustomerDetailsFields.postCode]: yup
        .string()
        .max(4, 'Max length is 4 characters')
        .required(translate("validationMessages.required")),
      [CustomerDetailsFields.country]: yup
        .string()
        .required(translate("validationMessages.required")),
    }).required()
  });
};
