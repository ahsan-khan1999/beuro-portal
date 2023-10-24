import { Field } from "@/enums/form";
import { FormField, GenerateRegistrationFormField } from "@/types";

export const AddOffAddressDetailsFormField: GenerateRegistrationFormField = (
  register,
  loading
) => {
  const commonInputClasses = "!p-4 !border-dark focus:!border-primary";

  const addressFormField = (
    labelText: string,
    placeholder: string,
    id: string,
    name: string,
    inputType: any
  ) => ({
    containerClass: "mb-0",
    label: {
      text: labelText,
      htmlFor: name,

      className: "mb-[10px] text-[#4D4D4D]",
    },
    field: {
      type: Field.input,
      className: commonInputClasses,
      inputType,
      id: id,
      name: name,
      placeholder,
      register,
    },
  });

  const formField: FormField[] = [
    {
      containerClass: "mt-5 border-b border-black border-opacity-20 pb-[29px]",
      label: {
        text: "Address 1 Details",
        htmlFor: "address-1-details",
        className: "mb-[10px] text-[#8F8F8F]",
      },
      field: {
        type: Field.div,
        className: "grid grid-cols-3 gap-x-3",
        children: [
          addressFormField(
            "Street NO.",
            "Zweibrückenstraße, 12",
            "text",
            "streetNo",
            "streetNo"
          ),
          addressFormField(
            "Post Code",
            "1234",
            "number",
            "postCode",
            "postCode"
          ),
          addressFormField(
            "Country",
            "Switzerland",
            "text",
            "country",
            "country"
          ),
          {
            containerClass: "mt-5 mb-0 col-span-3", // Take full width
            label: {
              text: "Description",
              htmlFor: "description",
              className: "mb-[10px]",
            },
            field: {
              type: Field.textArea,
              className: commonInputClasses,
              inputType: "text",
              id: "description",
              name: "description",
              placeholder:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s",
              register,
            },
          },
        ],
      },
    },
    {
      containerClass: "mt-[29px] ",
      label: {
        text: "Address 2 Details",
        htmlFor: "address-1-details",
        className: "mb-[10px] text-[#8F8F8F]",
      },
      field: {
        type: Field.div,
        className: "grid grid-cols-3 gap-x-3",
        children: [
          addressFormField(
            "Street NO.",
            "Zweibrückenstraße, 12",
            "text",
            "streetNo",
            "streetNo"
          ),
          addressFormField(
            "Post Code",
            "1234",
            "number",
            "postCode",
            "postCode"
          ),
          addressFormField(
            "Country",
            "Switzerland",
            "text",
            "country",
            "country"
          ),
          {
            containerClass: "mt-5 mb-0 col-span-3", // Take full width
            label: {
              text: "Description",
              htmlFor: "description",
              className: "mb-[10px]",
            },
            field: {
              type: Field.textArea,
              className: commonInputClasses,
              inputType: "text",
              id: "description",
              name: "description",
              placeholder:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s",
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "mb-0 mt-[25px]",
      field: {
        type: Field.button,
        text: "Save",
        inputType: "submit",
        className:
          "rounded-lg bg-[#4A13E7] p-4  w-[152px] h-[50px] text-white hover-bg-none",
        loading,
      },
    },
  ];

  return formField;
};