import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateAddFollowUpValidation } from "@/validation/followUpSchema";
import { AddFollowUpFormField } from "@/components/follow-up/fields/add-follow-up-fields";
import { Modals } from "@/enums/follow-up";

export const useAddFollowUp = (
  handleFollowUps: Function,
  handleAllCustomers: Function,
  handleAllLeads: Function
) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const schema = generateAddFollowUpValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const lookUpModals = {
    [Modals.customer]: () => handleAllCustomers(),
    [Modals.leads]: () => handleAllLeads(),
  };

  const handleModalPop = (item: Modals) => {
    lookUpModals[item]();
  };

  const fields = AddFollowUpFormField(
    register,
    loading,
    control,
    handleModalPop
  );
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUser({ data, router, setError, translate }));
    handleFollowUps();
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