import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddNewCustomerLeadFormField } from "@/components/leads/fields/Add-customer-lead-fields";
import { generateAddNewLeadCustomerDetailsValidation } from "@/validation/leadsSchema";
import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";
import { useEffect } from "react";
import { readCustomer, setCustomerDetails } from "@/api/slices/customer/customerSlice";
import { createLead } from "@/api/slices/lead/leadSlice";
import { updateQuery } from "@/utils/update-query";

export const useAddNewLeadCustomer = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.lead);
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
  const fields = AddNewCustomerLeadFormField(register, loading, control, { customerType, type, customer, onCustomerSelect, customerDetails,onCancel }, setValue);


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await dispatch(createLead({ data, router, setError, translate }));
    if (res?.payload) onHandleNext(ComponentsType.addressEdit);

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
