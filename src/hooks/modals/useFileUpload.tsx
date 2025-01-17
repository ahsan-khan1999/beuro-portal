import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useState } from "react";
import { uploadOfferPdf } from "@/api/slices/offer/offerSlice";

export const useFileUpload = (onFileUploadSuccess: Function) => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { error, offerDetails,loading } = useAppSelector((state) => state.offer);
  const { images } = useAppSelector((state) => state.image);
  const { loading: loadingGlobal } = useAppSelector((state) => state.global);
  const id = useAppSelector((state) => state.global.modal.data);

  const [enteredLinks, setEnteredLinks] = useState<any>({
    attachements: null,
  });

  const handleAttachementAdd = (attachement?: any) => {
    if (attachement) setEnteredLinks({ attachements: attachement });
  };

  const formData = new FormData();

  formData.append("signature", enteredLinks?.attachements);

  const onSubmit = async () => {
    const response = await dispatch(
      uploadOfferPdf({ data: offerDetails?.id, formData })
    );

    if (response?.payload) onFileUploadSuccess();

    return true;
  };

  return {
    onSubmit,
    translate,
    handleAttachementAdd,
    loading,
    loadingGlobal,
    enteredLinks,
  };
};
