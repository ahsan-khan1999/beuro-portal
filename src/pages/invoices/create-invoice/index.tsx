import { Locale } from "@/types";
import React, { useEffect } from "react";
import { setOfferDetails } from "@/api/slices/offer/offerSlice";
import { useAppDispatch } from "@/hooks/useRedux";
import localStoreUtil from "@/utils/localstore.util";
import { InvoiceCreateDetail } from "@/components/invoice/createInvoice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const index = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStoreUtil.get_data("invoice").then((result) => {
      if (result) dispatch(setOfferDetails(result));
    });
  }, []);

  return <InvoiceCreateDetail />;
};

export default index;
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
