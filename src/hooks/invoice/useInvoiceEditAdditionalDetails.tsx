import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateOfferAdditionalDetailsValidation } from "@/validation/offersSchema";
import { EditComponentsType } from "@/components/offers/edit/EditOffersDetailsData";
import { useEffect, useMemo } from "react";
import {
  readContent,
  setContentDetails,
} from "@/api/slices/content/contentSlice";
import { AddOfferAdditionalDetailsFormField } from "@/components/offers/add/fields/add-additional-details-fields";
import { updateInvoiceDetials } from "@/api/slices/invoice/invoiceSlice";
import { AddInvoiceAdditionalDetailsFormField } from "@/components/invoice/createInvoice/fields/add-additional-details-fields";

export const useInoviceEditAdditionalDetails = ({
  handleNext,
  handleBack,
}: {
  handleNext: (currentComponent: EditComponentsType) => void;
  handleBack: (currentComponent: EditComponentsType) => void;
}) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, invoiceDetails } = useAppSelector(
    (state) => state.invoice
  );
  const { content, contentDetails } = useAppSelector((state) => state.content);

  useEffect(() => {
    setValue("additionalDetails", invoiceDetails?.additionalDetails);
    setValue("content", invoiceDetails?.content?.id);

    dispatch(readContent({ params: { filter: {}, paginate: 0 } }));
  }, []);

  const schema = generateOfferAdditionalDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    watch,
    setValue,
    trigger,
    reset,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  useMemo(() => {
    setValue(
      "additionalDetails",
      invoiceDetails?.additionalDetails ||
        invoiceDetails?.content?.invoiceContent?.description
    );
  }, [invoiceDetails?.additionalDetails]);

  const selectedContent = watch("content");
  const handlePrevious = () => {
    handleBack(EditComponentsType.serviceEdit);
  };

  const onContentSelect = (id: string) => {
    const filteredContent = content?.find((item) => item.id === id);
    if (filteredContent) {
      dispatch(setContentDetails(filteredContent));
      setValue(
        "additionalDetails",
        filteredContent?.invoiceContent?.description
      );
      trigger("additionalDetails");
    }
  };
  const fields = AddInvoiceAdditionalDetailsFormField(
    register,
    loading,
    control,
    handlePrevious,
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
      stage: EditComponentsType.additionalEdit,
    };
    const response = await dispatch(
      updateInvoiceDetials({ data: apiData, router, setError, translate })
    );
    if (response?.payload) handleNext(EditComponentsType.additionalEdit);
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
