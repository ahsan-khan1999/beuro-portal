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
import { staticEnums } from "@/utils/static";
import { getKeyByValue } from "@/utils/auth.util";

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
    setValue,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const customerType = watch("customerType");
  useMemo(() => {
    if (leadDetails.id) {
      reset({
        fullName: leadDetails.customerDetail?.fullName,
        customer: leadDetails.customerDetail?.id,

        customerType: getKeyByValue(
          staticEnums["CustomerType"],
          leadDetails.customerDetail?.customerType
        ),
        email: leadDetails.customerDetail?.email,
        phoneNumber: leadDetails.customerDetail?.phoneNumber,
        mobileNumber: leadDetails.customerDetail?.mobileNumber,
        address: leadDetails?.customerDetail?.address,
        companyName: leadDetails?.customerDetail?.companyName,
        gender: staticEnums["Gender"][leadDetails?.customerDetail?.gender],
      });
    }
  }, [leadDetails.id]);
  const fields = LeadsCustomerDetailsFormField(
    register,
    loading,
    control,
    handleBack,
    leadDetails,
    customerType,
    setValue
  );
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = {
      ...data,
      step: 1,
      leadId: leadDetails?.id,
      stage: ComponentsType.addressEdit,
      customerID: leadDetails?.customerID,
    };
    const res = await dispatch(
      createLead({ data: apiData, router, setError, translate })
    );
    if (res?.payload) onClick(0, ComponentsType.customer);
  };
  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
  };
};
