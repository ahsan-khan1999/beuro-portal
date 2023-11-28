import { Field } from "@/enums/form";
import { FormField, GenerateContentFormField } from "@/types";
import icon from "@/assets/svgs/Vector.svg"
import { FieldValues, UseFormRegister } from "react-hook-form";

export const OfferEditContentDetailsFormField: GenerateContentFormField = (
  register,
  loading,
  control,
  onClick,
  trigger, addressCount, attachements, setAttachements, contentDetails,onRemove
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
      //@ts-expect-error
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-3 gap-4",
        children: (addressCount) && generateAddressChildren(register, addressCount, onClick,onRemove),
      },
    },

    {
      containerClass: "mt-5",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-1 gap-4",
        children: [
          {
            containerClass: "mb-0 mt-5",
            label: {
              text: "Offer Title",
              htmlFor: "offerContent.title",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "offerContent.title",
              name: "offerContent.title",
              placeholder: "Text for Offer",
              register,
            },
          },
          {
            containerClass: "mb-0 mt-5",
            label: {
              text: "Offer Description",
              htmlFor: "offerContent.description",
              className: "mb-[10px]",
            },
            field: {
              type: Field.ckEditor,
              className: "!p-4 !border-dark focus:!border-primary ",
              id: "offerContent.description",
              name: "offerContent.description",

              control,
              value: contentDetails?.id && contentDetails?.offerContent?.description
            },
          },
          {
            containerClass: "mb-0 mt-5",
            label: {
              text: "Email Body",
              htmlFor: "offerContent.body",
              className: "mb-[10px]",
            },
            field: {
              type: Field.ckEditor,
              className: "!p-4 !border-dark focus:!border-primary ",
              id: "offerContent.body",
              name: "offerContent.body",

              control,

              value: contentDetails?.id && contentDetails?.offerContent?.body

            },
          },

          {
            containerClass: "mb-0 mt-5",
            label: {
              text: "Attachments",
              htmlFor: "offerContent.attachments",
              className: "mb-[10px]",
            },
            field: {
              type: Field.dragAndDropPdfField,
              id: "offerContent.attachments",
              name: "offerContent.attachments",
              isOpenedFile: false,
              text: "Drop or attach your file here",
              fileSupported: "Files supported: PDF, JPG, PNG, GIF",
              control,
              attachements: attachements,
              setAttachements: setAttachements
            },
          },
        ]
      },
    },

    {
      containerClass: "mb-0 mt-6",
      field: {
        type: Field.button,
        id: "button",
        text: "Next",
        inputType: "submit",
        className:
          "rounded-lg px-4 w-[152px] h-[50px]  text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};

const generateAddressChildren = (register: UseFormRegister<FieldValues>, count: number, OnClick?: () => void, onRemove?: () => void) => {
  return Array.from({ length: count }, (_, key) => {
    const isLastIndex = key === count - 1;

    const dateField = {
      containerClass: "mb-0 ",
      label: {
        text: "Address Label",
        htmlFor: `offerContent.address_${key + 1}`,
        className: "mb-[10px]",
      },
      field: {
        register,
        type: Field.input,
        className: "!p-4 !border-dark focus:!border-primary w-full",
        id: `offerContent.address_${key}`,
        name: `offerContent.address_${key}`,
        remove: key > 0 && "Remove",
        onRemove: key > 0 && onRemove,



      },
    };

    if (isLastIndex) {
      return [
        dateField,
        {
          containerClass: "mb-0 mt-[30px]",
          field: {
            type: Field.button,
            id: "button",
            text: "",
            inputType: "button",
            className:
              "rounded-lg border-[1px] border-[#4B4B4B] bg-[#fff] m-1 p-4  w-[40px] h-[40px] text-white hover-bg-none",
            onClick: OnClick,
            icon: icon,
          },

        },
      ];
    }

    return dateField;
  }).flat();

};