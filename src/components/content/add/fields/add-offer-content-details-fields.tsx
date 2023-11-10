import { Field } from "@/enums/form";
import { FormField, GenerateContentFormField } from "@/types";

export const AddOfferContentDetailsFormField: GenerateContentFormField = (
  register,
  loading,
  control
) => {
  const formField: FormField[] = [
    {
      containerClass: "mb-0 mt-5",
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
id:"div-field",
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
        id: "offerDescription",
        name: "offerDescription",
       
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
        id: "emailBody",
        name: "emailBody",
        
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
        id: "attachments",
        name: "attachments",
        isOpenedFile: false,
        text: "Drop or attach your file here",
        fileSupported: "Files supported: PDF, JPG, PNG, GIF",
        control,
      },
    },

    {
      containerClass: "mb-0 mt-6",
      field: {
        type: Field.button,
id:"button",
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
