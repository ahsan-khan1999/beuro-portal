import { Field } from "@/enums/form";
import {
  FormField,
  GenerateOfferServiceFormField,
  GenerateOffersServiceActionFormField,
} from "@/types";
import {
  Control,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { OffersTableRowTypes, Total } from "@/types/offers";
import { TaxSetting } from "../../../../api/slices/settingSlice/settings";
import { ServiceType } from "@/enums/offers";
import { TAX_PERCENTAGE } from "@/services/HttpProvider";
import { useTranslation } from "next-i18next";
import { Report } from "@/types/appointments";
const serviceObject = {
  serviceTitle: "",
  price: "",
  unit: "",
  count: "",
  description: "",
  totalPrice: "",
  serviceType: "Existing Service",
  discount: 0,
};

export const AddOfferServiceDetailsFormField: GenerateOfferServiceFormField = (
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
  const {
    service,
    onCustomerSelect,
    serviceDetails,
    generatePrice,
    offerDetails,
    tax,
    currency,
  } = properties;

  // if(!fields) return null;

  const formField: FormField[] = [];
  for (let i = 0; i < count; i++) {
    formField?.push({
      // @ts-expect-error
      field: {
        type: Field.div,
        id: `div-field`,
        className: `bg-white p-5 ${
          i > 0 ? "mt-5 rounded-lg" : "mt-0 rounded-b-lg"
        }`,
        children: [
          {
            field: {
              type: Field.div,
              id: `div-field`,
              className:
                "flex justify-between items-center rounded-t-lg px-2 pt-3 bg-[#EDF4FF]",
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
                "grid grid-cols-2 gap-y-5 xl:gap-y-0 xl:grid-cols-3 gap-x-3 rounded-b-lg px-2 pt-5 bg-[#EDF4FF]",
              children: [
                {
                  containerClass: "mb-0 col-span-1",
                  label: {
                    text: `${translate("offers.service_details.service_type")}`,
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
                    placeholder: `${translate(
                      "common.description_placeholder"
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
                          text: `${translate("offers.service_details.price")}`,
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
                        containerClass: "mb-0 ",
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
        ],
      },
    });
  }
  return formField;
};

export const AddOfferServiceDetailsDescriptionFormField: GenerateOfferServiceFormField =
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
    const {
      total,
      offerDetails,
      reportDetails,
      appointmentId,
      generateTotal,
      isDiscount,
      isTax,
      taxType,
      discountType,
      tax,
      currency,
    } = properties;
    const { t: translate } = useTranslation();
    const formField: FormField[] = [
      {
        containerClass: "mt-5 bg-white px-5 pt-5 rounded-lg",
        //@ts-expect-error
        field: {
          type: Field.div,
          id: "div-field",
          className: "grid grid-cols-1 xlg:grid-cols-2 gap-x-3",
          children: [
            {
              field: {
                type: Field.div,
                id: "div-field",
                className: "flex flex-col",
                children: [
                  {
                    containerClass: "mb-0 p-2 bg-[#EDF4FF] rounded-md",
                    label: {
                      text: `${translate(
                        "offers.service_details.discount_description"
                      )}`,
                      htmlFor: "discountDescription",
                    },
                    field: {
                      type: Field.textArea,
                      className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                      rows: 2,
                      id: "discountDescription",
                      name: "discountDescription",
                      maxLength: 100,
                      placeholder: `${translate(
                        "common.description_placeholder"
                      )}`,
                      register,
                    },
                  },
                  // {
                  //   containerClass: "grid col-span-2",
                  //   field: {
                  //     type: Field.div,
                  //     id: "div-field",
                  //     className: "flex space-x-3 mt-3",
                  //     children: [
                  //       {
                  //         containerClass: "mb-0 col-span-1 ",
                  //         field: {
                  //           type: Field.span,
                  //           id: "button",
                  //           text: "",
                  //           html: `<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  //         <path d="M17.3723 8.19773H10.0498V0.875271C10.0498 0.500809 9.74629 0.197266 9.37183 0.197266C8.99736 0.197266 8.69382 0.500809 8.69382 0.875271V8.19773H1.37136C0.996902 8.19773 0.693359 8.50127 0.693359 8.87573C0.693359 9.25019 0.996902 9.55374 1.37136 9.55374H8.69382V16.8762C8.69382 17.2507 8.99736 17.5542 9.37183 17.5542C9.74629 17.5542 10.0498 17.2507 10.0498 16.8762V9.55374H17.3723C17.7467 9.55374 18.0503 9.25019 18.0503 8.87573C18.0503 8.50127 17.7467 8.19773 17.3723 8.19773Z" fill="#4B4B4B"/>
                  //         </svg>
                  //         `,
                  //           containerClassName:
                  //             "rounded-lg border-[1px] border-[#4B4B4B] bg-[#fff] p-2  w-[40px] h-[40px] text-white hover-bg-none cursor-pointer",
                  //           onClick: () => append(serviceObject),
                  //         },
                  //       },
                  //       {
                  //         containerClass: "mb-0 pr-2 mt-2 mb-5",
                  //         field: {
                  //           type: Field.span,
                  //           className: "!p-4  w-full",
                  //           id: "span-field",
                  //           text: `${translate(
                  //             "offers.service_details.add_new_service"
                  //           )}`,
                  //         },
                  //       },
                  //     ],
                  //   },
                  // },

                  {
                    containerClass: "mb-4 mt-5",
                    field: {
                      type: Field.button,
                      id: "button",
                      text: `${translate(
                        "offers.service_details.add_new_service"
                      )}`,
                      inputType: "button",
                      className:
                        "rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover-bg-none",
                      onClick: () => append(serviceObject),
                    },
                  },
                ],
              },
            },
            generateServiceCalulationChildren(
              register,
              setValue,
              control,
              total,
              offerDetails,
              reportDetails,
              appointmentId,
              generateTotal,
              isTax,
              isDiscount,
              taxType,
              discountType,
              tax,
              currency
            ),
          ],
        },
      },
    ];

    return formField;
  };

const generateServiceCalulationChildren = (
  register: UseFormRegister<FieldValues>,
  setValue: UseFormSetValue<FieldValues>,
  control: Control<FieldValues>,
  total?: Total,
  offerDetails?: OffersTableRowTypes,
  reportDetails?: Report,
  appointmentId?: string | string[],
  generateTotal?: () => void,
  isTax?: boolean,
  isDiscount?: boolean,
  taxType?: number,
  discountType?: number,
  tax?: TaxSetting[] | null,
  currency?: string
) => {
  const { t: translate } = useTranslation();
  let field: any = {
    containerClass: "mb-0 w-full",
    field: {
      type: Field.span,
      className: "!border-[#BFBFBF] focus:!border-primary w-full",
      id: "span-field",
      text: `${total?.taxAmount.toFixed(2)} ${currency}(${TAX_PERCENTAGE}%)`,
    },
  };

  if (String(taxType) === "1" && isTax) {
    field = {
      containerClass: "w-full",
      field: {
        type: Field.select,
        id: "taxAmount",
        options:
          tax?.map((item) => ({
            label: item.taxRate + "%",
            value: item.taxRate,
          })) || [],
        text: "Select Tax",
        name: "taxAmount",
        control,
        className: "h-10 !px-8",
      },
    };
  }

  const calculationFields = {
    containerClass: "mb-0 rounded-lg p-3 bg-[#EDF4FF]",
    field: {
      type: Field.div,
      className: "grid grid-cols-1 gap-x-3",
      id: `test`,
      children: [
        {
          containerClass: "pb-2 border-b border-lightGray",
          field: {
            type: Field.div,
            className: "flex justify-between items-center",
            id: "div2",
            children: [
              {
                containerClass: "mb-0",
                field: {
                  type: Field.span,
                  className: "text-sm font-medium text-[#344054]",
                  id: "span-field",
                  text: `${translate(
                    "offers.service_details.detail_headings.sub_total"
                  )}`,
                },
              },
              {
                containerClass: "mb-0",
                field: {
                  type: Field.span,
                  className: "text-sm font-medium text-[#344054]",
                  id: "span-field",
                  text: `${total?.subTotal?.toFixed(2)} ${currency}`,
                },
              },
            ],
          },
        },

        {
          containerClass: "mb-0 py-2 space-x-5 border-b border-lightGray",
          field: {
            type: Field.div,
            className: "flex space-x-5 !h-[45px]",
            id: "div3",
            children: [
              {
                containerClass: "mb-0 px-0 mt-1",
                field: {
                  type: Field.toggleButton,
                  className: "!border-[#BFBFBF] focus:!border-primary",
                  id: "span-field",
                  name: "isTax",
                  label: `${translate(
                    "offers.service_details.detail_headings.tax"
                  )}`,
                  checked: false,
                  register,
                },
              },
              {
                containerClass: "mb-0 min-w-[70px]",
                field: {
                  type: Field.span,
                  className: "!border-[#BFBFBF] focus:!border-primary",
                  id: "span-field",
                  text: `${translate(
                    "offers.service_details.detail_headings.tax"
                  )}`,
                },
              },
              field,
              {
                field: {
                  type: Field.div,
                  className: "",
                  id: "100",
                  children: [
                    {
                      containerClass: "mb-1 min-w-[100px]",
                      field: {
                        type: Field.radio,
                        className: "!border-[#BFBFBF] focus:!border-primary",
                        id: "taxType1",
                        text: "Sub Total",
                        name: "taxType",
                        label: `${translate(
                          "offers.service_details.detail_headings.Inclusive"
                        )}`,
                        register,
                        colorClasses: "bg-transparent",
                        checked: isTax && taxType == 0 ? true : false,
                        value: 0,
                        setValue,
                        disabled: !isTax,
                      },
                    },
                    {
                      containerClass: "mb-0 min-w-[100px]",
                      field: {
                        type: Field.radio,
                        className: " !border-[#BFBFBF] focus:!border-primary",
                        id: "taxType2",
                        text: "Sub Total",
                        name: "taxType",
                        label: `${translate(
                          "offers.service_details.detail_headings.exclusive"
                        )}`,
                        register,
                        colorClasses: "bg-transparent",
                        checked: isTax && taxType == 1 ? true : false,
                        value: 1,
                        setValue,
                        disabled: !isTax,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },

        {
          containerClass: "mb-0 py-2 space-x-5 border-b border-lightGray pb-3",
          field: {
            type: Field.div,
            className: "flex space-x-5 !h-[45px]",
            id: "div3",
            children: [
              {
                containerClass: "mb-0 px-0 mt-1",
                field: {
                  type: Field.toggleButton,
                  className: "!border-[#BFBFBF] focus:!border-primary",
                  id: "span-field",
                  name: "isDiscount",
                  checked: false,
                  register,
                },
              },

              {
                containerClass: "mb-0 min-w-[80px]",
                field: {
                  type: Field.span,
                  className: "!border-[#BFBFBF] focus:!border-primary",
                  id: "span-field",
                  text: `${translate(
                    "offers.service_details.detail_headings.discount"
                  )}`,
                },
              },

              {
                containerClass: "mb-0 w-full",
                field: {
                  type: Field.input,
                  className: "!px-2 !border-[#BFBFBF] focus:!border-primary",
                  id: "discountAmount",
                  register,
                  name: "discountAmount",
                  inputType: "number",
                  value: appointmentId
                    ? reportDetails?.discountAmount
                    : offerDetails?.id && offerDetails?.discountAmount,
                  disabled: !isDiscount,
                  setValue,
                  step: "0.01",
                },
              },
              {
                field: {
                  type: Field.div,
                  className: "",
                  id: "4",
                  children: [
                    {
                      containerClass: "mb-1 min-w-[100px]",
                      field: {
                        type: Field.radio,
                        className: " !border-[#BFBFBF] focus:!border-primary",
                        id: "discountType1",
                        text: "Sub Total",
                        name: "discountType",
                        label: `${translate(
                          "offers.service_details.detail_headings.percent"
                        )}`,
                        register,
                        colorClasses: "bg-transparent",
                        checked: isDiscount && discountType == 0 ? true : false,
                        value: 0,
                        setValue,
                        disabled: !isDiscount,
                      },
                    },
                    {
                      containerClass: "mb-0 min-w-[100px]",
                      field: {
                        type: Field.radio,
                        className: " !border-[#BFBFBF] focus:!border-primary",
                        id: "discountType2",
                        text: "Sub Total",
                        name: "discountType",
                        label: `${translate(
                          "offers.service_details.detail_headings.amount"
                        )}`,
                        checked: isDiscount && discountType == 1 ? true : false,
                        register,
                        colorClasses: "bg-transparent",
                        value: 1,
                        setValue,
                        disabled: !isDiscount,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          containerClass: "mb-0 mt-3 flex justify-end",
          field: {
            type: Field.span,
            containerClassName:
              "!!border-[#BFBFBF] focus:!border-primary text-dark font-bold",
            id: "span-field",
            text: `${translate(
              "offers.service_details.detail_headings.grand_total"
            )} : ${total?.grandTotal.toFixed(2)} ${currency}`,
          },
        },
      ],
    },
  };

  return calculationFields;
};

export const AddOfferDetailsServiceSubmitFormField: GenerateOffersServiceActionFormField =
  (loading, OnClick) => {
    const { t: translate } = useTranslation();
    const formField: FormField[] = [
      {
        containerClass: "pt-[55px] pb-5 px-5 rounded-b-lg bg-white",
        field: {
          type: Field.div,
          id: "div-field",
          className: "flex items-center justify-end space-x-[18px]",
          children: [
            {
              containerClass: "mb-0",
              field: {
                type: Field.button,
                id: "buttonBack",
                text: `${translate("common.back_button")}`,
                inputType: "button",
                className:
                  "rounded-lg bg-[#fff] px-4 border-[1px] border-[#C7C7C7] min-w-[152px] w-fit h-[50px] text-black hover-bg-none",
                onClick: OnClick,
              },
            },
            {
              containerClass: "mb-0",
              field: {
                type: Field.button,
                id: "button",
                text: `${translate("common.next_button")}`,
                inputType: "submit",
                className:
                  "rounded-lg bg-[#4A13E7] px-4 min-w-[152px] w-fit h-[50px] text-white hover-bg-none",
                loading,
              },
            },
          ],
        },
      },
    ];

    return formField;
  };
