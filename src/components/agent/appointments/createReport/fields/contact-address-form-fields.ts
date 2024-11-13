import { ReportContactDetailsFieldsId } from "@/enums/agent/appointments-report";
import { Field } from "@/enums/form";
import {
  DivProps,
  FormField,
  GenerateContactAddressFormField,
  GenerateContactAddressReportFormField,
  GenerateContactReportFormField,
  CustAddressFormField,
} from "@/types";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";

export const contactAgentReportFormField: GenerateContactAddressFormField = (
  register,
  loading,
  control,
  customerType
) => {
  const { t: translate } = useTranslation();

  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 md:grid-cols-3 gap-[17px] bg-[#EDF4FF] rounded-lg p-2",
        children: [
          {
            label: {
              text: `${translate("leads.customer_details.customer_type")}`,
              htmlFor: `customerDetail.${ReportContactDetailsFieldsId.customerType}`,
              className: "mb-[10px]",
            },
            field: {
              className: "!px-4 !border-[#BFBFBF] focus:!border-primary",
              type: Field.select,
              options:
                Object?.keys(staticEnums.CustomerType)?.map((item) => ({
                  value: staticEnums.CustomerType[item],
                  label: translate(`customer_type.${item}`),
                })) || [],
              id: `customerDetail.${ReportContactDetailsFieldsId.customerType}`,
              name: `customerDetail.${ReportContactDetailsFieldsId.customerType}`,
              control,
            },
          },
          {
            label: {
              text: `${translate("customers.details.gender")}`,
              htmlFor: `customerDetail.${ReportContactDetailsFieldsId.gender}`,
              className: "mb-[10px]",
            },
            field: {
              className: "!px-4 !border-[#BFBFBF] focus:!border-primary",
              type: Field.select,
              options: Object?.keys(staticEnums.Gender).map((item) => ({
                value: staticEnums.Gender[item],
                label: translate(`gender.${item}`),
              })),
              id: `customerDetail.${ReportContactDetailsFieldsId.gender}`,
              name: `customerDetail.${ReportContactDetailsFieldsId.gender}`,
              control,
            },
          },
          {
            label: {
              text: `${translate("agent.report_contact_fields.name")}`,
              htmlFor: `customerDetail.${ReportContactDetailsFieldsId.fullName}`,
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "text",
              className: "!pl-4",
              id: `customerDetail.${ReportContactDetailsFieldsId.fullName}`,
              name: `customerDetail.${ReportContactDetailsFieldsId.fullName}`,
              register,
            },
          },

          {
            label: {
              text: `${translate("agent.report_contact_fields.email")}`,
              htmlFor: `customerDetail.${ReportContactDetailsFieldsId.email}`,
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "email",
              className: "!pl-4",
              id: `customerDetail.${ReportContactDetailsFieldsId.email}`,
              name: `customerDetail.${ReportContactDetailsFieldsId.email}`,
              register,
            },
          },
          {
            label: {
              text: `${translate("agent.report_contact_fields.telefon")}`,
              htmlFor: `customerDetail.${ReportContactDetailsFieldsId.phoneNumber}`,
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "tel",
              className: "!pl-4",
              id: `customerDetail.${ReportContactDetailsFieldsId.phoneNumber}`,
              name: `customerDetail.${ReportContactDetailsFieldsId.phoneNumber}`,
              register,
            },
          },
          {
            label: {
              text: `${translate("agent.report_contact_fields.date")}`,
              htmlFor: `customerDetail.${ReportContactDetailsFieldsId.date}`,
              className: "mb-[10px]",
            },
            field: {
              type: Field.date,
              id: `customerDetail.${ReportContactDetailsFieldsId.date}`,
              name: `customerDetail.${ReportContactDetailsFieldsId.date}`,
              dateType: "date",
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary w-full",
              register,
            },
          },
        ],
      },
    },
  ];
  const fieldIndex = formField.findIndex(
    (field: any) =>
      field?.field?.type === Field.div &&
      Array.isArray(field?.field?.children) &&
      field?.field?.children.some(
        (child: any) => child?.field?.id == "fullName"
      )
  );

  if (fieldIndex !== -1 && customerType === 1) {
    const companyNameField = {
      containerClass: "mb-0",
      label: {
        text: `${translate("agent.report_contact_fields.company_name")}`,
        htmlFor: `customerDetail.${ReportContactDetailsFieldsId.companyName}`,
        className: "mb-[10px]",
      },
      field: {
        type: Field.input,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        inputType: "text",
        id: `customerDetail.${ReportContactDetailsFieldsId.companyName}`,
        name: `customerDetail.${ReportContactDetailsFieldsId.companyName}`,
        placeholder: `${translate(
          "agent.report_contact_fields.placeholders.company_name"
        )}`,
        register,
        // setValue: setValue,
        // value: leadDetails?.customerDetail?.companyName || "",
      },
    };
    const divField = formField[fieldIndex]?.field as DivProps;
    if (divField && Array.isArray(divField.children)) {
      divField.children.splice(fieldIndex + 3, 0, companyNameField as any);
    }
  }

  return formField;
};

export const ContactReportAddressFormField: GenerateContactAddressReportFormField =
  (register, loading, control, addressFieldsLength, addressFields) => {
    const formField: FormField[] = [];
    const { t: translate } = useTranslation();

    if (!addressFields) return formField;
    for (let i = 0; i < addressFieldsLength; i++) {
      formField.push({
        field: {
          type: Field.input,
          inputType: "text",
          id: `address.${i}.label`,
          name: `address.${i}.label`,
          register,
          disabled: true,
          className:
            "!p-0 !bg-transparent h-6 mt-5 mb-2 !border-none focus:!border-none !w-auto text-[#1E1E1E] text-base font-semibold",
        },
      });

      formField?.push({
        field: {
          type: Field.div,
          id: `div-field-${i}`,
          className:
            "grid grid-cols-12 gap-x-3 gap-y-5 rounded-t-lg px-2 pt-3 pb-5 bg-[#EDF4FF]",
          children: [
            {
              containerClass: "mb-0 col-span-12 md:col-span-4",
              label: {
                text: translate("leads.address_details.street_no"),
                htmlFor: `address.${i}.streetNumber`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                inputType: "text",
                id: `address.${i}.streetNumber`,
                name: `address.${i}.streetNumber`,
                placeholder: `${translate("offers.placeholders.street")}`,
                register,
              },
            },
            {
              containerClass: "mb-0 col-span-12 md:col-span-4",
              label: {
                text: translate("leads.address_details.post_code"),
                htmlFor: `address.${i}.postalCode`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                inputType: "text",
                id: `address.${i}.postalCode`,
                name: `address.${i}.postalCode`,
                placeholder: `${translate("offers.placeholders.post_code")}`,
                register,
              },
            },
            {
              containerClass: "mb-0 col-span-12 md:col-span-4",
              label: {
                text: `${translate("agent.report_contact_fields.floor")}`,
                htmlFor: `address.${i}.floor`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.select,
                className: "!pl-4",
                id: `address.${i}.floor`,
                name: `address.${i}.floor`,
                options: Array?.from({ length: 10 }, (_, i) => ({
                  label: i.toString(),
                  value: i.toString(),
                })),
                control,
              },
            },

            {
              containerClass: "mb-0 col-span-12 md:col-span-4",
              label: {
                text: `${translate("agent.report_contact_fields.room")}`,
                htmlFor: `address.${i}.room`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.select,
                className: "!pl-4",
                id: `address.${i}.room`,
                name: `address.${i}.room`,
                options: Array?.from({ length: 10 }, (_, i) => ({
                  label: (i + 1).toString(),
                  value: (i + 1).toString(),
                })),
                control,
              },
            },
            {
              containerClass: "mb-0 col-span-12 md:col-span-4",
              label: {
                text: `${translate("agent.report_contact_fields.lift")}`,
                htmlFor: `address.${i}.lift`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.select,
                className: "!pl-4",
                id: `address.${i}.lift`,
                name: `address.${i}.lift`,
                options: [
                  {
                    label: translate("common.yes"),
                    value: "1",
                  },
                  {
                    label: translate("common.no"),
                    value: "0",
                  },
                ],
                control,
              },
            },
            {
              containerClass: "xMini:mt-8 col-span-12 md:col-span-4",
              field: {
                type: Field.customCheckBox,
                id: `address.${i}.parkingPermit`,
                name: `address.${i}.parkingPermit`,
                description: `${translate(
                  "agent.report_contact_fields.parking_permit"
                )}`,
                textClassName: "text-sm text-[#344054] font-medium",
                register,
                checked: true,
              },
            },
            {
              containerClass: "mb-0 col-span-12",
              label: {
                text: translate("leads.address_details.description"),
                htmlFor: `address.${i}.description`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.textArea,
                className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                id: `address.${i}.description`,
                name: `address.${i}.description`,
                placeholder: `${translate(
                  "leads.address_details.description"
                )}`,
                register,
              },
            },
          ],
        },
      });
    }

    return formField;
  };
export const ReportCustAddressFormField: CustAddressFormField = (
  register,
  loading,
  control
) => {
  const { t: translate } = useTranslation();

  const formField: FormField[] = [
    {
      containerClass: "pt-[30px]",
      label: {
        text: `${translate("leads.customer_details.address_details")}`,
        htmlFor: "details",
        className: "mb-[10px] text-[#1E1E1E] text-base font-semibold",
      },
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 md:grid-cols-3 gap-[17px] bg-[#EDF4FF] rounded-lg p-2",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.customer_details.street_no")}`,
              htmlFor: "customerDetail.address.streetNumber",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "customerDetail.address.streetNumber",
              name: "customerDetail.address.streetNumber",
              placeholder: `${translate("leads.placeholders.street")}`,
              register,
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.customer_details.post_code")}`,
              htmlFor: "customerDetail.address.postalCode",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className:
                "!p-4 !border-[#BFBFBF] focus:!border-primary focus:!border-primary",
              inputType: "text",
              id: "customerDetail.address.postalCode",
              name: "customerDetail.address.postalCode",
              placeholder: `${translate("leads.placeholders.post_code")}`,
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.customer_details.country")}`,
              htmlFor: "customerDetail.address.country",
              className: "mb-[10px]",
            },

            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "customerDetail.address.country",
              name: "customerDetail.address.country",
              placeholder: `${translate(
                "offers.placeholders.country_placeholder"
              )}`,
              register,
            },
          },
        ],
      },
    },
  ];

  return formField;
};

export const ReportContactSubmitFormField: GenerateContactReportFormField = (
  register,
  loading,
  control,
  OnClick
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "pt-[30px]",
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex justify-end items-center space-x-[18px]",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: translate("content.details.cancel_button"),
              inputType: "button",
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 min-w-[100px] w-fit !h-10 xMini:!h-[50px] text-dark hover:bg-none",
              onClick: OnClick,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: translate("content.details.next_button"),
              inputType: "submit",
              className:
                "rounded-lg px-4 min-w-[100px] xMini:min-w-[152px] w-fit !h-10 xMini:!h-[50px] text-white hover:bg-none",
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
