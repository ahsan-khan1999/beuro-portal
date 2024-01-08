import { loginUser, readDashboard } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateAddFollowUpValidation } from "@/validation/followUpSchema";
import { AddFollowUpFormField } from "@/components/follow-up/fields/add-follow-up-fields";
import { Modals } from "@/enums/follow-up";
import { createFollowUp } from "@/api/slices/followUp/followUp";
import { useEffect } from "react";
import { readFollowUpSettings } from "@/api/slices/settingSlice/settings";

export const useAddFollowUp = (
  handleFollowUps: Function,
  handleAllCustomers: Function,
  handleAllLeads: Function
) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { customer } = useAppSelector((state) => state.customer);
  const { lead } = useAppSelector((state) => state.lead);
  const { loading, error } = useAppSelector((state) => state.followUp);
  const { followUps } = useAppSelector((state) => state.settings);



  useEffect(() => {
    dispatch(readFollowUpSettings({}))
  }, [])


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
    { customer: customer, lead: lead, followUps },
    handleModalPop,
  );
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const response = await dispatch(createFollowUp({ data, router, setError, translate }));
    if (response?.payload) {
      handleFollowUps();
      if (router.pathname === "/dashboard") dispatch(readDashboard({ params: { filter: { month: 1 } } }))

    }


  };
  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    customer,
    lead,
    translate
  };
};
