import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { OfferEditDetailsFormField } from "@/components/offers/edit/fields/offer-edit-details-fields";
import { generateOfferDetailsValidationSchema } from "@/validation/offersSchema";

export const useEditOfferDetails = () => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const schema = generateOfferDetailsValidationSchema(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  const fields = OfferEditDetailsFormField(register, loading, control,() => console.log(""));
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // dispatch(loginUser({ data, router, setError, translate }));
    router.push("/offers/details");
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
