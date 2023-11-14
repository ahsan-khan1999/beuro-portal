import { Field } from "@/enums/form";
import { FormField, GenerateFollowUpFormField } from "@/types";

export const AddFollowUpFormField: GenerateFollowUpFormField = (
  register,
  loading,
  control
) => {
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        className: "grid grid-cols-2 gap-x-[41px] gap-y-5",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Select Customers*",
              htmlFor: "selectCustomer",
              className: "mb-[12px]",
            },
            field: {
              className: "!border-dark  focus:!border-primary ",
              type: Field.select,
              value: "Rahal Ahmed",
              id: "selectCustomer",
              name: "selectCustomer",
              options: [{ value: "Rahal Ahmed", label: "Rahal Ahmed" }],
              control,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Enter Title*",
              htmlFor: "title",
              className: "mb-[12px]",
            },
            field: {
              type: Field.input,
              className: `!border-dark focus:!border-primary 
                !border-light
              `,
              inputType: "text",
              id: "title",
              name: "title",
              placeholder: "Offerten Follow up",
              svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
              <path d="M18.0446 6.29277C17.6488 5.89667 17.0196 5.87177 16.5941 6.21849C16.5325 6.26863 16.5802 6.22445 15.6433 7.16134L18.0753 9.59332L18.9493 8.7302C19.3719 8.30762 19.3719 7.62005 18.9493 7.19743L18.0446 6.29277Z" fill="#8F8F8F"/>
              <path d="M10.656 12.1944L9.22541 15.2599C9.12906 15.4665 9.17216 15.7112 9.33329 15.8723C9.49441 16.0335 9.73921 16.0765 9.94565 15.9802L13.0112 14.5496C13.1325 14.4929 12.7653 14.8366 17.3039 10.3547L14.8768 7.92749C10.3768 12.4275 10.7137 12.0707 10.656 12.1944Z" fill="#8F8F8F"/>
              <path d="M13.9244 15.2156C13.7916 15.3466 13.6387 15.453 13.4697 15.5319L10.4042 16.9625C9.80133 17.2438 9.06487 17.1367 8.56715 16.6388C8.08553 16.1573 7.95544 15.419 8.24345 14.8017L9.67405 11.7361C9.7544 11.564 9.86329 11.4085 9.99765 11.2741L14.6063 6.66549V2.07348C14.6063 1.17706 13.877 0.447754 12.9806 0.447754H2.39526C1.49883 0.447754 0.769531 1.17706 0.769531 2.07348V17.3192C0.769531 18.2156 1.49883 18.945 2.39526 18.945H12.9806C13.877 18.945 14.6063 18.2156 14.6063 17.3192V14.5421L13.9244 15.2156ZM3.65975 3.95211H11.7523C12.0516 3.95211 12.2942 4.19474 12.2942 4.49402C12.2942 4.79329 12.0516 5.03593 11.7523 5.03593H3.65975C3.36048 5.03593 3.11784 4.79329 3.11784 4.49402C3.11784 4.19474 3.36048 3.95211 3.65975 3.95211ZM3.65975 6.84229H10.0182C10.3174 6.84229 10.5601 7.08492 10.5601 7.3842C10.5601 7.68348 10.3174 7.92611 10.0182 7.92611H3.65975C3.36048 7.92611 3.11784 7.68348 3.11784 7.3842C3.11784 7.08492 3.36048 6.84229 3.65975 6.84229ZM3.11784 10.2744C3.11784 9.97511 3.36048 9.73248 3.65975 9.73248H8.28405C8.58333 9.73248 8.82596 9.97511 8.82596 10.2744C8.82596 10.5737 8.58333 10.8163 8.28405 10.8163H3.65975C3.36048 10.8163 3.11784 10.5737 3.11784 10.2744Z" fill="#8F8F8F"/>
            </svg>`,
              register,
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: "Select Lead*",
              htmlFor: "selectLead",
              className: "mb-[12px]",
            },
            field: {
              type: Field.input,
              className: `!border-dark focus:!border-primary 
                !border-light
              `,
              inputType: "text",
              id: "selectLead",
              name: "selectLead",
              placeholder: "Enter Leads",
              svg: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M16.3952 7.47788C15.1093 7.47788 14.0668 6.43541 14.0668 5.14946C14.0668 3.86351 15.1093 2.82104 16.3952 2.82104C17.6812 2.82104 18.7236 3.86351 18.7236 5.14946C18.7236 6.43541 17.6812 7.47788 16.3952 7.47788Z" fill="#8F8F8F"/>
              <path d="M8.2458 7.47788C6.95986 7.47788 5.91739 6.43541 5.91739 5.14946C5.91739 3.86351 6.95986 2.82104 8.2458 2.82104C9.53175 2.82104 10.5742 3.86351 10.5742 5.14946C10.5742 6.43541 9.53175 7.47788 8.2458 7.47788Z" fill="#8F8F8F"/>
              <path d="M4.17033 12.1343H20.4692V13.6015L14.6482 17.6762V22.6898L9.99137 21.1373V17.6762L4.17033 13.6015V12.1343Z" fill="#8F8F8F"/>
              <path d="M19.8877 10.9702H12.9024C12.9024 9.04421 14.4691 7.47754 16.3951 7.47754C18.321 7.47754 19.8877 9.04421 19.8877 10.9702Z" fill="#8F8F8F"/>
              <path d="M11.7383 10.9702H4.75303C4.75303 9.04421 6.31971 7.47754 8.24566 7.47754C10.1716 7.47754 11.7383 9.04421 11.7383 10.9702Z" fill="#8F8F8F"/>
            </svg>`,
              register,
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: "Follow up Date and time*",
              htmlFor: "dateAndTime",
              className: "mb-[12px]",
            },
            field: {
              type: Field.date,
              className: `!border-dark focus:!border-primary 
                !border-light
              `,
              id: "dateAndTime",
              name: "dateAndTime",
              value: "22:10:06,  12 September 2023",

              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "mt-5",
      label: {
        text: "Follow up type",
        htmlFor: "followUpType",
        className: "mb-[12px]",
      },
      field: {
        className: "!border-dark  focus:!border-primary ",
        type: Field.select,
        value: "Reason",
        id: "followUpType",
        name: "followUpType",
        options: [{ value: "Reason", label: "Reason" }],
        control,
      },
    },

    {
      containerClass: "mt-5",
      label: {
        text: "Additional Details",
        htmlFor: "addititionalDetails",
        className: "mb-[12px]",
      },
      field: {
        type: Field.textArea,
        className: `!border-dark focus:!border-primary 
          !border-light
        `,
        rows: 5,
        id: "addititionalDetails",
        name: "addititionalDetails",
        placeholder: "Lorem ipsum dollar smith emit dloar lorep smith emi",

        register,
      },
    },

    {
      containerClass: "mt-[30px] mb-0",
      field: {
        type: Field.button,
        text: "Save",
        inputType: "submit",
        className:
          "rounded-lg p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
        loading,
      },
    },
  ];
  return formField;
};
