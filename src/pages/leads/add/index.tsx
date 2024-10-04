import { setLeadDetails } from "@/api/slices/lead/leadSlice";
import AddNewLeads from "@/components/leads/add";
import { useAppDispatch } from "@/hooks/useRedux";
import localStoreUtil from "@/utils/localstore.util";
import React, { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";

const index = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    localStoreUtil.get_data("lead").then((result) => {
      if (result) dispatch(setLeadDetails(result));
    });
    return () => {
      // localStoreUtil.remove_data("lead")
      // dispatch(setLeadDetails(DEFAULT_LEAD))
    };
  }, []);

  return <AddNewLeads />;
};

export default index;
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
