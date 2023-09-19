import { Field } from "@/enums/form";
import {
  FormField,
  GenerateFormField,
  GenerateRegistrationFormField,
} from "@/types";

export const generateLoginFormField: GenerateRegistrationFormField = (
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
      containerClass: "inline-flex mb-0",
      field: {
        id: Field.checkbox,
        name: "rememberMe",
        type: Field.checkbox,
        register,
        description: "Eingeloggt bleiben",
      },
    },
    {
      containerClass: "inline-flex mb-0",
      field: {
        type: Field.span,
        name: Field.span,
        linkText: "Passwort vergessen",
        linkHref: "/forget-password",
        containerClassName: "inline-flex font-medium text-gray ml-[44px]",
        linkClassName: "font-medium !text-gray",
      },
    },
    {
      containerClass: "mt-5",
      label: null,
      field: {
        type: Field.button,
        text: "Anmeldung",
        inputType: "submit",
        className: "rounded-lg justify-center text-white ",
        loading,
      },
    },
  ];
  return formField;
};

export const generateResetPassowrdFormField: GenerateRegistrationFormField = (
  register,
  loading
) => {
  const formFields: FormField[] = [
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
      label: null,
      field: {
        type: Field.button,
        text: "Passwort zurücksetzen",
        inputType: "submit",
        className: "mt-5 rounded-lg",
        loading,
      },
    },
  ];
  return formFields;
};

export const generateChangePassowrdFormField: GenerateRegistrationFormField = (
  register,
  loading
) => {
  const formFields: FormField[] = [
    {
      label: {
        text: "Neues Passwort",
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
      label: {
        text: "Passwort bestätigen",
        htmlFor: "confirmPassword",
        className: "mb-[10px]",
      },
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
        text: "Passwort zurücksetzen",
        inputType: "submit",
        className: "mt-5 rounded-lg",
        loading,
      },
    },
  ];
  return formFields;
};
