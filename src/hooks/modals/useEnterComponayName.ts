import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateEnterCompanyNameValidationSchema } from "@/validation/modalsSchema";
import { EnterCompanyNameFormField } from "@/components/setting/fields/enter-company-name-fields";

export default function useEnterComponayName({
  onClose,
  handleCreated,
}: {
  onClose: () => void;
  handleCreated: () => void;
}) {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.settings);
  const schema = generateEnterCompanyNameValidationSchema(translate);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const fields = EnterCompanyNameFormField(register, loading, control, onClose);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    handleCreated();
  };

  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
    control,
    translate,
  };
}
