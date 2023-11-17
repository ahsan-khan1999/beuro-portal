import { Field } from "@/enums/form";
import { FormField, GenerateEmployeeFormField } from "@/types";

export const employeeDetailsFormField: GenerateEmployeeFormField = (
  register,
  loading,
  isUpdate,
  handleUpdateCancel,
  employeeDetails,
  control
) => {
  const formField: FormField[] = [
    {
      containerClass: "mt-6",
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex justify-between items-center gap-3",
        children: [
          {
            containerClass: "w-[67%] mb-0",
            label: {
              text: "Employ Name",
              htmlFor: "fullName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: `!p-4 !border-dark focus:!border-primary ${!isUpdate && "!border-light"
                }`,
              inputType: "text",
              id: "fullName",
              name: "fullName",
              placeholder: "Rahal",
              register,
              disabled: isUpdate,
            },
          },
          {
            containerClass: "w-[33%] mb-0",
            label: {
              text: "Designation",
              htmlFor: "designation",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: `!p-4 !!border-borderColor border border-dark focus:!border-primary ${!isUpdate && "!border-light"
                }`,
              inputType: "text",
              id: "designation",
              name: "designation",
              placeholder: "Manager",
              register,
              disabled: isUpdate,
            },
          },
        ],
      },
    },

    {
      containerClass: "mt-5",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-3 gap-4",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Email Address",
              htmlFor: "email",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: `!p-4 !border-dark focus:!border-primary ${!isUpdate && "!border-light"
                }`,
              inputType: "text",
              id: "email",
              name: "email",
              placeholder: "rahal.ahmad@gmail.com",
              register,
              disabled: isUpdate,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Phone Number",
              htmlFor: "phoneNumber",
              className: "mb-[10px]",
            },
            field: {
              type: Field.phone,
              className: `!h-[54px]  !border-dark focus:!border-primary ${!isUpdate && "!border-light"
                }`,
              id: "phoneNumber",
              name: "phoneNumber",
              disabled: isUpdate,
              control,
              country: "ch",
              value: employeeDetails && employeeDetails?.phoneNumber
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Mobile Number",
              htmlFor: "mobileNumber",
              className: "mb-[10px]",
            },
            field: {
              type: Field.phone,
              className: `!h-[54px] !border-dark focus:!border-primary ${!isUpdate && "!border-light"
                }`,
              id: "mobileNumber",
              name: "mobileNumber",
              disabled: isUpdate,
              control,
              country: "ch",
              value: employeeDetails && employeeDetails?.mobileNumber


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
              text: "Cancel",
              inputType: "button",
              className: `rounded-lg border border-[#C7C7C7] bg-white px-4 py-[10px] w-fit h-auto text-dark hover:bg-none ${isUpdate && "hidden"
                }`,
              onClick: handleUpdateCancel,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: "Save Changes",
              inputType: "submit",
              className: `rounded-lg px-4  w-fit h-auto  text-white hover:bg-none ${isUpdate && "hidden"
                }`,
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
