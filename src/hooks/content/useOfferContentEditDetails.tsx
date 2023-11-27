import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { OfferEditContentDetailsFormField } from "@/components/content/edit/fields/offer-edit-content-details-fields";
import { generateContentAddressValidationSchema, generateOfferEditContentDetailsValidation } from "@/validation/contentSchema";
import { ComponentsType } from "@/components/content/details/ContentDetailsData";
import { useMemo, useState } from "react";
import { generateAddressFields, setAddressFieldValues, transformAttachments, transformFieldsToValues } from "@/utils/utility";
import { createContent, updateContent } from "@/api/slices/content/contentSlice";
import { Attachement } from "@/types/global";

export const useOfferContentEditDetails = (onClick: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, contentDetails } = useAppSelector((state) => state.content);
  let [addressCount, setAddressCount] = useState<number>(contentDetails?.id && contentDetails?.offerContent?.address?.length || 1)
  const [attachements, setAttachements] = useState<Attachement[]>(contentDetails?.id && transformAttachments(contentDetails?.offerContent?.attachments) || [])

  const backHandle = () => {
    onClick(0, ComponentsType.offerContent);
  };

  const schema = generateOfferEditContentDetailsValidation(translate);
  const schemaAddress = generateContentAddressValidationSchema(translate, addressCount);
  const mergedSchema = schema.concat(schemaAddress);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    reset,
    setValue,
    trigger
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(mergedSchema),
  });

  useMemo(() => {
    if (contentDetails.id) {
      reset({
        contentName: contentDetails?.contentName,
        title: contentDetails?.offerContent?.title,
        attachments: contentDetails?.offerContent?.attachments?.length > 0 && contentDetails?.offerContent?.attachments[0] || null
      })
      setAddressFieldValues(setValue, contentDetails?.offerContent?.address)
    }
  }, [contentDetails.id]);
  const fields = OfferEditContentDetailsFormField(
    register,
    loading,
    control,
    backHandle, trigger, addressCount, attachements, setAttachements, contentDetails
  );
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let addressField = generateAddressFields(addressCount)
    let apiData = {
      contentName: data.contentName,
      offerContent: {
        body: data.body,
        description: data.description,
        title: data.title,
        attachments: attachements?.map((item) => item.value),
        address: transformFieldsToValues(data, addressField),
      },
      step: 1,
      stage: ComponentsType.editConfirmationContent,
      contentId: contentDetails?.id,
      id: contentDetails?.id

    }
    if (contentDetails?.id) {
      apiData = {
        ...apiData,
        contentId: contentDetails?.id,
      }
      const res = await dispatch(createContent({ data: apiData, router, setError, translate }));
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
  };
};
