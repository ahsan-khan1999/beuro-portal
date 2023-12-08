import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "@/api/slices/authSlice/auth";
import { generateCreateInvoiceValidationSchema, generateCreateRecurringInvoiceValidationSchema } from "@/validation/invoiceSchema";
import { CreateInvoiceFormField } from "@/components/invoice/fields/create-invoice-fields";
import { createInvoice, createRecuringInvoice } from "@/api/slices/invoice/invoiceSlice";
import { useMemo } from "react";
import { calculateTax } from "@/utils/utility";
import { staticEnums } from "@/utils/static";
import { CreateRecurringInvoiceFormField } from "@/components/invoice/fields/create-recurring-invoice";

export default function useRecurringInvoice(invoiceCreated: () => void) {
    const router = useRouter();
    const { loading, error, invoiceDetails } = useAppSelector((state) => state.invoice);
    const { t: translate } = useTranslation();
    const dispatch = useAppDispatch();
    const createdInvoiceSchema = generateCreateRecurringInvoiceValidationSchema(translate);

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

    const fields = CreateRecurringInvoiceFormField(
        register,
        loading,
        control,
        false,
        invoiceDetails,
    );

    console.log(errors);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const apiData = { ...data, ["paymentType"]: staticEnums["PaymentType"][data.paymentType], id: invoiceDetails?.id, isInvoiceRecurring: true, amount: invoiceDetails.contractID?.offerID?.total }
        const res = await dispatch(createRecuringInvoice({ data: apiData, router, setError, translate }));
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
