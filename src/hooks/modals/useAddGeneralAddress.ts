import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateAddGeneralAddressValidationSchema } from "@/validation/modalsSchema";
import { addGeneralAddressFormField } from "@/components/setting/fields/general-address-title-field";
import { useEffect, useState } from "react";
import { setAddressSettings } from "@/api/slices/settingSlice/settings";

export interface GeneralAddressFormProps {
  onClose: () => void;
}

export default function useAddGeneralAddress({
  onClose,
}: GeneralAddressFormProps) {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const fields = addGeneralAddressFormField(register, loading);

  const handleCreateAddress = (item: string) => {
    if (!addressObj?.addresses) return;
    let address = JSON.parse(JSON.stringify(addressObj));

    address = {
      ...address,
      addresses: [...address?.addresses, item],
    };
    setAddressObj({ ...address });
    dispatch(setAddressSettings(address));
    onClose();
  };

  const handleEditAddress = (id: number, newData: string) => {
    if (id === undefined || id === null) return;

    if (!addressSettings || !Array.isArray(addressSettings.addresses)) return;

    const newAddresses = addressSettings.addresses.map((address, index) =>
      index === id ? newData : address
    );
    const updatedAddressObj = { ...addressSettings, addresses: newAddresses };

    dispatch(setAddressSettings(updatedAddressObj));
    onClose();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    if (data?.id || data?.id === 0) {
      handleEditAddress(data?.id, formData.addresses);
    } else {
      handleCreateAddress(formData.addresses);
    }
  };

  useEffect(() => {
    setValue("addresses", addressSettings?.addresses[data?.id]);
  }, [data?.id, setValue]);

  return {
    error,
    handleSubmit,
    errors,
    fields,
    loading,
    onSubmit,
    addressObj,
    handleCreateAddress,
    handleEditAddress,
  };
}
