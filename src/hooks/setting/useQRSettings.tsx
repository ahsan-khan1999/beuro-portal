import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateQRCodeValdiation } from "@/validation/settingSchema";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  QRCodeSettingsAddField,
  QRCodeSettingsFields,
} from "@/components/setting/qr-settings/fields";
import {
  createQrCodeSetting,
  readQrCodeSettings,
} from "@/api/slices/settingSlice/settings";
import { User } from "@/types";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { updateModalType } from "@/api/slices/globalSlice/global";
import RecordCreateSuccess from "@/base-components/ui/modals1/OfferCreated";

export default function useQRSettings({
  handleCreation,
}: {
  handleCreation: Function;
}) {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.settings);
  const { user } = useAppSelector((state) => state.auth);
  const { modal } = useAppSelector((state) => state.global);

  const schema = generateQRCodeValdiation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  useEffect(() => {
    dispatch(readQrCodeSettings({})).then((res: any) => {
      reset({
        QrCodeDetail: res?.payload?.QrCodeDetail?.map((item: any) => ({
          ...item,
          QrCodeStatus: item?.QrCodeStatus?.toString(),
          ibanNumber: user?.company?.bankDetails?.ibanNumber,
        })),
      });
    });
  }, []);
  const {
    fields: qrSettingsArray,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "QrCodeDetail",
  });

  const handleOnChangeStatus = (index?: string, value?: string) => {
    const values = getValues();
    if (index) {
      const updatedList = values?.QrCodeDetail?.map(
        (item: any, idx: number) => {
          return {
            ...item,
            QrCodeStatus: idx.toString() === index ? value : "0",
          };
        }
      );
      values.QrCodeDetail = updatedList;
      reset({ QrCodeDetail: [...values?.QrCodeDetail] });
    }
  };

  const fields = QRCodeSettingsFields(
    register,
    loading,
    append,
    remove,
    qrSettingsArray?.length,
    user as User,
    handleOnChangeStatus
  );

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
        modelHeading={translate("common.modals.admin_setting")}
        modelSubHeading={translate("common.modals.email_sent_des")}
        routeHandler={onClose}
      />
    ),
  };
  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };
  const buttonField = QRCodeSettingsAddField(
    register,
    loading,
    append,
    remove,
    qrSettingsArray?.length,
    user as User
  );
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = data?.QrCodeDetail?.map((item: any) => ({
      ...item,
      QrCodeStatus: !item?.QrCodeStatus ? 0 : item?.QrCodeStatus,
    }));
    const response = await dispatch(
      createQrCodeSetting({
        data: { QrCodeDetail: apiData },
        router,
        setError,
        translate,
      })
    );
    if (response?.payload) handleSuccess();
  };
  return {
    fields: [...fields, ...buttonField],
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    renderModal
  };
}
export const getQrObject = (user: User) => {
  return {
    companyName: user?.fullName,
    ibanNumber: user?.company?.bankDetails?.ibanNumber,
    address: {
      houseNumber: user?.company?.address?.houseNumber,
      streetNumber: user?.company?.address?.streetNumber,
      postalCode: user?.company?.address?.postalCode,
      city: user?.company?.address?.city,
    },
    QrCodeStatus: 0,
  };
};
