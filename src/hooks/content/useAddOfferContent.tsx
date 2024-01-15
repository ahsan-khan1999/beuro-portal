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
import { AddOfferContentDetailsFormField } from "@/components/content/add/fields/add-offer-content-details-fields";
import {
  generateContentAddressValidationSchema,
  generateOfferEditContentDetailsValidation,
  mergeSchemas,
} from "@/validation/contentSchema";
import { ComponentsType } from "@/components/content/add/ContentAddDetailsData";
import { useMemo, useState, useEffect } from "react";
import { FormField } from "@/types";
import { Attachement } from "@/types/global";
import {
  generateAddressFields,
  setAddressFieldValues,
  transformAttachments,
  transformFieldsToValues,
} from "@/utils/utility";
import { createContent } from "@/api/slices/content/contentSlice";

export const useAddOfferContentDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const { loading, error, contentDetails } = useAppSelector(
    (state) => state.content
  );

  const [attachements, setAttachements] = useState<Attachement[]>(
    (contentDetails?.id &&
      transformAttachments(contentDetails?.offerContent?.attachments)) ||
      []
  );

  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleAddAddressField = () => {};
  const schema = generateOfferEditContentDetailsValidation(translate);

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
    resolver: yupResolver<FieldValues>(schema),
  });

  useMemo(() => {
    if (contentDetails.id) {
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
  }, [contentDetails.id]);
  const {
    fields: addressFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "offerContent.address",
  });

  const fields = AddOfferContentDetailsFormField(
    register,
    loading,
    control,
    handleAddAddressField,
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
      contentName: data.contentName,
      offerContent: {
        body: data.offerContent.body,
        description: data.offerContent.description,
        title: data.offerContent.title,
        attachments: attachements?.map((item) => item.value),
        // address: transformFieldsToValues(data.offerContent, addressField),
        address: data?.offerContent?.address?.map((item: any) => item.value),
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
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
  };
};
