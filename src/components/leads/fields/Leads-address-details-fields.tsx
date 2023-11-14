import { Field } from "@/enums/form";
import { FormField, GenerateLeadsFormField } from "@/types";

export const LeadsAddressDetailsFormField: GenerateLeadsFormField = (
  register,
  loading,
  control,
  onClick
) => {
  const formField: FormField[] = [
    {
      containerClass: "mt-6",
      label: {
        text: "Address 1 Details",
        htmlFor: "address-1-details",
        className: "mb-[10px] text-[#8F8F8F]",
      },
      field: {
        type: Field.div,
id:"div-field",
        className: "grid grid-cols-3 gap-x-3",
        children: [
          {
            containerClass: "mb-0 ",
            label: {
              text: "Street NO.",
              htmlFor: "streetNo",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4  !border-dark  focus:!border-primary ",
              inputType: "text",
              id: "streetNo",
              name: "streetNo",
              placeholder: "Zweibrückenstraße, 12 ",
              register,
            },
          },
          {
            containerClass: "mb-0 ",
            label: {
              text: "Post Code",
              htmlFor: "postCode",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4  !border-dark  focus:!border-primary ",
              inputType: "text",
              id: "postCode",
              name: "postCode",
              placeholder: "1234",
              register,
            },
          },
          {
            containerClass: "mb-0 ",
            label: {
              text: "Country",
              htmlFor: "country",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4  !border-dark  focus:!border-primary ",
              inputType: "text",
              id: "country",
              name: "country",
              placeholder: "Switzerland",
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
        className: "!p-4  !border-dark  focus:!border-primary ",
        rows:4,
        id: "description",
        name: "description",
        placeholder:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s",
        register,
      },
    },

    {
      containerClass: "mt-[30px] border-t border-black border-opacity-20 pt-5",
      label: {
        text: "Address 2 Details",
        htmlFor: "address-1-details",
        className: "mb-[10px] text-[#8F8F8F]",
      },
      field: {
        type: Field.div,
id:"div-field",
        className: "grid grid-cols-3 gap-x-3",
        children: [
          {
            containerClass: "mb-0 ",
            label: {
              text: "Street NO.",
              htmlFor: "streetNo",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4  !border-dark  focus:!border-primary ",
              inputType: "text",
              id: "streetNo",
              name: "streetNo",
              placeholder: "Zweibrückenstraße, 12 ",
              register,
            },
          },
          {
            containerClass: "mb-0 ",
            label: {
              text: "Post Code",
              htmlFor: "postCode",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4  !border-dark  focus:!border-primary ",
              inputType: "text",
              id: "postCode",
              name: "postCode",
              placeholder: "1234",
              register,
            },
          },
          {
            containerClass: "mb-0 ",
            label: {
              text: "Country",
              htmlFor: "country",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4  !border-dark  focus:!border-primary ",
              inputType: "text",
              id: "country",
              name: "country",
              placeholder: "Switzerland",
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
        className: "!p-4  !border-dark  focus:!border-primary ",
        rows:4,
        id: "description",
        name: "description",
        placeholder:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s",
        register,
      },
    },

    {
      field: {
        type: Field.div,
id:"div-field",
        className: "flex space-x-[18px] mt-[30px]",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
id:"button",
              text: "Cancel",
              inputType: "button",
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none",
              loading,
              onClick:onClick
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
id:"button",
              text: "Save Changes",
              inputType: "submit",
              className:
                "rounded-lg   p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
