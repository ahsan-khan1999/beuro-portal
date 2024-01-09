import { Field } from "@/enums/form";
import { FormField, GenerateChangeMailSettingFormField, GenerateQRCodeSettingFormField } from "@/types";
import { useTranslation } from "next-i18next";

const qrObj = {
    companyName: "",
    iban: "",
    streetNumber: "",
    postalCode: "",
    city: ""
}

export const QRCodeSettingsFields: GenerateQRCodeSettingFormField = (
    register,
    loading,
    append,
    remove,
    count
) => {
    const { t: translate } = useTranslation();
    let formField: FormField[] = [];
    for (let i = 0; i < count; i++) {
        formField.push(

            {
                containerClass: "",
                field: {
                    type: Field.div,
                    id: `qrSettings.${i}`,
                    children: [
                        {
                            containerClass: "mt-6",
                            field: {
                                type: Field.div,
                                id: "div-field",
                                className: "grid grid-cols-1 lg:grid-cols-1 gap-y-5   lg:gap-x-5 ",
                                children: [
                                    {
                                        containerClass: "mb-0",
                                        field: {
                                            text: `Company Information ${++i}`,
                                            id: `qrSettings`,
                                            type:Field.span

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
                                className: "grid grid-cols-2 lg:grid-cols-2 gap-y-5   lg:gap-x-5 ",
                                children: [
                                    {
                                        containerClass: "mb-0",
                                        label: {
                                            text: "Company Name",
                                            htmlFor: `qrSettings.${i}.companyName`,
                                            className: "mb-[10px]",
                                        },
                                        field: {
                                            type: Field.input,
                                            className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                                            inputType: "text",
                                            id: `qrSettings.${i}.companyName`,
                                            name: `qrSettings.${i}.companyName`,
                                            placeholder: `${translate(
                                                "admin.settings.placeholders.mail_driver"
                                            )}`,
                                            register,
                                        },
                                    },
                                    {
                                        containerClass: "mb-0",
                                        label: {
                                            text: "Iban No",
                                            htmlFor: `qrSettings.${i}.ibanNo`,
                                            className: "mb-[10px]",
                                        },
                                        field: {
                                            type: Field.input,
                                            className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                                            inputType: "text",
                                            id: `qrSettings.${i}.ibanNo`,
                                            name: `qrSettings.${i}.ibanNo`,
                                            placeholder: `${translate(
                                                "admin.settings.placeholders.mail_host"
                                            )}`,
                                            register,
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
                                className: "grid grid-cols-3 lg:grid-cols-3 gap-y-5   lg:gap-x-5 ",
                                children: [
                                    {
                                        containerClass: "mb-0",
                                        label: {
                                            text: "Street Number",
                                            htmlFor: `qrSettings.${i}.streetNumber`,
                                            className: "mb-[10px]",
                                        },
                                        field: {
                                            type: Field.input,
                                            className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                                            inputType: "text",
                                            id: `qrSettings.${i}.streetNumber`,
                                            name: `qrSettings.${i}.streetNumber`,
                                            placeholder: `${translate(
                                                "admin.settings.placeholders.mail_port"
                                            )}`,
                                            register,
                                        },
                                    },
                                    {
                                        containerClass: "mb-0",
                                        label: {
                                            text: "Postal Code",
                                            htmlFor: `qrSettings.${i}.postalCode`,
                                            className: "mb-[10px]",
                                        },
                                        field: {
                                            type: Field.input,
                                            className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                                            inputType: "text",
                                            id: `qrSettings.${i}.postalCode`,
                                            name: `qrSettings.${i}.postalCode`,
                                            placeholder: `${translate(
                                                "admin.settings.placeholders.mail_encryption"
                                            )}`,
                                            register,
                                        },
                                    },
                                    {
                                        containerClass: "mb-0",
                                        label: {
                                            text: "City",
                                            htmlFor: `qrSettings.${i}.city`,
                                            className: "mb-[10px]",
                                        },
                                        field: {
                                            type: Field.input,
                                            className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                                            inputType: "text",
                                            id: `qrSettings.${i}.city`,
                                            name: `qrSettings.${i}.city`,
                                            placeholder: `${translate(
                                                "admin.settings.placeholders.mail_user"
                                            )}`,
                                            register,
                                        },
                                    },
                                ],
                            },

                        },
                    ]

                }
            },




        )
    }


    return formField;
};



export const QRCodeSettingsAddField: GenerateQRCodeSettingFormField = (
    register,
    loading,
    append,
    remove,
    count
) => {
    const { t: translate } = useTranslation();
    const formField: FormField[] = [
        {
            containerClass: "mt-5",
            field: {
                className: "flex justify-between",
                type: Field.div,
                id: "div",
                children: [
                    {
                        containerClass: `mb-0 col-span-1 mt-5 `,
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
                            onClick: () => append(qrObj),
                        },
                    },
                    {
                        containerClass: "",
                        field: {
                            type: Field.div,
                            className: "flex  justify-between space-x-3",
                            id: "div",
                            children: [
                                {
                                    containerClass: "mb-0 mt-[30px]",
                                    field: {
                                        type: Field.button,
                                        id: "button",
                                        text: `Delete`,
                                        inputType: "button",
                                        className:
                                            `rounded-lg px-4 w-[152px] h-[50px] !bg-red  text-white hover:bg-none ${count === 1 && "hidden"}`,
                                        loading,
                                        onClick: () => remove(--count)
                                    },
                                },
                                {
                                    containerClass: "mb-0 mt-[30px]",
                                    field: {
                                        type: Field.button,
                                        id: "button",
                                        text: `${translate("setting.save_setting")}`,
                                        inputType: "submit",
                                        className:
                                            "rounded-lg px-4 w-[152px] h-[50px]  text-white hover:bg-none ",
                                        loading,
                                    },
                                },
                            ]
                        }
                    }




                ],

            }
        }
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
        formField.push(
            {
                containerClass: "",
                field: {
                    type: Field.span,
                    containerClassName: "",
                    id: "span-text",
                    text: `Company Information ${i}`
                }
            }
        )
    }


    return formField;
};
