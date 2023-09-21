import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { generateChangePasswordValidationSchema } from "@/validation/authSchema";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateChangePassowrdFormField } from "@/components/loginAndRegister/login/login-fields";
import { resetPassword } from "@/api/slices/authSlice/auth";
import { CardBody } from "@/types";
// import passwordResetIcon from '@/assets/password-reset-icon.png';

export const card: CardBody = {
  image: {
    imageUrl: "passwordResetIcon",
    imageAlt: "Passwort vergessen",
    width: 97,
    height: 105,
  },
  heading: "Neues Passwort erstellen",
  description: `Erstellen Sie ein neues Passwort für die Anmeldung in Ihrem Konto`,
  link: {
    linkText: "Home Page",
    linkHref: "/",
  },
};

export default function useResetPassword() {
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const changePasswordSchema =
    generateChangePasswordValidationSchema(translate);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const fields = generateChangePassowrdFormField(register, loading);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(resetPassword({ router, data }));
  };
  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
  };
}
