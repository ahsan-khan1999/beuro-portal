import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddOfferContentDetailsFormField } from "@/components/content/add/fields/add-offer-content-details-fields";
import { generateContentAddressValidationSchema, generateOfferEditContentDetailsValidation } from "@/validation/contentSchema";
import { ComponentsType } from "@/components/content/add/ContentAddDetailsData";
import { useMemo, useState } from "react";
import { FormField } from "@/types";
import { Attachement } from "@/types/global";
import { generateAddressFields, setAddressFieldValues, transformAttachments, transformFieldsToValues } from "@/utils/utility";
import { createContent } from "@/api/slices/content/contentSlice";

export const useAddOfferContentDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const { loading, error, contentDetails } = useAppSelector((state) => state.content);

  let [addressCount, setAddressCount] = useState<number>(contentDetails?.id && contentDetails?.offerContent?.address?.length || 1)
  const [attachements, setAttachements] = useState<Attachement[]>(contentDetails?.id && transformAttachments(contentDetails?.offerContent?.attachments) || [])

  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleAddAddressField = () => {
    setAddressCount(addressCount + 1)
  }
  const schema = generateOfferEditContentDetailsValidation(translate);
  const schemaAddress = generateContentAddressValidationSchema(translate, addressCount);
  const mergedSchema = schema.concat(schemaAddress);

  const {
    register,
    handleSubmit,
    control,
    setError,
    trigger,
    reset,
    setValue,
    watch,
    formState: { errors },
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

  }, [contentDetails.id])
  

  const fields = AddOfferContentDetailsFormField(register, loading, control, handleAddAddressField, trigger, addressCount, attachements, setAttachements, contentDetails);

  console.log(errors);
  
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let addressField = generateAddressFields(addressCount)
    let apiData = {
      contentName: data.contentName,
      offerContent: {
        body: data.offerContent.body,
        description: data.offerContent.description,
        title: data.offerContent.title,
        attachments: attachements?.map((item) => item.value),
        address: transformFieldsToValues(data.offerContent, addressField),
      },
      step: 1,
      stage: ComponentsType.addConfirmationContent,
      contentId: ""
    }
    if (contentDetails?.id) {
      apiData = {
        ...apiData,
        contentId: contentDetails?.id,
      }
      const res = await dispatch(createContent({ data: apiData, router, setError, translate }));
      if (res?.payload) onHandleNext(ComponentsType.addConfirmationContent);
    } else {

      const res = await dispatch(createContent({ data: apiData, router, setError, translate }));
      if (res?.payload) onHandleNext(ComponentsType.addConfirmationContent);
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
