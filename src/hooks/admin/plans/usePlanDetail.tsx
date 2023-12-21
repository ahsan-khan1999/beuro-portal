

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generatePlansValidation } from "@/validation/admin/plansSchema";
import { planDetailsFormField } from "@/components/admin/plans/plan-fields";
import { createPlan, readPlanDetail, setPlanDetails, updatePlan } from "@/api/slices/company/companySlice";
import { CustomerPromiseActionType } from "@/types/customer";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import RecordCreateSuccess from '@/base-components/ui/modals1/OfferCreated';
import DeleteConfirmation_1 from "@/base-components/ui/modals1/DeleteConfirmation_1";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";

export default function usePlanDetail(stage: boolean) {
  const { t: translate } = useTranslation();
  const { loading, planDetails } = useAppSelector((state) => state.company);
  const { modal } = useAppSelector(state => state.global)

  const dispatch = useAppDispatch()
  const router = useRouter();
  const [isUpdate, setIsUpdate] = useState<boolean>(stage);

  const id = router.query.plans;
  const schema = generatePlansValidation(translate);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setError
  } = useForm({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    if (id) {
      dispatch(readPlanDetail({ params: { filter: id } })).then(
        (res: CustomerPromiseActionType) => {
          dispatch(setPlanDetails(res.payload));
          reset({ ...res?.payload })
        }
      );
    }
  }, [id]);

  const handleUpdateCancel = () => {
    setIsUpdate(!isUpdate);
  };

  const fields = planDetailsFormField(
    register,
    loading,
    isUpdate,
    handleUpdateCancel,
    control
  );
  const handleOnSave = () => {
    router.push("/admin/plans")
    dispatch(updateModalType({ type: ModalType.NONE }));

  }
  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };
  const handleDelete = () => {
    dispatch(updateModalType({ type: ModalType.DELETE_MAIL }));
  };
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CREATE_SUCCESS]: (
      <RecordCreateSuccess
        onClose={onClose}
        modelHeading="Record Created Successful "
        modelSubHeading="Thanks! we are happy to have you. "
        routeHandler={handleOnSave}
      />
    ),
    
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (stage) {
      const response = await dispatch(updatePlan({ data, router, setError, translate }))
      if (response?.payload) dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }))

    } else {
      const response = await dispatch(createPlan({ data, router, setError, translate }))
      if (response?.payload) dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }))
    }

  };


  const handlePreviousClick = () => {
    router.push("/admin/support-request");
  };

  return {
    planDetails,
    isUpdate,
    setIsUpdate,
    fields,
    onSubmit,
    handleSubmit,
    errors,
    handlePreviousClick,
    handleUpdateCancel,
    renderModal
  };
}
