import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateContractEmailValidationSchema } from "@/validation/contractSchema";
import { useEffect, useState } from "react";
import {
  readContent,
  setContentDetails,
} from "@/api/slices/content/contentSlice";
import { Attachement } from "@/types/global";
import { transformAttachments } from "@/utils/utility";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { InvoiceEmailPreviewFormField } from "@/components/invoice/details/email-fields";
import {
  readCollectiveInvoiceDetails,
  sendInvoiceEmail,
} from "@/api/slices/invoice/invoiceSlice";
import localStoreUtil from "@/utils/localstore.util";
import { updateQuery } from "@/utils/update-query";

export const useReceiptEmail = (
  backRouteHandler: Function,
  onNextHandle: Function
) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, collectiveInvoiceDetails } = useAppSelector(
    (state) => state.invoice
  );
  const { modal } = useAppSelector((state) => state.global);
  const isMail = router.query?.isMail;

  const [isMoreEmail, setIsMoreEmail] = useState({ isCc: false, isBcc: false });

  const {
    content,
    contentDetails,
    loading: loadingContent,
  } = useAppSelector((state) => state.content);
  const [attachements, setAttachements] = useState<Attachement[]>(
    (collectiveInvoiceDetails?.id &&
      transformAttachments(
        collectiveInvoiceDetails?.invoiceID?.content?.receiptContent
          ?.attachments as string[]
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
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  useEffect(() => {
    if (content?.length === 0)
      dispatch(readContent({ params: { filter: {}, paginate: 0 } }));
  }, []);

  useEffect(() => {
    if (invoiceID) {
      dispatch(
        readCollectiveInvoiceDetails({ params: { filter: invoiceID } })
      ).then((res: any) => {
        setAttachements(
          transformAttachments(
            res?.payload?.invoiceID?.content?.receiptContent
              ?.attachments as string[]
          ) || []
        );
        reset({
          email: res?.payload?.invoiceID?.customerDetail?.email,
          content: res?.payload?.invoiceID?.content?.id,
          subject:
            res?.payload?.title ||
            "" +
              " " +
              res?.payload?.invoiceNumber +
              " " +
              res?.payload?.invoiceID?.createdBy?.company?.companyName,
          description:
            res?.payload?.invoiceID?.content?.receiptContent?.body || "",
          pdf: res?.payload?.invoiceID?.content?.receiptContent?.attachments,
          // title: res?.payload?.title,
          // additionalDetails: res?.payload?.additionalDetails || "",
        });
      });
    }
  }, [invoiceID]);

  const onContentSelect = (id: string) => {
    const selectedContent = content.find((item) => item.id === id);
    if (selectedContent) {
      reset({
        email: collectiveInvoiceDetails?.invoiceID?.customerDetail?.email,
        content: selectedContent?.id,
        subject:
          selectedContent?.receiptContent?.title ||
          "" +
            " " +
            collectiveInvoiceDetails?.invoiceNumber +
            " " +
            collectiveInvoiceDetails?.invoiceID?.createdBy?.company
              ?.companyName,
        description: selectedContent?.receiptContent?.body || "",
        pdf: selectedContent?.receiptContent?.attachments,
        // title: collectiveInvoiceDetails?.title,
        // additionalDetails: collectiveInvoiceDetails?.additionalDetails || "",
      });
      setAttachements(
        transformAttachments(
          selectedContent?.receiptContent?.attachments as string[]
        ) || []
      );
      dispatch(setContentDetails(selectedContent));
    }
  };
  const onSuccess = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));

    router.push({
      pathname: "/invoices/details",
      query: { invoice: collectiveInvoiceDetails?.invoiceID?.id },
    });
  };

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
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
    setIsMoreEmail
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // const apiData = {
    //   id: collectiveInvoiceDetails?.id,
    //   title: data?.title,
    //   additionalDetails: data?.additionalDetails,

    // };
    // const response = await dispatch(updateInvoiceContent({ data: apiData }));
    // if (response?.payload) {
    if (isMail) {
      const fileUrl = await JSON.parse(localStorage.getItem("pdf") as string);
      let apiData = {
        ...data,
        id: invoiceID,
        pdf: fileUrl,
        attachments: attachements.map((item) => {
          return `${collectiveInvoiceDetails?.invoiceID?.createdBy?.company?.companyName}-${item.name}`;
        }),
      };

      const res = await dispatch(sendInvoiceEmail({ data: apiData }));

      if (res?.payload) {
        dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
      }
    } else {
      const updatedData = {
        ...data,
        id: collectiveInvoiceDetails?.id,
        attachments: attachements?.map((item) => item.value),
      } as { [key in string]: any };

      delete updatedData["pdf"];

      try {
        await localStoreUtil.store_data("receiptEmailCompose", updatedData);
      } catch (err) {
        console.warn("LocalStorageError", err);
      }

      router.pathname = "/invoices/receipt-pdf-preview";
      router.query = { invoiceID: collectiveInvoiceDetails?.id };
      updateQuery(router, router.locale as string);
      // }
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
    loading,
    loadingContent,
    modal,
    onSuccess,
    onClose,
  };
};
