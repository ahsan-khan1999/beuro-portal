import React, { useEffect, useState } from "react";
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
import {
  deleteFollowUp,
  readFollowUp,
  readFollowUpDetail,
  readFollowUpTableData,
} from "@/api/slices/followUp/followUp";
import { FilterType } from "@/types";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import { useTranslation } from "next-i18next";
import { isJSON } from "@/utils/functions";
import { getUser } from "@/utils/auth.util";
import { FiltersDefaultValues } from "@/enums/static";
import moment from "moment";
import AllFollowUpsTable from "@/base-components/ui/modals1/AllFollowUpsTable";
import { readDashboard } from "@/api/slices/authSlice/auth";
const useGeneralFollowUp = () => {
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [filter, setFilter] = useState<FilterType>({
    text: FiltersDefaultValues.None,
    status: FiltersDefaultValues.None,
  });

  const { followUp, followUpDetails, loading, followUpTableData } =
    useAppSelector((state) => state.followUp);

  const user = isJSON(getUser());
  const { modal } = useAppSelector((state) => state.global);
  const {
    modal: { data },
  } = useAppSelector((state) => state.global);

  const [markUpStatus, setMarkUpStatus] = useState({
    postpond: false,
    completed: false,
    neutral: true,
  });

  useEffect(() => {
    if (user?.role !== "Admin" && followUp?.length === 0)
      dispatch(readFollowUpTableData({ params: { filter: filter } }));
  }, []);

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
  };

  const handleMouseEnter = (index: any) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
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
  };

  const handleAddFollowUp = () => {
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
    if (response?.payload) {
      dispatch(readFollowUp({ params: { filter: { status: "10" } } }));
      dispatch(readDashboard({ params: { filter: { month: 1 } } }));
      handleFollowUps();
    }
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.FOLLOW_UPS]: (
      <AllFollowUpsTable
        onClose={onClose}
        handleFollowUpsDetails={handleFollowUpsDetails}
      />
    ),
    [ModalType.FOLLOW_UPS_DETAILS]: (
      <FollowUpDetails
        onClose={onClose}
        handleAddPostPonedNote={handleAddPostPonedNote}
        handleAddRemarks={handleAddRemarks}
        status={markUpStatus}
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
        modelHeading={translate("common.modals.delete_follow_up")}
        routeHandler={routeHandler}
        loading={loading}
      />
    ),
  };

  const todayFollowUps = followUp?.filter((item) =>
    moment(item?.dateTime).isSame(moment(), "day")
  );

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
    translate,
    hoveredIndex,
    handleMouseEnter,
    handleMouseLeave,
    followUpTableData,
    todayFollowUps,
  };
};

export default useGeneralFollowUp;
