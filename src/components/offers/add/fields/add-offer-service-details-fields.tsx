import { Field } from "@/enums/form";
import { FormField, GenerateOffersFormField } from "@/types";
import icon from "@/assets/svgs/Vector.svg"
import { FieldValues, UseFormRegister } from "react-hook-form";
import { OffersTableRowTypes } from "@/types/offers";

export const AddOfferServiceDetailsFormField: GenerateOffersFormField = (
  register,
  loading,
  control,
  onAddService,
  count,
  service
) => {
  const formField: FormField[] = [];
  for (let i = 0; i < count; i++) {
    formField.push(
      {
        field: {
          type: Field.div,
          id: "div-field",
          className: "grid grid-cols-3 gap-x-3 ",
          children: [
            {
              containerClass: "mb-0 col-span-1",
              label: {
                text: "Service Type",
                htmlFor: "serviceType",
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
                      id: "serviceType",
                      name: "serviceType",
                      register,
                    },
                  },
                  {
                    containerClass: "mb-0",
                    field: {
                      type: Field.radio,
                      value: "Existing Service",
                      label: "Existing Service",
                      id: "serviceType",
                      name: "serviceType",
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
                htmlFor: "serviceTitle",
                className: "mb-[10px]",
              },
              field: {
                className: "!p-4  !border-dark  focus:!border-primary ",
                type: Field.select,
                value: "Versicherung  Lorem Ipsum",
                id: "serviceTitle",
                name: "serviceTitle",
                options: [
                  {
                    value: "Versicherung  Lorem Ipsum",
                    label: "Versicherung  Lorem Ipsum",
                  },
                ],
                control,
              },
            },
          ],
        },
      },

      {
        containerClass: "mt-5 ",
        field: {
          type: Field.div,
          id: "div-field",
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
                      htmlFor: "totalPrice",
                      className: "mb-[10px]",
                    },
                    field: {
                      type: Field.input,
                      className: "!p-4 !border-dark focus:!border-primary ",
                      inputType: "text",
                      id: "price",
                      name: "price",
                      placeholder: "10000 CHF",
                      register,
                    },
                  },
                  {
                    containerClass: "mb-0 col-span-1",
                    label: {
                      text: "Count",
                      htmlFor: "count",
                      className: "mb-[10px]",
                    },
                    field: {
                      type: Field.input,
                      className: "!p-4 !border-dark focus:!border-primary ",
                      inputType: "number",
                      id: "count",
                      name: "count",
                      placeholder: "10",
                      register,
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
                      htmlFor: "unit",
                      className: "mb-[10px]",
                    },
                    field: {
                      type: Field.input,
                      className: "!p-4 !border-dark focus:!border-primary ",
                      inputType: "text",
                      id: "unit",
                      name: "unit",
                      placeholder: "Std. ",
                      register,
                    },
                  },
                  {
                    containerClass: "mb-0 ",
                    label: {
                      text: "Total Price",
                      htmlFor: "totalPrice",
                      className: "mb-[10px]",
                    },
                    field: {
                      type: Field.input,
                      className: "!p-4 !border-dark focus:!border-primary ",
                      inputType: "number",
                      id: "totalPrice",
                      name: "totalPrice",
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
        containerClass:
          "mt-5 mb-0 border-b border-black border-opacity-20 pb-[35px]",
        label: {
          text: "Description",
          htmlFor: "description",
          className: "mb-[10px]",
        },
        field: {
          type: Field.textArea,
          className: "!p-4 !border-dark focus:!border-primary ",
          rows: 4,
          id: "description",
          name: "description",
          placeholder:
            "Kostenübernahme bei Lorem Ipsum dollar smith emit lorem.....",
          register,
        },
      }
    )
  }
  return formField;
};


export const AddOfferServiceDetailsDescriptionFormField: GenerateOffersFormField = (
  register,
  loading,
  control,
  onAddService,
  count,
  service
) => {
  const formField: FormField[] = [
    {
      containerClass: "mt-[30px]",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-2 row-span-2 gap-x-3 ",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Discount Description",
              htmlFor: "description",
              className: "mb-[10px]",
            },
            field: {
              type: Field.textArea,
              className: "!p-4 !border-dark focus:!border-primary ",
              rows: 4,
              id: "description",
              name: "description",
              placeholder:
                "Lorem Ipsum is simply dummy text of the isp ispu printing and typesetting industry. Lorem Ipsum ie has  a been the industry's standard dummyalesl...",
              register,
            },
          },
          generateServiceCalulationChildren(register)


        ],
      },
    },


  ];

  return formField;
};





const generateServiceCalulationChildren = (register: UseFormRegister<FieldValues>) => {

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

                containerClass: "mb-0 px-4 border-r border-lightGray",
                field: {
                  type: Field.span,
                  className: "!p-4  w-full ",
                  id: "span-field",
                  text: "Sub Total"



                },
              }, {

                containerClass: "mb-0 ",
                field: {
                  type: Field.span,
                  className: "!p-4 !border-dark focus:!border-primary w-full",
                  id: "span-field",
                  text: "2000 CHF"



                },
              }

            ]


          },
        },

        {
          containerClass: "mb-0 py-2 space-x-5  border-b  border-lightGray",

          field: {
            type: Field.div,
            className: "flex  space-x-5 !h-[45px]",
            id: "div3",
            children: [
              {

                containerClass: "mb-0 px-8 border-r border-lightGray",
                field: {
                  type: Field.radio,
                  className: " !border-dark focus:!border-primary w-full",
                  id: "span-field",
                  text: "Sub Total",
                  name: "tax",
                  label: "Tax%",
                  checked: false,
                  register,

                },
              }, {

                containerClass: "mb-0 ",
                field: {
                  type: Field.span,
                  className: "! !border-dark focus:!border-primary w-full",
                  id: "span-field",
                  text: "2000 CHF(7.7%)"



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
                        className: " !border-dark focus:!border-primary w-full",
                        id: "span-field",
                        text: "Sub Total",
                        name: "tax",
                        label: "Include",
                        checked: false,
                        register,

                      },
                    },
                    {

                      containerClass: "mb-0 ",
                      field: {
                        type: Field.radio,
                        className: " !border-dark focus:!border-primary w-full",
                        id: "span-field",
                        text: "Sub Total",
                        name: "tax",
                        label: "Exclude",
                        checked: false,
                        register,

                      },
                    },
                   
                  ]

                }
              }

            ]


          },
        },

        {
          containerClass: "mb-0 py-2 space-x-5  border-b  border-lightGray",

          field: {
            type: Field.div,
            className: "flex  space-x-5 !h-[45px]",
            id: "div3",
            children: [
              {

                containerClass: "mb-0 px-8  border-r border-lightGray ",
                field: {
                  type: Field.radio,
                  className: " !border-dark focus:!border-primary w-full ",
                  id: "span-field",
                  text: "Sub Total",
                  name: "tax",
                  label: "Tax%",
                  checked: false,
                  register,

                },
              }, {

                containerClass: "mb-0 ",
                field: {
                  type: Field.span,
                  className: "! !border-dark focus:!border-primary w-full",
                  id: "span-field",
                  text: "2000 CHF(7.7%)"



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
                        className: " !border-dark focus:!border-primary w-full",
                        id: "span-field",
                        text: "Sub Total",
                        name: "tax",
                        label: "Include",
                        checked: false,
                        register,

                      },
                    },
                    {

                      containerClass: "mb-0 ",
                      field: {
                        type: Field.radio,
                        className: " !border-dark focus:!border-primary w-full",
                        id: "span-field",
                        text: "Sub Total",
                        name: "tax",
                        label: "Exclude",
                        checked: false,
                        register,

                      },
                    },
                   
                  ]

                }
              }

            ]


          },
        },
        {

          containerClass: "mb-0 pt-2",
          field: {
            type: Field.span,
            className: "! !border-dark focus:!border-primary w-full text-dark font-bold text-center",
            id: "span-field",
            text: "Grand Total : 2100.50 CHF"



          },
        },
        

      ]


    },
  };


  return calculationFields
};

