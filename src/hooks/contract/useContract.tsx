import { contractTableTypes } from "@/types/contract";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";
import { useRouter } from "next/router";
import { FilterType } from "@/types";
import {
  readContract,
  readContractDetails,
  setContractDetails,
  updateContractPaymentStatus,
  updateContractStatus,
} from "@/api/slices/contract/contractSlice";
import { deleteNotes, readNotes } from "@/api/slices/noteSlice/noteSlice";
import ImagesUploadOffer from "@/base-components/ui/modals1/ImageUploadOffer";
import { readImage, setImages } from "@/api/slices/imageSlice/image";
import { FiltersDefaultValues } from "@/enums/static";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";

const useContract = () => {
  const { lastPage, contract, loading, totalCount, contractDetails } =
    useAppSelector((state) => state.contract);
  const { images } = useAppSelector((state) => state.image);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<contractTableTypes[]>(
    []
  );
  const { t: translate } = useTranslation();

  const { query } = useRouter();

  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
    // date: {
    //   $gte: FiltersDefaultValues.None,
    //   $lte: FiltersDefaultValues.None,
    // },
    status: FiltersDefaultValues.None,
    leadSource: FiltersDefaultValues.None,
  });
  const totalItems = totalCount;

  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const handleFilterChange = (filter: FilterType) => {
    dispatch(
      readContract({ params: { filter: filter, page: currentPage, size: 10 } })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.Contract);
      }
    });
  };
  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };
  const handleNotes = (item: string, e?: React.MouseEvent<HTMLSpanElement>) => {
    if (e) {
      e.stopPropagation();
    }
    const filteredLead = contract?.filter((item_) => item_.id === item);
    if (filteredLead?.length === 1) {
      dispatch(setContractDetails(filteredLead[0]));
      dispatch(
        readNotes({ params: { type: "contract", id: filteredLead[0]?.id } })
      );
      dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));
    }
  };

  const handleAddNote = (id: string) => {
    dispatch(
      updateModalType({
        type: ModalType.ADD_NOTE,
        data: { id: id, type: "contract" },
      })
    );
  };

  const handleDeleteNote = async (id: string) => {
    if (!id) return;
    const response = await dispatch(deleteNotes({ data: { id: id } }));
    if (response?.payload)
      dispatch(updateModalType({ type: ModalType.CONFIRM_DELETE_NOTE }));
  };

  const handleEditNote = (id: string, note: string) => {
    dispatch(
      updateModalType({
        type: ModalType.EDIT_NOTE,
        data: { id: id, type: "contract", data: note },
      })
    );
  };

  const handleImageSlider = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleImageUpload = (
    item: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    e.stopPropagation();
    dispatch(setImages([]));

    const filteredLead = contract?.find((item_) => item_.id === item);
    if (filteredLead) {
      dispatch(setContractDetails(filteredLead));
      dispatch(
        readImage({ params: { type: "contractID", id: filteredLead?.id } })
      );
      dispatch(updateModalType({ type: ModalType.UPLOAD_OFFER_IMAGE }));
    }
  };

  const contractHandler = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
    handleFilterChange(filter);
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EXISTING_NOTES]: (
      <ExistingNotes
        handleAddNote={handleAddNote}
        onClose={onClose}
        leadDetails={contractDetails}
        onEditNote={handleEditNote}
        onDeleteNote={handleDeleteNote}
      />
    ),
    [ModalType.CONFIRM_DELETE_NOTE]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading={translate("common.modals.delete_note")}
        routeHandler={contractHandler}
        loading={loading}
      />
    ),

    [ModalType.EDIT_NOTE]: (
      <AddNewNote
        onClose={onClose}
        handleNotes={handleNotes}
        handleFilterChange={handleFilterChange}
        filter={filter}
        heading={translate("common.add_note")}
      />
    ),
    [ModalType.ADD_NOTE]: (
      <AddNewNote
        onClose={onClose}
        handleNotes={handleNotes}
        handleFilterChange={handleFilterChange}
        filter={filter}
        heading={translate("common.add_note")}
      />
    ),
    [ModalType.UPLOAD_OFFER_IMAGE]: (
      <ImagesUploadOffer
        onClose={onClose}
        handleImageSlider={handleImageSlider}
        type={"Contract"}
      />
    ),
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.offer_created_des")}
        route={onClose}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  useEffect(() => {
    if (query?.filter) {
      const statusValue =
        staticEnums["ContractStatus"][query?.filter as string];
      setFilter({
        ...filter,
        status: [statusValue?.toString()],
      });
      dispatch(
        readContract({
          params: {
            filter: {
              ...filter,
              status: [staticEnums["ContractStatus"][query?.filter as string]],
            },
            page: currentPage,
            size: 10,
          },
        })
      ).then((response: any) => {
        if (response?.payload) setCurrentPageRows(response?.payload?.Contract);
      });
    } else {
      // setFilter({
      //   ...filter,
      //   status: "None",
      // });
      dispatch(
        readContract({
          params: {
            filter: { ...filter },
            page: currentPage,
            size: 10,
          },
        })
      ).then((response: any) => {
        if (response?.payload) setCurrentPageRows(response?.payload?.Contract);
      });
    }
  }, [currentPage, query?.filter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleContractStatusUpdate = async (
    id: string,
    status: string,
    type: string
  ) => {
    if (type === "contracts") {
      const res = await dispatch(
        updateContractStatus({
          data: {
            id: id,
            contractStatus: staticEnums["ContractStatus"][status],
          },
        })
      );
      if (res?.payload)
        // dispatch(
        //   readContractDetails({ params: { filter: contractDetails?.id } })
        // ),
        contractHandler();
    }
  };

  const handlePaymentStatusUpdate = async (
    id: string,
    status: string,
    type: string
  ) => {
    if (type === "contracts") {
      const res = await dispatch(
        updateContractPaymentStatus({
          data: { id: id, paymentType: staticEnums["PaymentType"][status] },
        })
      );
      if (res?.payload) contractHandler();
    }
  };

  return {
    currentPageRows,
    totalItems,
    handlePageChange,
    itemsPerPage,
    handleNotes,
    renderModal,
    handleImageUpload,
    handleFilterChange,
    filter,
    setFilter,
    loading,
    handleContractStatusUpdate,
    handlePaymentStatusUpdate,
    currentPage,
  };
};

export default useContract;
