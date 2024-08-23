import { Field } from "@/enums/form";
import { FormField, GenerateAddTaskFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const addTaskFormField: GenerateAddTaskFormField = (
  register,
  loading,
  isRemainder,
  startDate,
  endDate,
  setValue,
  colour,
  alertTime,
  control,
  trigger
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "mb-0 bg-white rounded-lg py-[5px] px-[10px]",
      field: {
        type: Field.input,
        className: "!p-4 !border-[#fff] focus:!border-primary",
        inputType: "text",
        id: "title",
        name: "title",
        placeholder: "Meet the Alex tomorrow",
        register,
      },
    },

    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "flex justify-between bg-white rounded-lg py-[5px] px-[10px] mt-[14px]",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.calendarDatePicker,
              className: `!py-4`,
              id: "startDate",
              name: "startDate",
              svg: `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
      <path d="M16.2825 4.9375H15.4492V3.27083C15.4492 3.04982 15.3614 2.83786 15.2051 2.68158C15.0488 2.5253 14.8369 2.4375 14.6158 2.4375C14.3948 2.4375 14.1829 2.5253 14.0266 2.68158C13.8703 2.83786 13.7825 3.04982 13.7825 3.27083V4.9375H7.11584V3.27083C7.11584 3.04982 7.02805 2.83786 6.87177 2.68158C6.71549 2.5253 6.50353 2.4375 6.28251 2.4375C6.0615 2.4375 5.84954 2.5253 5.69326 2.68158C5.53698 2.83786 5.44918 3.04982 5.44918 3.27083V4.9375H4.61584C3.9528 4.9375 3.31692 5.20089 2.84808 5.66973C2.37924 6.13857 2.11584 6.77446 2.11584 7.4375V8.27083H18.7825V7.4375C18.7825 6.77446 18.5191 6.13857 18.0503 5.66973C17.5814 5.20089 16.9456 4.9375 16.2825 4.9375Z" fill="#4A13E7"/>
      <path d="M2.11584 16.6042C2.11584 17.2672 2.37924 17.9031 2.84808 18.3719C3.31692 18.8408 3.9528 19.1042 4.61584 19.1042H16.2825C16.9456 19.1042 17.5814 18.8408 18.0503 18.3719C18.5191 17.9031 18.7825 17.2672 18.7825 16.6042V9.9375H2.11584V16.6042Z" fill="#4A13E7"/>
    </svg>`,
              dateType: "datetime-local",
              value: startDate,
              register,
              setValue,
            },
          },
          {
            containerClass: "border-r border-[#000] border-opacity-30",
            field: {
              type: Field.span,
              id: "border",
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.calendarDatePicker,
              className: `!py-4`,
              id: "endDate",
              name: "endDate",
              svg: `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
      <path d="M16.2825 4.9375H15.4492V3.27083C15.4492 3.04982 15.3614 2.83786 15.2051 2.68158C15.0488 2.5253 14.8369 2.4375 14.6158 2.4375C14.3948 2.4375 14.1829 2.5253 14.0266 2.68158C13.8703 2.83786 13.7825 3.04982 13.7825 3.27083V4.9375H7.11584V3.27083C7.11584 3.04982 7.02805 2.83786 6.87177 2.68158C6.71549 2.5253 6.50353 2.4375 6.28251 2.4375C6.0615 2.4375 5.84954 2.5253 5.69326 2.68158C5.53698 2.83786 5.44918 3.04982 5.44918 3.27083V4.9375H4.61584C3.9528 4.9375 3.31692 5.20089 2.84808 5.66973C2.37924 6.13857 2.11584 6.77446 2.11584 7.4375V8.27083H18.7825V7.4375C18.7825 6.77446 18.5191 6.13857 18.0503 5.66973C17.5814 5.20089 16.9456 4.9375 16.2825 4.9375Z" fill="#4A13E7"/>
      <path d="M2.11584 16.6042C2.11584 17.2672 2.37924 17.9031 2.84808 18.3719C3.31692 18.8408 3.9528 19.1042 4.61584 19.1042H16.2825C16.9456 19.1042 17.5814 18.8408 18.0503 18.3719C18.5191 17.9031 18.7825 17.2672 18.7825 16.6042V9.9375H2.11584V16.6042Z" fill="#4A13E7"/>
    </svg>`,
              dateType: "datetime-local",
              value: endDate,
              register,
              setValue,
            },
          },
        ],
      },
    },

    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex items-center justify-end gap-x-[6px] mt-[6px]",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.span,
              id: "span-field",
              text: `All-day event`,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.toggleButton,
              className: "!border-[#BFBFBF] focus:!border-primary",
              id: "isAllDay",
              name: "isAllDay",
              checked: false,
              register,
            },
          },
        ],
      },
    },

    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "bg-white rounded-lg pt-[10px] pb-[14px] px-[10px] mt-[14px]",
        children: [
          // {
          //   field: {
          //     type: Field.div,
          //     id: "div-field",
          //     className:
          //       "flex items-center gap-x-[6px] border-b border-b-[#000] border-opacity-30 pb-[14px]",
          //     children: [
          //       {
          //         containerClass: "mb-0",
          //         field: {
          //           type: Field.span,
          //           id: "span-field",
          //           containerClassName:
          //             "bg-primary h-[10px] w-[10px] rounded-full",
          //         },
          //       },
          //       {
          //         containerClass: "mb-0",
          //         field: {
          //           type: Field.span,
          //           id: "span-field",
          //           text: `All-day event`,
          //           containerClassName: "text-[#272727] text-sm font-medium",
          //         },
          //       },
          //     ],
          //   },
          // },
          {
            containerClass: "mb-0 mt-2",
            label: {
              text: `Select Color`,
              htmlFor: `colour`,
              className: "mb-3",
            },
            field: {
              type: Field.colourSelectField,
              id: "colour",
              name: "colour",
              value: colour,
              options: [
                "#FF005C",
                "#6F65E8",
                "#5CDD42",
                "#0400B7",
                "#FC744B",
                "#65C9E8",
                "#9B9B9B",
                "#4A13E7",
                "#FA00FF",
                "#c4c4c4",
              ],
              control,
            },
          },
        ],
      },
    },
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "bg-white rounded-lg pt-[10px] pb-[14px] px-[10px] mt-[14px]",
        children: [
          {
            field: {
              type: Field.div,
              id: "div-field",
              className: "flex items-center justify-between",
              children: [
                {
                  field: {
                    type: Field.iconLabel,
                    id: "remainder",
                    name: "remainder",
                    text: `Reminder`,
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
        <g clip-path="url(#clip0_2433_15874)">
          <path d="M12.0803 10.6364C11.2613 9.89092 10.7917 8.80126 10.7917 7.64684V6.02051C10.7917 3.96776 9.37579 2.26851 7.54171 1.98384V1.35384C7.54171 1.03126 7.29904 0.770508 7.00004 0.770508C6.70104 0.770508 6.45837 1.03126 6.45837 1.35384V1.98384C4.62375 2.26851 3.20837 3.96776 3.20837 6.02051V7.64684C3.20837 8.80126 2.73875 9.89092 1.91487 10.6411C1.70417 10.8353 1.58337 11.1177 1.58337 11.4163C1.58337 11.9793 2.00858 12.4372 2.53129 12.4372H11.4688C11.9915 12.4372 12.4167 11.9793 12.4167 11.4163C12.4167 11.1177 12.2959 10.8353 12.0803 10.6364Z" fill="#272727"/>
          <path d="M7.00009 14.7705C7.98105 14.7705 8.80168 14.0174 8.99018 13.0205H5.01001C5.19851 14.0174 6.01913 14.7705 7.00009 14.7705Z" fill="#272727"/>
        </g>
        <defs>
          <clipPath id="clip0_2433_15874">
            <rect width="13" height="14" fill="white" transform="translate(0.5 0.770508)"/>
          </clipPath>
        </defs>
      </svg>`,
                  },
                },
                {
                  containerClass: `mb-0 ${!isRemainder ? "block" : "hidden"}`,
                  field: {
                    type: Field.toggleButton,
                    className: "!border-[#BFBFBF] focus:!border-primary",
                    id: "remainder",
                    name: "remainder",
                    checked: alertTime ? true : false,
                    register,
                  },
                },
                {
                  containerClass: `mb-0 ${isRemainder ? "block" : "hidden"}`,
                  field: {
                    type: Field.span,
                    id: "span-field",
                    text: `Done`,
                  },
                },
              ],
            },
          },
          {
            containerClass: `mb-0 mt-2 ${
              alertTime || isRemainder ? "block" : "hidden"
            }`,
            field: {
              type: Field.remainderSelectField,
              id: "alertTime",
              name: "alertTime",
              value: 15,
              options: [
                {
                  label: "Event Time",
                  value: 0,
                },
                {
                  label: "Minutes",
                  value: 5,
                },
                {
                  label: "Minutes",
                  value: 15,
                },
                {
                  label: "Minutes",
                  value: 30,
                },
                {
                  label: "Hour",
                  value: 60,
                },
                {
                  label: "Hours",
                  value: 120,
                },
                {
                  label: "Day",
                  value: 1440,
                },
                {
                  label: "Day",
                  value: 2880,
                },
                {
                  label: "Day",
                  value: 10080,
                },
              ],
              control,
            },
          },
        ],
      },
    },

    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "bg-white rounded-lg pt-[5px] pb-[10px] px-[10px] my-[14px]",
        children: [
          {
            containerClass: "mb-3",
            field: {
              type: Field.iconLabel,
              id: "address",
              name: "address",
              text: `Address`,
              icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
  <g clip-path="url(#clip0_2433_15842)">
    <path d="M6.88128 1.20117C4.36571 1.20117 2.31909 3.24779 2.31909 5.76336C2.31909 8.92517 6.88577 14.3262 6.88577 14.3262C6.88577 14.3262 11.4435 8.76968 11.4435 5.76336C11.4435 3.24779 9.39693 1.20117 6.88128 1.20117ZM8.25779 7.09917C7.87823 7.47865 7.3798 7.66842 6.88128 7.66842C6.38284 7.66842 5.88425 7.47865 5.50485 7.09917C4.74582 6.34022 4.74582 5.10527 5.50485 4.34624C5.87239 3.97854 6.36129 3.77602 6.88128 3.77602C7.40126 3.77602 7.89009 3.97862 8.25779 4.34624C9.01682 5.10527 9.01682 6.34022 8.25779 7.09917Z" fill="#616161"/>
  </g>
  <defs>
    <clipPath id="clip0_2433_15842">
      <rect width="14" height="14" fill="white" transform="translate(0 0.770508)"/>
    </clipPath>
  </defs>
</svg>`,
            },
          },
          {
            containerClass: "mb-2",
            field: {
              type: Field.input,
              className: "!p-4 !border-[#D7D7D7] focus:!border-primary",
              inputType: "text",
              id: "streetNumber",
              name: "streetNumber",
              placeholder: "Add Street No.",
              register,
            },
          },
          {
            containerClass: "mb-2",
            field: {
              type: Field.input,
              className: "!p-4 !border-[#D7D7D7] focus:!border-primary",
              inputType: "text",
              id: "postalCode",
              name: "postalCode",
              placeholder: "Add Post Code",
              register,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.input,
              className: "!p-4 !border-[#D7D7D7] focus:!border-primary",
              inputType: "text",
              id: "country",
              name: "country",
              placeholder: "Country",
              register,
            },
          },
        ],
      },
    },
    {
      containerClass: "mb-0 bg-white rounded-lg py-[5px] px-[10px]",
      field: {
        type: Field.textArea,
        className: `!py-4 !border-[#fff] focus:!border-primary`,
        rows: 3,
        id: "note",
        name: "note",
        placeholder: "Type your message here",
        //         svg: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
        //   <path fill-rule="evenodd" clip-rule="evenodd" d="M2.69948 0.818359C1.89073 0.863731 1.38017 0.992606 1.01415 1.35863C0.449219 1.92356 0.449219 2.14665 0.449219 3.42836V7.28597C0.449219 9.10443 0.449219 10.0137 1.01415 10.5786C1.57908 11.1436 2.48832 11.1436 4.3068 11.1436H8.16439C9.98286 11.1436 10.8921 11.1436 11.457 10.5786C12.022 10.0137 12.022 9.10443 12.022 7.28597V3.42836C12.022 2.1904 12.022 1.92356 11.457 1.35863C11.091 0.992606 10.5805 0.863731 9.77172 0.818359C9.147 0.818359 8.58514 0.818359 7.51987 0.818359H4.3068C3.24156 0.818359 5.48223 0.818359 4.3068 0.818359H2.69948ZM2.53874 3.75094C2.53874 3.48464 2.75463 3.26874 3.02094 3.26874H9.45025C9.71655 3.26874 9.93245 3.48464 9.93245 3.75094C9.93245 4.01724 9.71655 4.23314 9.45025 4.23314H3.02094C2.75463 4.23314 2.53874 4.01724 2.53874 3.75094ZM3.18168 6.0012C3.18168 5.7349 3.39757 5.519 3.66387 5.519H8.80732C9.07362 5.519 9.28952 5.7349 9.28952 6.0012C9.28952 6.2675 9.07362 6.4834 8.80732 6.4834H3.66387C3.39757 6.4834 3.18168 6.2675 3.18168 6.0012ZM3.82461 8.25146C3.82461 7.98516 4.0405 7.76926 4.3068 7.76926H8.16439C8.43069 7.76926 8.64659 7.98516 8.64659 8.25146C8.64659 8.51776 8.43069 8.73366 8.16439 8.73366H4.3068C4.0405 8.73366 3.82461 8.51776 3.82461 8.25146Z" fill="#616161"/>
        // </svg>`,
        register,
      },
    },
    {
      containerClass: "mb-0 mt-[14px] flex items-center justify-end",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate("common.save_button")}`,
        inputType: "submit",
        className:
          "rounded-lg text-white hover:bg-none w-fit min-w-[84px] py-2 !h-[33px] ",
        loading: false,
      },
    },
  ];

  return formField;
};
