import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddDateFormField } from "@/components/offers/add/fields/add-offer-details-fields";
import { generateContractDateSchema } from "@/validation/contractSchema";
import { SetStateAction, useEffect } from "react";
import { AddDateFormFieldContract } from "@/components/contract/fields/edit-date-fields";
import { updateContractDates } from "@/api/slices/contract/contractSlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { readOfferPublicDetails, updatePublicOfferDates } from "@/api/slices/offer/offerSlice";
import { EmailHeaderProps, PdfProps } from "@/types";

export const useEditDate = (setOfferData?: SetStateAction<any>, pdfData?: PdfProps<EmailHeaderProps>) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, contractDetails } = useAppSelector(
    (state) => state.contract
  );
  const { publicOffer, loadingPublicOffer } = useAppSelector(
    (state) => state.offer
  );
  const handleCloseModal = () => {
    dispatch(updateModalType({ type: ModalType.NONE }))
  }
  const isOffer = router?.pathname?.includes("pdf")
  const schema = generateContractDateSchema(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    setValue
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });


  const {
    fields: testFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "date",
  });
  useEffect(() => {
    setValue("date", isOffer ? pdfData?.movingDetails?.workDates : contractDetails?.offerID?.date)
  }, [])
  const fields = AddDateFormFieldContract(
    register,
    append,
    testFields?.length ? testFields?.length : 1,
    remove,
    isOffer ? loadingPublicOffer : loading
  );
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (isOffer) {
      const response = await dispatch(updatePublicOfferDates({ data: { ...data, id: publicOffer?.Offer?.id }, router, setError, translate }))
      if (response?.payload && setOfferData) {
        setOfferData({ ...pdfData, "movingDetails": { ...pdfData?.movingDetails, "workDates": response?.payload?.date } })
        handleCloseModal()
      }
    } else {
      const response = await dispatch(updateContractDates({ data: { ...data, id: contractDetails?.offerID?.id }, router, setError, translate }))
      if (response?.payload) handleCloseModal()
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
