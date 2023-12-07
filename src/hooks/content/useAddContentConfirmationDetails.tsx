import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddContentConfirmationDetailsFormField } from "@/components/content/add/fields/add-content-confirmation-details-fields";
import { generateEditConfirmationContentDetailsValidation } from "@/validation/contentSchema";
import { ComponentsType } from "@/components/content/add/ContentAddDetailsData";
import { Attachement } from "@/types/global";
import { useMemo, useState } from "react";
import { transformAttachments } from "@/utils/utility";
import { updateContent } from "@/api/slices/content/contentSlice";

export const useAddContentConfirmationDetails = (onHandleNext: Function, onHandleBack: Function) => {
  const { t: translate } = useTranslation();
  const { loading, error, contentDetails } = useAppSelector((state) => state.content);

  const [attachements, setAttachements] = useState<Attachement[]>(contentDetails?.id && transformAttachments(contentDetails?.confirmationContent?.attachments) || [])
  const router = useRouter();
  const dispatch = useAppDispatch();

  const backHandle = () => {
    onHandleNext(ComponentsType.addOffer);
  };

  const schema = generateEditConfirmationContentDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
    trigger
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  console.log(errors,"errors");
  
  useMemo(() => {
    if (contentDetails.id) {
      reset({
        title: contentDetails?.confirmationContent?.title,
        attachments: contentDetails?.confirmationContent?.attachments?.length > 0 && contentDetails?.confirmationContent?.attachments[0] || null
      })
    }

  }, [contentDetails.id])
  const fields = AddContentConfirmationDetailsFormField(
    register,
    loading,
    control,
    backHandle,
    trigger, 0, attachements, setAttachements, contentDetails
  );
  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    let apiData = {
      contentName: data.contentName,
      confirmationContent: {
        body: data.confirmationContent.body,
        description: data.confirmationContent.description,
        title: data.confirmationContent.title,
        attachments: attachements?.map((item) => item.value),
      },
      step: 2,
      stage: ComponentsType.addInvoiceContent,
      contentId: contentDetails?.id,
      id: contentDetails?.id
    }
    const res = await dispatch(updateContent({ data: apiData, router, setError, translate }));
    if (res?.payload) onHandleNext(ComponentsType.addInvoiceContent);
    
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
