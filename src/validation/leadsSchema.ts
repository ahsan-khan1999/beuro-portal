import { CustomerDetailsFields } from "@/enums/customers";
import {
  AddNewLeadCustomer,
  LeadAdditionalDetails,
  LeadsAddressEditDetails,
  LeadsCustomerEditDetails,
  LeadsServiceEditDetails,
} from "@/enums/leads";

import * as yup from "yup";
// Validation for leads customer edit details
export const generateLeadsCustomerEditDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    [LeadsCustomerEditDetails.name]: yup
      .string()
      .required("validation required"),

    [LeadsCustomerEditDetails.lastName]: yup
      .string()
      .required("validation required"),

    [LeadsCustomerEditDetails.customerType]: yup
      .string()
      .required("validation required"),

    [LeadsCustomerEditDetails.email]: yup
      .string()
      .email()
      .required(translate("validation required")),

    [LeadsCustomerEditDetails.phone]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
      .required(translate("validation required")),

    [LeadsCustomerEditDetails.mobile]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
      .required(translate("validation required")),

    [LeadsCustomerEditDetails.streetNo]: yup
      .string()
      .required(translate("validationMessages.required")),

    [LeadsCustomerEditDetails.postCode]: yup
      .string()
      .required(translate("validationMessages.required")),

    [LeadsCustomerEditDetails.country]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};

// Validation for leads address edit details
export const generateLeadsAddressEditDetailsValidation = (
  translate: Function,
  count: number
) => {

  const addressSchema = Array.from({ length: count }, (_, index) => ({
    [`${LeadsAddressEditDetails.streetNo}`]: yup.string().required(translate("validationMessages.required")),
    [`${LeadsAddressEditDetails.postCode}`]: yup.string().required(translate("validationMessages.required")),
    [`${LeadsAddressEditDetails.country}`]: yup.string().required(translate("validationMessages.required")),
    [`${LeadsAddressEditDetails.description}`]: yup.string().required(translate("validationMessages.required")),
  }))
  .reduce((acc, obj) => ({ ...acc, ...obj }), {});
  return yup.object().shape({
    address: yup.array().of(
      yup.object().shape(addressSchema)
    )
  })

};

// Validation for leads service edit details
export const generateLeadsServiceEditDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    [LeadsServiceEditDetails.requiredService]: yup
      .string()
      .required("validation required"),

    [LeadsServiceEditDetails.desireDate]: yup
      .string()
      .required("validation required"),

    [LeadsServiceEditDetails.contactAvailablity]: yup
      .string()
      .required("validation required"),

    [LeadsServiceEditDetails.flexibility]: yup
      .string()
      .required("validation required"),

    [LeadsServiceEditDetails.preferContact]: yup
      .string()
      .required("validation required"),

    [LeadsServiceEditDetails.budget]: yup
      .string()
      .required("validation required"),

    [LeadsServiceEditDetails.leadSource]: yup
      .string()
      .required(translate("validationMessages.required")),

    [LeadsServiceEditDetails.otherServices]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};

// Validation for add new customer lead details
export const generateAddNewLeadCustomerDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    [LeadsCustomerEditDetails.type]: yup
      .string()
      .required("validation required"),
    [LeadsCustomerEditDetails.customer]: yup
      .string().when('type', {
        is: (type: string) => type === 'Existing Customer',
        then: () => yup.string().required(translate("validationMessages.required")),
      }),
    [LeadsCustomerEditDetails.name]: yup
      .string()
      .required("validation required"),
    [LeadsCustomerEditDetails.customerType]: yup
      .string()
      .required(translate("validationMessages.required")),
    [LeadsCustomerEditDetails.companyName]: yup
      .string().when('customerType', {
        is: (customerType: string) => customerType === 'company',
        then: () => yup.string().required(translate("validationMessages.required")),
      }),

    [LeadsCustomerEditDetails.email]: yup
      .string()
      .email()
      .required(translate("validationMessages.required")),

    [LeadsCustomerEditDetails.phone]: yup
      .string()
      .min(11, translate("validationMessages.string.min"))
      .required(translate("validationMessages.required")),
    [LeadsCustomerEditDetails.mobile]: yup
      .string()
      .min(11, translate("validationMessages.string.min"))
      .required(translate("validationMessages.required")),
    [LeadsCustomerEditDetails.address]: yup.object({
      [LeadsCustomerEditDetails.streetNo]: yup
        .string()
        .required(translate("validationMessages.required")),
      [LeadsCustomerEditDetails.postCode]: yup
        .string()
        .required(translate("validationMessages.required")),
      [LeadsCustomerEditDetails.country]: yup
        .string()
        .required(translate("validationMessages.required")),
    }).required()
  });
};


// Validation for leads additional edit details
export const generateLeadAdditionalDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    [LeadAdditionalDetails.additionlData]: yup
      .string()
      .required("validation required"),
  });
};
