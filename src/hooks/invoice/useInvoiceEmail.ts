import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateContractEmailValidationSchema } from "@/validation/contractSchema";
import { useEffect,  useState } from "react";
import {  setContentDetails } from "@/api/slices/content/contentSlice";
import { Attachement } from "@/types/global";
import { transformAttachments } from "@/utils/utility";
import { sendContractEmail } from "@/api/slices/contract/contractSlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { InvoiceEmailPreviewFormField } from "@/components/invoice/details/email-fields";
import { sendInvoiceEmail } from "@/api/slices/invoice/invoiceSlice";

export const useInvoiceEmail = (
    backRouteHandler: Function,
    onNextHandle: Function
) => {
    const { t: translate } = useTranslation();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { loading, error, invoiceDetails } = useAppSelector((state) => state.invoice);
    const { content, contentDetails } = useAppSelector((state) => state.content);
    const [attachements, setAttachements] = useState<Attachement[]>(invoiceDetails?.id && transformAttachments(invoiceDetails?.contractID?.offerID?.content?.invoiceContent?.attachments as string[]) || [])

    const schema = generateContractEmailValidationSchema(translate);
    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors },
        watch,
        reset
    } = useForm<FieldValues>({
        resolver: yupResolver<FieldValues>(schema),
    });
    useEffect(() => {
        reset({
            email: invoiceDetails?.contractID?.offerID?.leadID?.customerDetail?.email,
            content: invoiceDetails?.contractID?.offerID?.content?.invoiceContent?.title,
            subject: invoiceDetails?.contractID?.offerID?.content?.invoiceContent?.title,
            description: invoiceDetails?.contractID?.offerID?.content?.invoiceContent?.description,
            pdf: invoiceDetails?.contractID?.offerID?.content?.invoiceContent?.attachments
        })
    }, [])

    console.log(errors);


    const onContentSelect = (id: string) => {
        const selectedContent = content.find((item) => item.id === id)
        if (selectedContent) {
            dispatch(setContentDetails(selectedContent))
        }
    }
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
        invoiceDetails
    );
    console.log(errors);
    
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const res = await dispatch(sendInvoiceEmail({
            data: {
                ...data, id: invoiceDetails?.id,
                pdf: attachements?.map((item) => item.value),

            }, router, translate, setError
        }))
        if (res?.payload) dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }))
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
