import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddNoteFormField } from "@/components/leads/fields/Add-note-fields";
import { generateAddNewNoteValidation } from "@/validation/modalsSchema";

export const useAddNewNote = (handleNotes: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const schema = generateAddNewNoteValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const fields = AddNoteFormField(register, loading, control);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUser({ data, router, setError, translate }));
    handleNotes()
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
