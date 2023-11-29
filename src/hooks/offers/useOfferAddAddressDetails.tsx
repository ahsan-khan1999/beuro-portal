import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddOffAddressDetailsFormField } from "@/components/offers/add/fields/add-address-details-fields";
import { generateOfferAddressEditDetailsValidation } from "@/validation/offersSchema";
import { ComponentsType } from "@/components/offers/add/AddOffersDetailsData";
import { useMemo, useState } from "react";
import { senitizeDataForm, transformAddressFormValues } from "@/utils/utility";
import { updateOffer } from "@/api/slices/offer/offerSlice";

export const useOfferAddAddressDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, offerDetails } = useAppSelector((state) => state.offer);
  const handleBack = () => {
    onHandleNext(ComponentsType.customerAdded)
  }
  const [addressCount, setAddressCount] = useState(offerDetails?.id && offerDetails?.addressID?.address?.length || 1)

  const schema = generateOfferAddressEditDetailsValidation(translate, addressCount);
  const handleAddNewAddress = () => {
    setAddressCount(addressCount + 1)
  }
  const handleRemoveNewAddress = () => {
    setAddressCount(addressCount - 1)
  }
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  useMemo(() => {
    if (offerDetails.id) {
      reset(transformAddressFormValues(offerDetails?.addressID?.address))
    }
  }, [offerDetails.id])

  const fields = AddOffAddressDetailsFormField(register, loading, control, handleBack, addressCount, handleAddNewAddress, handleRemoveNewAddress);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = { address: senitizeDataForm(data).slice(0, addressCount), step: 2, id: offerDetails?.id, stage: ComponentsType.serviceAdded }
    const response = await dispatch(updateOffer({ data: apiData, router, setError, translate }));
    if (response?.payload) onHandleNext(ComponentsType.serviceAdded);

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
