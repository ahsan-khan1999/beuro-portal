import { setOfferDetails } from "@/api/slices/offer/offerSlice";
import OfferAddDetails from "@/components/offers/add";
import { useAppDispatch } from "@/hooks/useRedux";
import localStoreUtil from "@/utils/localstore.util";
import React, { useEffect } from "react";

const index = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    localStoreUtil.get_data("offer").then((result) => {
      if (result) dispatch(setOfferDetails(result))
    })
    return () => {
      // localStoreUtil.remove_data("lead")
      // dispatch(setLeadDetails(DEFAULT_LEAD))
    }
  }, [])
  return (
    <div>
      <OfferAddDetails />
    </div>
  );
};

export default index;
