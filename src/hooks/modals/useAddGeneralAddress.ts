import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateAddGeneralAddressValidationSchema } from "@/validation/modalsSchema";
import { addGeneralAddressFormField } from "@/components/setting/fields/general-address-title-field";
import { useEffect, useState } from "react";
import {
  readAddressSettings,
  updateAddressSetting,
} from "@/api/slices/settingSlice/settings";

export interface GeneralAddressFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function useAddGeneralAddress({
  onSuccess,
  onClose,
}: GeneralAddressFormProps) {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { loading, error, addressSettings } = useAppSelector(
    (state) => state.settings
  );

  const { data } = useAppSelector((state) => state.global.modal);

  const [addressObj, setAddressObj] = useState({
    addresses: addressSettings?.addresses || [],
  });

  const schema = generateAddGeneralAddressValidationSchema(translate);

  useEffect(() => {
    dispatch(readAddressSettings({})).then((response: any) => {
      if (response?.payload) {
        setAddressObj({
          addresses: response?.payload?.AddressSetting?.addresses || [],
        });
      }
    });
  }, [dispatch, translate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    resetField,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const fields = addGeneralAddressFormField(register, loading);

  const handleCreateAddress = (data: string) => {
    if (!addressObj?.addresses) return;
    let address = JSON.parse(JSON.stringify(addressObj));
    let newAddresses = [...address.addresses];
    newAddresses.push(data);
    address = {
      ...address,
      addresses: newAddresses,
    };

    setAddressObj({ ...address });

    // resetField("addresses");
    onClose();
  };

  const handleDeleteAddress = (index: number) => {
    if (!addressObj?.addresses) return;
    let address = JSON.parse(JSON.stringify(addressObj));
    address?.addresses?.splice(index, 1);
    setAddressObj({ ...address });
  };

  const handleSaveSetings = async () => {
    let apiData = {
      reason: addressObj?.addresses,
    };
    const response = await dispatch(
      updateAddressSetting({ data: apiData, router, translate })
    );
    if (response?.payload) onSuccess();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleCreateAddress(data?.addresses);
  };

  useEffect(() => {
    if (data?.data) {
      setValue("title", data?.data.title);
    }
  }, [data?.data, setValue]);

  return {
    error,
    handleSubmit,
    errors,
    fields,
    loading,
    onSubmit,
    addressObj,
    handleSaveSetings,
    handleDeleteAddress,
    handleCreateAddress,
  };
}
