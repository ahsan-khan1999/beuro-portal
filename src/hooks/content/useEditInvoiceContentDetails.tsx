import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { EditInvoiceContentDetailsFormField } from "@/components/content/edit/fields/edit-invoice-details-fields";
import { generateEditInvoiceContentDetailsValidation } from "@/validation/contentSchema";
import { ComponentsType } from "@/components/content/details/ContentDetailsData";
import { useEffect, useState } from "react";
import { Attachement } from "@/types/global";
import { transformAttachments } from "@/utils/utility";
import { updateContent } from "@/api/slices/content/contentSlice";

export const useEditInvoiceContentDetails = (onClick: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, contentDetails } = useAppSelector(
    (state) => state.content
  );

  const [attachements, setAttachements] = useState<Attachement[]>(
    (contentDetails?.id &&
      transformAttachments(contentDetails?.invoiceContent?.attachments)) ||
      []
  );

  const handleBack = () => {
    onClick(2, ComponentsType.invoiceContent);
  };

  const schema = generateEditInvoiceContentDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const invoiceDescription = watch("invoiceContent.description");

  useEffect(() => {
    if (contentDetails.id) {
      reset({
        invoiceContent: {
          ...contentDetails?.invoiceContent,
        },
      });
    }
  }, [contentDetails.id]);

  const fields = EditInvoiceContentDetailsFormField(
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
      invoiceContent: {
        body: data.invoiceContent.body,
        description: data.invoiceContent.description,
        title: data.invoiceContent.title,
        attachments: attachements?.map((item) => item.value),
      },
      step: 3,
      stage: ComponentsType.invoiceContent,
      contentId: contentDetails?.id,
      id: contentDetails?.id,
    };
    const res = await dispatch(
      updateContent({ data: apiData, router, setError, translate })
    );
    if (res?.payload) onClick(2, ComponentsType.invoiceContent);
  };

  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
    invoiceDescription,
  };
};
