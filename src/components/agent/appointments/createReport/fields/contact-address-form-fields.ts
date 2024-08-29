import { ReportContactDetailsFieldsId } from "@/enums/agent/appointments-report";
import { Field } from "@/enums/form";
import {
  FormField,
  GenerateContactAddressReportFormField,
  GenerateContactReportFormField,
} from "@/types";
import { useTranslation } from "next-i18next";

export const contactAgentReportFormField: GenerateContactReportFormField = (
  register,
  loading,
  control
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
              text: `${translate("agent.report_contact_fields.name")}`,
              htmlFor: ReportContactDetailsFieldsId.fullName,
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "text",
              className: "!pl-4",
              id: ReportContactDetailsFieldsId.fullName,
              name: ReportContactDetailsFieldsId.fullName,
              register,
            },
          },
          {
            label: {
              text: `${translate("agent.report_contact_fields.email")}`,
              htmlFor: ReportContactDetailsFieldsId.email,
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: ReportContactDetailsFieldsId.email,
              className: "!pl-4",
              id: ReportContactDetailsFieldsId.email,
              name: ReportContactDetailsFieldsId.email,
              register,
            },
          },
          {
            label: {
              text: `${translate("agent.report_contact_fields.telefon")}`,
              htmlFor: ReportContactDetailsFieldsId.phoneNumber,
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "tel",
              className: "!pl-4",
              id: ReportContactDetailsFieldsId.phoneNumber,
              name: ReportContactDetailsFieldsId.phoneNumber,
              register,
            },
          },
        ],
      },
    },
  ];

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

      formField.push({
        field: {
          type: Field.div,
          id: `div-field-${i}`,
          className:
            "grid  md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5 rounded-t-lg px-2 pt-3 pb-5 bg-[#EDF4FF]",
          children: [
            {
              containerClass: "mb-0",
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
                placeholder: ``,
                register,
              },
            },
            {
              containerClass: "mb-0",
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
                placeholder: ``,
                register,
              },
            },
            {
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
                options: [
                  {
                    label: "1",
                    value: "1",
                  },
                  {
                    label: "2",
                    value: "2",
                  },
                  {
                    label: "3",
                    value: "3",
                  },
                ],
                control,
              },
            },
            {
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
                options: [
                  {
                    label: "1",
                    value: "1",
                  },
                  {
                    label: "2",
                    value: "2",
                  },
                  {
                    label: "3",
                    value: "3",
                  },
                ],
                control,
              },
            },
            {
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
              containerClass: "xMini:mt-8",
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
          ],
        },
      });
    }

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
