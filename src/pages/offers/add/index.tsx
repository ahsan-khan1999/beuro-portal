import { setOfferDetails } from "@/api/slices/offer/offerSlice";
import OfferAddDetails from "@/components/offers/add";
import { useAppDispatch } from "@/hooks/useRedux";
import localStoreUtil from "@/utils/localstore.util";
import React, { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";

const index = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    localStoreUtil.get_data("offer").then((result) => {
      if (result) dispatch(setOfferDetails(result));
    });
    return () => {
      // localStoreUtil.remove_data("lead")
      // dispatch(setLeadDetails(DEFAULT_LEAD))
    };
  }, []);
  return (
    <div>
      <OfferAddDetails />
    </div>
  );
};

export default index;
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
