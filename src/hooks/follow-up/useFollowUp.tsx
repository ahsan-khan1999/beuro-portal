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
import { useRouter } from "next/router";

const useFollowUps = () => {
  const [filter, setFilter] = useState<FilterType>({
    text: FiltersDefaultValues.None,
  });

  const dispatch = useAppDispatch();
  const { followUp, totalCount, loading } = useAppSelector(
    (state) => state.followUp
  );

  const { query } = useRouter();
  const {
    modal: { data },
  } = useAppSelector((state) => state.global);
  const { modal } = useAppSelector((state) => state.global);
  const { t: translate } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<FollowUps[]>([]);
  const totalItems = totalCount;
  const itemsPerPage = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (text: FilterType) => {
    dispatch(
      readFollowUp({ params: { filter: text, page: 1, size: 10 } })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.FollowUp);
      }
    });
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

  useEffect(() => {
    dispatch(
      readFollowUp({ params: { filter: filter, page: currentPage, size: 10 } })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.FollowUp);
      }
    });
  }, []);

  // useEffect(() => {
  //   const parsedPage = parseInt(query.page as string, 10);
  //   let resetPage = null;
  //   if (!isNaN(parsedPage)) {
  //     setCurrentPage(parsedPage);
  //   } else {
  //     resetPage = 1;
  //     setCurrentPage(1);
  //   }

  //   const searchQuery = query?.text as string;

  //   let updatedFilter: {
  //     text?: string;
  //   } = {
  //     text: searchQuery || "",
  //   };

  //   if (searchQuery) {
  //     updatedFilter.text = searchQuery;
  //   }

  //   setFilter(updatedFilter);

  //   dispatch(
  //     readFollowUp({
  //       params: {
  //         filter: searchQuery ? updatedFilter : {},
  //         page: (Number(parsedPage) || resetPage) ?? currentPage,
  //         size: 10,
  //       },
  //     })
  //   ).then((res: any) => {
  //     if (res?.payload) {
  //       setCurrentPageRows(res?.payload?.FollowUp);
  //     }
  //   });
  // }, [query]);

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
  };
};

export default useFollowUps;
