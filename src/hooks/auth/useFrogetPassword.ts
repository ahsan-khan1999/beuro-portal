
import passwordResetIcon from '@/assets/password-reset-icon.png';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { generateResetPasswordValidationSchema } from '@/validation/authSchema';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { generateResetPassowrdFormField } from '@/components/loginAndRegister/login/login-fields';
import { forgotPassword } from '@/api/slices/authSlice/auth';
import { CardBody } from '@/types';
import { useAppDispatch, useAppSelector } from '../useRedux';


export const card: CardBody = {
    image: {
        imageUrl: passwordResetIcon,
        imageAlt: "Passwort vergessen",
        width: 97,
        height: 105,
    },
    heading: "Passwort vergessen",
    description: `Geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen`,
    link: {
        linkText: "Home Page",
        linkHref: "/",
    },
};
export default function useFrogetPassword() {
    const router = useRouter();
    const dispatch = useAppDispatch()
    const { t: translate } = useTranslation()
    const resetPasswordSchema = generateResetPasswordValidationSchema(translate)
    const { loading, error } = useAppSelector(state => state.auth)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm({
        resolver: yupResolver(resetPasswordSchema),
    });

    const fields = generateResetPassowrdFormField(register, loading)


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        dispatch(forgotPassword({ translate, data, setError }))
    };
    return {
        error,
        handleSubmit,
        errors,
        fields,
        onSubmit
    }
}
