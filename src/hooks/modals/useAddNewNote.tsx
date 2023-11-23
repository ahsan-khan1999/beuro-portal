import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddNoteFormField } from "@/components/leads/fields/Add-note-fields";
import { generateAddNewNoteValidation } from "@/validation/modalsSchema";
import { createLeadNotes } from "@/api/slices/lead/leadSlice";

export const useAddNewNote = (handleNotes: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.lead);
  const { modal: { data: leadId } } = useAppSelector((state) => state.global);
  console.log(leadId);
  
  const schema = generateAddNewNoteValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,

    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  const fields = AddNoteFormField(register, loading, control);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await dispatch(createLeadNotes({ data: { ...data, id: leadId }, router, setError, translate }));
    if (res?.payload) handleNotes()

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
