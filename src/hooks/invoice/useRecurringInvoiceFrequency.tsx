import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateCreateRecurringInvoiceValidationSchema, generateRecurringInvoiceFrequencyValidationSchema } from "@/validation/invoiceSchema";
import { createRecuringInvoice, updateInvoice } from "@/api/slices/invoice/invoiceSlice";
import { staticEnums } from "@/utils/static";
import { CreateRecurringInvoiceFormField } from "@/components/invoice/fields/create-recurring-invoice";
import { CreateRecurringInvoiceFrequencyFormField } from "@/components/invoice/fields/create-recurring-frequency";

export default function useRecurringInvoiceFrequency(invoiceCreated: () => void) {
    const router = useRouter();
    const { loading, error, invoiceDetails } = useAppSelector((state) => state.invoice);
    const { t: translate } = useTranslation();
    const dispatch = useAppDispatch();
    const createdInvoiceSchema = generateRecurringInvoiceFrequencyValidationSchema(translate);

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
        setError, setValue
    } = useForm<FieldValues>({
        resolver: yupResolver<FieldValues>(createdInvoiceSchema),
    });

    const fields = CreateRecurringInvoiceFrequencyFormField(
        register,
        loading,
        control,
        false,
        invoiceDetails,
    );


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const apiData = { ...data, id: invoiceDetails?.id, isInvoiceRecurring: true }
        const res = await dispatch(updateInvoice({ data: apiData, router, setError, translate }));
        console.log(res, "res");

        if (res?.payload) invoiceCreated();
    };
    return {
        error,
        handleSubmit,
        errors,
        fields,
        onSubmit,
        translate
    };
}
