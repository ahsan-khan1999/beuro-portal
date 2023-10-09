import { Field } from "@/enums/form";
import { FormField, GenerateRegistrationFormField } from "@/types";

export const servicesDetailsFormField: GenerateRegistrationFormField = (
    register,
    loading,
    control,
) => {
    const formField: FormField[] = [
        {
            field: {
                type: Field.div,
                className: "flex justify-between items-center gap-3",
                children: [
                    {
                        containerClass: "w-[65%]",
                        label: {
                            text: "Service/Product Title",
                            htmlFor: "serviceTitle",
                            className: "mb-[10px]",
                        },
                        field: {
                            type: Field.input,
                            className: "!p-4 !border-dark focus:!border-primary ",
                            inputType: "text",
                            id: "serviceTitle",
                            name: "serviceTitle",
                            placeholder: "Product Name...",
                            register,
                        },
                    },
                    {
                        containerClass: "w-[35%]",
                        label: {
                            text: "Unit",
                            htmlFor: "unit",
                            className: "mb-[10px]",
                        },
                        field: {
                            type: Field.input,
                            className:
                                "!p-4 !!border-borderColor border border-dark focus:!border-primary ",
                            inputType: "text",
                            id: "unit",
                            name: "unit",
                            placeholder: "Std. ",
                            register,
                        },
                    },

                ],
            },
        },

        {
            field: {
                type: Field.div,
                className: "w-full max-w-[260px]",
                children: [
                    {
                        label: {
                            text: "Price",
                            htmlFor: "price",
                            className: "mb-[10px]",
                        },
                        field: {
                            type: Field.input,
                            className: "!p-4 !border-dark focus:!border-primary ",
                            inputType: "text",
                            id: "price",
                            name: "price",
                            placeholder: "100CHF",
                            register,
                        },
                    },

                ],
            },
        },

        {
            field: {
                type: Field.div,
                className: "w-full",
                children: [
                    {
                        label: {
                            text: "Description",
                            htmlFor: "description",
                            className: "mb-[10px]",
                        },
                        field: {
                            type: Field.input,
                            className: "!p-4 !border-dark focus:!border-primary ",
                            inputType: "text",
                            id: "description",
                            name: "description",
                            placeholder: "Lorem Ipsum, sometimes referred to as 'lipsum'..",
                            register,
                        },
                    },

                ],
            },
        },


        {
            field: {
                type: Field.div,
                className: "flex space-x-[18px] mt-8",
                children: [
                    {
                        field: {
                            type: Field.button,
                            text: "Cancel",
                            inputType: "button",
                            // onClick: () => setCurrentFormStage("locationDetails"),
                            className:
                                "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none",
                            loading,
                        },
                    },
                    {
                        field: {
                            type: Field.button,
                            text: "Save Changes",
                            inputType: "submit",
                            className:
                                "rounded-lg   p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
                            loading,
                        },
                    },
                ],
            },
        },
    ];

    return formField;
};
