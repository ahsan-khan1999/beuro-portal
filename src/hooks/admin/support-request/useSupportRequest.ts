import {
  ContactSupport,
  readContactSupport,
  updateContactSupport,
} from "@/api/slices/contactSupport/contactSupportSlice";
import { FiltersDefaultValues } from "@/enums/static";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { FilterType } from "@/types";
import { DEFAULT_CONTACT_SUPPORT, staticEnums } from "@/utils/static";
import { useEffect, useState } from "react";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { useRouter } from "next/router";
import { useQueryParams } from "@/utils/hooks";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";

export default function useSupportRequest() {
  const {
    contactSupport,
    contactSupportDetails,
    lastPage,
    totalCount,
    loading,
  } = useAppSelector((state) => state.contactSupport);

  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
  });

  const router = useRouter();
  const params = useQueryParams();
  const dispatch = useAppDispatch();
  const page = params?.page as unknown as number;

  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const [currentPageRows, setCurrentPageRows] =
    useState<ContactSupport[]>(contactSupport);
  const { modal } = useAppSelector((state) => state.global);

  const totalItems = totalCount;
  const itemsPerPage = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleDefaultModal = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  // const MODAL_CONFIG: ModalConfigType = {
  //   [ModalType.CREATION]: (
  //     <CreationCrea
  //   )
  // };

  const handleStatusChange = async (
    id: string,
    statusValue: string,
    type: string
  ) => {
    if (type === "support_request") {
      const currentItem = currentPageRows.find((item) => item.id === id);
      if (!currentItem || currentItem.status !== statusValue) {
        const res = await dispatch(
          updateContactSupport({
            data: {
              id: id,
              status: staticEnums["SupportRequest"][statusValue],
            },
          })
        );

        if (res?.payload) {
          let index = currentPageRows.findIndex(
            (item) => item.id === res.payload?.id
          );

          if (index !== -1) {
            let prevPageRows = [...currentPageRows];
            prevPageRows.splice(index, 1, res.payload);
            setCurrentPageRows(prevPageRows);
            handleDefaultModal();
          }
        }
      }
    }
  };

  // const renderModal = () => {
  //   return MODAL_CONFIG[modal.type] || null;
  // };

  useEffect(() => {
    // const updatedStatus =
    //   params.status === "None" ? "None" : params.status?.split(",");

    const parsedPage = parseInt(params.page as string, 10);
    let resetPage = null;

    if (!isNaN(parsedPage) && parsedPage !== undefined) {
      setCurrentPage(parsedPage);
    } else {
      resetPage = 1;
      setCurrentPage(1);
    }

    const { page, ...restParams } = params;

    setFilter({ ...filter, ...restParams });
    dispatch(readContactSupport(DEFAULT_CONTACT_SUPPORT));
    dispatch(
      readContactSupport({
        params: {
          filter: { ...restParams },
          page: (Number(parsedPage) || resetPage) ?? currentPage,
          size: 10,
        },
      })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.ContactSupport);
      }
    });
  }, [params]);

  return {
    currentPageRows,
    totalItems,
    handlePageChange,
    itemsPerPage,
    filter,
    setFilter,
    handleFilterChange,
    loading,
    currentPage,
    handleStatusChange,
  };
}
