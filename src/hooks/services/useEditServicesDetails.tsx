import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateServicesValidation } from "@/validation/servicesSchema";
import { servicesEditDetailsFormField } from "@/components/services/fields/edit-services-fields";
import { TRowServices } from "@/types/service";
import { useMemo } from "react";

export const useEditServicesDetails = (
  handleRoute: Function,
  serviceDetail: TRowServices
) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const schema = generateServicesValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<FieldValues>(schema),
  });
  const fields = servicesEditDetailsFormField(register, loading, );
  useMemo(() => {
    if (serviceDetail?.id) {
      reset(serviceDetail);
    }
  }, [serviceDetail?.id]);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUser({ data, router, setError, translate }));
    handleRoute()
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
