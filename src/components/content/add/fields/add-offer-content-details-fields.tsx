import { Field } from "@/enums/form";
import { FormField, GenerateContentFormField } from "@/types";
import icon from "@/assets/svgs/Vector.svg"
import { FieldValues, UseFieldArrayAppend, UseFieldArrayRemove, UseFormRegister } from "react-hook-form";
import { useTranslation } from "next-i18next";

export const AddOfferContentDetailsFormField: GenerateContentFormField = (
  register,
  loading,
  control,
  OnClick,
  trigger,
  count,
  attachements,
  setAttachements,
  contentDetails,
  append,
  remove
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "mb-0 mt-5",
      label: {
        text: `${translate("content.details.content_name")}`,
        htmlFor: "contentName",
        className: "mb-[10px]",
      },
      field: {
        type: Field.input,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
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
        className: "grid grid-cols-2 xl:grid-cols-3 gap-4",
        children: (count) && generateAddressChildren(register, count, translate, append, remove),
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
              text: translate("content.details.offer_title"),

              htmlFor: "offerContent.title",
              className: "mb-2",

            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
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
              text: translate("content.details.offer_description"),
              htmlFor: "offerContent.description",
              className: "mb-[10px]",
            },
            field: {
              type: Field.ckEditor,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              id: "offerContent.description",
              name: "offerContent.description",

              control,
              value: contentDetails?.id && contentDetails?.offerContent?.description
            },
          },
          {
            containerClass: "mb-0 mt-5",
            label: {
              text: translate("content.details.email_body"),
              htmlFor: "offerContent.body",
              className: "mb-[10px]",
            },
            field: {
              type: Field.ckEditor,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              id: "offerContent.body",
              name: "offerContent.body",

              control,

              value: contentDetails?.id && contentDetails?.offerContent?.body

            },
          },

          {
            containerClass: "mb-0 mt-5",
            label: {
              text: translate("content.details.attachments"),
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
              setAttachements: setAttachements,
              isAttachement:true
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
        text: `${translate("content.details.next_button")}`,
        inputType: "submit",
        className:
          "rounded-lg px-4 w-[152px] h-[50px]  text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};



const generateAddressChildren = (register: UseFormRegister<FieldValues>, count: number, translate: Function, append?: UseFieldArrayAppend<FieldValues, "offerContent.address">, remove?: UseFieldArrayRemove) => {
  const addressformFields = [];
  for (let i = 0; i < count; i++) {
    addressformFields.push({
      containerClass: "mb-0 ",
      label: {
        text: translate("content.details.address_labels"),
        htmlFor: `offerContent.address.${i}.value`,
        className: "mb-[10px]",
      },
      field: {
        register,
        type: Field.input,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary w-full",
        id: `offerContent.address.${i}.value`,
        name: `offerContent.address.${i}.value`,
        remove: i > 0 && "Remove",
        onRemove: () => (i > 0 && remove) && remove(i),


      },
    })

  }
  addressformFields.push({
    containerClass: "mb-0 mt-3 maxSize:mt-[33px]",
    field: {
      type: Field.button,
      id: "button",
      text: "",
      inputType: "button",
      className:
        "rounded-lg border-[1px] border-[#4B4B4B] bg-[#fff] m-1 p-4 w-[40px] h-[40px] text-white",
      onClick: () => append && append({ address: "" }),
      icon: icon,
    },
  });
  return addressformFields
};




