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
        id: "div-field",
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
              svg: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M12.2934 10.7609C14.1652 10.7609 15.6826 9.24356 15.6826 7.3718C15.6826 5.50003 14.1652 3.98267 12.2934 3.98267C10.4217 3.98267 8.9043 5.50003 8.9043 7.3718C8.9043 9.24356 10.4217 10.7609 12.2934 10.7609Z" fill="#4A13E7"/>
              <path d="M19.1496 10.7609C20.3329 10.7609 21.2922 9.80168 21.2922 8.61838C21.2922 7.43508 20.3329 6.47583 19.1496 6.47583C17.9663 6.47583 17.0071 7.43508 17.0071 8.61838C17.0071 9.80168 17.9663 10.7609 19.1496 10.7609Z" fill="#4A13E7"/>
              <path d="M5.43723 10.7609C6.62053 10.7609 7.57978 9.80168 7.57978 8.61838C7.57978 7.43508 6.62053 6.47583 5.43723 6.47583C4.25393 6.47583 3.29468 7.43508 3.29468 8.61838C3.29468 9.80168 4.25393 10.7609 5.43723 10.7609Z" fill="#4A13E7"/>
              <path d="M7.54824 12.6848C6.70485 11.9938 5.94105 12.0853 4.96588 12.0853C3.50739 12.0853 2.3208 13.2649 2.3208 14.7144V18.9687C2.3208 19.5983 2.83462 20.1101 3.46648 20.1101C6.19438 20.1101 5.86575 20.1595 5.86575 19.9925C5.86575 16.9779 5.50869 14.7671 7.54824 12.6848Z" fill="#4A13E7"/>
              <path d="M13.221 12.1009C11.5177 11.9588 10.0372 12.1025 8.76018 13.1566C6.6232 14.8683 7.03445 17.173 7.03445 19.9925C7.03445 20.7385 7.64138 21.3567 8.39867 21.3567C16.6215 21.3567 16.9487 21.622 17.4364 20.5422C17.5963 20.177 17.5524 20.293 17.5524 16.7997C17.5524 14.0251 15.1499 12.1009 13.221 12.1009Z" fill="#4A13E7"/>
              <path d="M19.6209 12.0855C18.6404 12.0855 17.8808 11.9949 17.0386 12.685C19.0629 14.7518 18.7211 16.8117 18.7211 19.9926C18.7211 20.1607 18.4483 20.1103 21.0794 20.1103C21.7339 20.1103 22.266 19.5801 22.266 18.9284V14.7146C22.266 13.265 21.0794 12.0855 19.6209 12.0855Z" fill="#4A13E7"/>
            </svg>`,
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
              className: "!border-dark  focus:!border-primary ",
              type: Field.select,
              value: "Please Select Lead",
              id: "selectLead",
              name: "selectLead",

              options: [{ value: "Reason", label: "Mateen Nawaz(R-1)" }],
              svg: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M16.3952 7.47788C15.1093 7.47788 14.0668 6.43541 14.0668 5.14946C14.0668 3.86351 15.1093 2.82104 16.3952 2.82104C17.6812 2.82104 18.7236 3.86351 18.7236 5.14946C18.7236 6.43541 17.6812 7.47788 16.3952 7.47788Z" fill="#8F8F8F"/>
              <path d="M8.2458 7.47788C6.95986 7.47788 5.91739 6.43541 5.91739 5.14946C5.91739 3.86351 6.95986 2.82104 8.2458 2.82104C9.53175 2.82104 10.5742 3.86351 10.5742 5.14946C10.5742 6.43541 9.53175 7.47788 8.2458 7.47788Z" fill="#8F8F8F"/>
              <path d="M4.17033 12.1343H20.4692V13.6015L14.6482 17.6762V22.6898L9.99137 21.1373V17.6762L4.17033 13.6015V12.1343Z" fill="#8F8F8F"/>
              <path d="M19.8877 10.9702H12.9024C12.9024 9.04421 14.4691 7.47754 16.3951 7.47754C18.321 7.47754 19.8877 9.04421 19.8877 10.9702Z" fill="#8F8F8F"/>
              <path d="M11.7383 10.9702H4.75303C4.75303 9.04421 6.31971 7.47754 8.24566 7.47754C10.1716 7.47754 11.7383 9.04421 11.7383 10.9702Z" fill="#8F8F8F"/>
            </svg>`,
              control,
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
        options: [{ value: "Reason", label: "Mateen Nawaz(R-1)" }],
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" viewBox="0 0 17 21" fill="none">
        <path d="M2.29318 20.821H14.2672C15.2576 20.821 16.0633 20.0153 16.0633 19.0248V6.37227H11.8724C10.882 6.37227 10.0763 5.56658 10.0763 4.57617V0.385254H2.29318C1.30276 0.385254 0.49707 1.19095 0.49707 2.18136V19.0248C0.49707 20.0153 1.30276 20.821 2.29318 20.821ZM4.68798 8.807H11.8724C12.2033 8.807 12.4711 9.07478 12.4711 9.4057C12.4711 9.73662 12.2033 10.0044 11.8724 10.0044H4.68798C4.35706 10.0044 4.08928 9.73662 4.08928 9.4057C4.08928 9.07478 4.35706 8.807 4.68798 8.807ZM4.68798 11.2018H11.8724C12.2033 11.2018 12.4711 11.4696 12.4711 11.8005C12.4711 12.1314 12.2033 12.3992 11.8724 12.3992H4.68798C4.35706 12.3992 4.08928 12.1314 4.08928 11.8005C4.08928 11.4696 4.35706 11.2018 4.68798 11.2018ZM4.68798 13.5966H11.8724C12.2033 13.5966 12.4711 13.8644 12.4711 14.1953C12.4711 14.5262 12.2033 14.794 11.8724 14.794H4.68798C4.35706 14.794 4.08928 14.5262 4.08928 14.1953C4.08928 13.8644 4.35706 13.5966 4.68798 13.5966ZM4.68798 15.9914H9.4776C9.80852 15.9914 10.0763 16.2592 10.0763 16.5901C10.0763 16.921 9.80852 17.1888 9.4776 17.1888H4.68798C4.35706 17.1888 4.08928 16.921 4.08928 16.5901C4.08928 16.2592 4.35706 15.9914 4.68798 15.9914Z" fill="#8F8F8F"/>
      </svg>`,
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
      containerClass: "mt-[44px] mb-0",
      field: {
        type: Field.button,
        id: "button",
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
