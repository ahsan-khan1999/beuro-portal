import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddContentInvoiceDetailsFormField } from "@/components/content/add/fields/add-invoice-details-fields";
import { generateEditInvoiceContentDetailsValidation } from "@/validation/contentSchema";
import { Attachement } from "@/types/global";
import { transformAttachments } from "@/utils/utility";
import { useEffect, useState } from "react";
import { updateContent } from "@/api/slices/content/contentSlice";
import { ComponentsType } from "@/enums/content";

export const useAddContentInvoiceDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const { loading, error, contentDetails } = useAppSelector(
    (state) => state.content
  );

  // let [addressCount, setAddressCount] = useState<number>(
  //   (contentDetails?.id && contentDetails?.offerContent?.address?.length) || 1
  // );

  const [attachements, setAttachements] = useState<Attachement[]>(
    (contentDetails?.id &&
      transformAttachments(contentDetails?.invoiceContent?.attachments)) ||
      []
  );

  const router = useRouter();
  const dispatch = useAppDispatch();

  const backHandle = () => {
    onHandleNext(ComponentsType.addConfirmationContent);
  };

  // const handleAddAddressField = () => {
  //   setAddressCount(addressCount + 1);
  // };

  const schema = generateEditInvoiceContentDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const invoiceDescription = watch("invoiceContent.description");

  useEffect(() => {
    if (contentDetails.id) {
      reset({
        invoiceContent: {
          ...contentDetails?.invoiceContent,
          // attachments:
          //   contentDetails?.offerContent?.attachments?.length > 0 &&
          //   contentDetails?.offerContent?.attachments[0] || null,
        },
      });
    }
  }, [contentDetails.id]);

  const fields = AddContentInvoiceDetailsFormField(
    register,
    loading,
    control,
    backHandle,
    trigger,
    0,
    attachements,
    setAttachements,
    contentDetails
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let apiData = {
      contentName: data.contentName,
      invoiceContent: {
        body: data.invoiceContent.body,
        description: data.invoiceContent.description,
        title: data.invoiceContent.title,
        attachments: attachements?.map((item) => item.value),
      },
      step: 3,
      stage: ComponentsType.addReceiptContent,
      contentId: contentDetails?.id,
      id: contentDetails?.id,
    };
    const res = await dispatch(
      updateContent({ data: apiData, router, setError, translate })
    );
    if (res?.payload) onHandleNext(ComponentsType.addReceiptContent);
  };

  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
    invoiceDescription,
  };
};
