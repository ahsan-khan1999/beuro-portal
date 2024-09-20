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
  setContractDetails,
  setContractTaskDetails,
  updateContractPaymentStatus,
  updateContractStatus,
} from "@/api/slices/contract/contractSlice";
import { deleteNotes, readNotes } from "@/api/slices/noteSlice/noteSlice";
import ImagesUploadOffer from "@/base-components/ui/modals1/ImageUploadOffer";
import { readImage, setImages } from "@/api/slices/imageSlice/image";
import { FiltersDefaultValues } from "@/enums/static";
import { staticEnums } from "@/utils/static";
import moment from "moment";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { ConfirmDeleteNote } from "@/base-components/ui/modals1/ConfirmDeleteNote";
import { UpdateNote } from "@/base-components/ui/modals1/UpdateNote";
import { IsContractTaskCreated } from "@/base-components/ui/modals1/IsContractTaskCreated";
import { formatDateTimeToDate, pdfDateFormat } from "@/utils/utility";

const useContract = () => {
  const { contract, loading, isLoading, totalCount, contractDetails } =
    useAppSelector((state) => state.contract);

  const router = useRouter();

  useEffect(() => {
    const parsedPage = parseInt(router.query.page as string, 10);
    let resetPage = null;
    if (!isNaN(parsedPage)) {
      setCurrentPage(parsedPage);
    } else {
      resetPage = 1;
      setCurrentPage(1);
    }

    const queryStatus = router.query?.status;
    const searchQuery = router.query?.text as string;
    const sortedValue = router.query?.sort as string;
    const searchDate = router.query?.date as string;
    const searchLeadSource = router.query?.leadSource;
    const searchEmailStatus = router.query?.emailStatus;
    const searchNoteType = router.query?.noteType as string;

    const queryParams =
      queryStatus ||
      searchQuery ||
      sortedValue ||
      searchDate ||
      searchLeadSource ||
      searchEmailStatus ||
      searchNoteType;

    if (queryParams !== undefined) {
      const filteredStatus =
        router.query?.status === "None"
          ? "None"
          : queryParams
              .toString()
              .split(",")
              .filter((item) => item !== "None");

      let updatedFilter: {
        status: string | string[];
        text?: string;
        sort?: string;
        noteType?: string;
        date?: {
          $gte?: string;
          $lte?: string;
        };
        leadSource?: string | string[];
        emailStatus?: string | string[];
      } = {
        status: filteredStatus,
      };

      if (
        searchQuery ||
        sortedValue ||
        searchDate ||
        searchLeadSource ||
        searchEmailStatus ||
        searchNoteType
      ) {
        updatedFilter.text = searchQuery;
        updatedFilter.sort = sortedValue;
        updatedFilter.date = searchDate && JSON.parse(searchDate);
        updatedFilter.leadSource = searchLeadSource;
        updatedFilter.emailStatus = searchEmailStatus;
        updatedFilter.noteType = searchNoteType;
      }

      setFilter(updatedFilter);

      dispatch(
        readContract({
          params: {
            filter: updatedFilter,
            page: (Number(parsedPage) || resetPage) ?? currentPage,
            size: 15,
          },
        })
      ).then((response: any) => {
        if (response?.payload) setCurrentPageRows(response?.payload?.Contract);
      });
    }
  }, [router.query]);

  const [currentPageRows, setCurrentPageRows] = useState<contractTableTypes[]>(
    []
  );

  const page = router.query?.page as unknown as number;
  const [currentPage, setCurrentPage] = useState<number>(page || 1);
  const { currentLanguage } = useAppSelector((state) => state.global);
  const { systemSettings } = useAppSelector((state) => state.settings);

  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
    noteType: FiltersDefaultValues.None,
    date: {
      $gte: FiltersDefaultValues.None,
      $lte: FiltersDefaultValues.None,
    },
    status: FiltersDefaultValues.None,
    leadSource: FiltersDefaultValues.None,
  });

  const totalItems = totalCount;
  const itemsPerPage = 15;

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedContractId, setSelectedContractId] = useState<string | null>(
    null
  );

  const handleFilterChange = (filter: FilterType) => {
    setCurrentPage(1);
  };

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const handleNotes = (
    id: string,
    refID?: string,
    name?: string,
    heading?: string,
    e?: React.MouseEvent<HTMLSpanElement>
  ) => {
    e?.stopPropagation();

    const filteredLead = contract?.filter((item_) => item_.id === id);

    if (filteredLead?.length === 1) {
      dispatch(setContractDetails(filteredLead[0]));
      dispatch(
        readNotes({ params: { type: "contract", id: filteredLead[0]?.id } })
      ).then((res: any) => {
        if (res.payload.Note?.length > 0) {
          setCurrentPageRows((prev) => {
            const updatedContracts = prev.map((item) => {
              if (item.id === filteredLead[0]?.id) {
                const contract: contractTableTypes = {
                  ...item,
                  isNoteCreated: true,
                };
                return contract;
              }
              return item;
            });
            return updatedContracts;
          });
        }
      });
      dispatch(
        updateModalType({
          type: ModalType.EXISTING_NOTES,
          data: {
            refID: refID,
            name: name,
            heading: heading,
          },
        })
      );
    }
  };

  const handleAddNote = (
    id: string,
    refID: string,
    name: string,
    heading: string
  ) => {
    dispatch(
      updateModalType({
        type: ModalType.ADD_NOTE,
        data: {
          id: id,
          type: "contract",
          refID: refID,
          name: name,
          heading: heading,
        },
      })
    );
  };

  const handleDeleteNote = async (id: string) => {
    if (!id) return;
    const response = await dispatch(deleteNotes({ data: { id: id } }));
    if (response?.payload)
      dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleEditNote = (
    id: string,
    note: string,
    refID: string,
    name: string,
    heading: string
  ) => {
    dispatch(
      updateModalType({
        type: ModalType.EDIT_NOTE,
        data: {
          id: id,
          type: "contract",
          data: note,
          refID: refID,
          name: name,
          heading: heading,
        },
      })
    );
  };

  const handleImageSlider = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleImageUpload = (
    id: string,
    refID?: string,
    name?: string,
    heading?: string,
    e?: React.MouseEvent<HTMLSpanElement>
  ) => {
    e?.stopPropagation();
    dispatch(setImages([]));

    const filteredLead = contract?.find((item_) => item_.id === id);
    if (filteredLead) {
      dispatch(setContractDetails(filteredLead));
      dispatch(
        readImage({ params: { type: "contractID", id: filteredLead?.id } })
      ).then((res: any) => {
        if (
          res.payload?.images.length > 0 ||
          res.payload?.attachments.length > 0 ||
          res.payload?.videos.length > 0 ||
          res.payload?.links.length > 0
        ) {
          setCurrentPageRows((prev) =>
            prev.map((contract) => {
              return contract.id === filteredLead?.id
                ? { ...contract, isImageAdded: true }
                : contract;
            })
          );
        }
      });
      dispatch(
        updateModalType({
          type: ModalType.UPLOAD_OFFER_IMAGE,
          data: {
            refID: refID,
            name: name,
            heading: heading,
          },
        })
      );
    }
  };

  const contractHandler = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
    handleFilterChange(filter);
  };

  const handleConfirmDeleteNote = (id: string) => {
    dispatch(
      updateModalType({ type: ModalType.CONFIRM_DELETE_NOTE, data: id })
    );
  };

  const handleCancelNote = () => {
    dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePaymentStatusUpdate = async (
    id: string,
    status: string,
    type: string
  ) => {
    if (type === "contracts") {
      const currentItem = currentPageRows.find((item) => item.id === id);
      if (!currentItem || currentItem.paymentType !== status) {
        const res = await dispatch(
          updateContractPaymentStatus({
            data: { id: id, paymentType: staticEnums["PaymentType"][status] },
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
            contractHandler();
          }
        }
      }
    }
  };

  const handleContractStatusUpdate = async (
    id: string,
    status: string,
    type: string
  ) => {
    if (status === "Confirmed") {
      setSelectedContractId(id);
      setSelectedStatus(status);
      dispatch(updateModalType({ type: ModalType.IS_CONTRACT_TASK_CREATED }));
    } else {
      if (type === "contracts") {
        const currentItem = currentPageRows.find((item) => item.id === id);
        if (!currentItem || currentItem.contractStatus !== status) {
          const res = await dispatch(
            updateContractStatus({
              data: {
                id: id,
                contractStatus: staticEnums["ContractStatus"][status],
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
              contractHandler();
            }
          }
        }
      }
    }
  };

  const handleTaskCreation = (id: string) => {
    if (id) {
      if (contractDetails?.offerID?.date) {
        const updatedDates = contractDetails.offerID.date.map(
          (dateItem: any) => {
            const { startDate, endDate } = dateItem;
            const taskTime = contractDetails?.offerID?.time || "00:00";

            const startMoment = moment(startDate).set({
              hour: parseInt(taskTime.split(":")[0], 10),
              minute: parseInt(taskTime.split(":")[1], 10),
            });

            let endMoment;

            if (endDate) {
              endMoment = moment(endDate)
                .set({
                  hour: parseInt(taskTime.split(":")[0], 10),
                  minute: parseInt(taskTime.split(":")[1], 10),
                })
                .add(1, "hour");
            } else {
              endMoment = startMoment.clone().add(1, "hour");
            }

            return {
              ...dateItem,
              startDate: startMoment.format("YYYY-MM-DDTHH:mm"),
              endDate: endMoment.format("YYYY-MM-DDTHH:mm"),
            };
          }
        );

        const customerName =
          contractDetails?.offerID?.leadID?.customerDetail?.fullName;
        const customerEmail =
          contractDetails?.offerID?.leadID?.customerDetail?.email;
        const customerPhoneNumber =
          contractDetails?.offerID?.leadID?.customerDetail?.phoneNumber;
        const workDates = contractDetails?.offerID?.date;
        const time = contractDetails?.offerID?.time;
        const serviceItem =
          contractDetails?.offerID?.serviceDetail?.serviceDetail;

        const noteDetail = `
          <span style="font-size: 16px; font-weight: 600; color: #4A13E7;">
              ${translate("contracts.card_content.heading")}.
          </span>
          
          <div style="display: flex; flex-direction: column;">
              <div style="display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 14px; font-weight: 400; color: #2A2E3A;">
                      ${translate("pdf.label_nr_contract")} ${translate(
          "pdf.no"
        )}:
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
                      ${contractDetails?.contractNumber}
                  </span>
              </div>
              <div style="display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 14px; font-weight: 400; color: #2A2E3A;">
                      ${translate("pdf.offer_date")}:
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
                      ${pdfDateFormat(
                        contractDetails?.createdAt || "",
                        currentLanguage || "de"
                      )}
                  </span>
              </div>
              <div style="display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 14px; font-weight: 400; color: #2A2E3A;">
                      ${translate("pdf.created_by")}:
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
                      ${contractDetails?.offerID?.createdBy?.fullName}
                  </span>
              </div>
          </div>
          
          <br />
          
          <span style="font-size: 16px; font-weight: 600; color: #FE9244;">
              ${translate("customers.tab_heading")}.
          </span>
          
          <div style="display: flex; flex-direction: column;">
          ${
            customerName &&
            customerName.trim() !== "" &&
            `<div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: 14px; font-weight: 400; color: #2A2E3A;">
                    ${translate("pdf.name")}:
                </span>
                <span style="font-size: 14px; font-weight: 400; color: #FE9244;">
                    ${customerName}
                </span>
            </div>`
          }
          
              ${
                customerEmail &&
                customerEmail.trim() !== "" &&
                `<div style="display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 14px; font-weight: 400; color: #2A2E3A;">
                      ${translate("pdf.email")}:
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #FE9244;">
                      ${customerEmail}
                  </span>
              </div>`
              }
              ${
                customerPhoneNumber &&
                customerPhoneNumber.trim() !== "" &&
                `<div style="display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 14px; font-weight: 400; color: #2A2E3A;">
                      ${translate("pdf.phone")}:
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #FE9244;">
                      ${customerPhoneNumber}
                  </span>
              </div>`
              }
          </div>
          
          <br />
          
          <span style="font-size: 16px; font-weight: 600; color: #4A13E7;">
              ${translate("contracts.table_headings.title")}.
          </span>
          <p style="font-size: 16px; font-weight: 500; color: #2A2E3A;">
              ${contractDetails?.title}
          </p>
          
          <br />
          
          ${
            contractDetails?.offerID?.addressID?.address?.length > 0
              ? `
                <span style="font-size: 16px; font-weight: 600; color: #FE9244;">
                  ${translate("customers.details.address_details")}.
                </span>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${contractDetails.offerID.addressID.address
                    .map(
                      (address, index) => `
                      <div key=${index} style="display: flex; flex-direction: column; gap: 2px;">
                        <p style="font-size: 14px; font-weight: 500; color: #2A2E3A;">
                          ${address.label}:
                        </p>
                        <p style="font-size: 14px; font-weight: 500; color: #2A2E3A;">
                          ${address.streetNumber}, ${address.postalCode}, ${
                        address.country || ""
                      }
                        </p>
                      </div>
                    `
                    )
                    .join("")}
                </div>
              `
              : ""
          }
          
          <br />
          
          
          <div style="display: flex; flex-direction: column; gap: 2px;">
              <span style="font-size: 14px; font-weight: 600; color: #45C769;">
                  ${
                    workDates?.length === 1
                      ? translate("pdf.work_date")
                      : translate("pdf.work_dates")
                  }
                  :
              </span>
             <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
  ${workDates
    ?.map(
      (date, index) =>
        `${formatDateTimeToDate(date.startDate)}${
          date.endDate
            ? " bis " +
              formatDateTimeToDate(date.endDate) +
              (workDates?.length - 1 != index ? ", " : ".")
            : workDates?.length - 1 != index
            ? ", "
            : "."
        }`
    )
    .join("")}
  ${time ? ` Um ${time} Uhr` : ""}
</span>

          </div>
          
          <br />
          
          ${
            serviceItem?.length > 0
              ? `
            <span style="font-size: 16px; font-weight: 600; color: #4A13E7;">
              ${translate("services.service_detail_tab")}
            </span>
          
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${serviceItem
                .map(
                  (item, index) => `
                  <div key=${index} style="display: flex; align-items: center; gap: 4px;">
                    <p style="font-size: 14px; font-weight: 400; color: #2A2E3A;">${item?.serviceTitle}</p>
                    <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
                      ${item?.totalPrice}
                    </span>
                  </div>
                `
                )
                .join("")}
            </div>
          `
              : ""
          }
          
</div>

          <br />
          <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; align-items: center; gap:4px">
                  <span style="font-size: 14px; font-weight: 600; color: #2A2E3A;">
                      ${translate("pdf.sub_total")}:
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
                      ${Number(contractDetails?.offerID?.subTotal).toFixed(
                        2
                      )} ${systemSettings?.currency}
                  </span>
              </div>
              <div style="display: flex; align-items: center; gap:4px">
                  <span style="font-size: 14px; font-weight: 600; color: #2A2E3A;">
                      Mwst (${contractDetails?.offerID?.taxAmount}%):
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
                      ${Number(contractDetails?.offerID?.subTotal).toFixed(
                        2
                      )} ${systemSettings?.currency}
                  </span>
              </div>
              <div style="display: flex; align-items: center; gap:4px">
                  <span style="font-size: 14px; font-weight: 600; color: #2A2E3A;">
                      ${translate("pdf.grand_total")}:
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
                      ${Number(contractDetails?.offerID?.total).toFixed(2)} ${
          systemSettings?.currency
        }
                  </span>
              </div>
          </div>
          `;

        dispatch(
          setContractTaskDetails({
            id: "convert",
            colour: "#5CDD42",
            contractID: {
              id: contractDetails?.id,
            },
            date: updatedDates,
            title: contractDetails?.title,
            isAllDay: false,
            type: "Contract",
            alertTime: 15,
            note: noteDetail,
          })
        );
      }

      dispatch(updateModalType(ModalType.NONE));
      router.push(`/calendar?isContractId=${id}`);
    }
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EXISTING_NOTES]: (
      <ExistingNotes
        handleAddNote={handleAddNote}
        onClose={onClose}
        leadDetails={contractDetails}
        onEditNote={handleEditNote}
        onConfrimDeleteNote={handleConfirmDeleteNote}
      />
    ),
    [ModalType.CONFIRM_DELETE_NOTE]: (
      <ConfirmDeleteNote
        onClose={onClose}
        modelHeading={translate("common.modals.delete_note")}
        onDeleteNote={handleDeleteNote}
        loading={loading}
        onCancel={handleCancelNote}
      />
    ),
    [ModalType.EDIT_NOTE]: (
      <UpdateNote
        onClose={onClose}
        handleNotes={handleNotes}
        handleFilterChange={handleFilterChange}
        filter={filter}
        mainHeading={translate("common.add_note")}
      />
    ),
    [ModalType.ADD_NOTE]: (
      <AddNewNote
        onClose={onClose}
        handleNotes={handleNotes}
        handleFilterChange={handleFilterChange}
        filter={filter}
        mainHeading={translate("common.add_note")}
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
        subHeading={translate("common.modals.update_success")}
        route={onClose}
      />
    ),
    [ModalType.IS_CONTRACT_TASK_CREATED]: (
      <IsContractTaskCreated
        onClose={onClose}
        heading={translate("calendar.is_contract_task_des")}
        contractId={selectedContractId}
        status={selectedStatus}
        onSuccess={contractHandler}
        currentPageRows={currentPageRows}
        setCurrentPageRows={setCurrentPageRows}
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
    handleNotes,
    renderModal,
    handleImageUpload,
    handleFilterChange,
    filter,
    setFilter,
    loading,
    isLoading,
    handleContractStatusUpdate,
    handlePaymentStatusUpdate,
    currentPage,
    totalCount,
    handleTaskCreation,
  };
};

export default useContract;
