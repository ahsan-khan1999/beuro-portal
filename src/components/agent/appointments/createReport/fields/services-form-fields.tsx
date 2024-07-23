import { Field } from "@/enums/form";
import { FormField, GenerateAgentReportServiceFormField } from "@/types";
import { ServiceType } from "@/enums/offers";
import { useTranslation } from "next-i18next";

export const agentReportServiceDetailsFormField: GenerateAgentReportServiceFormField =
  (
    register,
    loading,
    control,
    onCLick,
    count,
    properties,
    append,
    remove,
    serviceType,
    onServiceChange,
    fields,
    setValue
  ) => {
    const { t: translate } = useTranslation();
    const { service, onCustomerSelect, serviceDetails, generatePrice } =
      properties;

    const formField: FormField[] = [];
    for (let i = 0; i < count; i++) {
      formField.push({
        // @ts-expect-error
        field: {
          type: Field.div,
          id: `div-field`,
          className: `bg-white pt-[10px] ${
            i > 0 ? "mt-5 rounded-lg" : "mt-0 rounded-b-lg"
          }`,
          children: [
            {
              field: {
                type: Field.div,
                id: `div-field`,
                className: "flex justify-between items-center mb-2",
                children: [
                  {
                    field: {
                      type: Field.span,
                      id: "test",
                      name: "test",
                      text: `${translate("common.service")} ${i + 1}`,
                      containerClassName: `text-[#1E1E1E] font-semibold text-base`,
                    },
                  },
                  {
                    field: {
                      type: Field.button,
                      id: "button",
                      text: `${translate("common.remove_button")}`,
                      inputType: "button",
                      className: `rounded-md px-[6px] py-1 bg-transparent !h-[30px] text-base text-dark-red font-semibold border-2 rounded-[6px] border-[#C31313] hover-bg-none ${
                        i === 0 && "hidden"
                      }`,
                      onClick: () => remove(i),
                    },
                  },
                ],
              },
            },

            {
              field: {
                type: Field.div,
                id: `serviceDetail_${i}`,
                className:
                  "grid grid-cols-2 gap-y-5 xl:gap-y-0 xl:grid-cols-3 gap-x-3 rounded-b-lg px-2 pt-3 bg-[#EDF4FF]",
                children: [
                  {
                    containerClass: "mb-0 col-span-1",
                    label: {
                      text: `${translate(
                        "offers.service_details.service_type"
                      )}`,
                      htmlFor: `serviceDetail.${i}.serviceType`,
                      className: "mb-[10px]",
                    },
                    field: {
                      type: Field.div,
                      id: "div-field",
                      className: "flex flex-col",
                      children: [
                        {
                          containerClass: "mb-0 pb-[6px]",
                          field: {
                            type: Field.radio,
                            value: "New Service",
                            label: `${translate(
                              "offers.service_details.detail_headings.new_service"
                            )}`,
                            id: `serviceDetail.${i}.serviceType`,
                            name: `serviceDetail.${i}.serviceType`,
                            register,
                            colorClasses: "bg-transparent",
                            onChange: (val) =>
                              onServiceChange(i, ServiceType.NEW_SERVICE),
                          },
                        },
                        {
                          containerClass: "mb-0",
                          field: {
                            type: Field.radio,
                            value: "Existing Service",
                            label: `${translate(
                              "offers.service_details.detail_headings.exit_service"
                            )}`,
                            id: `serviceDetail.${i}.serviceType`,
                            name: `serviceDetail.${i}.serviceType`,
                            register,
                            colorClasses: "bg-transparent",
                            onChange: (val) =>
                              onServiceChange(i, ServiceType.EXISTING_SERVICE),
                          },
                        },
                      ],
                    },
                  },
                  serviceType[i] === ServiceType.EXISTING_SERVICE && {
                    containerClass: "mb-0 col-span-2",
                    label: {
                      text: `${translate(
                        "offers.service_details.detail_headings.title"
                      )}`,
                      htmlFor: `serviceDetail.${i}.serviceTitle`,
                      className: "mb-[10px]",
                    },
                    field: {
                      className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                      type: Field.select,
                      id: `serviceDetail.${i}.serviceTitle`,
                      name: `serviceDetail.${i}.serviceTitle`,
                      options:
                        service?.map((item) => ({
                          label: item?.serviceName,
                          value: item?.serviceName,
                        })) || [],
                      control,
                      // value:
                      //   offerDetails?.serviceDetail?.serviceDetail[i]
                      //     ?.serviceTitle,
                      onItemChange: onCustomerSelect,
                      fieldIndex: i,
                    },
                  },
                  serviceType[i] === ServiceType.NEW_SERVICE && {
                    containerClass:
                      "mb-0 row-start-1 col-start-2 col-end-4 col-span-2",
                    label: {
                      text: `${translate(
                        "offers.service_details.detail_headings.title"
                      )}`,
                      htmlFor: `serviceDetail.${i}.serviceTitle`,
                      className: "mb-[10px]",
                    },
                    field: {
                      type: Field.input,
                      className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                      inputType: "text",
                      id: `serviceDetail.${i}.serviceTitle`,
                      name: `serviceDetail.${i}.serviceTitle`,
                      placeholder: `${translate(
                        "offers.placeholders.service_title"
                      )}`,
                      register,
                    },
                  },
                ],
              },
            },

            {
              field: {
                type: Field.div,
                id: `serviceDetail_${i}`,
                className:
                  "grid grid-cols-1 relative w-full space-x-[18px] px-2 pt-0 xl:pt-5 pb-5 bg-[#EDF4FF]",
                children: [
                  {
                    label: {
                      text: `${translate(
                        "offers.service_details.detail_headings.description"
                      )}`,
                      htmlFor: `serviceDetail.${i}.description`,
                      className: "mb-[10px]",
                    },
                    field: {
                      type: Field.textArea,
                      className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                      rows: 2,
                      id: `serviceDetail.${i}.description`,
                      name: `serviceDetail.${i}.description`,
                      placeholder: ``,
                      register,
                    },
                  },
                ],
              },
            },

            {
              field: {
                type: Field.div,
                id: `serviceDetail_${i}`,
                className: "rounded-b-lg px-2 pb-3 bg-[#EDF4FF]",
                children: [
                  {
                    containerClass: "mb-0 col-span-1",
                    field: {
                      type: Field.div,
                      id: "div-field",
                      className:
                        "mb-0 grid grid-cols-2 lg:grid-cols-5 gap-x-3 gap-y-5",
                      children: [
                        {
                          containerClass: "mb-0",
                          label: {
                            text: `${translate(
                              "offers.service_details.detail_headings.count"
                            )}`,
                            htmlFor: `serviceDetail.${i}.count`,
                            className: "mb-[10px]",
                          },
                          field: {
                            type: Field.input,
                            className:
                              "!p-4 !border-[#BFBFBF] focus:!border-primary",
                            inputType: "number",
                            id: `serviceDetail.${i}.count`,
                            name: `serviceDetail.${i}.count`,
                            placeholder: "10",
                            register,
                            step: "0.1",
                            onChange: () => generatePrice && generatePrice(i),
                          },
                        },

                        {
                          containerClass: "mb-0 ",
                          label: {
                            text: `${translate(
                              "offers.service_details.detail_headings.unit"
                            )}`,
                            htmlFor: `serviceDetail.${i}.unit`,
                            className: "mb-[10px]",
                          },
                          field: {
                            type: Field.input,
                            className:
                              "!p-4 !border-[#BFBFBF] focus:!border-primary",
                            inputType: "text",
                            id: `serviceDetail.${i}.unit`,
                            name: `serviceDetail.${i}.unit`,
                            placeholder: "Std. ",
                            register,
                          },
                        },

                        {
                          containerClass: "mb-0",
                          label: {
                            text: `${translate(
                              "offers.service_details.price"
                            )}`,
                            htmlFor: `serviceDetail.${i}.price`,
                            className: "mb-[10px]",
                          },
                          field: {
                            type: Field.input,
                            className:
                              "!p-4 !border-[#BFBFBF] focus:!border-primary",
                            inputType: "number",
                            id: `serviceDetail.${i}.price`,
                            name: `serviceDetail.${i}.price`,
                            placeholder: "10000",
                            register,
                            step: "0.01",
                            onChange: () => generatePrice && generatePrice(i),
                          },
                        },

                        {
                          containerClass: "mb-0",
                          label: {
                            text: `${translate(
                              "offers.service_details.detail_headings.discount"
                            )}`,
                            htmlFor: `serviceDetail.${i}.discount`,
                            className: "mb-[10px]",
                          },
                          field: {
                            type: Field.input,
                            className:
                              "!p-4 !border-[#BFBFBF] focus:!border-primary",
                            inputType: "number",
                            id: `serviceDetail.${i}.discount`,
                            name: `serviceDetail.${i}.discount`,
                            placeholder: "10",
                            register,
                            step: "0.01",
                            onChange: () => generatePrice && generatePrice(i),
                          },
                        },

                        {
                          containerClass: "mb-0",
                          label: {
                            text: `${translate(
                              "offers.service_details.detail_headings.total_price"
                            )}`,
                            htmlFor: `serviceDetail.${i}.totalPrice`,
                            className: "mb-[10px]",
                          },
                          field: {
                            type: Field.input,
                            className:
                              "!p-4 !border-[#BFBFBF] focus:!border-primary",
                            inputType: "number",
                            id: `serviceDetail.${i}.totalPrice`,
                            name: `serviceDetail.${i}.totalPrice`,
                            placeholder: "1000CHF",
                            register,
                            step: "0.01",
                            disabled: true,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },

            // {
            //   containerClass: "",
            //   field: {
            //     type: Field.button,
            //     id: "button",
            //     text: `${translate("offers.service_details.add_new_service")}`,
            //     inputType: "button",
            //     className:
            //       "rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover-bg-none",
            //     onClick: () => append(""),
            //   },
            // },

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
                      text: translate("content.details.back_button"),
                      inputType: "button",
                      className:
                        "rounded-lg border border-[#C7C7C7] bg-white p-4 min-w-[92px] w-fit h-[50px] text-dark hover:bg-none",
                      onClick: () => {},
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
                        "rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover:bg-none",
                      loading,
                    },
                  },
                ],
              },
            },
          ],
        },
      });
    }
    return formField;
  };
