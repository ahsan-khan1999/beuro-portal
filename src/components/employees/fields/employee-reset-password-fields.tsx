import { Field } from "@/enums/form";
import { FormField, GenerateChangePasswordFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const EmployeeResetPasswordFieldsFormField: GenerateChangePasswordFormField =
  (register, loading, onClick) => {
    const { t: translate } = useTranslation();
    const formFields: FormField[] = [
      {
        containerClass: "mb-5",
        label: {
          text: `${translate("employees.edit_password_modal.your_password")}`,
          htmlFor: "yourPassword",
          className: "mb-[12px]",
        },
        field: {
          type: Field.password,
          placeholder: "Enter Your Password",

          id: "yourPassword",
          name: "yourPassword",
          disabled: false,
          svg: `<svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.80777 9.76447C9.09101 9.76447 9.32062 9.53486 9.32062 9.25162C9.32062 8.96838 9.09101 8.73877 8.80777 8.73877C8.52453 8.73877 8.29492 8.96838 8.29492 9.25162C8.29492 9.53486 8.52453 9.76447 8.80777 9.76447Z" fill="#8F8F8F"/>
    <path d="M11.1156 9.66194C11.3988 9.66194 11.6284 9.43234 11.6284 9.14909V7.25156C11.6284 6.12042 10.7082 5.20017 9.57703 5.20017H8.96066V3.3915C8.96066 1.73062 7.58028 0.379395 5.88357 0.379395C4.18687 0.379395 2.80649 1.73062 2.80649 3.3915V5.20017H2.19202C1.06088 5.20017 0.140625 6.12042 0.140625 7.25156V11.4569C0.140625 12.588 1.06088 13.5083 2.19202 13.5083H9.57703C10.7082 13.5083 11.6284 12.588 11.6284 11.4569C11.6284 11.1737 11.3988 10.9441 11.1156 10.9441C10.8323 10.9441 10.6027 11.1737 10.6027 11.4569C10.6027 12.0225 10.1426 12.4826 9.57703 12.4826H2.19202C1.62645 12.4826 1.16632 12.0225 1.16632 11.4569V7.25156C1.16632 6.68599 1.62645 6.22586 2.19202 6.22586H9.57703C10.1426 6.22586 10.6027 6.68599 10.6027 7.25156V9.14909C10.6027 9.43234 10.8323 9.66194 11.1156 9.66194ZM7.93496 5.20017H3.83218V3.3915C3.83218 2.29619 4.75244 1.40509 5.88357 1.40509C7.01471 1.40509 7.93496 2.29619 7.93496 3.3915V5.20017Z" fill="#8F8F8F"/>
    <path d="M4.93668 9.76447C5.21991 9.76447 5.44952 9.53486 5.44952 9.25162C5.44952 8.96838 5.21991 8.73877 4.93668 8.73877C4.65344 8.73877 4.42383 8.96838 4.42383 9.25162C4.42383 9.53486 4.65344 9.76447 4.93668 9.76447Z" fill="#8F8F8F"/>
    <path d="M3.01285 9.76447C3.29609 9.76447 3.5257 9.53486 3.5257 9.25162C3.5257 8.96838 3.29609 8.73877 3.01285 8.73877C2.72961 8.73877 2.5 8.96838 2.5 9.25162C2.5 9.53486 2.72961 9.76447 3.01285 9.76447Z" fill="#8F8F8F"/>
    <path d="M6.85855 9.76447C7.14179 9.76447 7.3714 9.53486 7.3714 9.25162C7.3714 8.96838 7.14179 8.73877 6.85855 8.73877C6.57531 8.73877 6.3457 8.96838 6.3457 9.25162C6.3457 9.53486 6.57531 9.76447 6.85855 9.76447Z" fill="#8F8F8F"/>
    </svg>
    `,
          alt: "Password Icon",

          register,
        },
      },
      {
        containerClass: "mb-5",
        label: {
          text: `${translate("employees.edit_password_modal.new_pasword")}`,
          htmlFor: "newPassword",
          className: "mb-[12px]",
        },
        field: {
          type: Field.password,
          id: "newPassword",
          name: "newPassword",
          placeholder: "Enter Your Password",
          svg: `<svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.80777 9.76447C9.09101 9.76447 9.32062 9.53486 9.32062 9.25162C9.32062 8.96838 9.09101 8.73877 8.80777 8.73877C8.52453 8.73877 8.29492 8.96838 8.29492 9.25162C8.29492 9.53486 8.52453 9.76447 8.80777 9.76447Z" fill="#8F8F8F"/>
    <path d="M11.1156 9.66194C11.3988 9.66194 11.6284 9.43234 11.6284 9.14909V7.25156C11.6284 6.12042 10.7082 5.20017 9.57703 5.20017H8.96066V3.3915C8.96066 1.73062 7.58028 0.379395 5.88357 0.379395C4.18687 0.379395 2.80649 1.73062 2.80649 3.3915V5.20017H2.19202C1.06088 5.20017 0.140625 6.12042 0.140625 7.25156V11.4569C0.140625 12.588 1.06088 13.5083 2.19202 13.5083H9.57703C10.7082 13.5083 11.6284 12.588 11.6284 11.4569C11.6284 11.1737 11.3988 10.9441 11.1156 10.9441C10.8323 10.9441 10.6027 11.1737 10.6027 11.4569C10.6027 12.0225 10.1426 12.4826 9.57703 12.4826H2.19202C1.62645 12.4826 1.16632 12.0225 1.16632 11.4569V7.25156C1.16632 6.68599 1.62645 6.22586 2.19202 6.22586H9.57703C10.1426 6.22586 10.6027 6.68599 10.6027 7.25156V9.14909C10.6027 9.43234 10.8323 9.66194 11.1156 9.66194ZM7.93496 5.20017H3.83218V3.3915C3.83218 2.29619 4.75244 1.40509 5.88357 1.40509C7.01471 1.40509 7.93496 2.29619 7.93496 3.3915V5.20017Z" fill="#8F8F8F"/>
    <path d="M4.93668 9.76447C5.21991 9.76447 5.44952 9.53486 5.44952 9.25162C5.44952 8.96838 5.21991 8.73877 4.93668 8.73877C4.65344 8.73877 4.42383 8.96838 4.42383 9.25162C4.42383 9.53486 4.65344 9.76447 4.93668 9.76447Z" fill="#8F8F8F"/>
    <path d="M3.01285 9.76447C3.29609 9.76447 3.5257 9.53486 3.5257 9.25162C3.5257 8.96838 3.29609 8.73877 3.01285 8.73877C2.72961 8.73877 2.5 8.96838 2.5 9.25162C2.5 9.53486 2.72961 9.76447 3.01285 9.76447Z" fill="#8F8F8F"/>
    <path d="M6.85855 9.76447C7.14179 9.76447 7.3714 9.53486 7.3714 9.25162C7.3714 8.96838 7.14179 8.73877 6.85855 8.73877C6.57531 8.73877 6.3457 8.96838 6.3457 9.25162C6.3457 9.53486 6.57531 9.76447 6.85855 9.76447Z" fill="#8F8F8F"/>
    </svg>
    `,
          alt: "Password Icon",
          register,
        },
      },
      {
        containerClass: "mb-0",
        label: {
          text: `${translate("employees.edit_password_modal.confirm_password")}`,
          htmlFor: "confirmNewPassword",
          className: "mb-[12px]",
        },
        field: {
          type: Field.password,
          id: "confirmNewPassword",
          name: "confirmNewPassword",
          placeholder: "Confirm Your Password",
          svg: `<svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.80777 9.76447C9.09101 9.76447 9.32062 9.53486 9.32062 9.25162C9.32062 8.96838 9.09101 8.73877 8.80777 8.73877C8.52453 8.73877 8.29492 8.96838 8.29492 9.25162C8.29492 9.53486 8.52453 9.76447 8.80777 9.76447Z" fill="#8F8F8F"/>
    <path d="M11.1156 9.66194C11.3988 9.66194 11.6284 9.43234 11.6284 9.14909V7.25156C11.6284 6.12042 10.7082 5.20017 9.57703 5.20017H8.96066V3.3915C8.96066 1.73062 7.58028 0.379395 5.88357 0.379395C4.18687 0.379395 2.80649 1.73062 2.80649 3.3915V5.20017H2.19202C1.06088 5.20017 0.140625 6.12042 0.140625 7.25156V11.4569C0.140625 12.588 1.06088 13.5083 2.19202 13.5083H9.57703C10.7082 13.5083 11.6284 12.588 11.6284 11.4569C11.6284 11.1737 11.3988 10.9441 11.1156 10.9441C10.8323 10.9441 10.6027 11.1737 10.6027 11.4569C10.6027 12.0225 10.1426 12.4826 9.57703 12.4826H2.19202C1.62645 12.4826 1.16632 12.0225 1.16632 11.4569V7.25156C1.16632 6.68599 1.62645 6.22586 2.19202 6.22586H9.57703C10.1426 6.22586 10.6027 6.68599 10.6027 7.25156V9.14909C10.6027 9.43234 10.8323 9.66194 11.1156 9.66194ZM7.93496 5.20017H3.83218V3.3915C3.83218 2.29619 4.75244 1.40509 5.88357 1.40509C7.01471 1.40509 7.93496 2.29619 7.93496 3.3915V5.20017Z" fill="#8F8F8F"/>
    <path d="M4.93668 9.76447C5.21991 9.76447 5.44952 9.53486 5.44952 9.25162C5.44952 8.96838 5.21991 8.73877 4.93668 8.73877C4.65344 8.73877 4.42383 8.96838 4.42383 9.25162C4.42383 9.53486 4.65344 9.76447 4.93668 9.76447Z" fill="#8F8F8F"/>
    <path d="M3.01285 9.76447C3.29609 9.76447 3.5257 9.53486 3.5257 9.25162C3.5257 8.96838 3.29609 8.73877 3.01285 8.73877C2.72961 8.73877 2.5 8.96838 2.5 9.25162C2.5 9.53486 2.72961 9.76447 3.01285 9.76447Z" fill="#8F8F8F"/>
    <path d="M6.85855 9.76447C7.14179 9.76447 7.3714 9.53486 7.3714 9.25162C7.3714 8.96838 7.14179 8.73877 6.85855 8.73877C6.57531 8.73877 6.3457 8.96838 6.3457 9.25162C6.3457 9.53486 6.57531 9.76447 6.85855 9.76447Z" fill="#8F8F8F"/>
    </svg>
    `,
          alt: "Password Icon",
          register,
        },
      },
      {
        label: null,
        field: {
          type: Field.button,
          id: "button",
          text: `${translate("employees.edit_password_modal.submit_button")}`,
          inputType: "submit",
          className: "mt-[19px] rounded-lg hover:bg-none",
          loading,
        },
      },
    ];
    return formFields;
  };
