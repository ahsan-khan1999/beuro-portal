import { Field } from "@/enums/form";
import { FormField, GenerateLeadsFormField } from "@/types";
import { ComponentsType } from "../details/LeadsDetailsData";

export const AddLeadServiceDetailsFormField: GenerateLeadsFormField = (
  register,
  loading,
  control,
  onHandleBack,
  trigger,
  service
) => {
  const formField: FormField[] = [
    {
      containerClass: "mt-6",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-3 gap-x-3 ",
        children: [
          {
            label: {
              text: "Required Service*",
              htmlFor: "requiredService",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 h-[56px] !border-dark  focus:!border-primary ",
              type: Field.select,
              id: "requiredService",
              name: "requiredService",
              value: "Cleaning",
              options: service && service?.map((item) => (
                {
                  label: item.serviceName,
                  value: item.id
                }
              )) || [],
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
              register,
              dateType: "date"

            },
          },

          {
            label: {
              text: "Contact Availability",
              htmlFor: "contactAvailability",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !border-dark  focus:!border-primary ",
              type: Field.select,
              id: "contactAvailability",
              value: "Morning(9am to 12am)",
              name: "contactAvailability",
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
        id: "div-field",
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
              register,
              dateType: "date"

            },
          },

          {
            label: {
              text: "Preferred Contact",
              htmlFor: "preferredContact",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 h-[56px] !border-dark  focus:!border-primary ",
              type: Field.select,
              id: "preferredContact",
              name: "preferredContact",
              value: "Via Email",
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
              className: "!p-4 !border-dark  focus:!border-primary ",
              type: Field.select,
              id: "budget",
              name: "budget",
              value: "Less then 1000CHF",
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
        id: "div-field",
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
              className: "!p-4 h-[56px] !border-dark  focus:!border-primary ",
              type: Field.select,
              id: "leadSource",
              name: "leadSource",
              value: "Instagram",
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
              type: Field.multiSelect,
              // @ts-expect-error
              className: "!p-4 h-[56px] !border-dark  focus:!border-primary ",
              id: "otherServices",
              name: "otherServices",
              options: service?.map((item) => (
                {
                  label: item.serviceName,
                  value: item.id
                }
              )) || [],


              control,
              trigger
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
        className: "flex items-center space-x-[18px] ",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: "Back",
              inputType: "button",
              onClick: () => onHandleBack && onHandleBack(ComponentsType.addressEdit),
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none",
            },
          },
          {
            containerClass: "mb-0",
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
        ],
      },
    },
  ];

  return formField;
};
