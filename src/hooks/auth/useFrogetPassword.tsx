import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { generateResetPasswordValidationSchema } from "@/validation/authSchema";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateResetPassowrdFormField } from "@/components/loginAndRegister/login/login-fields";
import { forgotPassword } from "@/api/slices/authSlice/auth";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { updateModalType } from "@/api/slices/globalSlice/global";
import RecordCreateSuccess from "@/base-components/ui/modals1/OfferCreated";


export default function useFrogetPassword() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const resetPasswordSchema = generateResetPasswordValidationSchema(translate);
  const { loading, error } = useAppSelector((state) => state.auth);
  const { modal } = useAppSelector((state) => state.global);


  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(resetPasswordSchema),
  });
  const onClick = () => {
    router.push("/login")
    onClose()
  }
  const fields = generateResetPassowrdFormField(register, loading, onClick);
  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CREATE_SUCCESS]: (
      <RecordCreateSuccess
        onClose={onClose}
        modelHeading="Email has been sent. "
        modelSubHeading="Thanks! we are happy to have you. "
        routeHandler={onClick}
      />
    ),
  };
  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const response = await dispatch(forgotPassword({ translate, data, setError }));
    if (response?.payload) dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }))
  };
  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
    renderModal,
    translate
  };
}
