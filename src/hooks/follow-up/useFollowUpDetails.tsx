import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "../useRedux";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateAddPostPonedValidation } from "@/validation/modalsSchema";
import { PostPonedFollowUpFormField } from "@/components/follow-up/fields/add-follow-up-fields";

export default function useFollowUpDetails() {
  const { t: translate } = useTranslation();
  const { loading } = useAppSelector((state) => state.auth);

  const router = useRouter();
  //   const [customerDetail, setCustomerDetail] = useState<Customers>(customers[0]);
  const [isUpdate, setIsUpdate] = useState<boolean>();

  const schema = generateAddPostPonedValidation(translate);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  //   useEffect(() => {
  //     if (typeof Number(id) == "number") {
  //       let customer = customers.filter((item) => item.id == Number(id))[0];
  //       if (customer) {
  //         reset(customer);
  //       }
  //       setCustomerDetail(customer);
  //     }
  //   }, [id]);

  //   const handleUpdateCancel = () => {
  //     setIsUpdate(!isUpdate);
  //   };

  const fields = PostPonedFollowUpFormField(
    register,
    loading,
    control
    // handleUpdateCancel,
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data, "submit");
  };

  //   const handlePreviousClick = () => {
  //     router.push("/customers");
  //   };

  return {
    fields,
    onSubmit,
    handleSubmit,
    errors,
  };
}
