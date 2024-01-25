import { Field } from "@/enums/form";
import { getQrObject } from "@/hooks/setting/useQRSettings";
import {
  FormField,
  GenerateChangeMailSettingFormField,
  GenerateQRCodeSettingFormField,
} from "@/types";
import { useTranslation } from "next-i18next";

export const QRCodeSettingsFields: GenerateQRCodeSettingFormField = (
  register,
  loading,
  append,
  remove,
  count,
  user,
  handleOnChangeStatus
) => {
  const { t: translate } = useTranslation();
  let formField: FormField[] = [];
  let totalCount = count;
  for (let i = 0; i < count; i++) {
    let indexValue = i;
    formField.push({
      containerClass: "",
      field: {
        type: Field.div,
        id: `QrCodeDetail_${i}`,
        children: [
          {
            containerClass: "mt-6",
            field: {
              type: Field.div,
              id: "div-field",
              className: "grid grid-cols-1 lg:grid-cols-1 gap-y-5 lg:gap-x-5",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    value: "1",
                    id: `QrCodeDetail.${i}.QrCodeStatus`,
                    type: Field.radio,
                    label: `${translate(
                      "setting.qr_settings.company_info"
                    )} ${++indexValue}`,
                    // checked: true,
                    name: `QrCodeDetail.${i}.QrCodeStatus`,
                    register,
                    fieldIndex: i,
                    onChange: () =>
                      handleOnChangeStatus &&
                      handleOnChangeStatus(i?.toString(), "1"),
                  },
                },
              ],
            },
          },
          {
            containerClass: " mt-6",
            field: {
              type: Field.div,
              id: "div-field",
              className: "grid grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-5",
              children: [
                {
                  containerClass: "mb-0",
                  label: {
                    text: `${translate("setting.qr_settings.company_name")}`,
                    htmlFor: `QrCodeDetail.${i}.companyName`,
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                    inputType: "text",
                    id: `QrCodeDetail.${i}.companyName`,
                    name: `QrCodeDetail.${i}.companyName`,
                    placeholder: `${translate(
                      "admin.settings.placeholders.mail_driver"
                    )}`,
                    register,
                    disabled: i === 0 ? true : false,
                  },
                },
                {
                  containerClass: "mb-0",
                  label: {
                    text: `${translate("setting.qr_settings.iban_number")}`,
                    htmlFor: `QrCodeDetail.${i}.ibanNumber`,
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                    inputType: "text",
                    id: `QrCodeDetail.${i}.ibanNumber`,
                    name: `QrCodeDetail.${i}.ibanNumber`,
                    placeholder: `${translate(
                      "admin.settings.placeholders.mail_host"
                    )}`,
                    register,
                    disabled: true,
                  },
                },
                {
                  containerClass: "mb-0",
                  label: {
                    text: `${translate("setting.qr_settings.house_no")}`,
                    htmlFor: `QrCodeDetail.${i}.address.houseNumber`,
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                    inputType: "text",
                    id: `QrCodeDetail.${i}.address.houseNumber`,
                    name: `QrCodeDetail.${i}.address.houseNumber`,
                    placeholder: `${translate(
                      "admin.settings.placeholders.mail_port"
                    )}`,
                    register,
                    disabled: i === 0 ? true : false,
                  },
                },
                {
                  containerClass: "mb-0",
                  label: {
                    text: `${translate("setting.qr_settings.street_no")}`,
                    htmlFor: `QrCodeDetail.${i}.address.streetNumber`,
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                    inputType: "text",
                    id: `QrCodeDetail.${i}.address.streetNumber`,
                    name: `QrCodeDetail.${i}.address.streetNumber`,
                    placeholder: `${translate(
                      "admin.settings.placeholders.mail_port"
                    )}`,
                    register,
                    disabled: i === 0 ? true : false,
                  },
                },
                {
                  containerClass: "mb-0",
                  label: {
                    text: `${translate("setting.qr_settings.post_code")}`,
                    htmlFor: `QrCodeDetail.${i}.address.postalCode`,
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                    inputType: "text",
                    id: `QrCodeDetail.${i}.address.postalCode`,
                    name: `QrCodeDetail.${i}.address.postalCode`,
                    placeholder: `${translate(
                      "admin.settings.placeholders.mail_encryption"
                    )}`,
                    register,
                    disabled: i === 0 ? true : false,
                  },
                },
                {
                  containerClass: "mb-0",
                  label: {
                    text: `${translate("setting.qr_settings.city")}`,
                    htmlFor: `QrCodeDetail.${i}.address.city`,
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                    inputType: "text",
                    id: `QrCodeDetail.${i}.address.city`,
                    name: `QrCodeDetail.${i}.address.city`,
                    placeholder: `${translate(
                      "admin.settings.placeholders.mail_user"
                    )}`,
                    register,
                    disabled: i === 0 ? true : false,
                  },
                },
              ],
            },
          },
          //   {
          //     containerClass: "mt-6",
          //     field: {
          //       type: Field.div,
          //       id: "div-field",
          //       className: "grid grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-5",
          //       children: [
          //         {
          //           containerClass: "mb-0",
          //           label: {
          //             text: `${translate("setting.qr_settings.street_no")}`,
          //             htmlFor: `QrCodeDetail.${i}.address.streetNumber`,
          //             className: "mb-[10px]",
          //           },
          //           field: {
          //             type: Field.input,
          //             className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
          //             inputType: "text",
          //             id: `QrCodeDetail.${i}.address.streetNumber`,
          //             name: `QrCodeDetail.${i}.address.streetNumber`,
          //             placeholder: `${translate(
          //               "admin.settings.placeholders.mail_port"
          //             )}`,
          //             register,
          //             disabled: i === 0 ? true : false,
          //           },
          //         },
          //         {
          //           containerClass: "mb-0",
          //           label: {
          //             text: `${translate("setting.qr_settings.post_code")}`,
          //             htmlFor: `QrCodeDetail.${i}.address.postalCode`,
          //             className: "mb-[10px]",
          //           },
          //           field: {
          //             type: Field.input,
          //             className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
          //             inputType: "text",
          //             id: `QrCodeDetail.${i}.address.postalCode`,
          //             name: `QrCodeDetail.${i}.address.postalCode`,
          //             placeholder: `${translate(
          //               "admin.settings.placeholders.mail_encryption"
          //             )}`,
          //             register,
          //             disabled: i === 0 ? true : false,
          //           },
          //         },
          //         {
          //           containerClass: "mb-0",
          //           label: {
          //             text: `${translate("setting.qr_settings.city")}`,
          //             htmlFor: `QrCodeDetail.${i}.address.city`,
          //             className: "mb-[10px]",
          //           },
          //           field: {
          //             type: Field.input,
          //             className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
          //             inputType: "text",
          //             id: `QrCodeDetail.${i}.address.city`,
          //             name: `QrCodeDetail.${i}.address.city`,
          //             placeholder: `${translate(
          //               "admin.settings.placeholders.mail_user"
          //             )}`,
          //             register,
          //             disabled: i === 0 ? true : false,
          //           },
          //         },
          //       ],
          //     },
          //   },
          {
            containerClass: "  mt-6",
            field: {
              type: Field.div,
              id: "div-field",
              className: "grid grid-cols-2",
              children: [
                {
                  containerClass: `hidden  ${
                    i === totalCount - 1 && "!flex"
                  }  mb-0 col-span-1 mt-5 `,

                  field: {
                    type: Field.button,
                    id: "button",
                    text: `${translate("common.add_company_info")}`,
                    inputType: "button",
                    className:
                      "rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover-bg-none",
                    onClick: () => append(getQrObject(user)),
                    loading,
                  },
                },
                {
                  containerClass: "absolute right-[50px]  mt-6",
                  field: {
                    type: Field.button,
                    id: "button",
                    className: `rounded-lg px-4 min-w-[132px] w-fit !h-[40px] !bg-red text-white hover:bg-none ${
                      i < 1 && "hidden"
                    }`,
                    inputType: "button",
                    text: `${translate("common.remove")}`,
                    onClick: () => remove(i),
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

export const QRCodeSettingsAddField: GenerateQRCodeSettingFormField = (
  register,
  loading,
  append,
  remove,
  count,
  user
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "",
      field: {
        type: Field.div,
        className: "flex justify-end items-center mt-[30px]",
        id: "div",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("setting.save_setting")}`,
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

export const QRCodeSettingsLabelField: GenerateQRCodeSettingFormField = (
  register,
  loading,
  append,
  remove,
  count
) => {
  const { t: translate } = useTranslation();
  let formField: FormField[] = [];
  for (let i = 0; i < count; i++) {
    formField.push({
      containerClass: "",
      field: {
        type: Field.span,
        containerClassName: "",
        id: "span-text",
        text: `${translate("setting.qr_settings.company_info")} ${i}`,
      },
    });
  }

  return formField;
};
