import {
  DeleteIconString,
  EditIconString,
} from "@/assets/svgs/strings/svg-strings";
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
              htmlFor: ReportContactDetailsFieldsId.customerType,
              className: "mb-[10px]",
            },
            field: {
              className: "!px-4 !border-[#BFBFBF] focus:!border-primary",
              type: Field.select,
              options:
                Object?.keys(staticEnums.CustomerType)
                  ?.slice(1, 3)
                  ?.map((item) => ({
                    value: staticEnums.CustomerType[item],
                    label: translate(`customer_type.${item}`),
                  })) || [],
              id: ReportContactDetailsFieldsId.customerType,
              name: ReportContactDetailsFieldsId.customerType,
              control,
            },
          },
          {
            label: {
              text: `${translate("customers.details.gender")}`,
              htmlFor: ReportContactDetailsFieldsId.gender,
              className: "mb-[10px]",
            },
            field: {
              className: "!px-4 !border-[#BFBFBF] focus:!border-primary",
              type: Field.select,
              options: Object?.keys(staticEnums.Gender).map((item) => ({
                value: staticEnums.Gender[item],
                label: translate(`gender.${item}`),
              })),
              id: ReportContactDetailsFieldsId.gender,
              name: ReportContactDetailsFieldsId.gender,
              control,
            },
          },
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
              inputType: "email",
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
          {
            label: {
              text: `${translate("agent.report_contact_fields.mobile")}`,
              htmlFor: ReportContactDetailsFieldsId.mobileNumber,
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "tel",
              className: "!pl-4",
              id: ReportContactDetailsFieldsId.mobileNumber,
              name: ReportContactDetailsFieldsId.mobileNumber,
              register,
            },
          },
          {
            label: {
              text: `${translate("agent.report_contact_fields.desire_date")}`,
              htmlFor: ReportContactDetailsFieldsId.desireDate,
              className: "mb-[10px]",
            },
            field: {
              type: Field.date,
              id: ReportContactDetailsFieldsId.desireDate,
              name: ReportContactDetailsFieldsId.desireDate,
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
        htmlFor: ReportContactDetailsFieldsId.companyName,
        className: "mb-[10px]",
      },
      field: {
        type: Field.input,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        inputType: "text",
        id: ReportContactDetailsFieldsId.companyName,
        name: ReportContactDetailsFieldsId.companyName,
        placeholder: translate(
          "agent.report_contact_fields.placeholder.company_name"
        ),
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
  (
    register,
    loading,
    control,
    addressFieldsLength,
    addressFields,
    address,
    addressType,
    handleChangeLabel,
    onEditTitle,
    onDeleteAddress,
    handleAddNewAddress,
    OnClick
  ) => {
    const formField: FormField[] = [];
    const { t: translate } = useTranslation();

    let addresses: any[] = address || [];

    if (!addressFields) return formField;
    for (let i = 0; i < addressFieldsLength; i++) {
      const isEditable = i === addressType;
      const mainHeading = addresses[i]?.label;

      const inputField: FormField = {
        containerClass: "pt-5 mb-2",
        field: {
          type: Field.div,
          id: "div-field",
          className: "flex justify-between ",
          children: [
            {
              containerClass: "mb-0",
              field: {
                type: Field.div,
                id: "div-field",
                className: "flex items-center gap-4",

                children: [
                  isEditable
                    ? {
                        containerClass: "mb-0",
                        field: {
                          type: Field.input,
                          className:
                            "!mx-0 !px-2 !border-[#BFBFBF] focus:!border-primary !h-[40px] w-[150px]",
                          id: `address.${[i]}.label`,
                          name: `address.${[i]}.label`,
                          inputType: "text",
                          value: addresses[i]?.label || "",
                          register,
                          onChange: (value) =>
                            handleChangeLabel && handleChangeLabel(value, i),
                        },
                      }
                    : {
                        containerClass: "mb-0",
                        field: {
                          type: Field.span,
                          containerClassName:
                            "min-w-[100px] text-[#1E1E1E] text-base font-semibold",
                          id: "test",
                          name: "test",
                          text: mainHeading,
                        },
                      },

                  isEditable
                    ? {
                        containerClass: "mb-0",
                        field: {
                          type: Field.button,
                          id: "button",
                          text: translate("common.cancel_button"),
                          className:
                            "!h-[40px] !bg-[transparent] !text-[black]",
                          inputType: "button",
                          onClick: () => onEditTitle && onEditTitle(null),
                        },
                      }
                    : {
                        containerClass: "mb-0",
                        field: {
                          type: Field.icon,
                          id: "button",
                          containerClassName: "!h-[40px]",
                          onClick: () => onEditTitle && onEditTitle(i),
                          icon: EditIconString,
                        },
                      },
                ],
              },
            },
            {
              containerClass: "mb-0",
              field: {
                type: Field.icon,
                id: "button",
                containerClassName: "!h-[40px]",
                onClick: () => onDeleteAddress && onDeleteAddress(i),
                icon: DeleteIconString,
              },
            },
          ],
        },
      };
      formField?.push(inputField);

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
                id: `address.${i}.ParkingPermit`,
                name: `address.${i}.ParkingPermit`,
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

    formField.push({
      containerClass: "mt-[30px]",
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex justify-between flex-row-reverse",
        children: [
          {
            field: {
              type: Field.div,
              id: "div-field",
              className: "flex justify-between items-center space-x-[18px]",
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
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: translate("agent.report_contact_fields.add_new_address"),
              inputType: "button",
              className:
                "rounded-lg px-4 min-w-[100px] xMini:min-w-[152px] w-fit !h-10 xMini:!h-[50px] text-white hover:bg-none",
              // loading,
              onClick: () => {
                handleAddNewAddress && handleAddNewAddress();
              },
            },
          },
        ],
      },
    });

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
              htmlFor: ReportContactDetailsFieldsId.streetNumber,
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: ReportContactDetailsFieldsId.streetNumber,
              name: ReportContactDetailsFieldsId.streetNumber,
              placeholder: `${translate("leads.placeholders.street")}`,
              register,
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.customer_details.post_code")}`,
              htmlFor: ReportContactDetailsFieldsId.postalCode,
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className:
                "!p-4 !border-[#BFBFBF] focus:!border-primary focus:!border-primary",
              inputType: "text",
              id: ReportContactDetailsFieldsId.postalCode,
              name: ReportContactDetailsFieldsId.postalCode,
              placeholder: `${translate("leads.placeholders.post_code")}`,
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.customer_details.country")}`,
              htmlFor: ReportContactDetailsFieldsId.country,
              className: "mb-[10px]",
            },

            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: ReportContactDetailsFieldsId.country,
              name: ReportContactDetailsFieldsId.country,
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
