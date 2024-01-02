import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "@/api/slices/authSlice/auth";
import { generateProfileSettingValidation } from "@/validation/admin/settingSchema";
import { changeProfileSettingFormField } from "@/components/admin/setting/fields/change-profile-setting-fields";
import { useEffect } from "react";
import { isJSON } from "@/utils/functions";
import { getUser } from "@/utils/auth.util";
import { updateAdminSetting } from "@/api/slices/settingSlice/settings";
import { ModalConfigType, ModalType } from "@/enums/ui";
import RecordCreateSuccess from "@/base-components/ui/modals1/OfferCreated";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { User } from "@/types";
import userImage from "@/assets/svgs/Group 480958610.svg"
export default function useSettingProfile() {
  const router = useRouter();
  const user: User = isJSON(getUser())
  const { loading, error } = useAppSelector((state) => state.settings);
  const { modal } = useAppSelector((state) => state.global);

  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const schema = generateProfileSettingValidation(translate);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setError
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    reset({
      fullName: user?.fullName,
      email: user?.email,
      logo: userImage
    })
  }, [])

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };
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
  const fields = changeProfileSettingFormField(register, loading, control);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const response = await dispatch(updateAdminSetting({ data: { ...data, id: user?.id }, router, setError, translate }));
    if (response?.payload) dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }));
  };

  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
    renderModal
  };
}
