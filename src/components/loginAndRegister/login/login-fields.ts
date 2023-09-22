import { Field } from "@/enums/form";
import {
  FormField,
  GenerateFormField,
  GenerateRegistrationFormField,
} from "@/types";
import { useRouter } from "next/router";

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
      field: {
        type: Field.div,
        className: "flex justify-between ",
        children: [
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
            containerClass: "inline-flex mb-0  ",
            field: {
              type: Field.span,
              name: Field.span,
              linkText: "Forget Password?",
              linkHref: "/forget-password",
              containerClassName: "inline-flex font-medium text-gray",
              linkClassName: "text-sm font-medium text-primary",
            },
          },
        ],
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
    {
      containerClass: "flex mb-0 justify-center mt-6",
      field: {
        type: Field.span,
        text: "Don't have an account?",
        name: Field.span,
        linkText: " Sign Up",
        linkHref: "/registration",
        containerClassName: "text-[14px] text-dark  ",
        linkClassName: "  text-primary",
      },
    },
  ];

  return formField;
};
export const detailScreensFormField: GenerateRegistrationFormField = (
  register,
  loading
) => {
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        className: "grid grid-cols-2 gap-x-6 ",
        children: [
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
        ],
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
  loading,
  router
) => {
  const formFields: FormField[] = [
    {
      containerClass: "mb-8",
      label: { text: "Enter Your Email", htmlFor: "email" },
      field: {
        type: Field.input,
        id: "email",
        name: "email",
        inputType: "email",
        placeholder: "User@example.com",
        register,
      },
    },
    {
      field: {
        type: Field.div,
        className: "flex gap-x-4 ",
        children: [
          {
            label: null,
            field: {
              type: Field.button,
              text: "Back To Login",
              inputType: "button",
              className:
                "w-[175px] bg-white text-[#BFBFBF] border border-[#BFBFBF] hover:bg-none",
              onClick: () => router?.push("/login"),
              loading,
            },
          },
          {
            label: null,
            field: {
              type: Field.button,
              text: "Submit",
              inputType: "submit",
              className: "w-[190px]",
              loading,
            },
          },
        ],
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
        text: "New Password",
        htmlFor: "password",
        className: "mb-[10px]",
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
      containerClass: "mb-0",
      label: {
        text: "Confirm Password",
        htmlFor: "confirmPassword",
        className: "mb-[10px]",
      },
      field: {
        type: Field.password,
        id: "confirmPassword",
        name: "confirmPassword",
        placeholder: "Confirm Your Password",
        register,
      },
    },
    {
      label: null,
      field: {
        type: Field.button,
        text: "Submit",
        inputType: "submit",
        className: "mt-8 rounded-lg",
        loading,
      },
    },
  ];
  return formFields;
};
