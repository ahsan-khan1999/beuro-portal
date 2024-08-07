import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddNewCustomerLeadFormField } from "@/components/leads/fields/Add-customer-lead-fields";
import { generateAddNewLeadCustomerDetailsValidation } from "@/validation/leadsSchema";
import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";
import { useEffect } from "react";
import {
  readCustomer,
  readCustomerDetail,
  setCustomerDetails,
} from "@/api/slices/customer/customerSlice";
import { createLead } from "@/api/slices/lead/leadSlice";
import { updateQuery } from "@/utils/update-query";
import { getKeyByValue } from "@/utils/auth.util";
import { staticEnums } from "@/utils/static";

export const useAddNewLeadCustomer = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);
  const { customer, customerDetails } = useAppSelector(
    (state) => state.customer
  );

  useEffect(() => {
    dispatch(
      readCustomer({ params: { filter: { dropdown: "true" }, paginate: 0 } })
    );
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

  const onCustomerSelect = async (id: string) => {
    if (!id) return;

    if (id) {
      try {
        const response = await dispatch(
          readCustomerDetail({ params: { filter: id } })
        );
        dispatch(setCustomerDetails(response?.payload));
        reset({
          ...response?.payload,
          type: type,
          gender: staticEnums["Gender"][response?.payload?.gender],
          customerID: id,
        });
      } catch (error) {
        console.error("Failed to fetch customer detail:", error);
      }
    }
  };

  useEffect(() => {
    if (leadDetails?.id) {
      reset({
        type: leadDetails.type,
        fullName: leadDetails.customerDetail?.fullName,
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
    } else {
      setValue("type", "New Customer");
    }
  }, [leadDetails?.id]);

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
        apiData = { ...apiData, customerID: data?.customerID };
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
