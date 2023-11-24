import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { ContactSupportFormField } from "@/components/contactSupport/contact-support-fields";
import { generateContactSupportValidation } from "@/validation/contactSchema";
import { createContactSupport } from "@/api/slices/contactSupport/contactSupportSlice";

export const userContactSupport = (requestSubmitHandler: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.contactSupport);

  const schema = generateContactSupportValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  const fields = ContactSupportFormField(register, loading, control);
  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    const response =await  dispatch(createContactSupport({ data, router, setError, translate }));
    if(response?.payload) requestSubmitHandler();
    
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
