import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddContentConfirmationDetailsFormField } from "@/components/content/add/fields/add-content-confirmation-details-fields";
import { generateEditConfirmationContentDetailsValidation } from "@/validation/contentSchema";
import { ComponentsType } from "@/components/content/add/ContentAddDetailsData";

export const useAddContentConfirmationDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const backHandle = () => {
    onHandleNext(ComponentsType.addOffer);
  };

  const schema = generateEditConfirmationContentDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<FieldValues>(schema),
  });
  const fields = AddContentConfirmationDetailsFormField(
    register,
    loading,
    control,
    backHandle
  );
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUser({ data, router, setError, translate }));
    onHandleNext(ComponentsType.addInvoiceContent);
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
