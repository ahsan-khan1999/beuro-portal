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
        svg: `<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="XMLID_484_" d="M10.3712 1.35126C10.1897 1.16969 10.1897 0.875324 10.3712 0.693759C10.5528 0.512236 10.8471 0.512236 11.0287 0.693759L12.8287 2.49365C13.0102 2.67521 13.0102 2.96958 12.8287 3.15114C12.7379 3.24188 12.6189 3.28732 12.4999 3.28732C12.381 3.28732 12.262 3.24193 12.1712 3.15114L10.3712 1.35126ZM13.0542 13.555H1.09967C0.842915 13.555 0.634766 13.7632 0.634766 14.0199C0.634766 14.2767 0.842915 14.4848 1.09967 14.4848H13.0541C13.3109 14.4848 13.519 14.2767 13.519 14.0199C13.519 13.7632 13.3109 13.555 13.0542 13.555ZM1.32523 12.1973C1.20833 12.0804 1.1623 11.9103 1.20431 11.7504L1.84571 9.30897C1.86667 9.22926 1.90838 9.15661 1.96662 9.09837L9.11034 1.95453C9.29191 1.77301 9.58623 1.77301 9.7678 1.95453L11.5679 3.7545C11.655 3.84169 11.704 3.9599 11.704 4.08323C11.704 4.20651 11.655 4.32477 11.5679 4.41196L4.42409 11.5557C4.36585 11.614 4.29316 11.6557 4.21353 11.6766L1.77213 12.3182C1.73307 12.3284 1.69335 12.3334 1.654 12.3334C1.53224 12.3334 1.41352 12.2856 1.32523 12.1973ZM2.30592 11.2165L3.85556 10.8093L10.5817 4.08323L9.43911 2.94075L2.71304 9.66691L2.30592 11.2165Z" fill="#8F8F8F"/>
        </svg>
        `,
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
        svg: ` <svg
        className={className}
        width="14"
        height="11"
        viewBox="0 0 14 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={pathClass}
          d="M12.4318 0.550781H1.33559C0.684487 0.550781 0.152344 1.08058 0.152344 1.73402V8.83348C0.152344 9.48716 0.684829 10.0167 1.33559 10.0167H12.4318C13.0829 10.0167 13.615 9.48692 13.615 8.83348V1.73402C13.615 1.08043 13.0826 0.550781 12.4318 0.550781ZM12.2501 1.33961C11.8675 1.72343 7.37394 6.23166 7.18932 6.41688C7.03514 6.57154 6.7323 6.57165 6.57804 6.41688L1.51728 1.33961H12.2501ZM0.941172 8.68847V1.87904L4.33484 5.28375L0.941172 8.68847ZM1.51728 9.22789L4.89173 5.84245L6.01936 6.97376C6.48146 7.43736 7.28609 7.43718 7.74803 6.97376L8.87566 5.84248L12.2501 9.22789H1.51728ZM12.8262 8.68847L9.43252 5.28375L12.8262 1.87904V8.68847Z"
        />
      </svg>`
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
