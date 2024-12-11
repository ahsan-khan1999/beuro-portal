import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateLeadContentDetailsValidation } from "@/validation/contentSchema";
import { ComponentsType } from "@/components/content/details/ContentDetailsData";
import { useState, useEffect } from "react";
import { transformAttachments } from "@/utils/utility";
import { createContent } from "@/api/slices/content/contentSlice";
import { Attachement } from "@/types/global";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { AddLeadContentDetailsFormField } from "@/components/content/add/fields/add-lead-content-details-fields";

export const useEditLeadContentDetails = ({
  onClick,
  isUpdate,
}: {
  onClick: Function;
  isUpdate?: boolean;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const { loading, error, contentDetails } = useAppSelector(
    (state) => state.content
  );

  const [attachements, setAttachements] = useState<Attachement[]>(
    (contentDetails?.id &&
      transformAttachments(contentDetails?.leadContent?.attachments)) ||
      []
  );

  const handleBack = () => {
    onClick(0, ComponentsType.leadContent);
  };

  const schema = generateLeadContentDetailsValidation(translate);

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

  useEffect(() => {
    if (contentDetails?.id) {
      reset({
        leadContent: {
          ...contentDetails?.leadContent,
        },
      });
    }
  }, [contentDetails?.id]);

  const fields = AddLeadContentDetailsFormField(
    register,
    loading,
    control,
    handleBack,
    trigger,
    0,
    attachements,
    setAttachements,
    isUpdate
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let apiData = {
      leadContent: {
        body: data?.leadContent.body,
        title: data?.leadContent.title,
        attachments: attachements?.map((item) => item.value),
      },
      step: 5,
      stage: ComponentsType.editOfferContent,
      contentId: contentDetails?.id,
      id: contentDetails?.id,
    };
    if (contentDetails?.id) {
      apiData = {
        ...apiData,
        contentId: contentDetails?.id,
      };
      const res = await dispatch(
        createContent({
          data: apiData,
          router,
          setError,
          translate,
          isUpdate: isUpdate,
        })
      );
      if (res?.payload) {
        onClick(0, ComponentsType.offerContent);
        dispatch(updateModalType({ type: ModalType.CREATION }));
      }
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
    router,
  };
};
