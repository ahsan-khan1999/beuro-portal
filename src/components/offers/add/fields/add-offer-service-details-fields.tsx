import { Field } from "@/enums/form";
import {
  FormField,
  GenerateOfferServiceFormField,
  GenerateOffersFormField,
  GenerateOffersServiceActionFormField,
} from "@/types";
import icon from "@/assets/svgs/Vector.svg";
import {
  Control,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { OffersTableRowTypes, Total } from "@/types/offers";
import { staticEnums } from "@/utils/static";
import { getKeyByValue } from "@/utils/auth.util";
import { TaxSetting } from '../../../../api/slices/settingSlice/settings';
import { calculatePercentage, calculateTax } from "@/utils/utility";
const serviceObject = {
  serviceTitle: "",
  price: 0,
  unit: "",
  count: 0,
  description: "",
  totalPrice: "",
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
  fields,
  setValue
) => {
  const {
    service,
    onCustomerSelect,
    serviceDetails,
    generatePrice,
    offerDetails,
    tax
  } = properties;
  // if(!fields) return null;

  const formField: FormField[] = [];
  for (let i = 0; i < count; i++) {
    formField.push(
      {
        //@ts-expect-error
        field: {
          type: Field.div,
          id: `serviceDetail_${i}`,
          className: "grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5 mt-5",
          children: [
            {
              containerClass: "mb-0 col-span-1",
              label: {
                text: "Service Type",
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
                      label: "New Service",
                      id: `serviceDetail.${i}.serviceType`,
                      name: `serviceDetail.${i}.serviceType`,
                      register,
                    },
                  },
                  {
                    containerClass: "mb-0",
                    field: {
                      type: Field.radio,
                      value: "Existing Service",
                      label: "Existing Service",
                      id: `serviceDetail.${i}.serviceType`,
                      name: `serviceDetail.${i}.serviceType`,
                      register,
                    },
                  },
                ],
              },
            },
            {
              containerClass: "mb-0 col-span-2",
              label: {
                text: "Service Title/Product",
                htmlFor: `serviceDetail.${i}.serviceTitle`,
                className: "mb-[10px]",
              },
              field: {
                className:
                  "!p-4 !border-[#BFBFBF] focus:!border-primary",
                type: Field.select,
                id: `serviceDetail.${i}.serviceTitle`,
                name: `serviceDetail.${i}.serviceTitle`,
                options:
                  service?.map((item) => ({
                    label: item?.serviceName,
                    value: item?.serviceName,
                  })) || [],
                control,
                // value: "" ,
                onItemChange: onCustomerSelect,
                fieldIndex: i,
              },
            },
          ],
        },
      },

      {
        containerClass: "mt-5 ",
        field: {
          type: Field.div,
          id: `serviceDetail_${i}`,
          className: "grid grid-cols-3 gap-x-3 ",
          children: [
            {
              containerClass: "mb-0 col-span-1",
              field: {
                type: Field.div,
                id: "div-field",
                className: "mb-0 grid grid-cols-3 gap-3",
                children: [
                  {
                    containerClass: "mb-0 col-span-2",
                    label: {
                      text: "Price",
                      htmlFor: `serviceDetail.${i}.price`,
                      className: "mb-[10px]",
                    },
                    field: {
                      type: Field.input,
                      className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                      inputType: "number",
                      id: `serviceDetail.${i}.price`,
                      name: `serviceDetail.${i}.price`,
                      placeholder: "10000 CHF",
                      register,
                      onChange: () => generatePrice && generatePrice(i),
                    },
                  },
                  {
                    containerClass: "mb-0 col-span-1",
                    label: {
                      text: "Count",
                      htmlFor: `serviceDetail.${i}.count`,
                      className: "mb-[10px]",
                    },
                    field: {
                      type: Field.input,
                      className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                      inputType: "number",
                      id: `serviceDetail.${i}.count`,
                      name: `serviceDetail.${i}.count`,
                      placeholder: "10",
                      register,
                      onChange: () => generatePrice && generatePrice(i),
                    },
                  },
                ],
              },
            },
            {
              containerClass: "mb-0 col-span-2",
              field: {
                type: Field.div,
                id: "div-field",
                className: "mb-0 grid grid-cols-2 gap-3",
                children: [
                  {
                    containerClass: "mb-0 ",
                    label: {
                      text: "Unit",
                      htmlFor: `serviceDetail.${i}.unit`,
                      className: "mb-[10px]",
                    },
                    field: {
                      type: Field.input,
                      className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                      inputType: "text",
                      id: `serviceDetail.${i}.unit`,
                      name: `serviceDetail.${i}.unit`,
                      placeholder: "Std. ",
                      register,
                    },
                  },
                  {
                    containerClass: "mb-0 ",
                    label: {
                      text: "Total Price",
                      htmlFor: `serviceDetail.${i}.totalPrice`,
                      className: "mb-[10px]",
                    },
                    field: {
                      type: Field.input,
                      className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                      inputType: "number",
                      id: `serviceDetail.${i}.totalPrice`,
                      name: `serviceDetail.${i}.totalPrice`,
                      placeholder: "1000CHF",
                      register,
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        containerClass: "mt-6",
        field: {
          type: Field.div,
          id: `serviceDetail_${i}`,
          className: "grid grid-cols-1 relative w-full space-x-[18px] ",
          children: [
            {
              containerClass: "mt-5 mb-0 pb-10  border-b-2 border-lightGray",
              label: {
                text: "Description",
                htmlFor: `serviceDetail.${i}.description`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.textArea,
                className: "!p-4 !border-[#BFBFBF]  focus:!border-primary ",
                rows: 8,
                id: `serviceDetail.${i}.description`,
                name: `serviceDetail.${i}.description`,
                placeholder:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s",
                register,
              },
            },
            {
              containerClass: "mb-0 absolute -top-60 right-0",
              field: {
                type: Field.button,
                id: "button",
                text: "Remove",
                inputType: "button",
                className: `rounded-none  p-2 bg-red !h-[30px] text-white hover-bg-none ${i === 0 && "hidden"
                  }`,
                onClick: () => remove(i),
              },
            },
          ],
        },
      }
    );
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
    fields,
    setValue
  ) => {
    const {
      total,
      offerDetails,
      generateTotal,
      isDiscount,
      isTax,
      taxType,
      discountType,
      tax
    } = properties;
    const formField: FormField[] = [
      {
        containerClass: "mt-[30px]",
        //@ts-expect-error
        field: {
          type: Field.div,
          id: "div-field",
          className: "grid grid-cols- mlg:grid-cols-2 gap-x-3",
          children: [
            {
              containerClass: "",
              field: {
                type: Field.div,
                id: "div-field",
                className: "flex flex-col",
                children: [
                  {
                    containerClass: "mb-0",
                    label: {
                      text: "Discount Description",
                      htmlFor: "discountDescription",
                      className: "mb-[10px] flex",
                    },
                    field: {
                      type: Field.textArea,
                      className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                      rows: 8,
                      id: "discountDescription",
                      name: "discountDescription",
                      placeholder:
                        "Lorem Ipsum is simply dummy text of the isp ispu printing and typesetting industry. Lorem Ipsum ie has  a been the industry's standard dummyalesl...",
                      register,
                    },
                  },
                  {
                    containerClass: "grid col-span-2",
                    field: {
                      type: Field.div,
                      id: "div-field",
                      className: "flex space-x-3 mt-3",
                      children: [
                        {
                          containerClass: "mb-0 col-span-1 ",
                          field: {
                            type: Field.span,
                            id: "button",
                            text: "",
                            html: `<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.3723 8.19773H10.0498V0.875271C10.0498 0.500809 9.74629 0.197266 9.37183 0.197266C8.99736 0.197266 8.69382 0.500809 8.69382 0.875271V8.19773H1.37136C0.996902 8.19773 0.693359 8.50127 0.693359 8.87573C0.693359 9.25019 0.996902 9.55374 1.37136 9.55374H8.69382V16.8762C8.69382 17.2507 8.99736 17.5542 9.37183 17.5542C9.74629 17.5542 10.0498 17.2507 10.0498 16.8762V9.55374H17.3723C17.7467 9.55374 18.0503 9.25019 18.0503 8.87573C18.0503 8.50127 17.7467 8.19773 17.3723 8.19773Z" fill="#4B4B4B"/>
                          </svg>
                          `,
                            containerClassName:
                              "rounded-lg border-[1px] border-[#4B4B4B] bg-[#fff] p-2  w-[40px] h-[40px] text-white hover-bg-none cursor-pointer",
                            onClick: () => append(serviceObject),
                          },
                        },
                        {
                          containerClass: "mb-0 pr-2 mt-2",
                          field: {
                            type: Field.span,
                            className: "!p-4  w-full ",
                            id: "span-field",
                            text: "Add New Service",
                          },
                        },
                      ],
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
              generateTotal,
              isTax,
              isDiscount,
              taxType,
              discountType,
              tax
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
  generateTotal?: () => void,
  isTax?: boolean,
  isDiscount?: boolean,
  taxType?: number,
  discountType?: number,
  tax?: TaxSetting[] | null
) => {
  let field: any = {
    containerClass: "mb-0 ",
    field: {
      type: Field.span,
      className: "! !border-[#BFBFBF] focus:!border-primary w-full",
      id: "span-field",
      text: `${total?.taxAmount.toFixed(2)} CHF(7.7%)`,
    },
  };

  if (String(taxType) === "1" && isTax) {
    field = {
      containerClass: "w-[112px]",
      field: {
        type: Field.select,
        id: "taxPercentage",
        options: tax?.map((item) => ({ label: item.taxRate + "%", value: item.taxRate })) || [],
        text: "Select Tax",
        name: "taxPercentage",
        control,
        className: "h-10 !px-8",
        value: offerDetails?.id && calculatePercentage(offerDetails?.taxAmount, offerDetails?.subTotal)
      },
    };
  }

  const calculationFields = {
    containerClass: "mb-0 border-2 border-lightGray rounded-lg p-3",

    field: {
      type: Field.div,
      className: "grid grid-cols-1 gap-x-3",
      id: `test`,
      children: [
        {
          containerClass: "pb-2 border-b border-lightGray",

          field: {
            type: Field.div,
            className: "flex  mx-10 space-x-5",
            id: "div2",
            children: [
              {
                containerClass: "mb-0 pr-2 border-r border-lightGray",
                field: {
                  type: Field.span,
                  className: "!p-4  w-full ",
                  id: "span-field",
                  text: "Sub Total",
                },
              },
              {
                containerClass: "mb-0 ",
                field: {
                  type: Field.span,
                  className: "!p-4 !border-[#BFBFBF] focus:!border-primary w-full",
                  id: "span-field",
                  text: `${total?.subTotal} CHF`,
                },
              },
            ],
          },
        },

        {
          containerClass: "mb-0 py-2 space-x-5  border-b  border-lightGray",

          field: {
            type: Field.div,
            className: "flex space-x-5 !h-[45px]",
            id: "div3",
            children: [
              {
                containerClass: "mb-0 px-0 ",
                field: {
                  type: Field.toggleButton,
                  className: " !border-[#BFBFBF] focus:!border-primary ",
                  id: "isTax",
                  name: "isTax",
                  label: "Tax%",
                  checked: false,
                  register,
                  value: false,
                },
              },
              {
                containerClass: "mb-0 border-r border-lightGray pr-8",
                field: {
                  type: Field.span,
                  className: "! !border-[#BFBFBF] focus:!border-primary w-full",
                  id: "span-field",
                  text: "Tax %",
                },
              },
              field,
              {
                field: {
                  type: Field.div,
                  className: "",
                  id: "4",
                  children: [
                    {
                      containerClass: "mb-0 ",
                      field: {
                        type: Field.radio,
                        className: " !border-[#BFBFBF] focus:!border-primary w-full",
                        id: "taxType1",
                        text: "Sub Total",
                        name: "taxType",
                        label: "Include",
                        register,
                        checked: isTax && taxType == 0 ? true : false,

                        value: 0,
                        setValue,
                        disabled: !isTax,
                        // onClick: generateTotal
                      },
                    },
                    {
                      containerClass: "mb-0 ",
                      field: {
                        type: Field.radio,
                        className: " !border-[#BFBFBF] focus:!border-primary w-full",
                        id: "taxType2",
                        text: "Sub Total",
                        name: "taxType",
                        label: "Exclude",
                        register,
                        checked: isTax && taxType == 1 ? true : false,

                        value: 1,
                        setValue,
                        disabled: !isTax,
                        // onClick: generateTotal
                      },
                    },
                  ],
                },
              },
            ],
          },
        },

        {
          containerClass: "mb-0 py-2 space-x-5  border-b  border-lightGray",

          field: {
            type: Field.div,
            className: "flex   space-x-5 !h-[45px]",
            id: "div3",
            children: [
              {
                containerClass: "mb-0 px-0  ",
                field: {
                  type: Field.toggleButton,
                  className: " !border-[#BFBFBF] focus:!border-primary ",
                  id: "span-field",
                  name: "isDiscount",
                  checked: false,
                  register,
                  // onClick: generateTotal
                },
              },

              {
                containerClass: "mb-0 border-r border-lightGray pr-2",
                field: {
                  type: Field.span,
                  className: "! !border-[#BFBFBF] focus:!border-primary w-full",
                  id: "span-field",
                  text: "Discount ",
                },
              },

              {
                containerClass: "mb-0 ",
                field: {
                  type: Field.input,
                  className: "!px-1 !border-[#BFBFBF] focus:!border-primary w-full",
                  id: "discountAmount",
                  register,
                  name: "discountAmount",
                  inputType: "number",
                  value: offerDetails?.id && offerDetails?.discountAmount,
                  disabled: !isDiscount,
                  setValue,
                  // onChange: generateTotal
                },
              },
              {
                field: {
                  type: Field.div,
                  className: "",
                  id: "4",
                  children: [
                    {
                      containerClass: "mb-0 ",
                      field: {
                        type: Field.radio,
                        className: " !border-[#BFBFBF] focus:!border-primary w-full",
                        id: "discountType1",
                        text: "Sub Total",
                        name: "discountType",
                        label: "Percent",
                        register,
                        checked: isDiscount && discountType == 1 ? true : false,
                        value: 1,
                        setValue,
                        disabled: !isDiscount,
                        // onClick: generateTotal
                      },
                    },
                    {
                      containerClass: "mb-0 ",
                      field: {
                        type: Field.radio,
                        className: " !border-[#BFBFBF] focus:!border-primary w-full",
                        id: "discountType2",
                        text: "Sub Total",
                        name: "discountType",
                        label: "Amount",
                        checked: isDiscount && discountType == 0 ? true : false,

                        register,
                        value: 0,
                        setValue,
                        disabled: !isDiscount,
                        // onClick: generateTotal
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          containerClass: "mb-0 pt-2",
          field: {
            type: Field.span,
            containerClassName:
              "! !border-[#BFBFBF] focus:!border-primary w-full text-dark font-bold ",
            id: "span-field",
            text: `Grand Total : ${total?.grandTotal.toFixed(2)} CHF`,
          },
        },
      ],
    },
  };

  return calculationFields;
};

export const AddOfferDetailsServiceSubmitFormField: GenerateOffersServiceActionFormField =
  (loading, OnClick) => {
    const formField: FormField[] = [
      {
        containerClass: "mt-10",
        field: {
          type: Field.div,
          id: "div-field",
          className: "flex space-x-[18px] ",
          children: [
            {
              containerClass: "mb-0 mt-[30px]",
              field: {
                type: Field.button,
                id: "buttonBack",
                text: "Back",
                inputType: "button",
                className:
                  "rounded-lg bg-[#fff] px-4 border-[1px] border-[#C7C7C7] w-[152px] h-[50px] text-black hover-bg-none",
                onClick: OnClick,
              },
            },
            {
              containerClass: "mb-0 mt-[30px]",
              field: {
                type: Field.button,
                id: "button",
                text: "Next",
                inputType: "submit",
                className:
                  "rounded-lg bg-[#4A13E7] px-4  w-[152px] h-[50px] text-white hover-bg-none",
                loading,
              },
            },
          ],
        },
      },
    ];

    return formField;
  };
