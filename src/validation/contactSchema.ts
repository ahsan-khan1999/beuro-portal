import * as yup from "yup";
import { ContactSupportFields } from "@/enums/contact";

// Generate Contact-support validation here
export const generateContactSupportValidation = (translate: Function) => {
  return yup.object().shape({
    [ContactSupportFields.fullName]: yup
      .string()
      .required("validation required"),

    [ContactSupportFields.email]: yup
      .string()
      .email()
      .required(translate("validation required")),

    [ContactSupportFields.phoneNumber]: yup
      .string()
      .required(translate("validation required")),

    [ContactSupportFields.reasonForContact]: yup
      .string()
      .required(translate("validation required")),

    [ContactSupportFields.message]: yup
      .string()
      .required(translate("validation required")),
  });
};
