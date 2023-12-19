import { Field } from "@/enums/form";
import { FormField, GenerateEmployeeFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const employeeDetailsFormField: GenerateEmployeeFormField = (
  register,
  loading,
  isUpdate,
  handleUpdateCancel,
  employeeDetails,
  control
) => {
  const { t: translate } = useTranslation();
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
              text: `${translate("employees.details.full_name")}`,
              htmlFor: "fullName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: `!p-4 !border-[#BFBFBF] focus:!border-primary ${!isUpdate && "!border-light"
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
              text: `${translate("employees.details.designation")}`,
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
              text: `${translate("employees.details.email_address")}`,
              htmlFor: "email",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: `!p-4 !border-[#BFBFBF] focus:!border-primary ${!isUpdate && "!border-light"
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
              text: `${translate("employees.details.phone_number")}`,
              htmlFor: "phoneNumber",
              className: "mb-[10px]",
            },
            field: {
              type: Field.phone,
              className: `!border-[#BFBFBF] focus:!border-primary ${!isUpdate && "!border-light"
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
              text: `${translate("employees.details.mobile_number")}`,
              htmlFor: "mobileNumber",
              className: "mb-[10px]",
            },
            field: {
              type: Field.phone,
              className: `!border-[#BFBFBF] focus:!border-primary ${!isUpdate && "!border-light"
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
              text: `${translate("employees.details.cancel_button")}`,
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
              text: `${translate("employees.details.save_changes_button")}`,
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
