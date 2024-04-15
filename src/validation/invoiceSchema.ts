import * as yup from "yup";
import {
  CreateInvoiceAdditionalDetails,
  CreateInvoiceAddressDetails,
  CreateInvoiceServiceOfferDetails,
  createInvoice,
} from "@/enums/invoice";
import { LeadsCustomerEditDetails } from "@/enums/leads";
import { EditOfferDetails } from "@/enums/offers";

// Created invoice validation is here
export const generateCreateInvoiceValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [createInvoice.totalAmount]: yup
      .number()
      .required(translate("validationMessages.required")),

    [createInvoice.remainingAmount]: yup
      .string()
      .required(translate("validationMessages.required")),

    [createInvoice.paymentMethod]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};

export const generateRecurringInvoiceValidationSchema = (
  translate: Function
) => {
  return yup.object().shape({
    [createInvoice.paymentMethod]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};
export const generateCreateRecurringInvoiceValidationSchema = (
  translate: Function
) => {
  return yup.object().shape({
    [createInvoice.paymentMethod]: yup
      .string()
      .required(translate("validationMessages.required")),

    [createInvoice.date]: yup
      .string()
      .required(translate("validationMessages.required")),

    [createInvoice.frequency]: yup
      .number()
      .required(translate("validationMessages.required")),
  });
};

export const generateRecurringInvoiceFrequencyValidationSchema = (
  translate: Function
) => {
  return yup.object().shape({
    [createInvoice.date]: yup
      .string()
      .required(translate("validationMessages.required")),

    [createInvoice.frequency]: yup
      .number()
      .required(translate("validationMessages.required")),
  });
};

export const generateInvoiceDetailsValidationSchema = (translate: Function) => {
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

    [LeadsCustomerEditDetails.companyName]: yup.string().when("customerType", {
      is: (customerType: string) => customerType === "company",
      then: () =>
        yup.string().required(translate("validationMessages.required")),
    }),
    [EditOfferDetails.customerName]: yup
      .string()
      .required(translate("validationMessages.required")),

    [EditOfferDetails.email]: yup.string().email().notRequired(),

    [EditOfferDetails.offerTitle]: yup
      .string()
      .required(translate("validationMessages.required")),

    [EditOfferDetails.customerType]: yup
      .string()
      .required(translate("validationMessages.required")),

    [EditOfferDetails.phoneNumber]: yup.string().notRequired(),

    [EditOfferDetails.mobileNumber]: yup.string().notRequired(),

    [EditOfferDetails.content]: yup
      .string()
      .required(translate("validationMessages.required")),
    [LeadsCustomerEditDetails.address]: yup.object().shape({
      [EditOfferDetails.streetNumber]: yup
        .string()
        .required(translate("validationMessages.required")),
      [EditOfferDetails.postCode]: yup.string().notRequired(),
      [EditOfferDetails.country]: yup
        .string()
        .required(translate("validationMessages.required")),
    }),
    [EditOfferDetails.date]: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            startDate: yup
              .string()
              .required(translate("validationMessages.required")),
            endDate: yup.string().notRequired(),
          })
          .required(translate("validationMessages.required"))
      )
      .min(1)
      .required(translate("validationMessages.required")),
  });
};

export const generateCreateInvoiceAddressDetailsValidation = (
  translate: Function
) => {
  const addressValidationSchema = yup
    .array()
    .of(
      yup
        .object()
        .shape({
          [CreateInvoiceAddressDetails.streetNo]: yup
            .string()
            .required(translate("validationMessages.required")),
          [CreateInvoiceAddressDetails.postCode]: yup.string().notRequired(),
          [CreateInvoiceAddressDetails.country]: yup
            .string()
            .required(translate("validationMessages.required")),
          [CreateInvoiceAddressDetails.description]: yup.string().notRequired(),
          [CreateInvoiceAddressDetails.label]: yup
            .string()
            .required(translate("validationMessages.required")),
          [CreateInvoiceAddressDetails.type]: yup.string().notRequired(),
        })
        .required(translate("validationMessages.required"))
    )
    .min(1)
    .required(translate("validationMessages.required"));
  return yup.object().shape({ address: addressValidationSchema });
};

export const generateCreateInvoiceServiceDetailsValidation = (
  translate: Function
) => {
  const serviceValidationSchema = yup
    .array()
    .of(
      yup
        .object()
        .shape({
          [CreateInvoiceServiceOfferDetails.serviceType]: yup
            .string()
            .required(translate("validationMessages.required")),
          [CreateInvoiceServiceOfferDetails.serviceTitle]: yup
            .string()
            .required(translate("validationMessages.required")),
          [CreateInvoiceServiceOfferDetails.price]: yup
            .number()
            .required(translate("validationMessages.required"))
            .typeError(translate("validationMessages.invalid_format")),
          [CreateInvoiceServiceOfferDetails.unit]: yup
            .string()
            .required(translate("validationMessages.required")),
          [CreateInvoiceServiceOfferDetails.count]: yup
            .number()
            .required(translate("validationMessages.required"))
            .typeError(translate("validationMessages.invalid_format")),
          [CreateInvoiceServiceOfferDetails.discount]: yup
            .number()
            .notRequired()
            // .lessThan(yup.ref(CreateInvoiceServiceOfferDetails.totalPrice), translate("validationMessages.discountLessThanTotalPrice"))
            .typeError(translate("validationMessages.invalid_format")),
          [CreateInvoiceServiceOfferDetails.totalPrice]: yup
            .number()
            .required(translate("validationMessages.required"))
            .typeError(translate("validationMessages.invalid_format")),
          [CreateInvoiceServiceOfferDetails.description]: yup
            .string()
            .required(translate("validationMessages.required")),
        })
        .required(translate("validationMessages.required"))
    )
    .min(1)
    .required(translate("validationMessages.required"));
  return yup.object().shape({
    serviceDetail: serviceValidationSchema,
    [CreateInvoiceServiceOfferDetails.discountDiscription]: yup
      .string()
      .when("isDiscount", {
        is: (isDiscount: boolean) => isDiscount,
        then: () => yup.string().notRequired(),
      }),
    [CreateInvoiceServiceOfferDetails.isDiscount]: yup
      .boolean()
      .required(translate("validationMessages.required")),
    [CreateInvoiceServiceOfferDetails.isTax]: yup
      .boolean()
      .required(translate("validationMessages.required")),

    [CreateInvoiceServiceOfferDetails.discountType]: yup
      .boolean()
      .when("isDiscount", {
        is: (isDiscount: boolean) => isDiscount,
        then: () => yup.boolean().notRequired(),
      }),
    [CreateInvoiceServiceOfferDetails.discountAmount]: yup
      .mixed()
      .when("isDiscount", {
        is: (isDiscount: boolean) => isDiscount,
        then: () =>
          yup.mixed().required(translate("validationMessages.required")),
      }),
    [CreateInvoiceServiceOfferDetails.taxAmount]: yup.number().notRequired(),
    [CreateInvoiceServiceOfferDetails.taxType]: yup.boolean().when("isTax", {
      is: (isTax: boolean) => isTax === true,
      then: () => yup.boolean().notRequired(),
    }),
  });
};

export const generateCreateInvoiceAdditionalDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    [CreateInvoiceAdditionalDetails.chooseFromExisting]: yup
      .string()
      .required(translate("validationMessages.required")),
    [CreateInvoiceAdditionalDetails.additionlData]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};
