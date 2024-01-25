import { ContractEmailPreview } from "@/enums/contract";
import * as yup from "yup";

// Contract email preview validation is here
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
