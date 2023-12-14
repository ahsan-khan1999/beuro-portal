import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddReceiptContentDetailsFormField } from "@/components/content/add/fields/add-receipt-details-fields";
import { generateEditReceiptContentDetailsValidation } from "@/validation/contentSchema";
import { ComponentsType } from "@/components/content/add/ContentAddDetailsData";
import { useMemo, useState } from "react";
import { Attachement } from "@/types/global";
import { transformAttachments } from "@/utils/utility";
import { updateContent } from "@/api/slices/content/contentSlice";

export const useAddContentReceiptDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const { loading, error, contentDetails } = useAppSelector((state) => state.content);
  const [attachements, setAttachements] = useState<Attachement[]>(contentDetails?.id && transformAttachments(contentDetails?.receiptContent?.attachments) || [])
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleBack = () => {
    onHandleNext(ComponentsType.addInvoiceContent);
  };

  const schema = generateEditReceiptContentDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    reset,
    trigger,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  const handleSuccess = () =>{
    router.push("/content")
  }
  useMemo(() => {
    if (contentDetails.id) {
      reset({
        title: contentDetails?.receiptContent?.title,
        attachments:  contentDetails?.receiptContent?.attachments?.length > 0 && contentDetails?.receiptContent?.attachments[0] || null
      })
    }

  }, [contentDetails.id])
  const fields = AddReceiptContentDetailsFormField(register, loading, control, handleBack,trigger, 0, attachements, setAttachements, contentDetails
  );
  
  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    let apiData = {
      contentName: data.contentName,
      receiptContent: {
        body: data.receiptContent.body,
        description: data.receiptContent.description,
        title: data.receiptContent.title,
        attachments: attachements?.map((item) => item.value),
      },
      step: 4,
      stage: ComponentsType.addReceiptContent,
      contentId: contentDetails?.id,
      id: contentDetails?.id
    }
    const res = await dispatch(updateContent({ data: apiData, router, setError, translate }));
    if (res?.payload) onHandleNext()
    
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
