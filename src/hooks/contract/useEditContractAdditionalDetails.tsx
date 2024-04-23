import { useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateContractEditAdditionalDetailsValidation } from "@/validation/contractSchema";
import { ContractEditAdditionalDetailsFormField } from "@/components/contract/edit/edit-additional-feilds";
import { updateContractDetail } from "@/api/slices/contract/contractSlice";

export const useEditContractAdditionalDetails = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, contractDetails } = useAppSelector(
    (state) => state.contract
  );

  const schema = generateContractEditAdditionalDetailsValidation(translate);
  const {
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  const fields = ContractEditAdditionalDetailsFormField(
    loading,
    control,
    onClose,
    contractDetails
  );

  useMemo(() => {
    if (contractDetails.id) {
      setValue("additionalDetails", contractDetails.additionalDetails);
    }
  }, [contractDetails.id]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = {
      ...data,
      id: contractDetails?.id,
    };

    const response = await dispatch(
      updateContractDetail({ data: apiData, router, setError, translate })
    );
    if (response?.payload) onClose;
  };

  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
  };
};
