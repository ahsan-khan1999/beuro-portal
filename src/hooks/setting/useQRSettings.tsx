import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../useRedux';
import { generateQRCodeValdiation } from '@/validation/settingSchema';
import { FieldValues, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { QRCodeSettingsAddField, QRCodeSettingsFields, QRCodeSettingsLabelField } from '@/components/setting/qr-settings/fields';
import { createQrCodeSetting, readQrCodeSettings } from '@/api/slices/settingSlice/settings';

export default function useQRSettings({ handleCreation }: { handleCreation: Function }) {
    const { t: translate } = useTranslation();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { loading, error, qrSettings } = useAppSelector((state) => state.settings);
    const { user } = useAppSelector((state) => state.auth);


    const schema = generateQRCodeValdiation(translate);
    const {
        register,
        handleSubmit,
        control,
        setError,
        reset,
        formState: { errors },
        setValue,
        getValues
    } = useForm<FieldValues>({
        resolver: yupResolver<FieldValues>(schema),
    });
    useEffect(() => {
        dispatch(readQrCodeSettings({}))


    }, [])
    const {
        fields: qrSettingsArray,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "QrCodeDetail",
    });
    console.log(getValues());

    useMemo(() => {
        reset({ QrCodeDetail: qrSettings?.QrCodeDetail })
    }, [qrSettings])

    const fields = QRCodeSettingsFields(register, loading, append, remove, qrSettingsArray?.length);

    const buttonField = QRCodeSettingsAddField(register, loading, append, remove, qrSettingsArray?.length);
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const response = await dispatch(createQrCodeSetting({ data: [...data?.qrSettings], router, setError, translate }));
        if (response?.payload) handleCreation();
    };
    return {
        fields: [...fields, ...buttonField],
        onSubmit,
        control,
        handleSubmit,
        errors,
        error,
    };
}
