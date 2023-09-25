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
  loading,
  control
) => {
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        className: "grid grid-cols-2 gap-x-6 ",
        children: [
          {
            label: {
              text: "Company Name",
              htmlFor: "Company Name Input",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "text",
              id: "companyName",
              name: "companyName",
              placeholder: "Enter Your Company Name",
              register,
            },
          },
          {
            label: {
              text: "Phone Number",
              htmlFor: "Phone Number Input",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "number",
              id: "phoneNumber",
              name: "phoneNumber",
              placeholder: "Enter Your Phone Number",
              register,
            },
          },
          {
            label: {
              text: "Mobile Number",
              htmlFor: "number",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "number",
              id: "mobileNumber",
              name: "mobileNumber",
              placeholder: "Enter Your Mobile Number",
              register,
            },
          },
          {
            label: {
              text: "Website",
              htmlFor: "text",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "text",
              id: "websiteAddress",
              name: "websiteAddress",
              placeholder: "Enter Your Website",
              register,
            },
          },
          {
            label: {
              text: "MwST Number",
              htmlFor: "number",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "number",
              id: "mwstNumber",
              name: "mwstNumber",
              placeholder: "Enter Your MwST Number",
              register,
            },
          },
          {
            label: {
              text: "Upload Company Logo",
              htmlFor: "upload",
              className: "mb-[10px]",
            },
            field: {
              id: "companyLogo",
              name: "companyLogo",
              type: Field.dragAndDropFileField,
              control,
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
        text: "Next",
        inputType: "submit",
        className: "rounded-lg   p-4 w-[277px] h-[50px]  text-white  ",
        loading,
      },
    },
  ];

  return formField;
};
export const detailLocationFormField: GenerateRegistrationFormField = (
  register,
  loading,
  control
) => {
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        className: "grid grid-cols-2 gap-x-6 ",
        children: [
          {
            label: {
              text: "Street Number",
              htmlFor: "number",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "number",
              id: "streetNumber",
              name: "streetNumber",
              placeholder: "Enter your Address",
              register,
            },
          },
          {
            label: {
              text: "House Number",
              htmlFor: "number",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "text",
              id: "houseNumber",
              name: "houseNumber",
              placeholder: "Enter your Address",
              register,
            },
          },
          {
            label: {
              text: "Postcode",
              htmlFor: "number",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "number",
              id: "postalCode",
              name: "postalCode",
              placeholder: "Enter Your Postcode",
              register,
            },
          },
          {
            label: {
              text: "City",
              htmlFor: "text",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "text",
              id: "city",
              name: "city",
              placeholder: "Enter Your City",
              register,
            },
          },
        ],
      },
    },
    {
      field: {
        type: Field.div,
        className: "flex space-x-6",
        children: [
          {
            field: {
              type: Field.button,
              text: "Back",
              inputType: "button",
              // onClick:()=>{Ro},
              className:
                "rounded-lg border border-[#E9E9E9] bg-white p-4 w-[153px] h-[50px]   text-[#B3B3B3]",
              loading,
            },
          },
          {
            field: {
              type: Field.button,
              text: "Next",
              inputType: "submit",
              className: "rounded-lg   p-4 w-[277px] h-[50px]  text-white  ",
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
export const detailBankFormField: GenerateRegistrationFormField = (
  register,
  loading,
  control,
  trigger,
  router
) => {
  const formField: FormField[] = [
    {
      containerClass: "mb-11",
      field: {
        type: Field.div,
        className: "grid grid-cols-2 gap-x-6 ",
        children: [
          {
            label: {
              text: "Choose currency",
              htmlFor: "select",
              className: "mb-[10px]",
            },
            field: {
              // placeholder:"234324",
              type: Field.select,
              id: "1",
              name: "currency",
              options: [
                { value: "kujhi", label: "123213" },
                { value: "kujhirt", label: "123213" },
                { value: "kujhiyrt", label: "123213" },
              ],
              trigger,
              control,
            },
          },
          {
            label: {
              text: "Bank name",
              htmlFor: "name",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "text",
              id: "bankName",
              name: "bankName",
              placeholder: "Bank",
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Account no",
              htmlFor: "number",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "number",
              id: "accountNumber",
              name: "accountNumber",
              placeholder: "Enter Your Account Number",
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Iban Number",
              htmlFor: "number",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "number",
              id: "ibanNumber",
              name: "ibanNumber",
              placeholder: "Enter Your Iban",
              register,
            },
          },
        ],
      },
    },

    {
      field: {
        type: Field.div,
        className: "flex space-x-6",
        children: [
          {
            field: {
              type: Field.button,
              text: "Back",
              inputType: "button",
              className:
                "rounded-lg border border-[#E9E9E9] bg-white p-4 w-[153px] h-[50px]   text-[#B3B3B3]",
              loading,
            },
          },
          {
            field: {
              type: Field.button,
              text: "Lets finish",
              inputType: "submit",
              className: "rounded-lg   p-4 w-[277px] h-[50px]  text-white  ",
              loading,
            },
          },
        ],
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
