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
import { readFollowUp } from "@/api/slices/followUp/followUp";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { FilterType } from "@/types";
import { readCustomer } from "@/api/slices/customer/customerSlice";

const useGeneralFollowUp = () => {
    const followUp = [
        { id: "00071" },
        { id: "00045" },
        { id: "00075" },
        { id: "00034" },
        { id: "00082" },
        { id: "00025" },
    ];
    const dispatch = useAppDispatch();
    // const { followUp } = useAppSelector(state => state.followUp)
    const [filter, setFilter] = useState<FilterType>({
        location: "",
        sortBy: "",
        text: "",
        type: ""
    });
    useEffect(() => {
        // dispatch(readFollowUp({ params: { filter: filter, page: 1, size: 10 } }))
    }, [])
    const { modal } = useAppSelector((state) => state.global);
    const [status, setStatus] = useState({
        postpond: false,
        completed: false,
        neutral: true,
    });



    const onClose = () => {
        dispatch(updateModalType({ type: ModalType.NONE }));
    };

    const handleFollowUps = () => {
        dispatch(updateModalType({ type: ModalType.FOLLOW_UPS }));
    };

    const handleFollowUpsDetails = () => {
        dispatch(updateModalType({ type: ModalType.FOLLOW_UPS_DETAILS }));
    };

    const handleAddPostPonedNote = () => {
        dispatch(updateModalType({ type: ModalType.NONE }));
        dispatch(updateModalType({ type: ModalType.ADD_POSTSPONED_NOTE }));
        setStatus({
            postpond: true,
            completed: false,
            neutral: false,
        });
    };

    const handleAddRemarks = () => {
        dispatch(updateModalType({ type: ModalType.ADD_REMARKS }));
        setStatus({
            postpond: false,
            completed: true,
            neutral: false,
        });
    };

    const handleAddFollowUp = () => {
        // dispatch(readCustomer({ params: { filter: {}, paginate: 0 } }));

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
    };

    const renderModal = () => {
        return MODAL_CONFIG[modal.type] || null;
    };
    return {
        renderModal,
        followUp,
        handleAddFollowUp,
        handleFollowUpsDetails,
        handleFollowUps
    };
};

export default useGeneralFollowUp;
