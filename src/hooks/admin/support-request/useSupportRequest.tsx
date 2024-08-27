import {
  ContactSupport,
  readContactSupport,
  updateContactSupport,
} from "@/api/slices/contactSupport/contactSupportSlice";
import { FiltersDefaultValues } from "@/enums/static";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { FilterType } from "@/types";
import { DEFAULT_CONTACT_SUPPORT, staticEnums } from "@/utils/static";
import { useEffect, useState } from "react";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { useRouter } from "next/router";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { ModalConfigType, ModalType } from "@/enums/ui";

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

  const { query } = useRouter();
  const page = query?.page as unknown as number;
  const [currentPage, setCurrentPage] = useState<number>(page || 1);
  const [currentPageRows, setCurrentPageRows] =
    useState<ContactSupport[]>(contactSupport);

  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const totalItems = totalCount;
  const itemsPerPage = 15;

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

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CREATION]: (
      <CreationCreated
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.record_update_des")}
        onClose={onClose}
        route={onClose}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const handleStatusChange = async (
    id: string,
    statusValue: string,
    type: string
  ) => {
    if (type === "support_request") {
      const currentItem = currentPageRows?.find((item) => item.id === id);
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

  useEffect(() => {
    const parsedPage = parseInt(query.page as string, 10);
    let resetPage = null;
    if (!isNaN(parsedPage)) {
      setCurrentPage(parsedPage);
    } else {
      resetPage = 1;
      setCurrentPage(1);
    }

    const queryText = query?.text as string;
    const querySort = query?.sort as string;

    let updatedFilter: {
      text?: string;
      sort?: string;
    } = {
      text: queryText || "",
    };

    if (queryText || querySort) {
      updatedFilter.text = queryText;
      updatedFilter.sort = querySort;
    }

    setFilter(updatedFilter);
    dispatch(readContactSupport(DEFAULT_CONTACT_SUPPORT));
    dispatch(
      readContactSupport({
        params: {
          filter: updatedFilter,
          page: (Number(parsedPage) || resetPage) ?? currentPage,
          size: 15,
        },
      })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.ContactSupport);
      }
    });
  }, [query]);

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
    renderModal,
    totalCount,
  };
}
