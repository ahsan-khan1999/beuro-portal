import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddNewCustomerLeadFormField } from "@/components/leads/fields/Add-customer-lead-fields";
import { generateAddNewLeadCustomerDetailsValidation } from "@/validation/leadsSchema";
import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";
import { useEffect, useMemo } from 'react';
import { readCustomer, setCustomerDetails } from "@/api/slices/customer/customerSlice";
import { createLead, updateLead } from "@/api/slices/lead/leadSlice";
import { updateQuery } from "@/utils/update-query";

export const useAddNewLeadCustomer = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);
  const { customer, customerDetails } = useAppSelector((state) => state.customer);
  useEffect(() => {
    dispatch(readCustomer({ params: { filter: { paginate: 0 } } }))
  }, [])

  const onCancel = () => {
    router.pathname = "/leads"
    updateQuery(router, router.locale as string)
  }
  const schema = generateAddNewLeadCustomerDetailsValidation(translate);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  const customerType = watch("customerType")

  const type = watch("type")

  const onCustomerSelect = (id: string) => {
    if (!id) return;
    const selectedCustomers = customer.filter((item) => item.id === id)
    dispatch(setCustomerDetails(selectedCustomers?.length > 0 && selectedCustomers[0]))

    reset({
      ...selectedCustomers[0],
      type: type,
    })

  }

  useMemo(() => {

    if (leadDetails.id) {
      reset({
        fullName: leadDetails.customerID?.fullName,
        type: leadDetails.type,
        customer: leadDetails.customerID?.id,

        customerType: leadDetails.customerID?.customerType,
        email: leadDetails.customerID?.email,
        phoneNumber: leadDetails.customerID?.phoneNumber,
        mobileNumber: leadDetails.customerID?.mobileNumber,
        address: leadDetails?.customerID?.address,
      })
    }
  }, [leadDetails.id])

  const fields = AddNewCustomerLeadFormField(register, loading, control, { customerType, type, customer, onCustomerSelect, customerDetails, onCancel, leadDetails }, setValue);


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (leadDetails?.id) {
      const apiData = { ...data, step: 1, leadId: leadDetails?.id, stage: ComponentsType.addressAdd }

      const res = await dispatch(createLead({ data: apiData, router, setError, translate }));
      if (res?.payload) onHandleNext(ComponentsType.addressAdd);
    } else {
      const apiData = { ...data, step: 1, stage: ComponentsType.addressAdd }

      const res = await dispatch(createLead({ data: apiData, router, setError, translate }));
      if (res?.payload) onHandleNext(ComponentsType.addressAdd);
    }

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
