import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateLeadContentDetailsValidation } from "@/validation/contentSchema";
import { useState, useEffect } from "react";
import { Attachement } from "@/types/global";
import { transformAttachments } from "@/utils/utility";
import { createContent } from "@/api/slices/content/contentSlice";
import { ComponentsType } from "@/enums/content";
import { AddLeadContentDetailsFormField } from "@/components/content/add/fields/add-lead-content-details-fields";

export const useAddLeadContentDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const { loading, error, contentDetails } = useAppSelector(
    (state) => state.content
  );

  const [attachements, setAttachements] = useState<Attachement[]>(
    (contentDetails?.id &&
      transformAttachments(contentDetails?.leadContent?.attachments)) ||
      []
  );

  const router = useRouter();
  const dispatch = useAppDispatch();
  const schema = generateLeadContentDetailsValidation(translate);

  const {
    register,
    handleSubmit,
    control,
    setError,
    trigger,
    reset,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    if (contentDetails.id) {
      reset({
        leadContent: {
          ...contentDetails?.leadContent,
          attachements: contentDetails?.leadContent?.attachments,
        },
      });
    }
  }, [contentDetails?.id]);

  const fields = AddLeadContentDetailsFormField(
    register,
    loading,
    control,
    () => console.log(),
    trigger,
    0,
    attachements,
    setAttachements
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let apiData = {
      leadContent: {
        body: data.leadContent.body,
        title: data.leadContent.title,
        attachments: attachements?.map((item) => item.value),
      },
      step: 5,
      stage: ComponentsType.addOffer,
      contentId: "",
    };
    if (contentDetails?.id) {
      apiData = {
        ...apiData,
        contentId: contentDetails?.id,
      };

      const res = await dispatch(
        createContent({ data: apiData, router, setError, translate })
      );
      if (res?.payload) onHandleNext(ComponentsType.addOffer);
    } else {
      const res = await dispatch(
        createContent({ data: apiData, router, setError, translate })
      );
      if (res?.payload) onHandleNext(ComponentsType.addOffer);
    }
  };

  return {
    fields,
    router,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
    watch,
  };
};
