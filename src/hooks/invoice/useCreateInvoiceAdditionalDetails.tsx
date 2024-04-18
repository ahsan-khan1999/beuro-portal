import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddOfferAdditionalDetailsFormField } from "@/components/offers/add/fields/add-additional-details-fields";
import { useEffect, useMemo } from "react";
import {
  readContent,
  setContentDetails,
} from "@/api/slices/content/contentSlice";
import { ComponentsType } from "@/components/offers/add/AddOffersDetailsData";
import { generateCreateInvoiceAdditionalDetailsValidation } from "@/validation/invoiceSchema";
import { updateMainInvoice } from "@/api/slices/invoice/invoiceSlice";

export const useCreateInvoiceAdditionalDetails = (
  onHandleNext: (currentComponent: ComponentsType) => void,
  onHandleBack: (currentComponent: ComponentsType) => void
) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, invoiceDetails } = useAppSelector(
    (state) => state.invoice
  );
  const { content, contentDetails } = useAppSelector((state) => state.content);

  useEffect(() => {
    setValue("content", invoiceDetails?.content?.id);
    dispatch(readContent({ params: { filter: {}, paginate: 0 } }));
  }, []);

  const schema = generateCreateInvoiceAdditionalDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useMemo(() => {
    setValue(
      "additionalDetails",
      invoiceDetails?.additionalDetails ||
        invoiceDetails?.content?.offerContent?.description
    );
  }, [invoiceDetails?.additionalDetails]);

  const selectedContent = watch("content");
  const handleBack = () => {
    onHandleBack(ComponentsType.serviceAdded);
  };

  const onContentSelect = (id: string) => {
    const filteredContent = content?.find((item) => item.id === id);
    if (filteredContent) {
      dispatch(setContentDetails(filteredContent));
      setValue("additionalDetails", filteredContent?.offerContent?.description);
      trigger("additionalDetails");
    }
  };

  const fields = AddOfferAdditionalDetailsFormField(
    register,
    loading,
    control,
    handleBack,
    0,
    {
      content: content,
      contentDetails: contentDetails,
      invoiceDetails,
      onContentSelect,
      selectedContent,
    },
    setValue,
    trigger
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = {
      ...data,
      step: 4,
      id: invoiceDetails?.id,
      stage: ComponentsType.additionalAdded,
    };
    const response = await dispatch(
      updateMainInvoice({ data: apiData, router, setError, translate })
    );
    if (response?.payload) onHandleNext(ComponentsType.additionalAdded);
  };

  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
    invoiceDetails,
  };
};
