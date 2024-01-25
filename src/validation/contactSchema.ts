import * as yup from "yup";
import { ContactSupportFields } from "@/enums/contact";

// Generate Contact-support validation here
export const generateContactSupportValidation = (translate: Function) => {
  return yup.object().shape({
    [ContactSupportFields.fullName]: yup
      .string()
      .required(translate("validationMessages.required")),

    [ContactSupportFields.email]: yup
      .string()
      .email()
      .required(translate(translate("validationMessages.required"))),

    [ContactSupportFields.phoneNumber]: yup
      .string()
      .notRequired(),

    [ContactSupportFields.reasonForContact]: yup
      .string()
      .required(translate(translate("validationMessages.required"))),

    [ContactSupportFields.message]: yup
      .string()
      .required(translate(translate("validationMessages.required"))),
  });
};
