import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useMemo, useState } from "react";
import { getFileNameFromUrl } from "@/utils/utility";
import { Attachement } from "@/types/global";

export const useFileUpload = () => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error, offerDetails } = useAppSelector((state) => state.offer);
  const { contractDetails } = useAppSelector((state) => state.contract);
  const { images, loading } = useAppSelector((state) => state.image);
  const { loading: loadingGlobal } = useAppSelector((state) => state.global);

  const [enteredLinks, setEnteredLinks] = useState<any>({
    attachements: [],
  });

  const handleAttachementAdd = (attachement?: Attachement[]) => {
    if (attachement)
      setEnteredLinks({ ...enteredLinks, attachements: [...attachement] });
  };

  const handleAttachementDelete = (attachementsToDelete: string) => {
    const { attachements } = enteredLinks;
    const updatedAttachements = attachements.filter(
      (item: string) => item !== attachementsToDelete
    );
    setEnteredLinks({ ...enteredLinks, attachements: updatedAttachements });
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

  const onSubmit = async () => {};

  return {
    onSubmit,
    error,
    translate,
    handleAttachementAdd,
    handleAttachementDelete,
    loading,
    loadingGlobal,
    enteredLinks,
  };
};
