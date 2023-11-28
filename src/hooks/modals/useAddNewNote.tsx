import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddNoteFormField } from "@/components/leads/fields/Add-note-fields";
import { generateAddNewNoteValidation } from "@/validation/modalsSchema";
import { createLeadNotes } from "@/api/slices/lead/leadSlice";
import { createNote } from "@/api/slices/noteSlice/noteSlice";

export const useAddNewNote = ({ handleNotes}: { handleNotes: (id: string) => void }) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.note);

  const { modal: { data: leadId } } = useAppSelector((state) => state.global);

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
    const res = await dispatch(createNote({ data: { ...data, id: leadId, type: "lead" }, router, setError, translate }));
    if (res?.payload) handleNotes(leadId)

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
