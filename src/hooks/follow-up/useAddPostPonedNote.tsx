import { loginUser, readDashboard } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateAddPostPonedValidation } from "@/validation/followUpSchema";
import { AddPostPonedFollowUpFormField } from "@/components/follow-up/fields/add-post-poned-note-fields";
import { createPostpondNotes } from "@/api/slices/followUp/followUp";
import moment from "moment";
import { useEffect } from "react";
import dashboard from "@/pages/dashboard";
import { getCurrentMonth } from "@/utils/utility";

export const useAddPostPonedNote = (handleFollowUpsDetails: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, followUpDetails } = useAppSelector(
    (state) => state.followUp
  );

  const schema = generateAddPostPonedValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  // useEffect(() => {
  //   dispatch(readDashboard({ params: dashboard }));
  // }, [dashboard]);

  const fields = AddPostPonedFollowUpFormField(register, loading, control);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = {
      ...data,
      id: followUpDetails?.id,
      dateTime: moment(data?.dateTime).toISOString(),
    };
    const res = await dispatch(
      createPostpondNotes({ data: apiData, router, setError, translate })
    );

    if (res?.payload) {
      handleFollowUpsDetails(followUpDetails?.id);
      dispatch(readDashboard({
        params: {
          month: getCurrentMonth(),
        },
      }))
    }
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
