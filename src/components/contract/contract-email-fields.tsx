import { Field } from "@/enums/form";
import { FormField, GenerateRegistrationFormField } from "@/types";

export const ContractEmailPreviewFormField: GenerateRegistrationFormField = (
  register,
  loading,
  control
) => {
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
              className: "!p-4 !border-[#EBEBEB] focus:!border-primary ", // Add col-span-1 here
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
              placeholder:
                "Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smithem",
              type: Field.select,
              id: "content",
              name: "content",
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
      containerClass: "mt-5",
      field: {
        type: Field.div,
        className: "w-full",
        children: [
          {
            containerClass: "mb-0",
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
        ],
      },
    },

    {
      containerClass: "mt-5",
      field: {
        type: Field.div,
        className: "w-full",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Description",
              htmlFor: "description",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#EBEBEB] focus:!border-primary",
              inputType: "text",
              id: "description",
              name: "description",
              placeholder:
                "Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smLorem Ipsum Dollar smith emit Lorem iss Ipsum Dollar smith emit Lorem Ipsum Dollar smLorem Ipsum Dollar smith emit Lorem Ipsum Dollar smith emit Lorem Ipsum lsls Dollar sm Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smLorem Ipsum Dollar smith emit Lorem iss Ipsum Dollar smith emit Lorem Ipsum Dollar smLorem Ipsum Dollar smith emit Lorem Ipsum Dollar smith emit Lorem Ipsum lsls Dollar sm.",
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "mt-5",
      field: {
        type: Field.div,
        className: "w-full",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Attachments",
              htmlFor: "fileUpload",
              className: "mb-[10px]",
            },
            field: {
              type: Field.dragAndDropFileField,
              className: "!p-4 !border-[#EBEBEB] focus:!border-primary",
              inputType: "text",
              id: "fileUpload",
              name: "fileUpload",
              placeholder:
                "Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smLorem Ipsum Dollar smith emit Lorem iss Ipsum Dollar smith emit Lorem Ipsum Dollar smLorem Ipsum Dollar smith emit Lorem Ipsum Dollar smith emit Lorem Ipsum lsls Dollar sm Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smLorem Ipsum Dollar smith emit Lorem iss Ipsum Dollar smith emit Lorem Ipsum Dollar smLorem Ipsum Dollar smith emit Lorem Ipsum Dollar smith emit Lorem Ipsum lsls Dollar sm.",
              control,
            },
          },
          
        ],
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
              // onClick: () => setCurrentFormStage("locationDetails"),
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none",
              loading,
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
            },
          },
        ],
      },
    },
  ];

  return formField;
};