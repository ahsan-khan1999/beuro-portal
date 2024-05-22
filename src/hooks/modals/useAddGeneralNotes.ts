import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateAddGeneralNoteValidationSchema } from "@/validation/modalsSchema";
import { AddGeneralNoteFormField } from "@/components/setting/fields/general-note-title-form-fields";
import {
  createNotesSetting,
  readNoteSettings,
  updateNoteSetting,
} from "@/api/slices/settingSlice/settings";
import { useEffect } from "react";

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
    setValue,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const { data } = useAppSelector((state) => state.global.modal);

  const fields = AddGeneralNoteFormField(register, loading, control);

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    if (!data?.id) {
      const response = await dispatch(
        createNotesSetting({
          data: { notes: { ...formData } },
          router,
          setError,
          translate,
        })
      );
      if (response?.payload) onSuccess();
    } else {
      const response = await dispatch(
        updateNoteSetting({
          data: { notes: { ...formData }, id: data.id },
          router,
          setError,
          translate,
        })
      );
      if (response?.payload) {
        dispatch(readNoteSettings());
        onSuccess();
      }
    }
  };

  useEffect(() => {
    if (data?.data) {
      setValue("id", data?.data?.id); // Ensure the id is set in form data
      setValue("noteType", data?.data?.noteType);
      setValue("description", data?.data.description);
    }
  }, [data?.data, setValue]);

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
