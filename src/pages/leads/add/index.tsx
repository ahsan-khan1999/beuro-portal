import { setLeadDetails } from "@/api/slices/lead/leadSlice";
import AddNewLeads from "@/components/leads/add";
import { useAppDispatch } from "@/hooks/useRedux";
import localStoreUtil from "@/utils/localstore.util";
import React, { useEffect } from "react";

const index = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const leadInfo = localStoreUtil.get_data("lead")
    if (leadInfo) dispatch(setLeadDetails(leadInfo))
  }, [])

  return <AddNewLeads />;
};

export default index;
