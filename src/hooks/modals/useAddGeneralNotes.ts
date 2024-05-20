import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateAddGeneralNoteValidationSchema } from "@/validation/modalsSchema";
import { AddGeneralNoteFormField } from "@/components/setting/fields/general-note-title-form-fields";

export interface GeneralNotesFormProps {
  onSuccess: () => void;
}

export default function useAddGeneralNotes({
  onSuccess,
}: GeneralNotesFormProps) {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.settings);
  const schema = generateAddGeneralNoteValidationSchema(translate);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const fields = AddGeneralNoteFormField(register, loading, control);

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
    control,
    translate,
  };
}
