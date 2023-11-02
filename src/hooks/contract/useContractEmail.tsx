import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateContractEmailValidationSchema } from "@/validation/contractSchema";
import { ContractEmailPreviewFormField } from "@/components/contract/fields/contract-email-fields";

export const useContractEmail = (backRouteHandler: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const schema = generateContractEmailValidationSchema(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
  });
  const fields = ContractEmailPreviewFormField(
    register,
    loading,
    control,
    backRouteHandler
  );
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    dispatch(loginUser({ data, router, setError, translate }));
    router.push("/contract/pdf-preview");
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
