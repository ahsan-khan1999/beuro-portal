import { FormField, GenerateRegistrationFormField } from "@/types";
import { Field } from "@/enums/form";
import NameIcon from "@/assets/svgs/name-input.svg";

export const generateFormField: GenerateRegistrationFormField = (
  register,
  loading
) => {
  const formField: FormField[] = [
    {
      containerClass: "mb-3",
      label: { text: "Full Name", htmlFor: "text" },
      field: {
        type: Field.input,
        id: "text",
        name: "text",
        inputType: "text",
        placeholder: "Enter your full name",
        svg: NameIcon,
        alt: "Full Name Icon",
        register,
      },
    },
    {
      containerClass: "mb-3",
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
      containerClass: "mb-3",
      label: {
        text: "Password",
        htmlFor: "password",
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
      containerClass: "mb-3",
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
        linkClassName: " text-primary",
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
    {
      containerClass: "flex mb-0 justify-center mt-6",
      field: {
        type: Field.span,
        text: "Don't have an account?",
        name: Field.span,
        linkText: " Sign In",
        linkHref: "/login",
        containerClassName: "text-sm text-dark  ",
        linkClassName: " text-primary",
      },
    },
  ];
  return formField;
};
