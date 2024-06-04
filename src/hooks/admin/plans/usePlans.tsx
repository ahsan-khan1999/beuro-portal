import { deletePlan, readPlan } from "@/api/slices/company/companySlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import DeleteConfirmation_1 from "@/base-components/ui/modals1/DeleteConfirmation_1";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { FilterType } from "@/types";
import { Plan } from "@/types/admin/plans";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function usePlans() {
  const { plan, lastPage, totalCount, loading } = useAppSelector(
    (state) => state.company
  );
  const { modal } = useAppSelector((state) => state.global);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<FilterType>({
    location: "",
    sort: "",
    text: "",
    type: "",
  });

  const router = useRouter();
  const { t: translate } = useTranslation();
  const [currentPageRows, setCurrentPageRows] = useState<Plan[]>([]);
  const dispatch = useAppDispatch();

  const totalItems = totalCount;
  const itemsPerPage = 10;

  useEffect(() => {
    // dispatch(set(DEFAULT_CUSTOMER))
    dispatch(readPlan({ params: { filter: filter, page: 1, size: 10 } })).then(
      (res: any) => {
        if (res?.payload) {
          setCurrentPageRows(res?.payload?.Plan || []);
        }
      }
    );
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(
      readPlan({ params: { filter: filter, page: page, size: 10 } })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.Plan || []);
      }
    });
  };

  const handleFilterChange = (filter: FilterType) => {
    dispatch(
      readPlan({ params: { filter: filter, page: currentPage, size: 10 } })
    );
  };

  const handleConfirmDeletion = (id: string) => {
    dispatch(
      updateModalType({
        type: ModalType.CONFIRM_DELETION,
        data: { refId: id },
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      updateModalType({
        type: ModalType.DELETE_MAIL,
        data: { refId: modal?.data },
      })
    );
  };

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const routeHandler = async () => {
    const filteredPlan = plan?.find(
      (item) => item?.refID === modal?.data?.refId?.refId
    );

    const res = await dispatch(deletePlan({ data: { id: filteredPlan?.id } }));
    dispatch(
      readPlan({ params: { filter: filter, page: currentPage, size: 10 } })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.Plan);
      }
    });
    onClose();
    if (res?.payload) router.push("/admin/plans");
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CONFIRM_DELETION]: (
      <DeleteConfirmation_1
        handleDelete={handleDelete}
        onClose={onClose}
        modelHeading={translate(
          "email_tracker.email_confirmation_modal.main_heading"
        )}
        subHeading={translate(
          "email_tracker.email_confirmation_modal.sub_heading"
        )}
      />
    ),
    [ModalType.DELETE_MAIL]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading={translate("email_tracker.email_delete_modal.heading")}
        routeHandler={routeHandler}
        loading={loading}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return {
    currentPageRows,
    totalItems,
    handlePageChange,
    itemsPerPage,
    filter,
    setFilter,
    handleFilterChange,
    loading,
    handleDelete: handleConfirmDeletion,
    renderModal,
    currentPage,
    totalCount,
  };
}
