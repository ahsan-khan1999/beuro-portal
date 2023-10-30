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
    [LeadsCustomerEditDetails.firstName]: yup
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

    [LeadsCustomerEditDetails.phoneNumber]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
      .required(translate("validation required")),

    [LeadsCustomerEditDetails.mobileNumber]: yup
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
  translate: Function
) => {
  return yup.object().shape({
    [LeadsAddressEditDetails.streetNo]: yup
      .string()
      .required("validation required"),

    [LeadsAddressEditDetails.postCode]: yup
      .string()
      .required("validation required"),

    [LeadsAddressEditDetails.country]: yup
      .string()
      .required("validation required"),

    [LeadsAddressEditDetails.description]: yup
      .string()
      .required("validation required"),
  });
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
    [AddNewLeadCustomer.customer]: yup.string().required("validation required"),

    [AddNewLeadCustomer.customerType]: yup
      .string()
      .required("validation required"),

    [AddNewLeadCustomer.yourName]: yup.string().required("validation required"),

    [AddNewLeadCustomer.companyName]: yup
      .string()
      .required("validation required"),

    [AddNewLeadCustomer.email]: yup
      .string()
      .email()
      .required("validation required"),

    [AddNewLeadCustomer.phoneNumber]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
      .required("validation required"),

    [AddNewLeadCustomer.mobileNumber]: yup
      .number()
      .min(11, translate("validationMessages.string.min"))
      .required("validation required"),

    [AddNewLeadCustomer.streetNumber]: yup
      .string()
      .required(translate("validation required")),

    [AddNewLeadCustomer.postCode]: yup
      .string()
      .required(translate("validation required")),

    [AddNewLeadCustomer.country]: yup
      .string()
      .required(translate("validation required")),
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
