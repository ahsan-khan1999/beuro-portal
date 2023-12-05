import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { OfferAddressDetailsFormField } from "@/components/offers/edit/fields/Offer-address-edit-fields";
import { generateOfferAddressEditDetailsValidation } from "@/validation/offersSchema";
import { EditComponentsType } from "@/components/offers/edit/EditOffersDetailsData";
import { useMemo, useState } from "react";
import { AddOffAddressDetailsFormField } from "@/components/offers/add/fields/add-address-details-fields";
import { updateOffer } from "@/api/slices/offer/offerSlice";

export const useEditOfferAddressDetails = ({ handleNext }: { handleNext: (currentComponent: EditComponentsType) => void }) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, offerDetails } = useAppSelector((state) => state.offer);
  const handleBack = () => {
    handleNext(EditComponentsType.offerEdit)
  }
  const [addressCount, setAddressCount] = useState(offerDetails?.id && offerDetails?.addressID?.address?.length || 1)

  const schema = generateOfferAddressEditDetailsValidation(translate);
  
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
      // reset(transformAddressFormValues(offerDetails?.addressID?.address))
      reset({
        address: offerDetails?.addressID?.address
      })
    }
  }, [offerDetails.id])
  const { fields: addressFields, append, remove } = useFieldArray({
    control,
    name: "address",

  });

  const fields = AddOffAddressDetailsFormField(register, loading, control, handleBack, addressFields?.length, append, remove, addressFields);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = { ...data, step: 2, id: offerDetails?.id, stage: EditComponentsType.serviceEdit }
    const response = await dispatch(updateOffer({ data: apiData, router, setError, translate }));
    if (response?.payload) handleNext(EditComponentsType.serviceEdit);

  };
  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    register,
    append,
    remove,
    addressFields,
  };
};
