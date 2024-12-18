import { Field } from "@/enums/form";
import { FormField, GenerateAddTaskFormField } from "@/types";
import { formatAlertTime } from "@/utils/utility";
import { useTranslation } from "next-i18next";
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export const addTaskFormField: GenerateAddTaskFormField = (
  register,
  loading,
  isRemainder,
  count,
  setValue,
  watch,
  control,
  isAllDay,
  colour,
  alertTime,
  trigger,
  date,
  onDateChange
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
        placeholder: `${translate("common.title")}`,
        register,
      },
    },

    {
      containerClass: "mt-0 relative",
      //@ts-expect-error
      field: {
        type: Field.div,
        id: "div-field1",
        className: "grid grid-cols-1 gap-x-3 items-center",
        children: generateDateChildren(
          register,
          setValue,
          watch,
          date,
          isAllDay,
          onDateChange
        ),
      },
    },

    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "flex items-center justify-end gap-x-[6px] mt-[6px] mr-[9px]",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.span,
              id: "span-field",
              containerClassName: "font-semibold",
              text: `${translate("calendar.all_day_event")}`,
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
              text: `${translate("calendar.select_color")}`,
              htmlFor: `colour`,
              className: "mb-3 font-semibold",
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
                    textClassName: "font-semibold",
                    text:
                      (isRemainder && alertTime) || alertTime
                        ? `${formatAlertTime(alertTime)} `
                        : translate("calendar.remainder"),
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
                  containerClass: `mb-0`,
                  field: {
                    type: Field.toggleButton,
                    className: "!border-[#BFBFBF] focus:!border-primary",
                    id: "remainder",
                    name: "remainder",
                    checked: false,
                    register,
                  },
                },
              ],
            },
          },
          {
            containerClass: `mb-0 mt-2 ${isRemainder ? "block" : "hidden"}`,
            field: {
              type: Field.remainderSelectField,
              id: "alertTime",
              name: "alertTime",
              value: isRemainder && alertTime ? alertTime : 15,
              options: [
                {
                  label: translate("common.minutes"),
                  value: 5,
                },
                {
                  label: translate("common.minutes"),
                  value: 15,
                },
                {
                  label: translate("common.minutes"),
                  value: 30,
                },
                {
                  label: translate("common.hour"),
                  value: 60,
                },
                {
                  label: translate("common.hours"),
                  value: 120,
                },
                {
                  label: translate("common.day"),
                  value: 1440,
                },
                {
                  label: translate("common.days"),
                  value: 2880,
                },
                {
                  label: translate("common.days"),
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
              textClassName: "font-semibold",
              text: translate("calendar.location"),
              icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
  <g clip-path="url(#clip0_2433_15842)">
    <path d="M6.88128 1.20117C4.36571 1.20117 2.31909 3.24779 2.31909 5.76336C2.31909 8.92517 6.88577 14.3262 6.88577 14.3262C6.88577 14.3262 11.4435 8.76968 11.4435 5.76336C11.4435 3.24779 9.39693 1.20117 6.88128 1.20117ZM8.25779 7.09917C7.87823 7.47865 7.3798 7.66842 6.88128 7.66842C6.38284 7.66842 5.88425 7.47865 5.50485 7.09917C4.74582 6.34022 4.74582 5.10527 5.50485 4.34624C5.87239 3.97854 6.36129 3.77602 6.88128 3.77602C7.40126 3.77602 7.89009 3.97862 8.25779 4.34624C9.01682 5.10527 9.01682 6.34022 8.25779 7.09917Z" fill="#272727"/>
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
            containerClass: "mb-3",
            field: {
              type: Field.locationSearchInput,
              id: "streetNumber",
              name: "streetNumber",
              setValue,
              control,
            },
          },
          {
            containerClass:
              "mb-0 block xMini:hidden pt-3 border-t border-t-borderColor",
            field: {
              type: Field.iconLabel,
              id: "current_location",
              name: "current_location",
              textClassName: "font-semibold",
              isLocation: true,
              setValue,
              text: translate("calendar.current_location"),
              icon: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
  <g clip-path="url(#clip0_2825_13164)">
    <path d="M11.9582 1.28173L6.88121 13.1499C6.83873 13.2493 6.7667 13.3308 6.67637 13.3817C6.58605 13.4326 6.48253 13.45 6.38201 13.4311C6.28149 13.4123 6.18963 13.3583 6.1208 13.2776C6.05198 13.1968 6.01006 13.0939 6.00161 12.985L5.57238 7.46792L0.423117 7.00802C0.321418 6.99897 0.225386 6.95406 0.150041 6.88032C0.0746958 6.80657 0.024286 6.70816 0.00669542 6.60045C-0.0108951 6.49275 0.00532551 6.38184 0.0528205 6.28506C0.100316 6.18829 0.176407 6.11111 0.269193 6.06559L11.3462 0.626015C11.4318 0.583968 11.5274 0.571 11.6201 0.588854C11.7128 0.606708 11.7982 0.654528 11.8648 0.725893C11.9314 0.797257 11.976 0.88875 11.9927 0.988083C12.0094 1.08742 11.9974 1.18998 11.9582 1.28173Z" fill="#272727"/>
  </g>
  <defs>
    <clipPath id="clip0_2825_13164">
      <rect width="12" height="12.8571" fill="white" transform="translate(0 0.582031)"/>
    </clipPath>
  </defs>
</svg>`,
            },
          },
        ],
      },
    },
    {
      containerClass: "mb-0 bg-white rounded-lg py-[5px] px-[10px]",
      field: {
        type: Field.ckEditor,
        className: `!py-4 !border-[#fff] focus:!border-primary`,
        id: "note",
        name: "note",
        control,
      },
    },
    {
      containerClass:
        "mb-0 absolute right-[35px] bottom-[30px] bg-[#00000014] p-2 rounded-lg",
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

export const generateDateChildren = (
  register: UseFormRegister<FieldValues>,
  setValue: UseFormSetValue<FieldValues>,
  watch: UseFormWatch<FieldValues>,
  date?: { startDate: string; endDate: string }[],
  isAllDay?: boolean,
  onDateChange?: (name: string, value: string) => void
) => {
  return [
    ...((date && date.length > 0 ? date : [{ endDate: "", startDate: "" }]) || [
      { endDate: "", startDate: "" },
    ]),
  ]?.map((item, index) => ({
    containerClass: "mb-0",

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
            id: `date.${index}.startDate`,
            name: `date.${index}.startDate`,
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
        <path d="M16.2825 4.9375H15.4492V3.27083C15.4492 3.04982 15.3614 2.83786 15.2051 2.68158C15.0488 2.5253 14.8369 2.4375 14.6158 2.4375C14.3948 2.4375 14.1829 2.5253 14.0266 2.68158C13.8703 2.83786 13.7825 3.04982 13.7825 3.27083V4.9375H7.11584V3.27083C7.11584 3.04982 7.02805 2.83786 6.87177 2.68158C6.71549 2.5253 6.50353 2.4375 6.28251 2.4375C6.0615 2.4375 5.84954 2.5253 5.69326 2.68158C5.53698 2.83786 5.44918 3.04982 5.44918 3.27083V4.9375H4.61584C3.9528 4.9375 3.31692 5.20089 2.84808 5.66973C2.37924 6.13857 2.11584 6.77446 2.11584 7.4375V8.27083H18.7825V7.4375C18.7825 6.77446 18.5191 6.13857 18.0503 5.66973C17.5814 5.20089 16.9456 4.9375 16.2825 4.9375Z" fill="#4A13E7"/>
        <path d="M2.11584 16.6042C2.11584 17.2672 2.37924 17.9031 2.84808 18.3719C3.31692 18.8408 3.9528 19.1042 4.61584 19.1042H16.2825C16.9456 19.1042 17.5814 18.8408 18.0503 18.3719C18.5191 17.9031 18.7825 17.2672 18.7825 16.6042V9.9375H2.11584V16.6042Z" fill="#4A13E7"/>
      </svg>`,
            dateType: isAllDay ? "date" : "datetime-local",
            value: item.startDate,
            placeholder: translate("common.start_date"),
            register,
            setValue,
            watch,
            onDateChange,
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
            id: `date.${index}.endDate`,
            name: `date.${index}.endDate`,
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
        <path d="M16.2825 4.9375H15.4492V3.27083C15.4492 3.04982 15.3614 2.83786 15.2051 2.68158C15.0488 2.5253 14.8369 2.4375 14.6158 2.4375C14.3948 2.4375 14.1829 2.5253 14.0266 2.68158C13.8703 2.83786 13.7825 3.04982 13.7825 3.27083V4.9375H7.11584V3.27083C7.11584 3.04982 7.02805 2.83786 6.87177 2.68158C6.71549 2.5253 6.50353 2.4375 6.28251 2.4375C6.0615 2.4375 5.84954 2.5253 5.69326 2.68158C5.53698 2.83786 5.44918 3.04982 5.44918 3.27083V4.9375H4.61584C3.9528 4.9375 3.31692 5.20089 2.84808 5.66973C2.37924 6.13857 2.11584 6.77446 2.11584 7.4375V8.27083H18.7825V7.4375C18.7825 6.77446 18.5191 6.13857 18.0503 5.66973C17.5814 5.20089 16.9456 4.9375 16.2825 4.9375Z" fill="#4A13E7"/>
        <path d="M2.11584 16.6042C2.11584 17.2672 2.37924 17.9031 2.84808 18.3719C3.31692 18.8408 3.9528 19.1042 4.61584 19.1042H16.2825C16.9456 19.1042 17.5814 18.8408 18.0503 18.3719C18.5191 17.9031 18.7825 17.2672 18.7825 16.6042V9.9375H2.11584V16.6042Z" fill="#4A13E7"/>
      </svg>`,
            dateType: isAllDay ? "date" : "datetime-local",
            value: item.endDate,
            placeholder: translate("common.end_date"),
            register,
            setValue,
            watch,
            onDateChange,
          },
        },
      ],
    },
  }));
};
