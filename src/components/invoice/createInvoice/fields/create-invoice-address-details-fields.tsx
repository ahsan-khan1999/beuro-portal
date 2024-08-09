import { Field } from "@/enums/form";
import { FormField, GenerateCreateInvoiceAddressFormField } from "@/types";
import editIcon from "@/assets/svgs/edit_primary.svg";

import { useTranslation } from "next-i18next";
export const addressObject = {
  streetNumber: "",
  postalCode: "",
  country: "",
  description: "",
};

export const CreateInvoiceAddressDetailsFormField: GenerateCreateInvoiceAddressFormField =
  (
    register,
    loading,
    control,
    onHandleBack,
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
      let valueIndex = i;
      formField.push(
        {
          containerClass: `rounded-lg px-2 py-3 bg-[#EDF4FF] my-5`,
          field: {
            className: "!p-4 h-[45px] !border-[#BFBFBF] focus:!border-primary",
            type: Field.select,
            id: `address.${i}.addressType`,
            name: `address.${i}.addressType`,
            // value: translate("common.address_type"),
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
          field: {
            type: Field.div,
            id: `div-field`,
            className: "flex justify-between items-center",
            children: [
              {
                field: {
                  type: Field.div,
                  className: "flex space-x-2",
                  id: `address-labels-${i}`,
                  children: [
                    (!(addressType && !addressType[i]) && {
                      field: {
                        type: Field.input,
                        className:
                          "!px-2 !border-[#BFBFBF] focus:!border-primary",
                        inputType: "text",
                        id: `address.${i}.label`,
                        name: `address.${i}.label`,
                        register,
                        // value: `Adresse ${++valueIndex}`,
                        // setValue,
                      },
                    }) || {
                      field: {
                        type: Field.input,
                        inputType: "text",
                        id: `address.${i}.label`,
                        name: `address.${i}.label`,
                        register,
                        // value: `Adresse ${++valueIndex}`,
                        disabled: true,
                        className:
                          "!p-0 !bg-transparent !border-none focus:!border-none !w-auto text-[#1E1E1E] text-base font-semibold",
                        // setValue,
                      },
                    },
                    {
                      containerClass: "",
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
                containerClass: "mb-0 relative right-0 float-right",
                field: {
                  type: Field.button,
                  id: "button",
                  text: `${translate("common.remove_button")}`,
                  inputType: "button",
                  className: `rounded-md px-[6px] py-1 bg-transparent !h-[30px] text-dark-red text-base font-semibold border-2 rounded-[6px] border-[#C31313] hover-bg-none mt-1 ${
                    i === 0 && "hidden"
                  }`,
                  onClick: () => handleRemoveAddress && handleRemoveAddress(i),
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
                  text: translate("offers.address_details.street_no"),
                  htmlFor: `address.${i}.streetNumber`,
                  className: "mb-[10px]",
                },
                field: {
                  type: Field.input,
                  className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                  inputType: "text",
                  id: `address.${i}.streetNumber`,
                  name: `address.${i}.streetNumber`,
                  placeholder: `Zweibrückenstraße, ${i}`,
                  register,
                },
              },
              {
                containerClass: "mb-0 ",
                label: {
                  text: translate("offers.address_details.post_code"),
                  htmlFor: `address.${i}.postalCode`,
                  className: "mb-[10px]",
                },
                field: {
                  type: Field.input,
                  className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                  inputType: "text",
                  id: `address.${i}.postalCode`,
                  name: `address.${i}.postalCode`,
                  placeholder: `123${i}`,
                  register,
                },
              },
              {
                containerClass: "mb-0",
                label: {
                  text: translate("offers.address_details.country"),
                  htmlFor: `address.${i}.country`,
                  className: "mb-[10px]",
                },

                field: {
                  type: Field.input,
                  className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                  inputType: "text",
                  id: `address.${i}.country`,
                  name: `address.${i}.country`,
                  register,
                },
              },
            ],
          },
        },

        {
          containerClass: "rounded-b-lg px-2 py-3 bg-[#EDF4FF]",
          label: {
            text: translate("offers.address_details.description"),
            htmlFor: `address.${i}.description`,
            className: "mb-[10px]",
          },
          field: {
            type: Field.textArea,
            className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
            rows: 2,
            id: `address.${i}.description`,
            name: `address.${i}.description`,
            placeholder: "",
            register,
          },
        }
      );
    }

    formField.push({
      containerClass: "mt-[30px]",
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex flex-row-reverse gap-y-5 justify-between",
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
                    text: `${translate("common.back_button")}`,
                    inputType: "button",
                    className:
                      "rounded-lg border border-[#C7C7C7] bg-white p-4 min-w-[92px] w-fit h-[50px] text-dark hover-bg-none",
                    onClick: onHandleBack && onHandleBack,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.button,
                    id: "button",
                    text: `${translate("common.next_button")}`,
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
              onClick: () => handleAddNewAddress && handleAddNewAddress(),
            },
          },
        ],
      },
    });

    return formField;
  };
