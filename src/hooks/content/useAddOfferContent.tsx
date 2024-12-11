import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddOfferContentDetailsFormField } from "@/components/content/add/fields/add-offer-content-details-fields";
import { generateOfferEditContentDetailsValidation } from "@/validation/contentSchema";
import { useState, useEffect } from "react";
import { Attachement } from "@/types/global";
import { transformAttachments } from "@/utils/utility";
import { createContent } from "@/api/slices/content/contentSlice";
import { ComponentsType } from "@/enums/content";

export const useAddOfferContentDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const { loading, contentDetails } = useAppSelector((state) => state.content);

  const [attachements, setAttachements] = useState<Attachement[]>(
    (contentDetails?.id &&
      transformAttachments(contentDetails?.offerContent?.attachments)) ||
      []
  );

  const router = useRouter();
  const dispatch = useAppDispatch();

  const backHandler = () => {
    onHandleNext(ComponentsType.addLeadContent);
  };

  const schema = generateOfferEditContentDetailsValidation(translate);

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

  const offerDescriptionCount = watch("offerContent.description");

  useEffect(() => {
    if (contentDetails.id) {
      reset({
        contentName: contentDetails?.contentName,
        offerContent: {
          ...contentDetails?.offerContent,
        },
      });
    }
  }, [contentDetails?.id]);

  const fields = AddOfferContentDetailsFormField(
    register,
    loading,
    control,
    backHandler,
    trigger,
    0,
    attachements,
    setAttachements
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let apiData = {
      contentName: data.contentName,
      offerContent: {
        body: data.offerContent.body,
        description: data.offerContent.description,
        title: data.offerContent.title,
        attachments: attachements?.map((item) => item.value),
      },
      step: 1,
      stage: ComponentsType.addConfirmationContent,
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
      if (res?.payload) onHandleNext(ComponentsType.addConfirmationContent);
    } else {
      const res = await dispatch(
        createContent({ data: apiData, router, setError, translate })
      );
      if (res?.payload) onHandleNext(ComponentsType.addConfirmationContent);
    }
  };

  return {
    fields,
    router,
    onSubmit,
    control,
    handleSubmit,
    errors,
    translate,
    offerDescriptionCount,
    watch,
  };
};
