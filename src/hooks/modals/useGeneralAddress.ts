import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import {
  readAddressSettings,
  setAddressSettings,
  updateAddressSetting,
} from "@/api/slices/settingSlice/settings";

export interface GeneralAddressFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function useGeneralAddress({
  onSuccess,
  onClose,
}: GeneralAddressFormProps) {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { loading, error, addressSettings } = useAppSelector(
    (state) => state.settings
  );

  const [addressObj, setAddressObj] = useState({
    addresses: addressSettings?.addresses || [],
  });

  const handleDeleteAddress = (index: number) => {
    if (!addressObj?.addresses) return;

    setAddressObj((prevAddressObj) => {
      const newAddresses = prevAddressObj.addresses.filter(
        (_, i) => i !== index
      );
      const updatedAddressObj = { ...prevAddressObj, addresses: newAddresses };

      dispatch(setAddressSettings(updatedAddressObj));

      return updatedAddressObj;
    });
  };

  const handleSaveSetings = async () => {
    let apiData = {
      addresses: addressSettings?.addresses,
    };
    const response = await dispatch(
      updateAddressSetting({ data: apiData, router, translate })
    );
    if (response?.payload) onSuccess();
  };

  useEffect(() => {
    dispatch(readAddressSettings({})).then((response: any) => {
      if (response?.payload) {
        setAddressObj({
          addresses: response?.payload?.AddressSetting?.addresses || [],
        });
      }
    });
  }, []);

  return {
    error,
    loading,
    translate,
    addressSettings,
    handleSaveSetings,
    handleDeleteAddress,
  };
}
