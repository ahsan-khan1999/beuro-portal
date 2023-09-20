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
      label: { text: "Email", htmlFor: "email" },
      field: {
        type: Field.input,
        id: "email",
        name: "email",
        inputType: "email",
        placeholder: "Please enter an email address",
        register,
      },
    },
    {
      label: {
        text: "Password",
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
        label: "Remember me",
      },
    },
    {
      containerClass: "inline-flex mb-0  ml-[44px]",
      field: {
        type: Field.span,
        name: Field.span,
        linkText: "Forget Password?",
        linkHref: "/forget-password",
        containerClassName: "inline-flex font-medium text-gray",
        linkClassName: "text-sm font-medium text-primary",
      },
    },

    {
      containerClass: "mt-8",
      label: null,
      field: {
        type: Field.button,
        text: "Login",
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
