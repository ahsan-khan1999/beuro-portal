import { setLeadDetails } from "@/api/slices/lead/leadSlice";
import AddNewLeads from "@/components/leads/add";
import { useAppDispatch } from "@/hooks/useRedux";
import localStoreUtil from "@/utils/localstore.util";
import { DEFAULT_LEAD } from "@/utils/static";
import React, { useEffect } from "react";

const index = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    localStoreUtil.get_data("lead").then((result) => {
      if (result) dispatch(setLeadDetails(result))

    })
    return () => {
      // localStoreUtil.remove_data("lead")
      // dispatch(setLeadDetails(DEFAULT_LEAD))
    }
  }, [])

  return <AddNewLeads />;
};

export default index;
