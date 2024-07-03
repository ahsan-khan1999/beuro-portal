import { deleteFollowUp, readFollowUp } from "@/api/slices/followUp/followUp";
import { FilterType } from "@/types";
import { FollowUps } from "@/types/follow-up";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import { FiltersDefaultValues } from "@/enums/static";
import { useTranslation } from "next-i18next";

const useFollowUps = () => {
  const [filter, setFilter] = useState<FilterType>({
    text: FiltersDefaultValues.None,
    status: FiltersDefaultValues.None,
  });

  const dispatch = useAppDispatch();
  const [clickedIndex, setClickedIndex] = useState<number | null>(0);
  const { followUp, totalCount, loading } = useAppSelector(
    (state) => state.followUp
  );

  const {
    modal: { data },
  } = useAppSelector((state) => state.global);

  const { modal } = useAppSelector((state) => state.global);
  const { t: translate } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<FollowUps[]>([]);
  const totalItems = totalCount;
  const itemsPerPage = 10;

  useEffect(() => {
    fetchFollowUps();
  }, [currentPage, filter]);

  const fetchFollowUps = () => {
    dispatch(
      readFollowUp({ params: { filter: filter, page: currentPage, size: 10 } })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.FollowUp);
      }
    });
  };

  const handleFilterChange = (filter: FilterType) => {
    setFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteFollowUp = (id: string) => {
    dispatch(
      updateModalType({
        type: ModalType.INFO_DELETED,
        data: id,
      })
    );
  };

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const routeHandler = async () => {
    const response = await dispatch(deleteFollowUp({ data: { id: data } }));
    if (response?.payload)
      dispatch(readFollowUp({ params: { filter: filter, page: 1, size: 10 } }));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.INFO_DELETED]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading={translate("common.modals.delete_follow_up")}
        routeHandler={routeHandler}
        loading={loading}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const handleFollowUpStatusChange = (index: number, type: string) => {
    setClickedIndex(index);
    if (index === 0) {
      const newFilter = {
        ...filter,
        text: FiltersDefaultValues.None,
        status: FiltersDefaultValues.None,
      };
      setFilter(newFilter);
      handleFilterChange(newFilter);
    } else {
      const newFilter = {
        ...filter,
        text: FiltersDefaultValues.None,
        status: type,
      };
      setFilter(newFilter);
      handleFilterChange(newFilter);
    }
  };

  return {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    filter,
    setFilter,
    handleDeleteFollowUp,
    renderModal,
    handleFilterChange,
    loading,
    currentPage,
    clickedIndex,
    handleFollowUpStatusChange,
    totalCount,
  };
};

export default useFollowUps;
