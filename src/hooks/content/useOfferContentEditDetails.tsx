import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { OfferEditContentDetailsFormField } from "@/components/content/edit/fields/offer-edit-content-details-fields";
import { generateOfferEditContentDetailsValidation } from "@/validation/contentSchema";

export const useOfferContentEditDetails = (handleRoute: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const schema = generateOfferEditContentDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const fields = OfferEditContentDetailsFormField(register, loading, control, handleRoute);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUser({ data, router, setError, translate }));
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