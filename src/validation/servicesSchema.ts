import * as yup from "yup";
import { ServicesDetailFields } from "@/enums/services";

// generateServiceValidation here
export const generateServicesValidation = (translate: Function) => {
  return yup.object().shape({
    [ServicesDetailFields.serviceTitle]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ServicesDetailFields.unit]: yup.string().required(translate("validationMessages.required")),
    [ServicesDetailFields.price]: yup
      .number()
      .required(translate("validationMessages.required")),
    [ServicesDetailFields.description]: yup
      .string()

      .required(translate("validationMessages.required")),
  });
};
