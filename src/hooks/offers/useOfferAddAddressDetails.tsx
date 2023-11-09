import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddOffAddressDetailsFormField } from "@/components/offers/add/fields/add-address-details-fields";
import { generateOfferAddressEditDetailsValidation } from "@/validation/offersSchema";
import { ComponentsType } from "@/components/offers/add/AddOffersDetailsData";

export const useOfferAddAddressDetails = (onHandleNext:Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const schema = generateOfferAddressEditDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  const fields = AddOffAddressDetailsFormField(register, loading, control,() => console.log(""));
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUser({ data, router, setError, translate }));
    onHandleNext(ComponentsType.serviceAdded)
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
