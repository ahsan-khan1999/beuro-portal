import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddNewCustomerLeadFormField } from "@/components/leads/fields/Add-customer-lead-fields";
import { generateAddNewLeadCustomerDetailsValidation } from "@/validation/leadsSchema";
import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";
import { useEffect, useState } from "react";
import {
  readCustomer,
  setCustomerDetails,
} from "@/api/slices/customer/customerSlice";
import { createLead } from "@/api/slices/lead/leadSlice";
import { updateQuery } from "@/utils/update-query";
import { getKeyByValue } from "@/utils/auth.util";
import { staticEnums } from "@/utils/static";
import { Customers } from "@/types/customer";

export const useAddNewLeadCustomer = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [filteredCustomers, setFilteredCustomers] = useState<Customers[]>([]);
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);
  const { customer, customerDetails } = useAppSelector(
    (state) => state.customer
  );

  useEffect(() => {
    dispatch(readCustomer({ params: { filter: {}, paginate: 0 } }));
  }, []);

  const onCancel = () => {
    router.pathname = "/leads";
    router.query = { status: "None" };
    updateQuery(router, router.locale as string);
  };

  const schema = generateAddNewLeadCustomerDetailsValidation(translate);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const customerType = watch("customerType");
  const type = watch("type");
  const gender = watch("gender");

  const onCustomerSelect = (id: string) => {
    if (!id) return;
    const selectedCustomers = customer.find((item) => item.id === id);
    if (selectedCustomers) {
      dispatch(setCustomerDetails(selectedCustomers));

      reset({
        ...selectedCustomers,
        type: type,
        gender: staticEnums["Gender"][selectedCustomers?.gender],
        customerID: id,
      });
    }
  };

  // console.log(leadDetails?.customerDetail?.fullName);

  useEffect(() => {
    if (leadDetails.id) {
      reset({
        fullName: leadDetails.customerDetail?.fullName,
        type: leadDetails.type,
        customer: leadDetails.customerID,
        customerID: leadDetails.customerID,

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
      // fetchCustomers(leadDetails?.customerDetail?.fullName);
    } else {
      setValue("type", "New Customer");
    }
  }, [leadDetails.id]);

  // const fetchCustomers = async (searchItem: string) => {
  //   const response = await dispatch(
  //     readCustomer({ params: { filter: { text: searchItem } } })
  //   );

  //   if (response.payload) {
  //     let customersList = [
  //       ...filteredCustomers,
  //       ...response?.payload?.Customer,
  //     ];

  //     const uniqueCustomers = Array.from(
  //       new Map(customersList.map((item) => [item.id, item])).values()
  //     );
  //     setFilteredCustomers(uniqueCustomers);
  //   }
  // };

  const fields = AddNewCustomerLeadFormField(
    register,
    loading,
    control,
    {
      customerType,
      type,
      customer,
      onCustomerSelect,
      customerDetails,
      onCancel,
      leadDetails,
      gender,
      // onEnterPress: fetchCustomers,
    },
    setValue
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (leadDetails?.id) {
      let apiData: any = {
        ...data,
        step: 1,
        leadId: leadDetails?.id,
        stage: ComponentsType.addressAdd,
      };
      if (leadDetails?.customerID)
        apiData = { ...apiData, customerID: leadDetails?.customerID };
      const res = await dispatch(
        createLead({ data: apiData, router, setError, translate })
      );
      if (res?.payload) onHandleNext(ComponentsType.addressAdd);
    } else {
      const apiData = { ...data, step: 1, stage: ComponentsType.addressAdd };

      const res = await dispatch(
        createLead({ data: apiData, router, setError, translate })
      );
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
    translate,
  };
};
