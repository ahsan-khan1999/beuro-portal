import * as yup from "yup";
import { ServicesDetailFields } from "@/enums/services";

// generateServiceValidation here
export const generateServicesValidation = (translate: Function) => {
  return yup.object().shape({
    [ServicesDetailFields.serviceTitle]: yup
      .string()
      .required("validation required"),
    [ServicesDetailFields.unit]: yup.number().required("validation required"),
    [ServicesDetailFields.price]: yup
      .number()
      .required(translate("validation required")),
    [ServicesDetailFields.description]: yup
      .string()

      .required(translate("validation required")),
  });
};
