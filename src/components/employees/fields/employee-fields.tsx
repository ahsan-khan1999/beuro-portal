import { Field } from "@/enums/form";
import { FormField, GenerateEmployeeFormField } from "@/types";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";

export const employeeDetailsFormField: GenerateEmployeeFormField = (
  register,
  loading,
  isUpdate,
  handleUpdateCancel,
  employeeDetails,
  isCreate,
  control
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex flex-col lg:flex-row  items-center gap-5",
        children: [
          {
            containerClass: "flex justify-center items-center",
            field: {
              type: Field.profileUploadField,
              iconClasses: "right-1 bottom-1 !cursor-pointer",
              className:
                "!h-[148px] !w-[148px] !rounded-full border border-[#BFBFBF]",
              id: "picture",
              name: "picture",
              control,
              disabled: isUpdate,
            },
          },

          {
            containerClass: "w-full",
            field: {
              type: Field.div,
              id: "div-field",
              className:
                "grid grid-cols-1 lg:grid-cols-2 items-center gap-y-5 gap-x-3 rounded-lg px-2 py-3 bg-[#EDF4FF] w-full",
              children: [
                {
                  containerClass: "mb-0",
                  label: {
                    text: `${translate("employees.details.full_name")}`,
                    htmlFor: "fullName",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: `!p-4 !border-[#BFBFBF] focus:!border-primary ${
                      !isUpdate && "!border-light"
                    }`,
                    inputType: "text",
                    id: "fullName",
                    name: "fullName",
                    placeholder: "Jhon William",
                    register,
                    disabled: isUpdate,
                  },
                },
                {
                  containerClass: "mb-0",
                  label: {
                    text: `${translate("employees.details.designation")}`,
                    htmlFor: "designation",
                    className: "mb-[10px]",
                  },

                  field: {
                    className: `pl-4 !border-[#BFBFBF] focus:!border-primary ${
                      isUpdate ? "cursor-default" : "cursor-pointer"
                    }`,
                    type: Field.select,
                    id: "designation",
                    name: "designation",
                    options:
                      Object.keys(staticEnums.Designation)
                        ?.slice(1)
                        ?.map((item) => ({
                          value: staticEnums.Designation[item],
                          label: translate(`employee_type.${item}`),
                        })) || [],
                    control,
                    disabled: isUpdate,
                  },
                },
                {
                  containerClass: "mb-0",
                  label: {
                    text: `${translate("employees.details.email_address")}`,
                    htmlFor: "email",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: `!p-4 !border-[#BFBFBF] focus:!border-primary ${
                      !isUpdate && "!border-light"
                    }`,
                    inputType: "text",
                    id: "email",
                    name: "email",
                    placeholder: "jhonwilli65@gmail.com",
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
                    type: Field.input,
                    className: `!px-4 !border-[#BFBFBF] focus:!border-primary ${
                      !isUpdate && "!border-light"
                    }`,
                    id: "phoneNumber",
                    name: "phoneNumber",
                    disabled: isUpdate,
                    placeholder: "+49 234 23423",
                    inputType: "tel",
                    register,
                    value: employeeDetails && employeeDetails?.phoneNumber,
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
                    type: Field.input,
                    className: `!px-4 !border-[#BFBFBF] focus:!border-primary ${
                      !isUpdate && "!border-light"
                    }`,
                    id: "mobileNumber",
                    name: "mobileNumber",
                    inputType: "tel",
                    placeholder: "+49 234 23423",
                    disabled: isUpdate,
                    register,
                    value: employeeDetails && employeeDetails?.mobileNumber,
                  },
                },
              ],
            },
          },
        ],
      },
    },

    // {
    //   containerClass: "mt-5",
    //   field: {
    //     type: Field.div,
    //     id: "div-field",
    //     className: "grid grid-cols-2 mlg:grid-cols-3 gap-4",
    //     children: [
    //       {
    //         containerClass: "mb-0",
    //         label: {
    //           text: `${translate("employees.details.email_address")}`,
    //           htmlFor: "email",
    //           className: "mb-[10px]",
    //         },
    //         field: {
    //           type: Field.input,
    //           className: `!p-4 !border-[#BFBFBF] focus:!border-primary ${
    //             !isUpdate && "!border-light"
    //           }`,
    //           inputType: "text",
    //           id: "email",
    //           name: "email",
    //           placeholder: "rahal.ahmad@gmail.com",
    //           register,
    //           disabled: isUpdate,
    //         },
    //       },
    //       {
    //         containerClass: "mb-0",
    //         label: {
    //           text: `${translate("employees.details.phone_number")}`,
    //           htmlFor: "phoneNumber",
    //           className: "mb-[10px]",
    //         },
    //         field: {
    //           type: Field.input,
    //           className: `!px-4 !border-[#BFBFBF] focus:!border-primary ${
    //             !isUpdate && "!border-light"
    //           }`,
    //           id: "phoneNumber",
    //           name: "phoneNumber",
    //           disabled: isUpdate,
    //           inputType: "tel",
    //           register,
    //           value: employeeDetails && employeeDetails?.phoneNumber,
    //         },
    //       },
    //       {
    //         containerClass: "mb-0",
    //         label: {
    //           text: `${translate("employees.details.mobile_number")}`,
    //           htmlFor: "mobileNumber",
    //           className: "mb-[10px]",
    //         },
    //         field: {
    //           type: Field.input,
    //           className: `!px-4 !border-[#BFBFBF] focus:!border-primary ${
    //             !isUpdate && "!border-light"
    //           }`,
    //           id: "mobileNumber",
    //           name: "mobileNumber",
    //           inputType: "tel",

    //           disabled: isUpdate,
    //           register,
    //           value: employeeDetails && employeeDetails?.mobileNumber,
    //         },
    //       },
    //     ],
    //   },
    // },

    {
      containerClass: "my-[30px]",
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex items-center justify-end space-x-[18px]",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("employees.details.cancel_button")}`,
              inputType: "button",
              className: `rounded-lg border border-[#C7C7C7] bg-white px-4 py-[10px] w-fit h-auto text-dark hover:bg-none ${
                isUpdate && "hidden"
              }`,
              onClick: handleUpdateCancel,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: isCreate
                ? `${translate("employees.details.save_button")}`
                : `${translate("employees.details.save_changes_button")}`,
              inputType: "submit",
              className: `rounded-lg px-4 min-w-[100px] w-fit h-auto text-white hover:bg-none ${
                isUpdate && "hidden"
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
