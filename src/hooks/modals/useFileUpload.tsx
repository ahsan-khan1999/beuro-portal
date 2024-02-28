import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useMemo, useState } from "react";
import { getFileNameFromUrl } from "@/utils/utility";
import { Attachement } from "@/types/global";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { signOffer } from "@/api/slices/offer/offerSlice";

export const useFileUpload = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.offer);
  const { images, loading } = useAppSelector((state) => state.image);
  const { loading: loadingGlobal } = useAppSelector((state) => state.global);
  const id = useAppSelector((state) => state.global.modal.data);

  console.log(id);

  const [enteredLinks, setEnteredLinks] = useState<any>({
    attachements: [],
  });

  const handleAttachementAdd = (attachement?: Attachement[]) => {
    if (attachement)
      setEnteredLinks({ ...enteredLinks, attachements: [...attachement] });
  };

  useMemo(() => {
    const formatAttachments = images?.attachments?.map((item: string) => ({
      name: getFileNameFromUrl(item),
      value: item,
    }));

    setEnteredLinks({
      attachements: formatAttachments,
    });
  }, [images]);
  const formData = new FormData();

  formData.append("offer", enteredLinks.attachments);

  const onSubmit = async () => {
    const response = await dispatch(signOffer({ data: { id: id }, formData }));
    if (response?.payload) {
      dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }));
    }

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
