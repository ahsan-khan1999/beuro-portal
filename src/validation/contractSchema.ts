import {
  ContractAdditionalDetails,
  ContractEmailPreview,
} from "@/enums/contract";
import { EditOfferDetails } from "@/enums/offers";
import * as yup from "yup";

export const generateContractEmailValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [ContractEmailPreview.email]: yup
      .string()
      .email()
      .required(translate("validationMessages.required")),

    [ContractEmailPreview.content]: yup.string().notRequired(),
    [ContractEmailPreview.subject]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ContractEmailPreview.description]: yup
      .string()
      .required(translate("validationMessages.required")),

    [ContractEmailPreview.fileUpload]: yup
      .array()
      .of(yup.string().notRequired())
      .notRequired(),
  });
};

export const generateContractDateSchema = (translate: Function) => {
  return yup.object().shape({
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

export const generateContractEditAdditionalDetailsValidation = (
  translate: Function
) => {
  return yup.object().shape({
    [ContractAdditionalDetails.additionalDetails]: yup.string().notRequired(),
  });
};
