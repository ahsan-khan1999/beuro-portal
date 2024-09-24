import {
  LeadAdditionalDetails,
  LeadsAddressEditDetails,
  LeadsCustomerEditDetails,
  LeadsServiceEditDetails,
} from "@/enums/leads";

import * as yup from "yup";

export const generateLeadsCustomerEditDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    [LeadsCustomerEditDetails.name]: yup
      .string()
      .required(translate("validationMessages.required")),
    [LeadsCustomerEditDetails.gender]: yup
      .number()
      .required(translate("validationMessages.required")),
    [LeadsCustomerEditDetails.customerType]: yup
      .string()
      .required(translate("validationMessages.required")),
    [LeadsCustomerEditDetails.phone]: yup.string().notRequired(),
    [LeadsCustomerEditDetails.mobile]: yup.string().notRequired(),
    [LeadsCustomerEditDetails.address]: yup
      .object({
        [LeadsCustomerEditDetails.streetNo]: yup
          .string()
          .required(translate("validationMessages.required")),
        [LeadsCustomerEditDetails.postCode]: yup.string().notRequired(),
        [LeadsCustomerEditDetails.country]: yup.string().notRequired(),
      })
      .required(),
  });
};

export const generateLeadsAddressEditDetailsValidation = (
  translate: Function
) => {
  const addressValidationSchema = yup
    .array()
    .of(
      yup
        .object()
        .shape({
          [LeadsAddressEditDetails.streetNo]: yup
            .string()
            .required(translate("validationMessages.required")),
          [LeadsAddressEditDetails.postCode]: yup.string().notRequired(),
          [LeadsAddressEditDetails.country]: yup.string().notRequired(),
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
    [LeadsServiceEditDetails.contactAvailablity]: yup.string().notRequired(),
    [LeadsServiceEditDetails.flexibility]: yup.string().notRequired(),
    [LeadsServiceEditDetails.preferContact]: yup.string().notRequired(),
    [LeadsServiceEditDetails.leadSource]: yup.string().notRequired(),
    [LeadsServiceEditDetails.otherServices]: yup
      .array()
      .of(yup.string().notRequired()),
  });
};

export const generateAddNewLeadCustomerDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    [LeadsCustomerEditDetails.type]: yup
      .string()
      .required(translate("validationMessages.required")),
    [LeadsCustomerEditDetails.gender]: yup
      .number()
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
    [LeadsCustomerEditDetails.phone]: yup.string().notRequired(),
    [LeadsCustomerEditDetails.mobile]: yup.string().notRequired(),
    [LeadsCustomerEditDetails.address]: yup
      .object({
        [LeadsCustomerEditDetails.streetNo]: yup
          .string()
          .required(translate("validationMessages.required")),
        [LeadsCustomerEditDetails.postCode]: yup.string().notRequired(),
        [LeadsCustomerEditDetails.country]: yup.string().notRequired(),
      })
      .required(),
  });
};

export const generateLeadAdditionalDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    [LeadAdditionalDetails.additionlData]: yup.string().notRequired(),
  });
};
