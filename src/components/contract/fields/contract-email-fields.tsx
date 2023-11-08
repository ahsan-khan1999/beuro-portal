import { Field } from "@/enums/form";
import { useRouter } from "next/router";
import { FormField, GenerateContractFormField } from "@/types";

export const ContractEmailPreviewFormField: GenerateContractFormField = (
  register,
  loading,
  control,
  onBack,
) => {
  const router = useRouter();
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        className: "grid grid-cols-3 gap-x-3",
        children: [
          {
            containerClass: "mb-0 col-span-1",
            label: {
              text: "Email",
              htmlFor: "email",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#EBEBEB] focus:!border-primary ",
              inputType: "email",
              id: "email",
              name: "email",
              placeholder: "hamzaicp54@gmail.com",
              register,
            },
          },
          {
            containerClass: "col-span-2",
            label: {
              text: "Content",
              htmlFor: "content",
              className: "mb-[10px]",
            },
            field: {
              className:
                "!p-4 !h-[54px] !border-[#EBEBEB]  focus:!border-primary ",
              type: Field.select,
              id: "content",
              name: "content",
              value:
                "Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smithem",
              options: [
                {
                  value:
                    "Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smithem",
                  label:
                    "Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smithem",
                },
              ],
              control,
            },
          },
        ],
      },
    },

    {
      containerClass: "mb-0 mt-5",
      label: {
        text: "Subject",
        htmlFor: "subject",
        className: "mb-[10px]",
      },
      field: {
        type: Field.input,
        className: "!p-4 !border-[#EBEBEB] focus:!border-primary",
        inputType: "text",
        id: "subject",
        name: "subject",
        placeholder:
          "Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smith emit g Dollar smith emit Lorem Ipum dor.",
        register,
      },
    },

    {
      containerClass: "mb-0 mt-5",
      label: {
        text: "Description",
        htmlFor: "description",
        className: "mb-[10px]",
      },
      field: {
        type: Field.ckEditor,
        className: "!p-4 !border-dark focus:!border-primary",
        id: "description",
        name: "description",
        control,
      },
    },

    {
      containerClass: "mb-0 mt-5",
      label: {
        text: "Attachments",
        htmlFor: "fileUpload",
        className: "mb-[10px]",
      },
      field: {
        type: Field.dragAndDropPdfField,
        id: "fileUpload",
        isOpenedFile:false,
        text: "Drop or Attach your files here",
        fileSupported: "Files supported: PDF,JPG, PNG,GIF",
        name: "fileUpload",
        control,
      },
    },

    {
      containerClass: "mt-6",
      field: {
        type: Field.div,
        className: "flex items-center space-x-[18px] ",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              text: "Back",
              inputType: "button",
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none",
              loading,
              onClick: onBack,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              text: "Next",
              inputType: "submit",
              className:
                "rounded-lg p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
              loading,
              // onClick: () => router.push("/contract/pdf-preview"),
            },
          },
        ],
      },
    },
  ];

  return formField;
};
