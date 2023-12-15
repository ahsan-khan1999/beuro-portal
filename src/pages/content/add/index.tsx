import { setContentDetails } from "@/api/slices/content/contentSlice";
import ContentAddDetails from "@/components/content/add";
import { useAppDispatch } from "@/hooks/useRedux";
import localStoreUtil from "@/utils/localstore.util";
import React, { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";

const index = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    localStoreUtil.get_data("content").then((result) => {
      if (result) dispatch(setContentDetails(result))

    })
    return () => {
      // localStoreUtil.remove_data("lead")
      // dispatch(setLeadDetails(DEFAULT_LEAD))
    }
  }, [])
  return <ContentAddDetails />;
};

export default index;
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
