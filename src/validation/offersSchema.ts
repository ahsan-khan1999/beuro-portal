import { LeadsCustomerEditDetails } from "@/enums/leads";
import {
  AddServiceOfferDetails,
  EditOfferDetails,
  OfferAdditionalDetails,
  OfferAddressEditDetails,
  ServiceOfferEditDetails,
} from "@/enums/offers";
import * as yup from "yup";

// Validation for offer service edit details
export const generateOfferServiceEditDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    [ServiceOfferEditDetails.serviceName]: yup
      .string()
      .required("validation required"),

    [ServiceOfferEditDetails.price]: yup
      .string()
      .required("validation required"),

    [ServiceOfferEditDetails.unit]: yup
      .string()
      .required("validation required"),

    [ServiceOfferEditDetails.count]: yup
      .string()
      .required("validation required"),
    [ServiceOfferEditDetails.totalPrice]: yup
      .string()
      .required("validation required"),
    [ServiceOfferEditDetails.description]: yup
      .string()
      .required("validation required"),
    [ServiceOfferEditDetails.discountDiscription]: yup
      .string()
      .required("validation required"),
  });
};

// Validation for edit details
export const generateOfferDetailsValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [LeadsCustomerEditDetails.type]: yup
      .string()
      .required("validation required"),
    [LeadsCustomerEditDetails.customer]: yup
      .string().when('type', {
        is: (type: string) => type === 'Existing Customer',
        then: () => yup.string().required(translate("validationMessages.required")),
      }),

    [LeadsCustomerEditDetails.companyName]: yup
      .string().when('customerType', {
        is: (customerType: string) => customerType === 'company',
        then: () => yup.string().required(translate("validationMessages.required")),
      }),
    [EditOfferDetails.customerName]: yup
      .string()
      .required(translate("validation required")),

    [EditOfferDetails.email]: yup
      .string()
      .email()
      .required(translate("validation required")),

    [EditOfferDetails.offerTitle]: yup
      .string()
      .required(translate("validation required")),


    [EditOfferDetails.customerType]: yup
      .string()
      .required(translate("validation required")),

    [EditOfferDetails.phoneNumber]: yup
      .string()
      .required(translate("validation required")),

    [EditOfferDetails.mobileNumber]: yup
      .string()
      .required(translate("validation required")),
    [LeadsCustomerEditDetails.address]: yup.object().shape({
      [EditOfferDetails.streetNumber]: yup
        .string()
        .required(translate("validation required")),
      [EditOfferDetails.postCode]: yup
        .string()
        .required(translate("validation required")),
      [EditOfferDetails.country]: yup
        .string()
        .required(translate("validation required")),
    })

  });

};
export const generateOfferDetailsDateValidationSchema = (translate: Function, count: number) => {
  const schemaObject: any = {};
  for (let i = 0; i < count; i++) {
    schemaObject[`${EditOfferDetails.date}`] = yup.object().shape({
      [`startDate_${i}`]: yup.string().required(translate("validationMessages.required")),
      [`endDate_${i}`]: yup.string().required(translate("validationMessages.required")),

    }).required(translate("validationMessages.required"));
  }

  let testObj = yup.object().shape(schemaObject)

  return testObj
};
// Validation for offer additional edit details
export const generateOfferAdditionalDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    [OfferAdditionalDetails.chooseFromExisting]: yup
      .string()
      .required("validation required"),
    [OfferAdditionalDetails.additionlData]: yup
      .string()
      .required("validation required"),
  });
};

// Validation for offer address edit details
export const generateOfferAddressEditDetailsValidation = (
  translate: Function,
  count: number

) => {
  const addressSchema = Array.from({ length: count }, (_, index) => {
    return (
      ({
        [`${OfferAddressEditDetails.streetNo}-${index + 1}`]: yup.string().required(translate("validationMessages.required")),
        [`${OfferAddressEditDetails.postCode}-${index + 1}`]: yup.string().required(translate("validationMessages.required")),
        [`${OfferAddressEditDetails.country}-${index + 1}`]: yup.string().required(translate("validationMessages.required")),
        [`${OfferAddressEditDetails.description}-${index + 1}`]: yup.string().required(translate("validationMessages.required")),
      }))

  })
    .reduce((acc, obj) => ({ ...acc, ...obj }), {});
  return yup.object().shape(addressSchema)

};


// Validation for offer service edit details
export const generateAddfferServiceDetailsValidation = (
  translate: Function,
  count: number
) => {
  const schemaObject: any = {};

  for (let i = 0; i < count; i++) {
    schemaObject[`${AddServiceOfferDetails.serviceType}_${i}`] = yup.string().required(translate("validationMessages.required"))
    schemaObject[`${AddServiceOfferDetails.serviceTitle}_${i}`] = yup.string().notRequired(translate("validationMessages.required"))
    schemaObject[`${AddServiceOfferDetails.price}_${i}`] = yup.string().required(translate("validationMessages.required"))
    schemaObject[`${AddServiceOfferDetails.unit}_${i}`] = yup.string().required(translate("validationMessages.required"))
    schemaObject[`${AddServiceOfferDetails.count}_${i}`] = yup.string().required(translate("validationMessages.required"))
    schemaObject[`${AddServiceOfferDetails.totalPrice}_${i}`] = yup.string().required(translate("validationMessages.required"))
    schemaObject[`${AddServiceOfferDetails.description}_${i}`] = yup.string().required(translate("validationMessages.required"))

  }

  let testObj = yup.object().shape({ "serviceDetail": yup.object().shape(schemaObject) })
  return testObj
};

export const generateOfferDiscountValidation = (
  translate: Function
) => {
  return yup.object().shape({
    [AddServiceOfferDetails.discountDiscription]: yup
      .string()
      .required(translate("validationMessages.required")),
    [AddServiceOfferDetails.isDiscount]: yup
      .boolean()
      .required(translate("validationMessages.required")),
    [AddServiceOfferDetails.isTax]: yup
      .boolean()
      .required(translate("validationMessages.required")),

    [AddServiceOfferDetails.discountType]: yup
      .boolean().when("isDiscount", {
        is: (isDiscount: boolean) => isDiscount === true,
        then: () => yup.boolean().notRequired(),
      }),
    [AddServiceOfferDetails.discountAmount]: yup
      .number().when("isDiscount", {
        is: (isDiscount: boolean) => isDiscount === true,
        then: () => yup.number().required(translate("validationMessages.required")),
      }),
    [AddServiceOfferDetails.taxAmount]: yup
      .number().notRequired(),
    [AddServiceOfferDetails.taxType]: yup
      .boolean().when("isTax", {
        is: (isTax: boolean) => isTax === true,
        then: () => yup.boolean().notRequired(),
      }),

  });
};


export const mergeOfferSchemas = (baseSchema: yup.ObjectSchema<any>, additionalSchema: yup.ObjectSchema<any>) => {
  return yup.object().shape({
    ...baseSchema.fields,
    ...additionalSchema.fields,

  });
};