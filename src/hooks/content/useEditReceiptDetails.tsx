import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { EditReceiptContentDetailsFormField } from "@/components/content/edit/fields/edit-receipt-details-fields";
import { generateEditReceiptContentDetailsValidation } from "@/validation/contentSchema";
import { ComponentsType } from "@/components/content/details/ContentDetailsData";
import { useMemo, useState } from "react";
import { Attachement } from "@/types/global";
import { transformAttachments } from "@/utils/utility";
import { updateContent } from "@/api/slices/content/contentSlice";

export const useEditReceiptDetails = (onClick: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const { loading, error, contentDetails } = useAppSelector(
    (state) => state.content
  );
  const [attachements, setAttachements] = useState<Attachement[]>(
    (contentDetails?.id &&
      transformAttachments(contentDetails?.receiptContent?.attachments)) ||
      []
  );
  const dispatch = useAppDispatch();

  const handleBack = () => {
    onClick(3, ComponentsType.receiptContent);
  };

  const schema = generateEditReceiptContentDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    trigger,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  useMemo(() => {
    if (contentDetails.id) {
      reset({
        receiptContent: {
          ...contentDetails?.receiptContent,
        },
      });
    }
  }, [contentDetails.id]);
  const fields = EditReceiptContentDetailsFormField(
    register,
    loading,
    control,
    handleBack,
    trigger,
    0,
    attachements,
    setAttachements,
    contentDetails
  );
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let apiData = {
      contentName: data.contentName,
      receiptContent: {
        body: data.receiptContent.body,
        description: data.receiptContent.description,
        title: data.receiptContent.title,
        attachments: attachements?.map((item) => item.value),
      },
      step: 4,
      stage: ComponentsType.receiptContent,
      contentId: contentDetails?.id,
      id: contentDetails?.id,
    };
    const res = await dispatch(
      updateContent({ data: apiData, router, setError, translate })
    );
    if (res?.payload) onClick(3, ComponentsType.receiptContent);
  };
  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
  };
};
