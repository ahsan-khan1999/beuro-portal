import { Field } from "@/enums/form";
import { FormField, GenerateLeadAddressFormField, GenerateLeadsFormField } from "@/types";
import { ComponentsType } from "../add/AddNewLeadsData";

export const AddLeadAddressDetailsFormField: GenerateLeadAddressFormField = (
  register,
  loading,
  control,
  onClick,
  count
) => {
  const formField: FormField[] = [];

  for (let i = 0; i <= count; i++) {
    formField.push(
      {
        containerClass: "mt-6",
        label: {
          text: `Address ${i} Details`,
          htmlFor: `address-${i}-details`,
          className: "mb-[10px] text-[#8F8F8F]",
        },
        field: {
          type: Field.div,
          id: `div-field-${i}`,
          className: "grid grid-cols-3 gap-x-3",
          children: [
            {
              containerClass: "mb-0 ",
              label: {
                text: "Street NO.",
                htmlFor: `streetNo-${i}`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-dark  focus:!border-primary ",
                inputType: "text",
                id: `streetNo-${i}`,
                name: `streetNo-${i}`,
                placeholder: `Zweibrückenstraße, ${i}`,
                register,
              },
            },
            {
              containerClass: "mb-0 ",
              label: {
                text: "Post Code",
                htmlFor: `postCode-${i}`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-dark  focus:!border-primary ",
                inputType: "text",
                id: `postCode-${i}`,
                name: `postCode-${i}`,
                placeholder: `123${i}`,
                register,
              },
            },
            {
              containerClass: "mb-0 ",
              label: {
                text: "Country",
                htmlFor: `country-${i}`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-dark  focus:!border-primary ",
                inputType: "text",
                id: `country-${i}`,
                name: `country-${i}`,
                placeholder: `Country ${i}`,
                register,
              },
            },
          ],
        },
      },
      {
        containerClass: "mt-5 mb-0 ",
        label: {
          text: "Description",
          htmlFor: "description",
          className: "mb-[10px]",
        },
        field: {
          type: Field.textArea,
          className: "!p-4 !border-dark  focus:!border-primary ",
          rows: 4,
          id: "description",
          name: "description",
          placeholder:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s",
          register,
        },
      },
    );
  }

  formField.push(
    {
      containerClass: "mt-6",
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex space-x-[18px] ",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: "Back",
              inputType: "button",
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px] text-dark hover-bg-none",
              loading,
              onClick: onClick,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: "Next",
              inputType: "submit",
              className:
                "rounded-lg p-4 w-[152px] h-[50px] text-white hover-bg-none",
              loading,
            },
          },
        ],
      },
    }
  );

  return formField;
};
