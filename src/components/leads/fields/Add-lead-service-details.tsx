import { Field } from "@/enums/form";
import { FormField, GenerateLeadsFormField } from "@/types";
import { ComponentsType } from "../add/AddNewLeadsData";
import { useTranslation } from "next-i18next";

export const AddLeadServiceDetailsFormField: GenerateLeadsFormField = (
  register,
  loading,
  control,
  onHandleBack,
  trigger,
  service,
  leadDetails,
  systemSettings
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "mt-6",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.service_details.required_service")}`,
              htmlFor: "requiredService",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              type: Field.select,
              id: "requiredService",
              name: "requiredService",
              value: (leadDetails?.id && leadDetails?.requiredService) || "",
              options:
                (service &&
                  service?.map((item) => ({
                    label: item.serviceName,
                    value: item.id,
                  }))) ||
                [],
              control,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.service_details.desire_date")}`,
              htmlFor: "desireDate",
              className: "mb-[10px]",
            },
            field: {
              type: Field.date,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              id: "desireDate",
              name: "desireDate",
              register,
              dateType: "date",
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.service_details.availability")}`,
              htmlFor: "contactAvailability",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              type: Field.select,
              id: "contactAvailability",
              value:
                (leadDetails?.id && leadDetails?.contactAvailability) || "",
              name: "contactAvailability",
              options: [
                {
                  value: "Morning(9am to 12am)",
                  label: `${translate("common.morning")}(9am to 12am)`,
                },
                {
                  value: "Morning(1pm to 10pm)",
                  label: `${translate("common.morning")}(9am to 12am)`,
                },
              ],
              control,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.service_details.flexibility")}`,
              htmlFor: "flexibility",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              type: Field.select,
              id: "flexibility",
              value: (leadDetails?.id && leadDetails?.flexibility) || "",
              name: "flexibility",
              options: [
                {
                  value: "1",
                  label: `1 ${translate("common.days")}`,
                },
                {
                  value: "2",
                  label: `2 ${translate("common.days")}`,
                },
                {
                  value: "3",
                  label: `3 ${translate("common.days")}`,
                },
                {
                  value: "4",
                  label: `4 ${translate("common.days")}`,
                },
                {
                  value: "5",
                  label: `5 ${translate("common.days")}`,
                },
                {
                  value: "6",
                  label: `6 ${translate("common.days")}`,
                },
                {
                  value: "7",
                  label: `7 ${translate("common.days")}`,
                },
              ],
              control,
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.service_details.prefer_contact")}`,
              htmlFor: "preferredContact",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              type: Field.select,
              id: "preferredContact",
              name: "preferredContact",
              value: (leadDetails?.id && leadDetails?.preferredContact) || "",
              options: [
                {
                  value: "Via Email",
                  label: `${translate("common.via_email")}`,
                },
                {
                  value: "Via What'sapp",
                  label: `${translate("common.via_whatsapp")}`,
                },
              ],
              control,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.service_details.budget")}`,
              htmlFor: "budget",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              type: Field.select,
              id: "budget",
              name: "budget",
              value: (leadDetails?.id && leadDetails?.budget) || "",

              options: [
                {
                  value: `Less then 1000 ${systemSettings?.currency}`,
                  label: `${translate("common.less_then")} 1000${
                    systemSettings?.currency
                  }`,
                },
                {
                  value: `Less then 500 ${systemSettings?.currency}`,
                  label: `${translate("common.less_then")} 500${
                    systemSettings?.currency
                  }`,
                },
              ],
              control,
            },
          },
          {
            containerClass: "xl:col-span-1 mb-0",
            label: {
              text: `${translate("leads.service_details.lead_source")}`,
              htmlFor: "leadSource",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              type: Field.select,
              id: "leadSource",
              name: "leadSource",
              value: (leadDetails?.id && leadDetails?.leadSource) || "",

              options: [
                {
                  value: "Whats'app",
                  label: `${translate("common.whatsapp")}`,
                },
                { value: "Facebook", label: `${translate("facebook")}` },
              ],
              control,
            },
          },

          {
            containerClass: "xl:col-span-2 mb-0",
            label: {
              text: `${translate("leads.service_details.other_services")}`,
              htmlFor: "otherServices",
              className: "mb-[10px]",
            },
            field: {
              type: Field.multiSelect,
              // @ts-expect-error
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              id: "otherServices",
              name: "otherServices",
              value: (leadDetails?.id && leadDetails?.otherServices) || [""],
              options:
                service?.map((item) => ({
                  label: item.serviceName,
                  value: item.id,
                })) || [],

              control,
              trigger,
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
              text: `${translate("leads.service_details.back_button")}`,
              inputType: "button",
              onClick: () =>
                onHandleBack && onHandleBack(ComponentsType.addressAdd),
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 min-w-[92px] w-fit h-[50px]   text-dark hover:bg-none",
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("leads.service_details.next_button")}`,
              inputType: "submit",
              className:
                "rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover:bg-none ",
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
