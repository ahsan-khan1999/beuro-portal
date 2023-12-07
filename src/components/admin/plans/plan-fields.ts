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
              htmlFor: "name",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "name",
              name: "name",

              placeholder: "Please Enter Your Plan Name",
              register,
              disabled: isUpdate,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("admin.plan_details.pricing")}`,
              htmlFor: "priceMonthly",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className:
                "!p-4 !!border-borderColor border border-dark focus:!border-primary ",
              inputType: "text",
              id: "priceMonthly",
              name: "priceMonthly",
              placeholder: "Please Enter Monthly Pricing",
              register,
              disabled: isUpdate,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("admin.plan_details.annually_discount")}`,
              htmlFor: "anuallDiscount",
            },
            field: {
              type: Field.input,
              className: "!p-4    !border-dark  focus:!border-primary",
              id: "anuallDiscount",
              name: "anuallDiscount",
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
              htmlFor: "employeeNo",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "number",
              id: "employeeNo",
              name: "employeeNo",

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
              htmlFor: "requestNo",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "number",
              id: "requestNo",
              name: "requestNo",

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
              htmlFor: "accountingReports",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "accountingReports",
              name: "accountingReports",

              placeholder: "Please Enter Accounting Reports",
              register,
              disabled: isUpdate,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("admin.plan_details.customize_email")}`,
              htmlFor: "customEmails",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className:
                "!p-4 !!border-borderColor border border-dark focus:!border-primary ",
              inputType: "text",
              id: "customEmails",
              name: "customEmails",
              placeholder: "Please Enter Customize Emails",
              register,
              disabled: isUpdate,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("admin.plan_details.watermark")}`,
              htmlFor: "waterMark",
            },
            field: {
              type: Field.input,
              className: "!p-4    !border-dark  focus:!border-primary",
              id: "waterMark",
              name: "waterMark",
              inputType: "text",

              placeholder: "Please Enter Water mark",
              register,
              disabled: isUpdate,
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: `${translate("admin.plan_details.api_feature")}`,
              htmlFor: "apifeature",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "text",
              id: "apifeature",
              name: "apifeature",

              placeholder: "Enter Your API Feature ",

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
              loading,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("admin.plan_details.save_button")}`,
              inputType: "submit",
              className: `px-4 py-[10px] w-[152px] hover:bg-none ${
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
