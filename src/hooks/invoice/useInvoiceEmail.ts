import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateContractEmailValidationSchema } from "@/validation/contractSchema";
import { useEffect, useMemo, useState } from "react";
import {
  readContent,
  setContentDetails,
} from "@/api/slices/content/contentSlice";
import { Attachement } from "@/types/global";
import { transformAttachments } from "@/utils/utility";
import { sendContractEmail } from "@/api/slices/contract/contractSlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { InvoiceEmailPreviewFormField } from "@/components/invoice/details/email-fields";
import {
  readCollectiveInvoiceDetails,
  readInvoiceDetails,
  sendInvoiceEmail,
  setCollectiveInvoiceDetails,
  setInvoiceDetails,
  updateInvoiceContent,
} from "@/api/slices/invoice/invoiceSlice";
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
  const { loading, error, collectiveInvoiceDetails } = useAppSelector(
    (state) => state.invoice
  );
  const [isMoreEmail, setIsMoreEmail] = useState({ isCc: false, isBcc: false })

  const { content, contentDetails, loading: loadingContent } = useAppSelector((state) => state.content);
  const [attachements, setAttachements] = useState<Attachement[]>(
    (collectiveInvoiceDetails?.id &&
      transformAttachments(
        collectiveInvoiceDetails?.invoiceID?.contractID?.offerID?.content
          ?.invoiceContent?.attachments as string[]
      )) ||
    []
  );
  const { invoiceID } = router.query;
  const schema = generateContractEmailValidationSchema(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    reset,
    setValue
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });


  useEffect(() => {
    if (invoiceID) {
      if (content?.length === 0) dispatch(readContent({ params: { filter: {}, paginate: 0 } }));
      dispatch(
        readCollectiveInvoiceDetails({ params: { filter: invoiceID } })
      ).then((res: any) => {
        if(res?.payload) {
          setAttachements(
            transformAttachments(
              res?.payload?.invoiceID?.contractID?.offerID?.content
                ?.invoiceContent?.attachments as string[]
            ) || []
          );
          reset({
            email:
              res?.payload?.invoiceID?.contractID?.offerID?.leadID?.customerDetail
                ?.email,
            content: res?.payload?.invoiceID?.contractID?.offerID?.content?.id,
            subject:
              res?.payload?.title|| "" + " " + res?.payload?.invoiceNumber + " " + res?.payload?.invoiceID?.contractID?.offerID?.createdBy?.company?.companyName,
            description:
              res?.payload?.invoiceID?.contractID?.offerID?.content
                ?.invoiceContent?.body || "",
            pdf: res?.payload?.invoiceID?.contractID?.offerID?.content
              ?.invoiceContent?.attachments,
  
            title: res?.payload?.title,
            additionalDetails: res?.payload?.additionalDetails || "",
          });
        }
      });
    }
  }, [invoiceID]);

  const onContentSelect = (id: string) => {
    const selectedContent = content.find((item) => item.id === id);
    if (selectedContent) {
      reset({
        email:
          collectiveInvoiceDetails?.invoiceID?.contractID?.offerID?.leadID
            ?.customerDetail?.email,
        content: selectedContent?.id,
        subject: selectedContent?.invoiceContent?.title || "" + " " + collectiveInvoiceDetails?.invoiceNumber + " " + collectiveInvoiceDetails?.invoiceID?.contractID?.offerID?.createdBy?.company?.companyName,
        description: selectedContent?.invoiceContent?.body || "",
        pdf: selectedContent?.invoiceContent?.attachments,
        title: collectiveInvoiceDetails?.title,
        additionalDetails: collectiveInvoiceDetails?.additionalDetails || "",
      });
      setAttachements(
        transformAttachments(
          selectedContent?.invoiceContent?.attachments as string[]
        ) || []
      );
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
    collectiveInvoiceDetails,
    isMoreEmail,
    setIsMoreEmail,
    setValue,
    loadingContent
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    const apiData = {
      id: collectiveInvoiceDetails?.id,
      title: data?.title,
      additionalDetails: data?.additionalDetails,

    };
    const response = await dispatch(updateInvoiceContent({ data: apiData }));
    if (response?.payload) {
      const updatedData = {
        ...data,
        id: collectiveInvoiceDetails?.id,
        attachements: attachements?.map((item) => item.value),
      } as { [key in string]: any };
  
      delete updatedData["pdf"];
  
      await localStoreUtil.store_data("invoiceComposeEmail", updatedData);
  
      router.pathname = "/invoices/invoice-pdf-preview";
      router.query = { invoiceID: collectiveInvoiceDetails?.id };
      updateQuery(router, router.locale as string);
    }
  };
  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
    loadingContent,
    loading

  };
};
