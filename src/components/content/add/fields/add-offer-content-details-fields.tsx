import { Field } from "@/enums/form";
import { FormField, GenerateRegistrationFormField } from "@/types";

export const AddOfferContentDetailsFormField: GenerateRegistrationFormField = (
  register,
  loading,
  control
) => {
  const formField: FormField[] = [
    {
      containerClass: "mb-0",
      label: {
        text: "Content Name",
        htmlFor: "contentName",
        className: "mb-[10px]",
      },
      field: {
        type: Field.input,
        className: "!p-4 !border-dark focus:!border-primary ",
        inputType: "text",
        id: "contentName",
        name: "contentName",
        placeholder: "Text for Offer",
        register,
      },
    },

    {
      containerClass: "mt-5",
      field: {
        type: Field.div,
        className: "grid grid-cols-3 gap-4",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Address Label 1",
              htmlFor: "addressLabel",
              className: "mb-2",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "addressLabel",
              name: "addressLabel",
              placeholder: "Address 1",
              register,
            },
          },
          {
            containerClass: "mt-[31px] mb-0",
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "addressLabel2",
              name: "addressLabel2",
              placeholder: "Address 2",
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "mb-0 mt-5",
      label: {
        text: "Offer Title",
        htmlFor: "offerTitle",
        className: "mb-[10px]",
      },
      field: {
        type: Field.input,
        className: "!p-4 !border-dark focus:!border-primary ",
        inputType: "text",
        id: "offerTitle",
        name: "offerTitle",
        placeholder: "Text for Offer",
        register,
      },
    },
    {
      containerClass: "mb-0 mt-5",
      label: {
        text: "Offer Description",
        htmlFor: "offerDescription",
        className: "mb-[10px]",
      },
      field: {
        type: Field.ckEditor,
        className: "!p-4 !border-dark focus:!border-primary ",
        inputType: "text",
        id: "offerDescription",
        name: "offerDescription",
        placeholder:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s, when an unknown printer took is galley of type and scrambled it to make a type specimen book. It has survived not only five lorm centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software",
        control,
      },
    },
    {
      containerClass: "mb-0 mt-5",
      label: {
        text: "Email Body",
        htmlFor: "emailBody",
        className: "mb-[10px]",
      },
      field: {
        type: Field.ckEditor,
        className: "!p-4 !border-dark focus:!border-primary ",
        inputType: "text",
        id: "emailBody",
        name: "emailBody",
        placeholder:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s, when an unknown printer took is galley of type and scrambled it to make a type specimen book. It has survived not only five lorm centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software",
        control,
      },
    },

    {
      containerClass: "mb-0 mt-5",
      label: {
        text: "Attachments",
        htmlFor: "attachments",
        className: "mb-[10px]",
      },
      field: {
        type: Field.dragAndDropPdfField,
        inputType: "file",
        id: "attachments",
        name: "attachments",
        control,
      },
    },

    {
      containerClass: "mb-0 mt-6",
      field: {
        type: Field.button,
        text: "Next",
        inputType: "submit",
        className:
          "rounded-lg p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};
