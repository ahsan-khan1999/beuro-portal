import { Field } from "@/enums/form";
import { FormField, GenerateLeadAddressFormField, GenerateOffersFormField } from "@/types";
import { ComponentsType } from "../AddOffersDetailsData";
import { staticEnums } from "@/utils/static";
import icon from "@/assets/svgs/Vector.svg"
import { Fields } from '@/enums';
import { useTranslation } from "next-i18next";
export const addressObject = {
  streetNumber:"",
  postalCode:"",
  country:"",
  description:""
}
export const AddOffAddressDetailsFormField: GenerateLeadAddressFormField = (
  register,
  loading,
  control,
  onHandleBack,
  count,
  handleAddNewAddress,
  handleRemoveAddress,
  fields
) => {
  const formField: FormField[] = [];
  const { t: translate } = useTranslation();

  if(!fields) return null;
  for (let i = 0; i < count; i++) {
    formField.push(
      {
        containerClass: "mt-6 ",
        label: {
          text: `Address ${i} Details`,
          htmlFor: `address-${i}-details`,
          className: "mb-[10px] text-[#8F8F8F]",
        },
        field: {
          type: Field.div,
          id: `div-field-${i}`,
          className: "grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5",
          children: [
            {
              containerClass: "mb-0 ",
              label: {
                text: translate("offers.address_details.street_no"),
                htmlFor: `address.${i}.streetNumber`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-dark  focus:!border-primary ",
                inputType: "text",
                id: `address.${i}.streetNumber`,
                name: `address.${i}.streetNumber`,
                placeholder: `Zweibrückenstraße, ${i}`,
                register,
              },
            },
            {
              containerClass: "mb-0 ",
              label: {
                text: translate("offers.address_details.post_code"),
                htmlFor: `address.${i}.postalCode`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-dark  focus:!border-primary ",
                inputType: "text",
                id: `address.${i}.postalCode`,
                name: `address.${i}.postalCode`,
                placeholder: `123${i}`,
                register,
              },
            },
            {
              containerClass: "mb-0",
              label: {
                text: translate("offers.address_details.country"),
                htmlFor: `address.${i}.country`,
                className: "mb-[10px]",
              },
              field: {
                className: "pl-4  min-h-[54px] !border-dark  ",
                type: Field.select,
                id: `address.${i}.country`,
                name: `address.${i}.country`,
                options: Object.keys(staticEnums.Country).map((item) => (
                  {
                    value: item,
                    label: item
                  }
                )),
                control,
                value: ""

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
          className: "grid grid-cols-1 relative w-full space-x-[18px] ",
          children: [
            {
              containerClass: "mt-5 mb-0 pb-10  border-b-2 border-lightGray",
              label: {
                text: translate("offers.address_details.description"),
                htmlFor: `address.${i}.description`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.textArea,
                className: "!p-4 !border-dark  focus:!border-primary ",
                rows: 4,
                id: `address.${i}.description`,
                name: `address.${i}.description`,
                placeholder:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s",
                register,
              },
            },
            {
              containerClass: "mb-0 absolute -top-44 right-0",
              field: {
                type: Field.button,
                id: "button",
                text: "Remove",
                inputType: "button",
                className:
                  `rounded-none  p-2 bg-red !h-[30px] text-white hover-bg-none mt-1 ${i === 0 && 'hidden'}`,
                onClick: () =>handleRemoveAddress && handleRemoveAddress(i)
              },
            },
          ]
        }
      }


    );
  }

  formField.push(
    {
      containerClass: "mt-10",
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex space-x-[18px] ",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("offers.address_details.back_button")}`,
              inputType: "button",
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px] text-dark hover-bg-none",
              onClick: onHandleBack && onHandleBack,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("offers.address_details.next_button")}`,
              inputType: "submit",
              className:
                "rounded-lg px-4 w-[152px] h-[50px] text-white hover-bg-none",
              loading
            },
          },

          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              className:
                ` absolute right-10 rounded-lg border-[1px] border-[#4B4B4B] bg-[#fff] m-1 px-4   h-[40px] text-white hover-bg-none`,
              onClick: () => handleAddNewAddress && handleAddNewAddress(addressObject),
              icon: icon,
              name: "",

              // icon
            },
          },


        ],
      },
    }
  );

  return formField;
};


// export const testFormat: GenerateLeadAddressFormField = (
//   register,
//   loading,
//   control,
//   onHandleBack,
//   count,
//   handleAddNewAddress,
//   handleRemoveAddress,
//   fieldArray
// ) => {
//   if (!fieldArray) return null
//   const formField: FormField[] = [];

//   return [

//     ...fieldArray.map((_, index: number) => (

//       {
//         containerClass: "mt-6 ",
//         label: {
//           text: `Address ${index + 1} Details`,
//           htmlFor: `address-${index + 1}-details`,
//           className: "mb-[10px] text-[#8F8F8F]",
//         },
//         field: {
//           type: Field.div,
//           id: `div-field-${index + 1}`,
//           className: "grid grid-cols-3 gap-x-3",
//           children: [
//             {
//               containerClass: "mb-0 ",
//               label: {
//                 text: "Street NO.",
//                 htmlFor: `streetNumber-${index + 1}`,
//                 className: "mb-[10px]",
//               },
//               field: {
//                 type: Field.input,
//                 className: "!p-4 !border-dark  focus:!border-primary ",
//                 inputType: "text",
//                 id: `streetNumber-${index + 1}`,
//                 name: `streetNumber-${index + 1}`,
//                 placeholder: `Zweibrückenstraße, ${index + 1}`,
//                 register,
//               },
//             },
//             {
//               containerClass: "mb-0 ",
//               label: {
//                 text: "Post Code",
//                 htmlFor: `postalCode-${index + 1}`,
//                 className: "mb-[10px]",
//               },
//               field: {
//                 type: Field.input,
//                 className: "!p-4 !border-dark  focus:!border-primary ",
//                 inputType: "text",
//                 id: `postalCode-${index + 1}`,
//                 name: `postalCode-${index + 1}`,
//                 placeholder: `123${index + 1}`,
//                 register,
//               },
//             },
//             {
//               containerClass: "mb-0",
//               label: {
//                 text: "Country",
//                 htmlFor: `country-${index + 1}`,
//                 className: "mb-[10px]",
//               },
//               field: {
//                 className: "pl-4  min-h-[54px] !border-dark  ",
//                 type: Field.select,
//                 id: `country-${index + 1}`,
//                 name: `country-${index + 1}`,
//                 options: Object.keys(staticEnums.Country).map((item) => ({
//                   value: item,
//                   label: item,
//                 })),
//                 control,
//                 value: "",
//               },
//             },
//           ],
//         },
//       }

//     ),

//     {
//       containerClass: "mt-6",
//       field: {
//         type: Field.div,
//         id: "div-field",
//         className: "grid grid-cols-1 relative w-full space-x-[18px] ",
//         children: [
//           {
//             containerClass: "mt-5 mb-0 pb-10  border-b-2 border-lightGray",
//             label: {
//               text: "Description",
//               htmlFor: `description-${index}`,
//               className: "mb-[10px]",
//             },
//             field: {
//               type: Field.textArea,
//               className: "!p-4 !border-dark  focus:!border-primary ",
//               rows: 4,
//               id: `description-${index}`,
//               name: `description-${index}`,
//               placeholder:
//                 "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s",
//               register,
//             },
//           },
//           {
//             containerClass: "mb-0 absolute top-52 right-0",
//             field: {
//               type: Field.button,
//               id: "button",
//               text: "Remove",
//               inputType: "button",
//               className:
//                 `rounded-none  p-2 bg-red !h-[30px] text-white hover-bg-none  ${index === 1 && 'hidden'}`,
//               onClick: handleRemoveAddress && handleRemoveAddress
//             },
//           },
//         ]
//       }
//     },

//     ),
//     {
//       containerClass: "mt-10",
//       field: {
//         type: Field.div,
//         id: "div-field",
//         className: "flex space-x-[18px] ",
//         children: [
//           {
//             containerClass: "mb-0",
//             field: {
//               type: Field.button,
//               id: "button",
//               text: "Back",
//               inputType: "button",
//               className:
//                 "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px] text-dark hover-bg-none",
//               onClick: onHandleBack && onHandleBack,
//             },
//           },
//           {
//             containerClass: "mb-0",
//             field: {
//               type: Field.button,
//               id: "button",
//               text: "Next",
//               inputType: "submit",
//               className:
//                 "rounded-lg px-4 w-[152px] h-[50px] text-white hover-bg-none",
//               loading,
//             },
//           },
//           {
//             containerClass: "mb-0",
//             field: {
//               type: Field.button,
//               id: "button",
//               className: ` absolute right-10 rounded-lg border-[1px] border-[#4B4B4B] bg-[#fff] m-1 px-4   h-[40px] text-white hover-bg-none`,
//               onClick: handleAddNewAddress && handleAddNewAddress,
//               icon: icon,
//               name: "",
//             },
//           },
//         ],
//       },
//     },
//   ];
// }