import * as yup from "yup";
import { ServicesDetailFields } from "@/enums/services";

// generateServiceValidation here
export const generateServicesValidation = (translate: Function) => {
  return yup.object().shape({
    [ServicesDetailFields.serviceTitle]: yup
      .string()
      .required(translate("validationMessage.required")),
    [ServicesDetailFields.unit]: yup.number().required(translate("validationMessage.required")),
    [ServicesDetailFields.price]: yup
      .number()
      .required(translate("validationMessage.required")),
    [ServicesDetailFields.description]: yup
      .string()

      .required(translate("validationMessage.required")),
  });
};
