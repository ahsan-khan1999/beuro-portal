import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateRejectOfferValidation } from "@/validation/modalsSchema";
import { rejectOfferPublic } from "@/api/slices/offer/offerSlice";
import { RejectOfferFields } from "@/components/offers/reject-offer-field";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";

export const useRejectOffer = () => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, offerDetails } = useAppSelector(
    (state) => state.offer
  );
  const { offerID } = router.query;
  const {
    modal: { data },
  } = useAppSelector((state) => state.global);

  const onClose = () => {};
  const schema = generateRejectOfferValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    trigger,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const reason = watch("reason");

  const fields = RejectOfferFields(
    register,
    loading,
    trigger,
    () => console.log(),
    control,
    reason
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const params = {
      id: offerID,
      reason: data?.reason === "Other" ? data?.reasonDescription : data?.reason,
    };

    const response = await dispatch(rejectOfferPublic({ params }));
    if (response?.payload)
      dispatch(updateModalType({ type: ModalType.OFFER_REJECT_SUCCESS }));
    else dispatch(updateModalType({ type: ModalType.NONE }));
  };

  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
    onClose,
  };
};
