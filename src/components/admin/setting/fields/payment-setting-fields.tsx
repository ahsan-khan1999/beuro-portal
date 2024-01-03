import { Field } from "@/enums/form";
import { FormField, GeneratePaymentSettingFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const changePaymentSettingsFormField: GeneratePaymentSettingFormField = (
  register,
  loading,
  control
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        className: "flex ",
        id: "paymentDiv",
        children: [
          {
            containerClass: "w-full mb-0",
            field: {
              type: Field.div,
              className: "",
              id: "paymentDiv",

              children: [
                {
                  containerClass: "mb-6",
                  field: {
                    id: "paymentspan",

                    type: Field.span,
                    text: `${translate(
                      "admin.settings.payment_setting.heading"
                    )}`,
                    containerClassName:
                      "text-[20px] text-[#222B45] font-normal ",
                  },
                },
                {
                  containerClass: "w-full relative",
                  field: {
                    type: Field.div,
                    className: "grid grid-cols-2 gap-x-6 gap-y-6 ",
                    id: "paymentdiv",

                    children: [
                      {
                        containerClass: "mb-0",
                        label: {
                          text: `${translate(
                            "admin.settings.payment_setting.pub_key"
                          )}`,
                          htmlFor: "publishableKey",
                        },
                        field: {
                          className:
                            "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                          type: Field.input,
                          id: "publishableKey",
                          name: "publishableKey",
                          inputType: "text",
                          placeholder: "Enter Your Publishable Key",
                          register,
                        },
                      },
                      {
                        containerClass: "mb-0",
                        label: {
                          text: `${translate(
                            "admin.settings.payment_setting.search_key"
                          )}`,
                          htmlFor: "searchKey",
                        },
                        field: {
                          className:
                            "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                          type: Field.input,
                          id: "searchKey",
                          name: "searchKey",
                          inputType: "text",
                          placeholder: "Enter Your Search Key",
                          register,
                        },
                      },
                      {
                        containerClass: "mb-0",
                        label: {
                          text: `${translate(
                            "admin.settings.payment_setting.test_mode"
                          )}`,
                          htmlFor: "testMode",
                          className: "mb-[10px]",
                        },
                        field: {
                          className:
                            "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                          type: Field.select,
                          value: "False",
                          id: "testMode",
                          name: "testMode",
                          options: [
                            { value: "True", label: "True" },
                            { value: "False", label: "False" },
                          ],
                          control,
                        },
                      },
                      {
                        containerClass: "mb-0",
                        label: {
                          text: `${translate(
                            "admin.settings.payment_setting.active"
                          )}`,
                          htmlFor: "active",
                          className: "mb-[10px]",
                        },
                        field: {
                          className:
                            "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                          type: Field.select,
                          value: "True",
                          id: "active",
                          name: "active",
                          options: [
                            { value: "True", label: "True" },
                            { value: "False", label: "False" },
                          ],
                          control,
                        },
                      },
                    ],
                  },
                },

                {
                  containerClass: "mb-0 mt-5",
                  field: {
                    type: Field.button,
                    text: `${translate(
                      "admin.settings.payment_setting.save_changes_button"
                    )}`,
                    inputType: "submit",
                    className:
                      "rounded-lg p-4 w-fit h-[50px] text-white hover:bg-none ",
                    loading,
                    id: "paymentdiv",
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ];

  return formField;
};
