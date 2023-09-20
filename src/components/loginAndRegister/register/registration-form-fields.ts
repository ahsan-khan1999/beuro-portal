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
      label: { text: "Full Name", htmlFor: "text" },
      field: {
        type: Field.input,
        id: "text",
        name: "text",
        inputType: "text",
        placeholder: "Enter your full name",
        register,
      },
    },
    {
      label: { text: "Email", htmlFor: "email" },
      field: {
        type: Field.input,
        id: "email",
        name: "email",
        inputType: "email",
        placeholder: "user@example.com",
        register,
      },
    },

    {
      label: {
        text: "Password",
        htmlFor: "password",
        // className: "mb-[10px]",
      },
      field: {
        type: Field.password,
        id: "password",
        name: "password",
        placeholder: "Enter Your Password",
        register,
      },
    },
    {
      label: { text: "Confirm Password", htmlFor: "confirmPassword" },
      field: {
        type: Field.password,
        id: "confirmPassword",
        name: "confirmPassword",
        placeholder: "Confirm Your Password",
        register,
      },
    },
    {
      containerClass: "inline-flex mb-0",
      field: {
        type: Field.span,
        text: "By creating an account your agreeing to our",
        name: Field.span,
        linkText: " Privacy Policy.",
        linkHref: "/forget-password",
        containerClassName: "text-[14px] text-dark ",
        linkClassName: " text-dark text-primary",
      },
    },
    {
      containerClass: "mt-6",
      label: null,
      field: {
        type: Field.button,
        text: "Sign Up",
        inputType: "submit",
        className: "rounded-lg justify-center text-white",
        loading,
      },
    },
  ];
  return formField;
};
