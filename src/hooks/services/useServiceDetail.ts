import { servicesDetailsFormField } from "@/components/services/fields/services-fields";
import { Service } from "@/types/service";
import { servicesData } from "@/utils/static";
import { generateServicesValidation } from "@/validation/servicesSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../useRedux";

const useServiceDetail = (stage: boolean) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  // @ts-expect-error
  const [serviceDetail, setServiceDetail] = useState<Service>({});
  const { loading } = useAppSelector((state) => state.auth);
  const [isUpdate, setIsUpdate] = useState<boolean>(stage);
  const id = router.query.service;
  const schema = generateServicesValidation(translate);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    if (typeof Number(id) == "number") {
      let service = servicesData.filter((item) => item.id == id)[0];
      if (service) {
        reset(service);
      }
      setServiceDetail(service);
    }
  }, [id]);

  const handleUpdateCancel = () => {
    setIsUpdate(!isUpdate);
  };

  const fields = servicesDetailsFormField(
    register,
    loading,
    isUpdate,
    handleUpdateCancel
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data, "submit");
  };

  const handlePreviousClick = () => {
    router.push("/services");
  };

  return {
    serviceDetail,
    isUpdate,
    setIsUpdate,
    fields,
    onSubmit,
    handleSubmit,
    errors,
    handlePreviousClick,
    handleUpdateCancel,
    translate
  };
};
export default useServiceDetail;
