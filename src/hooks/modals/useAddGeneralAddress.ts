import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateAddGeneralAddressValidationSchema } from "@/validation/modalsSchema";
import { addGeneralAddressFormField } from "@/components/setting/fields/general-address-title-field";

export interface GeneralAddressFormProps {
  onSuccess: () => void;
}

export default function useAddGeneralAddress({
  onSuccess,
}: GeneralAddressFormProps) {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.settings);
  const schema = generateAddGeneralAddressValidationSchema(translate);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const fields = addGeneralAddressFormField(register, loading);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // const response = await dispatch(
    //   createTaxSetting({
    //     data: { ...data, taxType: 1 },
    //     router,
    //     setError,
    //     translate,
    //   })
    // );
    // if (response?.payload) onSuccess();
    console.log(data);
  };
  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
  };
}
