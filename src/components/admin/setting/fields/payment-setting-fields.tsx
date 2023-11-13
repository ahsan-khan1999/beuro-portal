import { Field } from "@/enums/form";
import { FormField, GeneratePaymentSettingFormField } from "@/types";

export const changePaymentSettingsFormField: GeneratePaymentSettingFormField = (
  register,
  loading,
  control
) => {
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        className: "flex ",
        children: [
          {
            containerClass: "w-full mb-0",
            field: {
              type: Field.div,
              className: "",
              children: [
                {
                  containerClass: "mb-6",
                  field: {
                    type: Field.span,
                    text: "Stripe Setting",
                    containerClassName:
                      "text-[20px] text-[#222B45] font-normal ",
                  },
                },
                {
                  containerClass: "w-full relative",
                  field: {
                    type: Field.div,
                    className: "grid grid-cols-2 gap-x-6 gap-y-6 ",
                    children: [
                      {
                        containerClass: "mb-0",
                        label: {
                          text: "Publishable Key*",
                          htmlFor: "publishableKey",
                        },
                        field: {
                          className:
                            "!p-4 !h-[54px] !border-dark  focus:!border-primary ",
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
                          text: "Search Key*",
                          htmlFor: "searchKey",
                        },
                        field: {
                          className:
                            "!p-4 !h-[54px] !border-dark  focus:!border-primary ",
                          type: Field.input,
                          id: "searchKey",
                          name: "searchKey",
                          inputType: "text",
                          placeholder: "Enter Your Search Key",
                          register,
                        },
                      },
                      {
                        containerClass: "mb-0 ",
                        label: {
                          text: "Test Mode",
                          htmlFor: "testMode",
                          className: "mb-[10px]",
                        },
                        field: {
                          className:
                            "!p-4 !h-[54px] !border-dark  focus:!border-primary ",
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
                          text: "Active",
                          htmlFor: "active",
                          className: "mb-[10px]",
                        },
                        field: {
                          className:
                            "!p-4 !h-[54px] !border-dark  focus:!border-primary ",
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
                  containerClass: "mb-0",
                  field: {
                    type: Field.button,
                    text: "Save Changes",
                    inputType: "submit",
                    className:
                      "rounded-lg   p-4 w-fit h-[50px]  text-white hover:bg-none ",
                    loading,
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
