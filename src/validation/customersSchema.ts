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
    [CustomerDetailsFields.gender]: yup
      .number()
      .required(translate("validationMessages.required")),
    [CustomerDetailsFields.companyName]: yup.string().when("customerType", {
      is: (customerType: string) => customerType === "company",
      then: () =>
        yup.string().required(translate("validationMessages.required")),
    }),

    // [CustomerDetailsFields.email]: yup
    //   .string()
    //   .email()
    //   .required(translate("validationMessages.required")),

    [CustomerDetailsFields.phone]: yup.string().notRequired(),
    [CustomerDetailsFields.mobile]: yup.string().notRequired(),
    [CustomerDetailsFields.address]: yup
      .object({
        [CustomerDetailsFields.streetNo]: yup
          .string()
          .required(translate("validationMessages.required")),
        [CustomerDetailsFields.postCode]: yup.string().notRequired(),
        [CustomerDetailsFields.country]: yup.string().notRequired(),
      })
      .required(),
  });
};
