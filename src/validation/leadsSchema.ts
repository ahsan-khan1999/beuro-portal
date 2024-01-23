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
      .required(translate("validationMessages.required")),

    [LeadsCustomerEditDetails.customerType]: yup
      .string()
      .required(translate("validationMessages.required")),

    [LeadsCustomerEditDetails.email]: yup
      .string()
      .email()
      .required(translate(translate("validationMessages.required"))),

    [LeadsCustomerEditDetails.phone]: yup
      .string()
      .required(translate(translate("validationMessages.required"))),

    [LeadsCustomerEditDetails.mobile]: yup
      .string()
      .required(translate(translate("validationMessages.required"))),

    [LeadsCustomerEditDetails.address]: yup
      .object({
        [LeadsCustomerEditDetails.streetNo]: yup
          .string()
          .required(translate("validationMessages.required")),
        [LeadsCustomerEditDetails.postCode]: yup
          .string()
          .required(translate("validationMessages.required")),
        [LeadsCustomerEditDetails.country]: yup
          .string()
          .required(translate("validationMessages.required")),
      })
      .required(),
  });
};

// Validation for leads address edit details
export const generateLeadsAddressEditDetailsValidation = (
  translate: Function,
) => {
  // const addressSchema = Array.from({ length: count }, (_, index) => 
  // {
  //   return {
  //     [`address.${0}.${LeadsAddressEditDetails.streetNo}`]: yup
  //       .string()
  //       .required(translate("validationMessages.required")),
  //     [`address.${0}.${LeadsAddressEditDetails.postCode}`]: yup
  //       .string()
  //       .required(translate("validationMessages.required")),
  //     [`address.${0}.${LeadsAddressEditDetails.country}`]: yup
  //       .string()
  //       .required(translate("validationMessages.required")),
  //     [`address.${0}.${LeadsAddressEditDetails.description}`]: yup
  //       .string()
  //       .required(translate("validationMessages.required")),
  //     [`address.${0}.${LeadsAddressEditDetails.label}`]: yup
  //       .string()
  //       .required(translate("validationMessages.required")),

  //   };
  // }).reduce((acc, obj) => ({ ...acc, ...obj }), {});
  // return yup.object().shape(addressSchema);

  const addressValidationSchema = yup
    .array()
    .of(
      yup
        .object()
        .shape({
          [LeadsAddressEditDetails.streetNo]: yup
            .string()
            .required(translate("validationMessages.required")),
          [LeadsAddressEditDetails.postCode]: yup
            .string()
            .required(translate("validationMessages.required")),
          [LeadsAddressEditDetails.country]: yup
            .string()
            .required(translate("validationMessages.required")),
          [LeadsAddressEditDetails.description]: yup.string().notRequired(),
          [LeadsAddressEditDetails.label]: yup
            .string()
            .required(translate("validationMessages.required")),
        })
        .required(translate("validationMessages.required"))
    )
    .min(1)
    .required(translate("validationMessages.required"));
  return yup.object().shape({ address: addressValidationSchema });
};

// Validation for leads service edit details
export const generateLeadsServiceEditDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    [LeadsServiceEditDetails.requiredService]: yup
      .string()
      .required(translate("validationMessages.required")),

    [LeadsServiceEditDetails.desireDate]: yup
      .string()
      .required(translate("validationMessages.required")),

    [LeadsServiceEditDetails.contactAvailablity]: yup
      .string()
      .required(translate("validationMessages.required")),

    [LeadsServiceEditDetails.flexibility]: yup
      .string()
      .required(translate("validationMessages.required")),

    [LeadsServiceEditDetails.preferContact]: yup
      .string()
      .required(translate("validationMessages.required")),

    [LeadsServiceEditDetails.budget]: yup
      .string()
      .notRequired(),

    [LeadsServiceEditDetails.leadSource]: yup
      .string()
      .required(translate("validationMessages.required")),

    [LeadsServiceEditDetails.otherServices]: yup
      .array()
      .of(yup.string().required())
      .min(1, translate("validationMessages.required")),
  });
};

// Validation for add new customer lead details
export const generateAddNewLeadCustomerDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    [LeadsCustomerEditDetails.type]: yup
      .string()
      .required(translate("validationMessages.required")),
    [LeadsCustomerEditDetails.customer]: yup.string().when("type", {
      is: (type: string) => type === "Existing Customer",
      then: () =>
        yup.string().required(translate("validationMessages.required")),
    }),
    [LeadsCustomerEditDetails.name]: yup
      .string()
      .required(translate("validationMessages.required")),
    [LeadsCustomerEditDetails.customerType]: yup
      .string()
      .required(translate("validationMessages.required")),
    [LeadsCustomerEditDetails.companyName]: yup.string().when("customerType", {
      is: (customerType: string) => customerType === "company",
      then: () =>
        yup.string().required(translate("validationMessages.required")),
    }),

    [LeadsCustomerEditDetails.email]: yup
      .string()
      .email()
      .required(translate("validationMessages.required")),

    [LeadsCustomerEditDetails.phone]: yup.string().notRequired(),
    [LeadsCustomerEditDetails.mobile]: yup.string().notRequired(),
    [LeadsCustomerEditDetails.address]: yup
      .object({
        [LeadsCustomerEditDetails.streetNo]: yup
          .string()
          .required(translate("validationMessages.required")),
        [LeadsCustomerEditDetails.postCode]: yup
          .string()
          .required(translate("validationMessages.required")),
        [LeadsCustomerEditDetails.country]: yup
          .string()
          .required(translate("validationMessages.required")),
      })
      .required(),
  });
};

// Validation for leads additional edit details
export const generateLeadAdditionalDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    [LeadAdditionalDetails.additionlData]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};
