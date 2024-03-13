import { yupResolver } from "@hookform/resolvers/yup";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { OfferEditContentDetailsFormField } from "@/components/content/edit/fields/offer-edit-content-details-fields";
import {
  generateContentAddressValidationSchema,
  generateOfferEditContentDetailsValidation,
  mergeSchemas,
} from "@/validation/contentSchema";
import { ComponentsType } from "@/components/content/details/ContentDetailsData";
import { useMemo, useState, useEffect } from "react";
import {
  generateAddressFields,
  setAddressFieldValues,
  transformAttachments,
  transformFieldsToValues,
} from "@/utils/utility";
import {
  createContent,
  updateContent,
} from "@/api/slices/content/contentSlice";
import { Attachement } from "@/types/global";

export const useOfferContentEditDetails = (onClick: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, contentDetails } = useAppSelector(
    (state) => state.content
  );
  let [addressCount, setAddressCount] = useState<number>(
    (contentDetails?.id && contentDetails?.offerContent?.address?.length) || 1
  );
  const [attachements, setAttachements] = useState<Attachement[]>(
    (contentDetails?.id &&
      transformAttachments(contentDetails?.offerContent?.attachments)) ||
      []
  );

  const handleAddAddressField = () => {
    setAddressCount(addressCount + 1);
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
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  const handleBack = () => {
    onClick(0, ComponentsType.offerContent);
  };
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
  const {
    fields: addressFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "offerContent.address",
  });

  const fields = OfferEditContentDetailsFormField(
    register,
    loading,
    control,
    handleBack,
    trigger,
    addressFields?.length === 0 ? 1 : addressFields?.length,
    attachements,
    setAttachements,
    contentDetails,
    append,
    remove
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
      if (res?.payload) onClick(0, ComponentsType.offerContent);
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
  };
};
