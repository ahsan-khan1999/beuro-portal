import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateContractEmailValidationSchema } from "@/validation/contractSchema";
import { useEffect, useMemo, useState } from "react";
import { readContent, setContentDetails } from "@/api/slices/content/contentSlice";
import { Attachement } from "@/types/global";
import { transformAttachments } from "@/utils/utility";
import { sendContractEmail } from "@/api/slices/contract/contractSlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { InvoiceEmailPreviewFormField } from "@/components/invoice/details/email-fields";
import { readCollectiveInvoiceDetails, readInvoiceDetails, sendInvoiceEmail, setCollectiveInvoiceDetails, setInvoiceDetails } from "@/api/slices/invoice/invoiceSlice";
import localStoreUtil from "@/utils/localstore.util";
import { updateQuery } from "@/utils/update-query";
import { CustomerPromiseActionType } from "@/types/customer";

export const useInvoiceEmail = (
    backRouteHandler: Function,
    onNextHandle: Function
) => {
    const { t: translate } = useTranslation();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { loading, error, collectiveInvoiceDetails } = useAppSelector((state) => state.invoice);
    const { content, contentDetails } = useAppSelector((state) => state.content);
    const [attachements, setAttachements] = useState<Attachement[]>(collectiveInvoiceDetails?.id && transformAttachments(collectiveInvoiceDetails?.invoiceID?.contractID?.offerID?.content?.invoiceContent?.attachments as string[]) || [])
    const { invoiceID } = router.query
    const schema = generateContractEmailValidationSchema(translate);
    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors },
        reset
    } = useForm<FieldValues>({
        resolver: yupResolver<FieldValues>(schema),
    });
    useEffect(() => {
        dispatch(readContent({ params: { filter: {}, paginate: 0 } }))

    }, [])

    useMemo(() => {
        if (invoiceID) {

            dispatch(readCollectiveInvoiceDetails({ params: { filter: invoiceID } })).then((res: any) => {
                dispatch(setCollectiveInvoiceDetails(res?.payload)) 
                setAttachements(transformAttachments(
                    res?.payload?.invoiceID?.contractID?.offerID?.content?.invoiceContent?.attachments as string[]
                ) || [])               
                reset({
                    email: res?.payload?.invoiceID?.contractID?.offerID?.leadID?.customerDetail?.email,
                    content: res?.payload?.invoiceID?.contractID?.offerID?.content?.id,
                    subject: res?.payload?.invoiceID?.contractID?.offerID?.content?.invoiceContent?.title,
                    description: res?.payload?.invoiceID?.contractID?.offerID?.content?.invoiceContent?.body,
                    pdf: res?.payload?.invoiceID?.contractID?.offerID?.content?.invoiceContent?.attachments
                })
            })
        }
    }, [invoiceID])




    const onContentSelect = (id: string) => {
        const selectedContent = content.find((item) => item.id === id);
        if (selectedContent) {
            reset({
                email: collectiveInvoiceDetails?.invoiceID?.contractID?.offerID?.leadID?.customerDetail?.email,
                content: selectedContent?.id,
                subject: selectedContent?.invoiceContent?.title,
                description: selectedContent?.invoiceContent?.body,
                pdf: selectedContent?.invoiceContent?.attachments,
            });
            setAttachements(transformAttachments(
                selectedContent?.invoiceContent?.attachments as string[]
            ) || [])
            dispatch(setContentDetails(selectedContent));
        }
    };
    const fields = InvoiceEmailPreviewFormField(
        register,
        loading,
        control,
        () => console.log(),
        backRouteHandler,
        content,
        contentDetails,
        onContentSelect,
        attachements,
        setAttachements,
        collectiveInvoiceDetails
    );

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const updatedData = {
            ...data,
            id: collectiveInvoiceDetails?.id,
            pdf: attachements?.map((item) => item.value),
        };

        localStoreUtil.store_data("contractComposeEmail", updatedData);

        router.pathname = "/invoices/invoice-pdf-preview";
        router.query = { invoiceID: collectiveInvoiceDetails?.id };
        updateQuery(router, router.locale as string);
    };
    return {
        fields,
        onSubmit,
        control,
        handleSubmit,
        errors,
        error,
        translate
    };
};
