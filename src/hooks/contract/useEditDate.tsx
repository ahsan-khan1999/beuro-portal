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
import { generateContractDateSchema } from "@/validation/contractSchema";
import { SetStateAction, useEffect } from "react";
import { AddDateFormFieldContract } from "@/components/contract/fields/edit-date-fields";
import { updateContractDates } from "@/api/slices/contract/contractSlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { updatePublicOfferDates } from "@/api/slices/offer/offerSlice";
import { EmailHeaderProps, PdfProps } from "@/types";

export const useEditDate = (
  setOfferData?: SetStateAction<any>,
  pdfData?: PdfProps<EmailHeaderProps>
) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, contractDetails } = useAppSelector(
    (state) => state.contract
  );
  const { modal } = useAppSelector((state) => state.global);
  const { publicOffer, loadingPublicOffer } = useAppSelector(
    (state) => state.offer
  );
  const handleCloseModal = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };
  const handleSuccessModal = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };
  const isOffer = router?.pathname?.includes("pdf");
  const schema = generateContractDateSchema(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    setValue,
    trigger,
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
    setValue(
      "date",
      isOffer
        ? pdfData?.movingDetails?.workDates
        : contractDetails?.offerID?.date
    );
    setValue(
      "time",
      isOffer ? pdfData?.movingDetails?.time : contractDetails?.offerID?.time
    );
    trigger("time");
  }, []);

  const fields = AddDateFormFieldContract(
    register,
    append,
    testFields?.length ? testFields?.length : 1,
    remove,
    isOffer ? loadingPublicOffer : loading,
    control,
    (isOffer && pdfData?.movingDetails?.workDates) || undefined
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (isOffer) {
      const response = await dispatch(
        updatePublicOfferDates({
          data: { ...data, id: publicOffer?.Offer?.id },
          router,
          setError,
          translate,
        })
      );
      if (response?.payload && setOfferData) {
        setOfferData({
          ...pdfData,
          movingDetails: {
            ...pdfData?.movingDetails,
            workDates: response?.payload?.date,
            time: response?.payload?.time,
          },
        });
        handleSuccessModal();
      }
    } else {
      const response = await dispatch(
        updateContractDates({
          data: { ...data, id: contractDetails?.offerID?.id },
          router,
          setError,
          translate,
        })
      );
      if (response?.payload) handleSuccessModal();
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
