import { Field } from "@/enums/form";
import { FormField, ImageUploadFormFieldType } from "@/types";
import { useTranslation } from "next-i18next";

export const ImageUploadFormField: ImageUploadFormFieldType = (
  loading,
  control,
  onClick
) => {
  const { t: translate } = useTranslation();

  const formField: FormField[] = [
    {
      containerClass: "",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-5 gap-2",
        children: [
          {
            field: {
              type: Field.imageUploadField,
              id: "upload_image1",
              text: translate("common.image_upload_heading"),
              name: "upload_image1",
              control,
              onClick: onClick,
            },
          },
          {
            field: {
              type: Field.imageUploadField,
              id: "upload_image2",
              text: translate("common.image_upload_heading"),
              name: "upload_image2",
              control,
              onClick: onClick,
            },
          },
          {
            field: {
              type: Field.imageUploadField,
              id: "upload_image3",
              text: translate("common.image_upload_heading"),
              name: "upload_image3",
              control,
              onClick: onClick,
            },
          },
          {
            field: {
              type: Field.imageUploadField,
              id: "upload_image4",
              text: translate("common.image_upload_heading"),
              name: "upload_image4",
              control,
              onClick: onClick,
            },
          },
          {
            field: {
              type: Field.imageUploadField,
              id: "upload_image5",
              text: translate("common.image_upload_heading"),
              name: "upload_image5",
              control,
              onClick: onClick,
            },
          },
          {
            field: {
              type: Field.imageUploadField,
              id: "upload_image6",
              text: translate("common.image_upload_heading"),
              name: "upload_image6",
              control,
              onClick: onClick,
            },
          },
          {
            field: {
              type: Field.imageUploadField,
              id: "upload_image7",
              text: translate("common.image_upload_heading"),
              name: "upload_image7",
              control,
              onClick: onClick,
            },
          },
          {
            field: {
              type: Field.imageUploadField,
              id: "upload_image8",
              text: translate("common.image_upload_heading"),
              name: "upload_image8",
              control,
              onClick: onClick,
            },
          },
          {
            field: {
              type: Field.imageUploadField,
              id: "upload_image9",
              text: translate("common.image_upload_heading"),
              name: "upload_image9",
              control,
              onClick: onClick,
            },
          },
          {
            field: {
              type: Field.imageUploadField,
              id: "upload_image10",
              text: translate("common.image_upload_heading"),
              name: "upload_image10",
              control,
              onClick: onClick,
            },
          },

          {
            field: {
              type: Field.imageUploadField,
              id: "upload_image11",
              text: translate("common.image_upload_heading"),
              name: "upload_image11",
              control,
              onClick: onClick,
            },
          },
          {
            field: {
              type: Field.imageUploadField,
              id: "upload_image12",
              text: translate("common.image_upload_heading"),
              name: "upload_image12",
              control,
              onClick: onClick,
            },
          },
          {
            field: {
              type: Field.imageUploadField,
              id: "upload_image13",
              text: translate("common.image_upload_heading"),
              name: "upload_image13",
              control,
              onClick: onClick,
            },
          },
          {
            field: {
              type: Field.imageUploadField,
              id: "upload_image14",
              text: translate("common.image_upload_heading"),
              name: "upload_image14",
              control,
              onClick: onClick,
            },
          },
          {
            field: {
              type: Field.imageUploadField,
              id: "upload_image15",
              text: translate("common.image_upload_heading"),
              name: "upload_image15",
              control,
              onClick: onClick,
            },
          },
        ],
      },
    },
    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex items-center space-x-4 mt-[30px]",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("common.cancel_button")}`,
              inputType: "button",
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 min-w-[202px] w-fit h-[50px] text-dark hover:bg-none",
              onClick: onClick,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("pdf.submit")}`,
              inputType: "submit",
              className:
                "rounded-lg px-4 min-w-[202px] w-fit h-[50px] text-white hover:bg-none",
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
