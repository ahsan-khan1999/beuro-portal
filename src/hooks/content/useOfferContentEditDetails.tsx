import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { OfferEditContentDetailsFormField } from "@/components/content/edit/fields/offer-edit-content-details-fields";
import { generateOfferEditContentDetailsValidation } from "@/validation/contentSchema";
import { ComponentsType } from "@/components/content/details/ContentDetailsData";
import { useState, useEffect } from "react";
import { transformAttachments } from "@/utils/utility";
import { createContent } from "@/api/slices/content/contentSlice";
import { Attachement } from "@/types/global";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";

export const useOfferContentEditDetails = (onClick: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, contentDetails } = useAppSelector(
    (state) => state.content
  );

  const [attachements, setAttachements] = useState<Attachement[]>(
    (contentDetails?.id &&
      transformAttachments(contentDetails?.offerContent?.attachments)) ||
      []
  );

  const handleBack = () => {
    onClick(0, ComponentsType.offerContent);
  };

  const schema = generateOfferEditContentDetailsValidation(translate);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const offerDescriptionCount = watch("offerContent.description");

  useEffect(() => {
    if (contentDetails?.id) {
      reset({
        contentName: contentDetails?.contentName,
        offerContent: {
          ...contentDetails?.offerContent,
          address: contentDetails?.offerContent?.address?.map((item) => ({
            value: item,
          })),
        },
      });
    }
  }, [contentDetails?.id]);

  const fields = OfferEditContentDetailsFormField(
    register,
    loading,
    control,
    handleBack,
    trigger,
    0,
    attachements,
    setAttachements
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let apiData = {
      contentName: data?.contentName,
      offerContent: {
        body: data?.offerContent.body,
        description: data?.offerContent.description,
        title: data?.offerContent.title,
        attachments: attachements?.map((item) => item.value),
        address: data?.offerContent?.address?.map((item: any) => item.value),
      },
      step: 1,
      stage: ComponentsType.editConfirmationContent,
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
          isUpdate: true,
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
    offerDescriptionCount,
    router,
  };
};
