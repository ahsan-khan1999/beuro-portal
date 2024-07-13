import { readDashboard } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateAddRemarksValidation } from "@/validation/followUpSchema";
import { AddRemarksFormField } from "@/components/follow-up/fields/add-remarks-fields";
import { markComplete } from "@/api/slices/followUp/followUp";
import { getCurrentMonth } from "@/utils/utility";

export const useAddRemarks = (handleFollowUpsDetails: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, followUpDetails } = useAppSelector(
    (state) => state.followUp
  );

  const schema = generateAddRemarksValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  // @ts-expect-error

  const fields = AddRemarksFormField(register, loading, control);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = { ...data, id: followUpDetails?.id };
    const res = await dispatch(
      markComplete({ data: apiData, router, setError, translate })
    );
    if (res?.payload) {
      handleFollowUpsDetails(followUpDetails?.id);
      dispatch(
        readDashboard({
          params: {
            month: getCurrentMonth(),
          },
        })
      );
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
