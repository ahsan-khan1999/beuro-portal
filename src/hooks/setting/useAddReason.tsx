import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "@/api/slices/authSlice/auth";
import { generateAddReasonValidation } from "@/validation/settingSchema";
import { addReasonFormField } from "@/components/setting/fields/add-reason-fields";
import { readFollowUpSettings, setFollowUpSettings } from "@/api/slices/settingSlice/settings";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import RecordCreateSuccess from "@/base-components/ui/modals1/OfferCreated";
import { useEffect, useState } from "react";

export default function useAddReason() {
  const router = useRouter();
  const { loading, error, followUps } = useAppSelector((state) => state.settings);
  const { t: translate } = useTranslation();

  const data: string[] = [
    `${translate("setting.follow_up_setting.on_offer_expire")}`,
    `${translate("setting.follow_up_setting.on_lead_create")}`,
  ];
  const [isActive, setIsActive] = useState(new Array(data.length).fill(false));

  const dispatch = useAppDispatch();
  const schema = generateAddReasonValidation(translate);
  const { modal } = useAppSelector(state => state.global)



  useEffect(() => {
    dispatch(readFollowUpSettings({}))
  }, [])



  const toggleItem = (index: number) => {
    const updatedIsActive = [...isActive];
    updatedIsActive[index] = !updatedIsActive[index];
    console.log(updatedIsActive,"updatedIsActive");
    
    setIsActive(updatedIsActive);
  };




  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const fields = addReasonFormField(register, loading);
  const handleAddReason = (data: string) => {
    if (!followUps) return;
    const followUp = [...followUps]
    followUp.push({
      id: "",
      createdBy: "",
      company: "",
      reason: data,
      createdAt: ""
    })
    dispatch(setFollowUpSettings(followUp))
  }
  const handleRemoveReason = (index: number) => {
    if (!followUps) return;
    const followUp = [...followUps]
    followUp.splice(index, 1)
    dispatch(setFollowUpSettings(followUp))
  }

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }))
  }
  const handleSuccess = () => {
    dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }))
  }

  const MODAL_CONFIG: ModalConfigType = {

    [ModalType.CREATE_SUCCESS]: (
      <RecordCreateSuccess
        onClose={onClose}
        modelHeading="Settings Updated Successful "
        modelSubHeading="Thanks! we are happy to have you. "
        routeHandler={onClose}
      />
    ),

  };
  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };
  const handleSaveSetings = () => {
    handleSuccess()
  }
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleAddReason(data?.reason)
  };
  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
    handleRemoveReason,
    handleSaveSetings,
    toggleItem,
    renderModal,
    translate,
    isActive,
    data
  };
}
