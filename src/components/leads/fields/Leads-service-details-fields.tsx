import { Field } from "@/enums/form";
import { FormField, GenerateRegistrationFormField } from "@/types";

export const LeadsServiceDetailsFormField: GenerateRegistrationFormField = (
  register,
  loading,
  control,
  setCurrentFormStage
) => {
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        className: "grid grid-cols-3 gap-x-3 ",
        children: [
          {
            label: {
              text: "Required Service*",
              htmlFor: "requiredService",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !h-[54px] !border-dark  focus:!border-primary ",
              placeholder: "Cleaning",
              type: Field.select,
              id: "requiredService",
              name: "requiredService",
              options: [
                { value: "Office Boy", label: "Office Boy" },
                { value: "Security Gaurd", label: "Security Gaurd" },
              ],
              control,
            },
          },
          {
            label: {
              text: "Desire Date*",
              htmlFor: "desireDate",
              className: "mb-[10px]",
            },
            field: {
              type: Field.date,
              className: "!p-4 !border-dark focus:!border-primary ",
              id: "desireDate",
              name: "desireDate",
              placeholder: "12/09/2023",
              register,
            },
          },

          {
            label: {
              text: "Contact Availability",
              htmlFor: "contactAvailablity",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !h-[54px] !border-dark  focus:!border-primary ",
              placeholder: "Please Select Customer Type",
              type: Field.select,
              id: "contactAvailablity",
              name: "contactAvailablity",
              options: [
                {
                  value: "Morning(9am to 12am)",
                  label: "Morning(9am to 12am)",
                },
                {
                  value: "Morning(1pm to 10pm)",
                  label: "Morning(1pm to 10pm)",
                },
              ],
              control,
            },
          },
        ],
      },
    },

    //   second start from here
    {
      field: {
        type: Field.div,
        className: "grid grid-cols-3 gap-x-3 ",
        children: [
          {
            label: {
              text: "Flexibility",
              htmlFor: "flexibility",
              className: "mb-[10px]",
            },
            field: {
              type: Field.date,
              className: "!p-4 !border-dark focus:!border-primary ",
              id: "flexibility",
              name: "flexibility",
              placeholder: "12/09/2023",
              register,
            },
          },

          {
            label: {
              text: "Preferred Contact",
              htmlFor: "preferContact",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !h-[54px] !border-dark  focus:!border-primary ",
              placeholder: "Please Select Customer Type",
              type: Field.select,
              id: "preferContact",
              name: "preferContact",
              options: [
                {
                  value: "Via Email",
                  label: "Via Email",
                },
                {
                  value: "Via What'sapp",
                  label: "Via What'sapp",
                },
              ],
              control,
            },
          },
          {
            label: {
              text: "Budget*",
              htmlFor: "budget",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !h-[54px] !border-dark  focus:!border-primary ",
              placeholder: "Please Select Customer Type",
              type: Field.select,
              id: "budget",
              name: "budget",
              options: [
                {
                  value: "Less then 1000CHF",
                  label: "Less then 1000CHF",
                },
                {
                  value: "Less then 500CHF",
                  label: "Less then 500CHF",
                },
              ],
              control,
            },
          },
        ],
      },
    },

    {
      field: {
        type: Field.div,

        className: "grid grid-cols-3 gap-x-3 ",
        children: [
          {
            containerClass: "col-span-1 mb-0",
            label: {
              text: "Lead Source*",
              htmlFor: "leadSource",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !h-[54px] !border-dark  focus:!border-primary ",
              placeholder: "Instagram",
              type: Field.select,
              id: "leadSource",
              name: "leadSource",
              options: [
                { value: "Whats'app", label: "What'sapp" },
                { value: "Facebook", label: "Facebook" },
              ],
              control,
            },
          },

          {
            containerClass: "col-span-2 mb-0",
            label: {
              text: "Other Services",
              htmlFor: "otherServices",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !h-[54px] !border-dark  ",
              placeholder: "Cleaning, Moving, Painting",
              type: Field.select,
              id: "otherServices",
              name: "otherServices",
              options: [
                {
                  value: "Cleaning, Moving, Painting",
                  label: "Cleaning, Moving, Painting",
                },
                {
                  value: "Cleaning, Moving, Painting",
                  label: "Cleaning, Moving, Painting",
                },
              ],

              control,
            },
          },
        ],
      },
    },

    {
      field: {
        type: Field.div,
        className: "flex space-x-[18px] mt-[30px]",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              text: "Cancel",
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
