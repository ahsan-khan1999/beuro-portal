import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateContractEmailValidationSchema } from "@/validation/contractSchema";
import { ContractEmailPreviewFormField } from "@/components/contract/fields/contract-email-fields";
import { useEffect, useMemo } from "react";
import { readContent, setContentDetails } from "@/api/slices/content/contentSlice";

export const useContractEmail = (
  backRouteHandler: Function,
  onNextHandle: Function
) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, contractDetails } = useAppSelector((state) => state.contract);
  const { content, contentDetails } = useAppSelector((state) => state.content);

  const schema = generateContractEmailValidationSchema(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    watch,
    reset
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  useEffect(() => {
    dispatch(readContent({ params: { filter: { paginate: 0 } } }))
  }, [])


  const onContentSelect = (id: string) => {
    const selectedContent = content.find((item) => item.id === id)
    if (selectedContent) {
      dispatch(setContentDetails(selectedContent))
    }
  }
  const fields = ContractEmailPreviewFormField(
    register,
    loading,
    control,
    () => console.log(),
    backRouteHandler,
    content,
    contentDetails,
    onContentSelect
  );
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUser({ data, router, setError, translate }));
    onNextHandle();
  };
  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate
  };
};
