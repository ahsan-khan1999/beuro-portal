import { Field } from "@/enums/form";
import { FormField, GeneratePlansFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const planDetailsFormField: GeneratePlansFormField = (
  register,
  loading,
  isUpdate,
  handleUpdateCancel,
  control
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "mt-6",
      field: {
        type: Field.div,
        id: "div-field",

        className: "grid grid-cols-2 xl:grid-cols-4 gap-x-3 gap-y-5",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("admin.plan_details.plans_name")}`,
              htmlFor: "planName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "planName",
              name: "planName",

              placeholder: "Please Enter Your Plan Name",
              register,
              disabled: isUpdate,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("admin.plan_details.pricing")}`,
              htmlFor: "monthlyPrice",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className:
                "!p-4 !!border-borderColor border border-dark focus:!border-primary ",
              inputType: "text",
              id: "monthlyPrice",
              name: "monthlyPrice",
              placeholder: "Please Enter Monthly Pricing",
              register,
              disabled: isUpdate,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("admin.plan_details.annually_discount")}`,
              htmlFor: "discount",
            },
            field: {
              type: Field.input,
              className: "!p-4    !border-dark  focus:!border-primary",
              id: "discount",
              name: "discount",
              inputType: "text",

              placeholder: "Please Enter Anually Discount",
              register,
              disabled: isUpdate,
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: `${translate("admin.plan_details.number_of_employees")}`,
              htmlFor: "numberOfEmployees",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "number",
              id: "numberOfEmployees",
              name: "numberOfEmployees",

              placeholder: "Enter Your Number Of Employs",

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
        className: "grid grid-cols-2 xl:grid-cols-4 gap-x-3",
        children: [
          {
            containerClass: "mb-0 xl:col-span-1",
            label: {
              text: `${translate("admin.plan_details.no_of_request")}`,
              htmlFor: "numberOfRequests",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "number",
              id: "numberOfRequests",
              name: "numberOfRequests",

              placeholder: "Enter Number Of Requests",
              register,
              disabled: isUpdate,
            },
          },
          {
            containerClass: "mb-0 xl:col-span-3",
            label: {
              text: `${translate("admin.plan_details.description")}`,
              htmlFor: "description",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "text",
              id: "description",
              name: "description",

              placeholder: "Enter Description",
              register,
              disabled: isUpdate,
            },
          },
        ],
      },
    },
    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-2 xl:grid-cols-4 gap-x-3 mt-5 gap-y-5",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("admin.plan_details.accounting")}`,
              htmlFor: "accountingReport",
              className: "mb-[10px]",
            },
            field: {
              type: Field.div,
              id: "check",
              className:
                "flex justify-between  !px-4 py-3 border-[1px] rounded-lg !border-dark focus:!border-primary ",
              children: [
                {
                  field: {
                    type: Field.span,

                    id: "test",
                    name: "test",
                    text: "Enable Reports",
                    containerClassName: "",
                  },
                },
                {
                  field: {
                    type: Field.checkbox,
                    className: "",
                    id: "accountingReport",
                    name: "accountingReport",
                    register,
                    description: "",
                  },
                },
              ],
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("admin.plan_details.customize_email")}`,
              htmlFor: "customizedEmail",
              className: "mb-[10px]",
            },
            field: {
              type: Field.div,
              id: "check",
              className:
                "flex justify-between items-center !!mb-0 py-3  !px-4  border-[1px] rounded-lg !border-dark focus:!border-primary  ",
              children: [
                
                {
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "customizedEmail",
                    text: "Enable Customization",
                    containerClassName: "mb-0",
                  },
                },
                {
                  field: {
                    type: Field.checkbox,
                    className: "",
                    id: "customizedEmail",
                    name: "customizedEmail",
                    register,
                    description: "",
                  },
                },
              ],
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("admin.plan_details.watermark")}`,
              htmlFor: "watermark",
            },

            field: {
              type: Field.div,
              id: "check",
              className:
                "flex justify-between py-3  !px-4  border-[1px] rounded-lg !border-dark focus:!border-primary ",
              children: [
                {
                  field: {
                    type: Field.span,

                    id: "test",
                    name: "watermark",
                    text: "Enable Watermark",
                    containerClassName: "mb-0",
                  },
                },
                {
                  field: {
                    type: Field.checkbox,
                    className: "",
                    id: "watermark",
                    name: "watermark",
                    register,
                    description: "",
                  },
                },
              ],
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: `${translate("admin.plan_details.api_feature")}`,
              htmlFor: "apiFeatures",
              className: "mb-[10px]",
            },
            field: {
              type: Field.div,
              id: "check",
              className:
                "flex justify-between py-3  !px-4  border-[1px] rounded-lg !border-dark focus:!border-primary ",
              children: [
                {
                  field: {
                    type: Field.span,

                    id: "test",
                    name: "apiFeatures",
                    text: "Enable Api",
                    containerClassName: "",
                  },
                },
                {
                  field: {
                    type: Field.checkbox,
                    className: "",
                    id: "apiFeatures",
                    name: "apiFeatures",
                    register,
                    description: "",
                  },
                },
              ],
            },
          },
        ],
      },
    },

    {
      field: {
        type: Field.div,
        id: "div-field",
        className: `flex space-x-[18px] mt-8 ${isUpdate && "hidden"}`,
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("admin.plan_details.back_button")}`,
              inputType: "button",
              onClick: handleUpdateCancel,
              className: `px-4 py-[10px] w-[92px] font-medium border border-[#C7C7C7] hover:bg-none bg-white text-dark ${
                isUpdate && "hidden"
              }`,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("admin.plan_details.save_button")}`,
              inputType: "submit",
              className: `px-4  w-[152px] hover:bg-none ${
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
