import { Field } from "@/enums/form";
import { FormField, GenerateLeadAddressFormField } from "@/types";
import { useTranslation } from "next-i18next";
import editIcon from "@/assets/svgs/edit_primary.svg";

export const LeadsEditAddressDetailsFormField: GenerateLeadAddressFormField = (
  register,
  loading,
  control,
  handleBack,
  count,
  handleChangeLabel,
  handleAddNewAddress,
  handleRemoveAddress,
  fields,
  handleFieldTypeChange,
  addressType,
  setValue,
  getValues,
  addressSettings
) => {
  const formField: FormField[] = [];
  const { t: translate } = useTranslation();

  if (!fields) return null;
  for (let i = 0; i < count; i++) {
    const isEditable = addressType && addressType[i];
    const inputField: FormField = isEditable
      ? {
          field: {
            type: Field.input,
            className: "!px-2 !border-[#BFBFBF] focus:!border-primary",
            inputType: "text",
            id: `address.${i}.label`,
            name: `address.${i}.label`,
            register,
          },
        }
      : {
          field: {
            type: Field.input,
            inputType: "text",
            id: `address.${i}.label`,
            name: `address.${i}.label`,
            register,

            disabled: true,
            className:
              "!p-0 !bg-transparent !border-none focus:!border-none !w-auto text-[#1E1E1E] text-base font-semibold",
          },
        };
    formField?.push(
      {
        containerClass: `rounded-lg px-2 py-3 bg-[#EDF4FF] my-5`,
        field: {
          className: "!p-4 h-[45px] !border-[#BFBFBF] focus:!border-primary",
          type: Field.select,
          id: `address.${i}.addressType`,
          name: `address.${i}.addressType`,
          options:
            addressSettings?.addresses?.map((item) => ({
              label: item,
              value: item,
            })) || [],
          control,
          onItemChange: (item) => handleChangeLabel(item, i),
        },
      },

      {
        containerClass: "mb-0 relative right-0 float-right",
        field: {
          type: Field.button,
          id: "button",
          text: `${translate("common.remove_button")}`,
          inputType: "button",
          className: `rounded-md px-[6px] py-1 bg-transparent !h-[30px] text-dark-red text-base font-semibold border-2 rounded-[6px] border-[#C31313] hover-bg-none mt-1 ${
            i === 0 && "hidden"
          }`,
          onClick: () => {
            handleRemoveAddress && handleRemoveAddress(i);
          },
        },
      },

      {
        containerClass: "mt-2",
        field: {
          type: Field.div,
          className: "flex space-x-2",
          id: `address-labels-${i}`,
          children: [
            inputField,
            {
              field: {
                type: Field.button,
                className: "bg-white hover:bg-white",
                id: `address.${i}.type`,
                name: `address.${i}.type`,
                inputType: "button",
                icon: editIcon,
                onClick: () =>
                  handleFieldTypeChange && handleFieldTypeChange(i),
              },
            },
          ],
        },
      },

      {
        field: {
          type: Field.div,
          id: `div-field-${i}`,
          className:
            "grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5 rounded-t-lg px-2 pt-3 pb-5 bg-[#EDF4FF]",
          children: [
            {
              containerClass: "mb-0",
              label: {
                text: translate("leads.address_details.street_no"),
                htmlFor: `address.${i}.streetNumber`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                inputType: "text",
                id: `address.${i}.streetNumber`,
                name: `address.${i}.streetNumber`,
                placeholder: `${translate("leads.placeholders.street")}`,
                register,
              },
            },
            {
              containerClass: "mb-0",
              label: {
                text: translate("leads.address_details.post_code"),
                htmlFor: `address.${i}.postalCode`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                inputType: "text",
                id: `address.${i}.postalCode`,
                name: `address.${i}.postalCode`,
                placeholder: `${translate("leads.placeholders.post_code")}`,
                register,
              },
            },
            {
              containerClass: "mb-0",
              label: {
                text: translate("leads.address_details.country"),
                htmlFor: `address.${i}.country`,
                className: "mb-[10px]",
              },

              field: {
                type: Field.input,
                className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                inputType: "text",
                id: `address.${i}.country`,
                name: `address.${i}.country`,
                placeholder: `${translate(
                  "offers.placeholders.country_placeholder"
                )}`,
                register,
              },
            },
          ],
        },
      },
      {
        containerClass: "mb-0 rounded-b-lg px-2 pb-3 bg-[#EDF4FF]",
        label: {
          text: translate("leads.address_details.description"),
          htmlFor: `address.${i}.description`,
          className: "mb-[10px]",
        },
        field: {
          type: Field.textArea,
          className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
          rows: 2,
          id: `address.${i}.description`,
          name: `address.${i}.description`,
          placeholder: translate("common.description_placeholder"),
          register,
        },
      }
    );
  }

  formField.push({
    containerClass: "my-[30px]",
    field: {
      type: Field.div,
      id: "div-field",
      className: "flex justify-between flex-row-reverse",
      children: [
        {
          field: {
            className: "flex items-center gap-x-[18px]",
            type: Field.div,
            id: "div-field",
            children: [
              {
                containerClass: "mb-0",
                field: {
                  type: Field.button,
                  id: "button",
                  text: `${translate("common.cancel_button")}`,
                  inputType: "button",
                  className:
                    "rounded-lg border border-[#C7C7C7] bg-white p-4 min-w-[92px] w-fit h-[50px] text-dark hover-bg-none",
                  onClick: () => handleBack && handleBack(),
                },
              },
              {
                containerClass: "mb-0",
                field: {
                  type: Field.button,
                  id: "button",
                  text: `${translate(
                    "leads.address_details.save_changes_button"
                  )}`,
                  inputType: "submit",
                  className:
                    "rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover-bg-none",
                  loading,
                },
              },
            ],
          },
        },
        {
          containerClass: "mb-0",
          field: {
            type: Field.button,
            id: "button",
            text: `${translate("offers.address_details.add_new_address")}`,
            inputType: "button",
            className:
              "rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover-bg-none",
            onClick: () => {
              handleAddNewAddress && handleAddNewAddress();
            },
          },
        },
      ],
    },
  });

  return formField;

  // const { t: translate } = useTranslation();
  // const formField: FormField[] = [];

  // for (let i = 1; i <= count; i++) {
  //   const isEditable = addressType && addressType[i];
  //   const inputField: FormField = isEditable
  //     ? {
  //         //editable address
  //         containerClass: "",
  //         field: {
  //           type: Field.input,
  //           className: "!px-2 !border-[#BFBFBF] focus:!border-primary",
  //           inputType: "text",
  //           id: `address.${i}.label`,
  //           name: `address.${i}.label`,
  //           register,
  //           // value: `Address ${i + 1}`,
  //         },
  //       }
  //     : {
  //         //non-editable address
  //         containerClass: "",
  //         field: {
  //           type: Field.input,
  //           inputType: "text",
  //           id: `address.${i}.label`,
  //           name: `address.${i}.label`,
  //           register,
  //           // value: `Address ${i + 1}`,
  //           disabled: true,
  //           className:
  //             "!p-0 !bg-transparent !border-none focus:!border-none !w-auto text-[#1E1E1E] text-base",
  //         },
  //       };
  //   formField.push(
  //     {
  //       containerClass: "",
  //       field: {
  //         type: Field.div,
  //         className: "flex  space-x-2 ",
  //         id: `address-labels-${i}`,
  //         children: [
  //           // (!(addressType && !addressType[i - 1]) && {
  //           //   containerClass: "mt-2",

  //           //   field: {
  //           //     type: Field.input,
  //           //     className: "!px-2 !border-[#BFBFBF] focus:!border-primary ",
  //           //     inputType: "text",
  //           //     id: `label-${i}`,
  //           //     name: `label-${i}`,
  //           //     placeholder: `Zweibrückenstraße, ${i}`,
  //           //     register,
  //           //     value: `Address ${i}`,
  //           //   },
  //           // }) || {
  //           //   containerClass: "",

  //           //   field: {
  //           //     type: Field.input,
  //           //     inputType: "text",
  //           //     id: `label-${i}`,
  //           //     name: `label-${i}`,
  //           //     placeholder: `Zweibrückenstraße, ${i}`,
  //           //     register,
  //           //     value: `Address ${i}`,
  //           //     disabled: true,
  //           //     className:
  //           //       "!p-0 !bg-transparent !border-none focus:!border-none !w-auto text-[#1E1E1E] text-base",
  //           //   },
  //           // },
  //           inputField,

  //           {
  //             containerClass: "",
  //             field: {
  //               type: Field.button,
  //               className: "bg-white hover:bg-white",
  //               id: `addressLabel-${i}`,
  //               inputType: "button",
  //               icon: editIcon,
  //               onClick: () =>
  //                 handleFieldTypeChange && handleFieldTypeChange(i),
  //             },
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       containerClass: "mt-6",
  //       // label: {
  //       //   text: `${translate("leads.address_details.heading")} ${i}`,

  //       //   htmlFor: `address-${i}-details`,
  //       //   className: "mb-[10px] text-[#8F8F8F]",
  //       // },
  //       field: {
  //         type: Field.div,
  //         id: `div-field-${i}`,
  //         className: "grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5",
  //         children: [
  //           {
  //             containerClass: "mb-0 ",
  //             label: {
  //               text: translate("leads.address_details.street_no"),
  //               htmlFor: `streetNumber-${i}`,
  //               className: "mb-[10px]",
  //             },
  //             field: {
  //               type: Field.input,
  //               className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
  //               inputType: "text",
  //               id: `streetNumber-${i}`,
  //               name: `streetNumber-${i}`,
  //               placeholder: `Zweibrückenstraße, ${i}`,
  //               register,
  //             },
  //           },
  //           {
  //             containerClass: "mb-0 ",
  //             label: {
  //               text: translate("leads.address_details.post_code"),
  //               htmlFor: `postalCode-${i}`,
  //               className: "mb-[10px]",
  //             },
  //             field: {
  //               type: Field.input,
  //               className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
  //               inputType: "text",
  //               id: `postalCode-${i}`,
  //               name: `postalCode-${i}`,
  //               placeholder: `123${i}`,
  //               register,
  //             },
  //           },
  //           {
  //             containerClass: "mb-0",
  //             label: {
  //               text: translate("leads.address_details.country"),
  //               htmlFor: "address.country",
  //               className: "mb-[10px]",
  //             },
  //             field: {
  //               className: "pl-4 !border-[#BFBFBF]",
  //               type: Field.select,
  //               id: `country-${i}`,
  //               name: `country-${i}`,
  //               options: Object.keys(staticEnums.Country).map((item) => ({
  //                 value: item,
  //                 label: translate(`countries.${item}`),
  //               })),
  //               control,
  //               value: Object.keys(staticEnums.Country)[0],
  //             },
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       containerClass: "mt-5 mb-0 ",
  //       label: {
  //         text: translate("leads.address_details.description"),
  //         htmlFor: `description-${i}`,
  //         className: "mb-[10px]",
  //       },
  //       field: {
  //         type: Field.textArea,
  //         className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
  //         rows: 2,
  //         id: `description-${i}`,
  //         name: `description-${i}`,
  //         placeholder: "",
  //         register,
  //       },
  //     }
  //   );
  // }

  // formField.push({
  //   containerClass: "mt-6",
  //   field: {
  //     type: Field.div,
  //     id: "div-field",
  //     className: "flex justify-end items-center space-x-[18px] ",
  //     children: [
  //       {
  //         containerClass: "mb-0",
  //         field: {
  //           type: Field.button,
  //           id: "button",
  //           text: `${translate("common.cancel_button")}`,
  //           inputType: "button",
  //           className:
  //             "rounded-lg border border-[#C7C7C7] bg-white p-4 min-w-[92px] w-fit h-[50px] text-dark hover-bg-none",
  //           onClick: () => handleBack && handleBack(),
  //         },
  //       },
  //       {
  //         containerClass: "mb-0",
  //         field: {
  //           type: Field.button,
  //           id: "button",
  //           text: `${translate("leads.address_details.save_changes_button")}`,
  //           inputType: "submit",
  //           className:
  //             "rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover-bg-none",
  //           loading,
  //         },
  //       },
  //     ],
  //   },
  // });

  // return formField;
};
