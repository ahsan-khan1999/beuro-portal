import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { LeadsCustomerDetailsFormField } from "@/components/leads/fields/Leads-customer-details-fields";
import { generateLeadsCustomerEditDetailsValidation } from "@/validation/leadsSchema";
import { ComponentsType } from "@/components/leads/details/LeadsDetailsData";
import { useMemo } from "react";
import { createLead } from "@/api/slices/lead/leadSlice";

export const useLeadCustomerEditDetails = (onClick: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);

  const handleBack = () => {
    onClick(0, ComponentsType.customer);
  };

  const schema = generateLeadsCustomerEditDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
    watch,
    setValue
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  console.log(errors);
  const customerType = watch("customerType")
  useMemo(() => {
    if (leadDetails.id) {
      reset({
        fullName: leadDetails.customerID?.fullName,
        customer: leadDetails.customerID?.id,

        customerType: leadDetails.customerID?.customerType,
        email: leadDetails.customerID?.email,
        phoneNumber: leadDetails.customerID?.phoneNumber,
        mobileNumber: leadDetails.customerID?.mobileNumber,
        address: leadDetails?.customerID?.address,
      })
    }
  }, [leadDetails.id]);
  const fields = LeadsCustomerDetailsFormField(register, loading, control, handleBack, leadDetails,customerType,setValue);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = { ...data, step: 1, leadId: leadDetails?.id, stage: ComponentsType.addressEdit, customerID: leadDetails?.customerID?.id }
    const res = await dispatch(createLead({ data: apiData, router, setError, translate }));
    if (res?.payload) onClick(0, ComponentsType.customer);

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
