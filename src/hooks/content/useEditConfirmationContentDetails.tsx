import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { EditConfirmationContentDetailsFormField } from "@/components/content/edit/fields/edit-confirmation-details-fields";
import { generateEditConfirmationContentDetailsValidation } from "@/validation/contentSchema";
import { ComponentsType } from "@/components/content/details/ContentDetailsData";
import { Attachement } from "@/types/global";
import { useMemo, useState } from "react";
import { updateContent } from "@/api/slices/content/contentSlice";
import { transformAttachments } from "@/utils/utility";

export const useEditConfirmationContentDetails = (onClick: Function) => {
  const { t: translate } = useTranslation();
  const { loading, error, contentDetails } = useAppSelector((state) => state.content);

  const [attachements, setAttachements] = useState<Attachement[]>(contentDetails?.id && transformAttachments(contentDetails?.confirmationContent?.attachments) || [])
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleBack = () => {
    onClick(1, ComponentsType.confirmationContent);
  };

  const schema = generateEditConfirmationContentDetailsValidation(translate);
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
        confirmationContent: {
          ...contentDetails?.confirmationContent
        }
      })
    }

  }, [contentDetails.id])
  const fields = EditConfirmationContentDetailsFormField(
    register,
    loading,
    control,
    handleBack,
    trigger, 0, attachements, setAttachements, contentDetails

  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let apiData = {
      contentName: data.contentName,
      confirmationContent: {
        body: data.confirmationContent.body,
        description: data.confirmationContent.description,
        title: data.confirmationContent.title,
        attachments: attachements?.map((item) => item.value),
      },
      step: 2,
      stage: ComponentsType.confirmationContent,
      contentId: contentDetails?.id,
      id: contentDetails?.id
    }
    const res = await dispatch(updateContent({ data: apiData, router, setError, translate }));
    if (res?.payload) onClick(1, ComponentsType.confirmationContent);


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
