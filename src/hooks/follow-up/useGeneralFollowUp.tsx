import React, { useEffect, useReducer, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import FollowUpDetails from "@/base-components/ui/modals1/FollowUpDetails";
import AddPostPonedNote from "@/base-components/ui/modals1/AddPostPonedNote";
import AddRemarks from "@/base-components/ui/modals1/AddRemarks";
import AddFollowUp from "@/base-components/ui/modals1/AddFollowUp";
import AllCustomers from "@/base-components/ui/modals1/AllCustomers";
import AllLeads from "@/base-components/ui/modals1/AllLeads";
import FollowUpCustomersDetails from "@/base-components/ui/modals1/FollowUpCustomersDetails";
import FollowUpServiceDetails from "@/base-components/ui/modals1/FollowUpServiceDetails";
import FollowUps from "@/base-components/ui/modals1/FollowUps";
import {
  deleteFollowUp,
  readFollowUp,
  readFollowUpDetail,
} from "@/api/slices/followUp/followUp";
import { FilterType } from "@/types";
import { readCustomer } from "@/api/slices/customer/customerSlice";
import { readLead } from "@/api/slices/lead/leadSlice";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import { useTranslation } from "next-i18next";
import { getUser } from "@/utils/auth.util";
import { isJSON } from "@/utils/functions";

const useGeneralFollowUp = () => {
  const dispatch = useAppDispatch();
  const {t: translate} = useTranslation()
  const { followUp, followUpDetails, loading } = useAppSelector(
    (state) => state.followUp
  );
  const user  = isJSON(getUser())
  const [filter, setFilter] = useState<FilterType>({
    text: "",
  });

  const { modal } = useAppSelector((state) => state.global);
  const {
    modal: { data },
  } = useAppSelector((state) => state.global);

  const [status, setStatus] = useState({
    postpond: false,
    completed: false,
    neutral: true,
  });

  useEffect(() => {
    if (user?.role !== "Admin")
      dispatch(readFollowUp({ params: { filter: filter, page: 1, size: 10 } }));
  }, [dispatch]);
  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const handleFollowUps = () => {
    dispatch(updateModalType({ type: ModalType.FOLLOW_UPS }));
  };

  const handleFollowUpsDetails = (id: string) => {
    dispatch(readFollowUpDetail({ params: { filter: id } }));
    dispatch(updateModalType({ type: ModalType.FOLLOW_UPS_DETAILS, data: id }));
  };

  const handleAddPostPonedNote = () => {
    dispatch(updateModalType({ type: ModalType.ADD_POSTSPONED_NOTE }));
    // setStatus({
    //     postpond: true,
    //     completed: false,
    //     neutral: false,
    // });
  };
  const handleDeleteFollowUp = (
    id: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (e) {
      e.stopPropagation();
    }

    dispatch(
      updateModalType({
        type: ModalType.INFO_DELETED,
        data: id,
      })
    );
  };

  const handleAddRemarks = () => {
    dispatch(updateModalType({ type: ModalType.ADD_REMARKS }));
    // setStatus({
    //     postpond: false,
    //     completed: true,
    //     neutral: false,
    // });
  };

  const handleAddFollowUp = () => {
    dispatch(readCustomer({ params: { filter: {}, paginate: 0 } }));
    dispatch(readLead({ params: { filter: {}, paginate: 0 } }));

    dispatch(updateModalType({ type: ModalType.ADD_FOLLOW_UP }));
  };

  const handleAllCustomers = () => {
    dispatch(updateModalType({ type: ModalType.ALL_CUSTOMERS_LIST }));
  };

  const handleCustomerDetail = () => {
    dispatch(updateModalType({ type: ModalType.SELECTED_CUSTOMER_DETAIL }));
  };

  const handleAllLeads = () => {
    dispatch(updateModalType({ type: ModalType.ALL_LEADS_LIST }));
  };

  const handleLeadDetail = () => {
    dispatch(updateModalType({ type: ModalType.SELECTED_LEADS_DETAIL }));
  };
  const routeHandler = async () => {
    const response = await dispatch(deleteFollowUp({ data: { id: data } }));
    if (response?.payload)
      dispatch(readFollowUp({ params: { filter: filter, page: 1, size: 10 } }));
  };
  // METHOD FOR HANDLING THE MODALS
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.FOLLOW_UPS]: (
      <FollowUps
        onClose={onClose}
        handleFollowUpsDetails={handleFollowUpsDetails}
      />
    ),
    [ModalType.FOLLOW_UPS_DETAILS]: (
      <FollowUpDetails
        onClose={onClose}
        handleAddPostPonedNote={handleAddPostPonedNote}
        handleAddRemarks={handleAddRemarks}
        status={status}
        followUpDetails={followUpDetails}
      />
    ),
    [ModalType.ADD_POSTSPONED_NOTE]: (
      <AddPostPonedNote
        onClose={onClose}
        handleFollowUpsDetails={handleFollowUpsDetails}
      />
    ),
    [ModalType.ADD_REMARKS]: (
      <AddRemarks
        onClose={onClose}
        handleFollowUpsDetails={handleFollowUpsDetails}
      />
    ),
    [ModalType.ADD_FOLLOW_UP]: (
      <AddFollowUp
        onClose={onClose}
        handleFollowUps={handleFollowUps}
        handleAllCustomers={handleAllCustomers}
        handleAllLeads={handleAllLeads}
      />
    ),
    [ModalType.ALL_CUSTOMERS_LIST]: (
      <AllCustomers
        onClose={onClose}
        handleCustomerDetail={handleCustomerDetail}
      />
    ),
    [ModalType.ALL_LEADS_LIST]: (
      <AllLeads onClose={onClose} handleLeadDetail={handleLeadDetail} />
    ),
    [ModalType.SELECTED_CUSTOMER_DETAIL]: (
      <FollowUpCustomersDetails onClose={onClose} />
    ),
    [ModalType.SELECTED_LEADS_DETAIL]: (
      <FollowUpServiceDetails onClose={onClose} />
    ),
    [ModalType.INFO_DELETED]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading="Are you sure you want to delete this FollowUp?"
        routeHandler={routeHandler}
        loading={loading}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };
  return {
    renderModal,
    followUp,
    handleAddFollowUp,
    handleFollowUpsDetails,
    handleFollowUps,
    followUpDetails,
    handleDeleteFollowUp,
    translate
  };
};

export default useGeneralFollowUp;
