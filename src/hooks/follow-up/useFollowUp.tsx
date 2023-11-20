import { readFollowUp } from "@/api/slices/followUp/followUp";
import { FilterType } from "@/types";
import { FollowUps } from "@/types/follow-up";
import { followUpsData } from "@/utils/static";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";

const useFollowUps = () => {
  const [filter, setFilter] = useState<FilterType>({
    text: "",
  });
  const dispatch = useAppDispatch();
  const { followUp } = useAppSelector(state => state.followUp)

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<FollowUps[]>([]);
  const totalItems = followUpsData.length;
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(readFollowUp({ params: { filter: filter, page: 1, size: 10 } })).then((res) => {
      if (res?.payload) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        setCurrentPageRows(res?.payload?.FollowUp?.slice(startIndex, startIndex + itemsPerPage));
      }
    })
  }, [dispatch])
  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(
      followUpsData.slice(startIndex, startIndex + itemsPerPage)
    );
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return { currentPageRows, handlePageChange, totalItems, itemsPerPage, filter, setFilter };
};

export default useFollowUps;
