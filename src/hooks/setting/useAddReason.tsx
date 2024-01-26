import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateAddReasonValidation } from "@/validation/settingSchema";
import { addReasonFormField } from "@/components/setting/fields/add-reason-fields";
import {
  readFollowUpSettings,
  setFollowUpSettings,
  updateFollowUpSetting,
} from "@/api/slices/settingSlice/settings";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import RecordCreateSuccess from "@/base-components/ui/modals1/OfferCreated";
import { useEffect, useState } from "react";
import { FollowUpProp } from "@/types/settings";

export default function useAddReason() {
  const router = useRouter();
  const { loading, error, followUps } = useAppSelector(
    (state) => state.settings
  );
  const { t: translate } = useTranslation();

  const [toggleObj, setToggleObj] = useState({
    isCreateFollowUpOnLeadCreation: {
      label: translate("setting.follow_up_setting.on_lead_create"),
      value: followUps?.isCreateFollowUpOnLeadCreation || false,
    },
    isCreateFollowUpOnOfferExpire: {
      label: translate("setting.follow_up_setting.on_offer_expire"),
      value: followUps?.isCreateFollowUpOnOfferExpire || false,
    },
    reason: followUps?.reason || [],
  });
  const dispatch = useAppDispatch();
  const schema = generateAddReasonValidation(translate);
  const { modal } = useAppSelector((state) => state.global);

  useEffect(() => {
    dispatch(readFollowUpSettings({})).then((response: any) => {
      if (response?.payload) {
        setToggleObj({
          isCreateFollowUpOnLeadCreation: {
            label: translate("setting.follow_up_setting.on_lead_create"),
            value:
              response?.payload?.FollowUpSetting
                ?.isCreateFollowUpOnLeadCreation || false,
          },
          isCreateFollowUpOnOfferExpire: {
            label: translate("setting.follow_up_setting.on_offer_expire"),
            value:
              response?.payload?.FollowUpSetting
                ?.isCreateFollowUpOnOfferExpire || false,
          },
          reason: response?.payload?.FollowUpSetting?.reason || [],
        });
      }
    });
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    resetField
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const fields = addReasonFormField(register, loading);
  const handleAddReason = (data: string) => {
    if (!toggleObj?.reason) return;
    let followUp = JSON.parse(JSON.stringify(toggleObj));
    followUp = {
      ...followUp,
      reason: [...followUp?.reason, data],
    };
    setToggleObj({ ...followUp });
    resetField("reason")
  };
  const handleRemoveReason = (index: number) => {
    if (!toggleObj?.reason) return;
    let followUp = JSON.parse(JSON.stringify(toggleObj));
    followUp?.reason?.splice(index, 1);
    setToggleObj({ ...followUp });
  };

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };
  const handleSuccess = () => {
    dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CREATE_SUCCESS]: (
      <RecordCreateSuccess
        onClose={onClose}
        modelHeading={translate("common.modals.update_setting")}
        modelSubHeading={translate("common.modals.setting_update_des")}
        routeHandler={onClose}
      />
    ),
  };
  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };
  const handleSaveSetings = async () => {
    const data = getValues();
    let apiData = {
      isCreateFollowUpOnLeadCreation:
        toggleObj.isCreateFollowUpOnLeadCreation.value,
      isCreateFollowUpOnOfferExpire:
        toggleObj.isCreateFollowUpOnOfferExpire.value,
      reason: toggleObj?.reason,
    };
    const response = await dispatch(
      updateFollowUpSetting({ data: apiData, router, translate })
    );
    if (response?.payload) handleSuccess();
  };
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleAddReason(data?.reason);
  };
  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
    handleRemoveReason,
    handleSaveSetings,
    renderModal,
    translate,
    toggleObj,
    setToggleObj,
  };
}
