import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { ContactSupportFormField } from "@/components/contactSupport/contact-support-fields";
import { generateContactSupportValidation } from "@/validation/authSchema";
import { updateModalType } from "@/api/slices/globalSlice/global";
import RequestSubmittedModal from "@/base-components/ui/modals1/RequestSubmitted";
import { ModalConfigType, ModalType } from "@/enums/ui";

export const userContactSupport = () => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { modal } = useAppSelector((state) => state.global);

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.REQUEST_SUBMITTED]: <RequestSubmittedModal />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  // Function for handling the Modal
  const handleRequestModal = () => {
    dispatch(updateModalType(ModalType.REQUEST_SUBMITTED));
  };

  const schema = generateContactSupportValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const fields = ContactSupportFormField(
    register,
    loading,
    control,
    handleRequestModal
  );
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUser({ data, router, setError, translate }));
  };
  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    renderModal,
  };
};
