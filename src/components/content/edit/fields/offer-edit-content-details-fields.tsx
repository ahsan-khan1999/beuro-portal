import { Field } from "@/enums/form";
import { FormField, GenerateContentFormField } from "@/types";
import icon from "@/assets/svgs/Vector.svg";
import {
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { useTranslation } from "next-i18next";

export const OfferEditContentDetailsFormField: GenerateContentFormField = (
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
      containerClass: "mb-0",
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
        placeholder: translate("common.content_name"),
        register,
      },
    },

    // {
    //   containerClass: "mt-5",
    //   //@ts-expect-error
    //   field: {
    //     type: Field.div,
    //     id: "div-field",
    //     className: "grid grid-cols-2 xl:grid-cols-3 gap-4",
    //     children:
    //       count &&
    //       generateAddressChildren(register, count, translate, append, remove),
    //   },
    // },

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
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
              id: "offerContent.title",
              name: "offerContent.title",
              placeholder: translate("common.content_text"),
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
              // value:
              //   (contentDetails?.id &&
              //     contentDetails?.offerContent?.description) ||
              //   "",
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
              // value:
              //   (contentDetails?.id && contentDetails?.offerContent?.body) ||
              //   "",
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
              text: `${translate("common.drop_or_attach")}`,
              fileSupported: `${translate("common.file_support")}`,
              control,
              attachements: attachements,
              setAttachements: setAttachements,
              isAttachement: true,
            },
          },
        ],
      },
    },

    {
      containerClass: "mt-6",
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex items-center justify-end space-x-[18px] ",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("content.details.cancel_button")}`,
              inputType: "button",
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 min-w-[92px] w-fit h-[50px]   text-dark hover:bg-none",
              onClick: OnClick,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("content.details.save_changes_button")}`,
              inputType: "submit",
              className:
                "rounded-lg px-4 min-w-[152px] w-fit h-[50px]  text-white hover:bg-none ",
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};

const generateAddressChildren = (
  register: UseFormRegister<FieldValues>,
  count: number,
  translate: Function,
  append?: UseFieldArrayAppend<FieldValues, "offerContent.address">,
  remove?: UseFieldArrayRemove
) => {
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
        remove: i > 0 && `${translate("common.remove")}`,
        onRemove: () => i > 0 && remove && remove(i),
      },
    });
  }
  // addressformFields.push({
  //   containerClass: "mb-0 mt-8",
  //   field: {
  //     type: Field.button,
  //     id: "button",
  //     text: `${translate("common.add_new_address")}`,
  //     inputType: "button",
  //     className:
  //       "rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover-bg-none",
  //     onClick: () => append && append({ address: "" }),
  //   },
  // });
  return addressformFields;
};
