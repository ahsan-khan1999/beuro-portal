import {
  FormField,
  GenerateFormField,
  GenerateRegistrationFormField,
} from "@/types";
import { Field } from "@/enums/form";

export const generateFormField: GenerateRegistrationFormField = (
  register,
  loading
) => {
  const formField: FormField[] = [
    {
      label: { text: "E-Mail", htmlFor: "email" },
      field: {
        type: Field.input,
        id: "email",
        name: "email",
        inputType: "email",
        placeholder: "E-Mail Address",
        register,
      },
    },
    {
      label: { text: "E-Mail", htmlFor: "email" },
      field: {
        type: Field.input,
        id: "email",
        name: "email",
        inputType: "email",
        placeholder: "E-Mail Address",
        register,
      },
    },

    {
      label: {
        text: "Passwort",
        htmlFor: "password",
        className: "mb-[10px]",
      },
      field: {
        type: Field.password,
        id: "password",
        name: "password",
        placeholder: "Password",
        register,
      },
    },
    {
      label: { text: "Passwort bestätigen", htmlFor: "confirmPassword" },
      field: {
        type: Field.password,
        id: "confirmPassword",
        name: "confirmPassword",
        placeholder: "Password",
        register,
      },
    },
    {
      label: null,
      field: {
        type: Field.button,
        text: "Weiter",
        inputType: "submit",
        className: "mt-5 rounded-lg justify-center",
        loading,
      },
    },
  ];
  return formField;
};
