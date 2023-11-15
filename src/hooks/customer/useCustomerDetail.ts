import { Customers } from "@/types/customer";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateCustomerValidation } from "@/validation/customersSchema";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerDetailsFormField } from "@/components/customer/customer-fields";
import { createCustomer } from "@/api/slices/customer/customerSlice";

export default function useCustomerDetail(stage: boolean) {
  const { t: translate } = useTranslation();
  const { loading } = useAppSelector((state) => state.customer);
  const dispatch = useAppDispatch()
  const router = useRouter();
  const [customerDetail, setCustomerDetail] = useState<Customers | undefined>();
  const [isUpdate, setIsUpdate] = useState<boolean>(stage);

  const id = router.query.customer;
  const schema = generateCustomerValidation(translate);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setError,
    watch
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  const customerType = watch("customerType")
  // useMemo(() => {
  //   if (customerDetail) {

  //     if (typeof Number(id) == "number") {
  //       let customer = customers.filter((item:any) => item.id == Number(id))[0];
  //       if (customer) {
  //         reset({ ...customer, phoneNumber: customer.phoneNumber });
  //       }
  //       setCustomerDetail(customer);
  //     }
  //   }
  // }, [id]);

  const handleUpdateCancel = () => {
    setIsUpdate(!isUpdate);
  };

  const fields = customerDetailsFormField(
    register,
    loading,
    isUpdate,
    handleUpdateCancel,
    { phoneNumber: customerDetail?.phoneNumber, mobileNumber: customerDetail?.mobileNumber, customerType: customerType },
    control,
  );
  console.log(errors);


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await dispatch(createCustomer({ data, router, setError, translate }))
    if (res.payload) router.push("/customers")
  };

  const handlePreviousClick = () => {
    router.push("/customers");
  };

  return {
    customerDetail,
    isUpdate,
    setIsUpdate,
    fields,
    onSubmit,
    handleSubmit,
    errors,
    handlePreviousClick,
    handleUpdateCancel,
  };
}
