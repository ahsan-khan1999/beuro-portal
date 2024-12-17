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
  CustAddressFormField,
  GenerateAppointmentDateFormField,
} from "@/types";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import {
  Control,
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";

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
          // {
          //   label: {
          //     text: `${translate("agent.report_contact_fields.desire_date")}`,
          //     htmlFor: ReportContactDetailsFieldsId.desireDate,
          //     className: "mb-[10px]",
          //   },
          //   field: {
          //     type: Field.date,
          //     id: ReportContactDetailsFieldsId.desireDate,
          //     name: ReportContactDetailsFieldsId.desireDate,
          //     dateType: "date",
          //     className: "!p-4 !border-[#BFBFBF] focus:!border-primary w-full",
          //     register,
          //   },
          // },
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
          className: "flex justify-between",
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
                          text: translate("common.save_button"),
                          className: "!h-[40px] text-white hover:bg-none",
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
        className: "flex flex-col sm:flex-row gap-4 justify-between",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: translate("agent.report_contact_fields.add_new_address"),
              inputType: "button",
              className:
                "rounded-lg px-4 w-fit !h-10 xMini:!h-[50px] text-white hover:bg-none",
              // loading,
              onClick: () => {
                handleAddNewAddress && handleAddNewAddress();
              },
            },
          },
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

export const AddDateFormField: GenerateAppointmentDateFormField = (
  register,
  dateAppend,
  count,
  dateRemove,
  loading,
  control
) => {
  const formField: FormField[] = [
    {
      containerClass: "relative",

      field: {
        type: Field.div,
        id: "div-field1",
        className:
          "grid grid-cols-1 xl:grid-cols-3 gap-x-3 items-center px-2 pb-3 bg-[#EDF4FF]",
        children: generateDateChildren(
          register,
          count,
          dateAppend,
          dateRemove,
          control
        ),
      },
    },
  ];
  return formField;
};

export const generateDateChildren = (
  register: UseFormRegister<FieldValues>,
  count: number,
  dateAppend: UseFieldArrayAppend<FieldValues, "date">,
  dateRemove: UseFieldArrayRemove,
  control?: Control<FieldValues>
) => {
  const { t: translate } = useTranslation();
  const dateformFields: any = [];

  for (let i = 0; i < count; i++) {
    dateformFields?.push({
      containerClass: "mb-0 pt-5",
      field: {
        type: Field.div,
        className: "grid grid-cols-2 gap-x-3",
        id: `date`,
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("common.start_date")}`,
              htmlFor: `date.${i}.startDate`,
              className: "mb-[10px]",
            },
            field: {
              type: Field.date,
              className:
                "!py-4 !pr-8 pl-4 !border-[#BFBFBF] focus:!border-primary w-full",
              id: `date.${i}.startDate`,
              name: `date.${i}.startDate`,
              register,
              dateType: "date",
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("common.end_date")}`,
              htmlFor: `date.${i}.endDate`,
              className: "mb-[10px]",
            },
            field: {
              type: Field.date,
              className:
                "!py-4 !pr-8 pl-4 !border-[#BFBFBF] focus:!border-primary w-full",
              name: `date.${i}.endDate`,
              remove: i > 0 && `${translate("common.remove")}`,
              onRemove: () => dateRemove(i),
              register,
              dateType: "date",
            },
          },
        ],
      },
    });
  }
  dateformFields.push({
    containerClass: "pt-5",
    label: {
      text: `${translate("common.time")}`,
      htmlFor: "time",
    },
    field: {
      type: Field.select,
      className:
        "!py-4 !pr-8 pl-4 !border-[#BFBFBF] focus:!border-primary w-full",
      name: "time",

      // value: (offerDetails?.id && offerDetails?.time) || "08:00",
      options: [
        { label: "00:00", value: "00:00" },
        { label: "00:15", value: "00:15" },
        { label: "00:30", value: "00:30" },
        { label: "00:45", value: "00:45" },
        { label: "01:00", value: "01:00" },
        { label: "01:15", value: "01:15" },
        { label: "01:30", value: "01:30" },
        { label: "01:45", value: "01:45" },
        { label: "02:00", value: "02:00" },
        { label: "02:15", value: "02:15" },
        { label: "02:30", value: "02:30" },
        { label: "02:45", value: "02:45" },
        { label: "03:00", value: "03:00" },
        { label: "03:15", value: "03:15" },
        { label: "03:30", value: "03:30" },
        { label: "03:45", value: "03:45" },
        { label: "04:00", value: "04:00" },
        { label: "04:15", value: "04:15" },
        { label: "04:30", value: "04:30" },
        { label: "04:45", value: "04:45" },
        { label: "05:00", value: "05:00" },
        { label: "05:15", value: "05:15" },
        { label: "05:30", value: "05:30" },
        { label: "05:45", value: "05:45" },
        { label: "06:00", value: "06:00" },
        { label: "06:15", value: "06:15" },
        { label: "06:30", value: "06:30" },
        { label: "06:45", value: "06:45" },
        { label: "07:00", value: "07:00" },
        { label: "07:15", value: "07:15" },
        { label: "07:30", value: "07:30" },
        { label: "07:45", value: "07:45" },
        { label: "08:00", value: "08:00" },
        { label: "08:15", value: "08:15" },
        { label: "08:30", value: "08:30" },
        { label: "08:45", value: "08:45" },
        { label: "09:00", value: "09:00" },
        { label: "09:15", value: "09:15" },
        { label: "09:30", value: "09:30" },
        { label: "09:45", value: "09:45" },
        { label: "10:00", value: "10:00" },
        { label: "10:15", value: "10:15" },
        { label: "10:30", value: "10:30" },
        { label: "10:45", value: "10:45" },
        { label: "11:00", value: "11:00" },
        { label: "11:15", value: "11:15" },
        { label: "11:30", value: "11:30" },
        { label: "11:45", value: "11:45" },
        { label: "12:00", value: "12:00" },
        { label: "12:15", value: "12:15" },
        { label: "12:30", value: "12:30" },
        { label: "12:45", value: "12:45" },
        { label: "13:00", value: "13:00" },
        { label: "13:15", value: "13:15" },
        { label: "13:30", value: "13:30" },
        { label: "13:45", value: "13:45" },
        { label: "14:00", value: "14:00" },
        { label: "14:15", value: "14:15" },
        { label: "14:30", value: "14:30" },
        { label: "14:45", value: "14:45" },
        { label: "15:00", value: "15:00" },
        { label: "15:15", value: "15:15" },
        { label: "15:30", value: "15:30" },
        { label: "15:45", value: "15:45" },
        { label: "16:00", value: "16:00" },
        { label: "16:15", value: "16:15" },
        { label: "16:30", value: "16:30" },
        { label: "16:45", value: "16:45" },
        { label: "17:00", value: "17:00" },
        { label: "17:15", value: "17:15" },
        { label: "17:30", value: "17:30" },
        { label: "17:45", value: "17:45" },
        { label: "18:00", value: "18:00" },
        { label: "18:15", value: "18:15" },
        { label: "18:30", value: "18:30" },
        { label: "18:45", value: "18:45" },
        { label: "19:00", value: "19:00" },
        { label: "19:15", value: "19:15" },
        { label: "19:30", value: "19:30" },
        { label: "19:45", value: "19:45" },
        { label: "20:00", value: "20:00" },
        { label: "20:15", value: "20:15" },
        { label: "20:30", value: "20:30" },
        { label: "20:45", value: "20:45" },
        { label: "21:00", value: "21:00" },
        { label: "21:15", value: "21:15" },
        { label: "21:30", value: "21:30" },
        { label: "21:45", value: "21:45" },
        { label: "22:00", value: "22:00" },
        { label: "22:15", value: "22:15" },
        { label: "22:30", value: "22:30" },
        { label: "22:45", value: "22:45" },
        { label: "23:00", value: "23:00" },
        { label: "23:15", value: "23:15" },
        { label: "23:30", value: "23:30" },
        { label: "23:45", value: "23:45" },
      ],
      control,
    },
  });

  dateformFields.push({
    containerClass: "mt-[50px]",
    field: {
      type: Field.button,
      id: "button",
      text: `${translate("common.add_new_date")}`,
      inputType: "submit",
      className:
        "rounded-lg bg-[#4A13E7] px-4 min-w-[152px] w-fit !h-[48px] text-white hover-bg-none",
      onClick: () => dateAppend({ startDate: "", endDate: "" }),
    },
  });

  return dateformFields;
};
