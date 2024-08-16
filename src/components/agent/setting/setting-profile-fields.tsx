import { Field } from "@/enums/form";
import { FormField, GenerateAgentSettingFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const AgentPrfoileSettingFormField: GenerateAgentSettingFormField = (
  register,
  loading,
  control,
  onCancel,
  onPasswordChange
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex flex-col mlg:flex-row  items-center gap-[47px]",
        children: [
          {
            containerClass: "flex justify-center items-center",
            field: {
              type: Field.profileUploadField,
              iconClasses: "right-1 bottom-1 !cursor-pointer",
              className:
                "!h-[148px] !w-[148px] !rounded-full border border-[#BFBFBF]",
              id: "picture",
              name: "picture",
              control,
            },
          },

          {
            containerClass: "w-full",
            field: {
              type: Field.div,
              id: "div-field",
              className:
                "grid grid-cols-1 mlg:grid-cols-2 items-center gap-y-[10px] gap-x-4 rounded-lg p-4 bg-[#EDF4FF] w-full",
              children: [
                {
                  containerClass: "mb-0",
                  label: {
                    text: `${translate("employees.details.full_name")}`,
                    htmlFor: "fullName",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: `!p-4 !border-[#BFBFBF] focus:!border-primary`,
                    inputType: "text",
                    id: "fullName",
                    name: "fullName",
                    placeholder: "Jhon William",
                    register,
                  },
                },

                {
                  containerClass: "mb-0",
                  label: {
                    text: `${translate("employees.details.email_address")}`,
                    htmlFor: "email",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: `!p-4 !border-[#BFBFBF] focus:!border-primary`,
                    inputType: "text",
                    id: "email",
                    name: "email",
                    placeholder: "jhonwilli65@gmail.com",
                    register,
                  },
                },
                {
                  containerClass: "mb-0",
                  label: {
                    text: `${translate("employees.details.phone_number")}`,
                    htmlFor: "phoneNumber",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: `!px-4 !border-[#BFBFBF] focus:!border-primary`,
                    id: "phoneNumber",
                    name: "phoneNumber",

                    placeholder: "+49 234 23423",
                    inputType: "tel",
                    register,
                  },
                },
                {
                  containerClass: "mb-0",
                  label: {
                    text: `${translate("employees.details.mobile_number")}`,
                    htmlFor: "mobileNumber",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: `!px-4 !border-[#BFBFBF] focus:!border-primary`,
                    id: "mobileNumber",
                    name: "mobileNumber",
                    inputType: "tel",
                    placeholder: "+49 234 23423",

                    register,
                  },
                },
                {
                  containerClass: "mb-0 rounded-lg bg-[#EDF4FF] col-span-2",
                  label: {
                    text: `${translate(
                      "setting.account_setting.change_password"
                    )}`,
                    htmlFor: "changePassword",
                  },
                  field: {
                    type: Field.password,
                    id: "changePassword",
                    name: "changePassword",
                    placeholder: "************",
                    disabled: true,
                    isButton: true,
                    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
                      <path d="M8.79605 9.38507C9.07929 9.38507 9.3089 9.15546 9.3089 8.87222C9.3089 8.58898 9.07929 8.35938 8.79605 8.35938C8.51281 8.35938 8.2832 8.58898 8.2832 8.87222C8.2832 9.15546 8.51281 9.38507 8.79605 9.38507Z" fill="#8F8F8F"/>
                      <path d="M11.1039 9.28255C11.3871 9.28255 11.6167 9.05295 11.6167 8.7697V6.87216C11.6167 5.74102 10.6964 4.82077 9.56531 4.82077H8.94894V3.01211C8.94894 1.35123 7.56856 0 5.87185 0C4.17515 0 2.79477 1.35123 2.79477 3.01211V4.82077H2.1803C1.04916 4.82077 0.128906 5.74102 0.128906 6.87216V11.0775C0.128906 12.2087 1.04916 13.1289 2.1803 13.1289H9.56531C10.6964 13.1289 11.6167 12.2087 11.6167 11.0775C11.6167 10.7943 11.3871 10.5647 11.1039 10.5647C10.8206 10.5647 10.591 10.7943 10.591 11.0775C10.591 11.6431 10.1309 12.1032 9.56531 12.1032H2.1803C1.61473 12.1032 1.1546 11.6431 1.1546 11.0775V6.87216C1.1546 6.30659 1.61473 5.84647 2.1803 5.84647H9.56531C10.1309 5.84647 10.591 6.30659 10.591 6.87216V8.7697C10.591 9.05295 10.8206 9.28255 11.1039 9.28255ZM7.92325 4.82077H3.82046V3.01211C3.82046 1.91679 4.74072 1.0257 5.87185 1.0257C7.00299 1.0257 7.92325 1.91679 7.92325 3.01211V4.82077Z" fill="#8F8F8F"/>
                      <path d="M4.92398 9.38507C5.20722 9.38507 5.43683 9.15546 5.43683 8.87222C5.43683 8.58898 5.20722 8.35938 4.92398 8.35938C4.64074 8.35938 4.41113 8.58898 4.41113 8.87222C4.41113 9.15546 4.64074 9.38507 4.92398 9.38507Z" fill="#8F8F8F"/>
                      <path d="M3.00064 9.38507C3.28388 9.38507 3.51349 9.15546 3.51349 8.87222C3.51349 8.58898 3.28388 8.35938 3.00064 8.35938C2.7174 8.35938 2.48779 8.58898 2.48779 8.87222C2.48779 9.15546 2.7174 9.38507 3.00064 9.38507Z" fill="#8F8F8F"/>
                      <path d="M6.84732 9.38507C7.13056 9.38507 7.36017 9.15546 7.36017 8.87222C7.36017 8.58898 7.13056 8.35938 6.84732 8.35938C6.56408 8.35938 6.33447 8.58898 6.33447 8.87222C6.33447 9.15546 6.56408 9.38507 6.84732 9.38507Z" fill="#8F8F8F"/>
                    </svg>
                        `,
                    alt: "password",
                    onClick: onPasswordChange && onPasswordChange,
                    register,
                  },
                },
              ],
            },
          },
        ],
      },
    },

    {
      containerClass: "mt-5",
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex items-center justify-end space-x-[18px]",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("common.cancel_button")}`,
              inputType: "button",
              onClick: onCancel && onCancel,
              className:
                "rounded-lg border border-[#C7C7C7] bg-white px-4 py-[10px] min-w-[152px] w-fit text-dark hover:bg-none",
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate(
                "setting.account_setting.save_changes_button"
              )}`,
              inputType: "submit",
              className:
                "rounded-lg px-4 py-[10px] w-fit text-white hover:bg-none",
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
