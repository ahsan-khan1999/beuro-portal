import { Field } from "@/enums/form";
import { FormField, GenerateAgentSettingFormField } from "@/types";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";

export const AgentPrfoileSettingFormField: GenerateAgentSettingFormField = (
  register,
  loading,
  control
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex flex-col lg:flex-row  items-center gap-5",
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
                "grid grid-cols-1 lg:grid-cols-2 items-center gap-y-5 gap-x-3 rounded-lg px-2 py-3 bg-[#EDF4FF] w-full",
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
                    text: `${translate("employees.details.designation")}`,
                    htmlFor: "designation",
                    className: "mb-[10px]",
                  },

                  field: {
                    className: `pl-4 !border-[#BFBFBF] focus:!border-primary cursor-pointer`,
                    type: Field.select,
                    id: "designation",
                    name: "designation",
                    options:
                      Object.keys(staticEnums.Designation)
                        ?.slice(1)
                        ?.map((item) => ({
                          value: staticEnums.Designation[item],
                          label: translate(`agent.employee_type.${item}`),
                        })) || [],
                    control,
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
                    className: `!px-4 !border-[#BFBFBF] focus:!border-primary `,
                    id: "mobileNumber",
                    name: "mobileNumber",
                    inputType: "tel",
                    placeholder: "+49 234 23423",

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
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex items-center justify-end space-x-[18px] mt-[30px]",
        children: [
          // {
          //   containerClass: "mb-0",
          //   field: {
          //     type: Field.button,
          //     id: "button",
          //     text: `${translate("setting.account_setting.restore_button")}`,
          //     inputType: "button",
          //     onClick: handleRestore,
          //     className:
          //       "rounded-lg border border-[#C7C7C7] bg-white p-4 w-fit h-[50px] text-dark hover:bg-none",
          //   },
          // },
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
                "rounded-lg px-4 w-fit h-[50px] text-white hover:bg-none",
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
