import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useRouter } from "next/router";
import {
  deleteContract,
  readContractDetails,
  setContractDetails,
  updateContractDetail,
  updateContractPaymentStatus,
  updateContractStatus,
} from "@/api/slices/contract/contractSlice";
import { CustomerPromiseActionType } from "@/types/customer";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { deleteNotes, readNotes } from "@/api/slices/noteSlice/noteSlice";
import DeleteConfirmation_1 from "@/base-components/ui/modals1/DeleteConfirmation_1";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";
import ImagesUploadOffer from "@/base-components/ui/modals1/ImageUploadOffer";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { staticEnums } from "@/utils/static";
import { readImage } from "@/api/slices/imageSlice/image";
import localStoreUtil from "@/utils/localstore.util";
import { EditDate } from "@/base-components/ui/modals1/editDate";
import { ConfirmDeleteNote } from "@/base-components/ui/modals1/ConfirmDeleteNote";
import { ShareImages } from "@/base-components/ui/modals1/ShareImages";
import { UpdateNote } from "@/base-components/ui/modals1/UpdateNote";
import { IsContractTaskCreated } from "@/base-components/ui/modals1/IsContractTaskCreated";
import { MailSendLoadingGif } from "@/base-components/ui/modals1/MailLoadingGif";

export default function useContractDetail() {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const router = useRouter();
  const id = router.query.offer;
  const isMail = Boolean(router.query?.isMail);
  const [isSendEmail, setIsSendEmail] = useState(isMail || false);
  const { systemSettings } = useAppSelector((state) => state.settings);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedContractId, setSelectedContractId] = useState<string | null>(
    null
  );

  const { contractDetails, loading } = useAppSelector(
    (state) => state.contract
  );

  useEffect(() => {
    if (contractDetails?.id)
      dispatch(
        readImage({ params: { type: "contractID", id: contractDetails?.id } })
      );
  }, [contractDetails?.id]);

  useEffect(() => {
    localStoreUtil.remove_data("contractComposeEmail");

    if (id) {
      dispatch(readContractDetails({ params: { filter: id } })).then(
        (res: CustomerPromiseActionType) => {
          dispatch(setContractDetails(res?.payload));
        }
      );
    }
  }, [id]);

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const onSuccessEditContarctDetail = () => {
    setIsEditing(false);
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const offerDeleteHandler = () => {
    dispatch(
      updateModalType({
        type: ModalType.CONFIRM_DELETION,
        data: { refId: contractDetails?.contractNumber },
      })
    );
  };

  const handleDelete = () => {
    dispatch(updateModalType({ type: ModalType.INFO_DELETED }));
  };

  const routeHandler = () => {
    dispatch(deleteContract({ data: contractDetails, router, translate }));
  };

  const handleNotes = (
    id: string,
    refID?: string,
    name?: string,
    heading?: string,
    e?: React.MouseEvent<HTMLSpanElement>
  ) => {
    e?.stopPropagation();

    dispatch(
      readNotes({ params: { type: "contract", id: contractDetails?.id } })
    );
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
    dispatch(
      readImage({ params: { type: "contractID", id: contractDetails?.id } })
    );
    dispatch(
      updateModalType({
        type: ModalType.UPLOAD_OFFER_IMAGE,
        data: {
          id: id,
          refID: refID,
          name: name,
          heading: heading,
        },
      })
    );
  };

  const onSuccess = () => {
    router.push("/contract?status=None");
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const editDateHandler = () => {
    dispatch(updateModalType({ type: ModalType.EDIT_DATE }));
  };

  const handleConfirmDeleteNote = (id: string) => {
    dispatch(
      updateModalType({ type: ModalType.CONFIRM_DELETE_NOTE, data: id })
    );
  };

  const handleCancelNote = () => {
    dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));
  };

  const shareImgModal = (
    id: string,
    refID?: string,
    name?: string,
    heading?: string
  ) => {
    dispatch(
      updateModalType({
        type: ModalType.SHARE_IMAGES,
        data: {
          refID: refID,
          name: name,
          heading: heading,
        },
      })
    );
  };

  const handleUpdateContractDetail = () => {
    dispatch(
      updateModalType({
        type: ModalType.EDIT_CONTRACT_ADDITIONAL_DETAIL,
      })
    );
  };

  const handleStatusUpdate = async (status: string) => {
    if (status === "Confirmed") {
      setSelectedContractId(contractDetails?.id);
      setSelectedStatus(status);
      dispatch(updateModalType({ type: ModalType.IS_CONTRACT_TASK_CREATED }));
    } else {
      const res = await dispatch(
        updateContractStatus({
          data: {
            id: contractDetails?.id,
            contractStatus: staticEnums["ContractStatus"][status],
          },
        })
      );
      if (res?.payload) contractHandler();
    }
  };

  const handleSendEmail = async () => {
    setIsSendEmail(!isSendEmail);
  };

  const contractHandler = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handlePaymentStatusUpdate = async (paymentType: string) => {
    const res = await dispatch(
      updateContractPaymentStatus({
        data: {
          id: contractDetails?.id,
          paymentType: staticEnums["PaymentType"][paymentType],
        },
      })
    );
    if (res?.payload) contractHandler();
  };

  const onNextHandle = () => {
    router.pathname = "/contract/pdf-preview";
  };

  const handleViewPdf = () => {
    window.open(contractDetails?.attachement as string);
  };

  const handleUpdateAdditionalDetailsModal = () => {
    dispatch(updateModalType({ type: ModalType.UPDATE_ADDITIONAL_DETAILS }));
  };

  const handleChange = async () => {
    const apiData = {
      ...contractDetails,
      id: contractDetails?.id,
      title: value,
    };

    const response = await dispatch(
      updateContractDetail({ data: apiData, router, translate })
    );
    if (response?.payload) handleUpdateContractDetail();
  };

  const handleDetailUpdate = (id?: string) => {
    dispatch(readContractDetails({ params: { filter: id } })).then(
      (res: CustomerPromiseActionType) => {
        dispatch(setContractDetails(res?.payload));
      }
    );
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CONFIRM_DELETION]: (
      <DeleteConfirmation_1
        onClose={onClose}
        handleDelete={handleDelete}
        modelHeading={translate("common.modals.contract_confirm")}
        subHeading={translate("common.modals.contract_ID")}
      />
    ),
    [ModalType.INFO_DELETED]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading={translate("common.modals.delete_contract")}
        routeHandler={routeHandler}
        loading={loading}
      />
    ),
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
    [ModalType.ADD_NOTE]: (
      <AddNewNote
        onClose={onClose}
        handleNotes={handleNotes}
        mainHeading={translate("common.add_note")}
      />
    ),
    [ModalType.EDIT_NOTE]: (
      <UpdateNote
        onClose={onClose}
        handleNotes={handleNotes}
        mainHeading={translate("common.update_note")}
      />
    ),
    [ModalType.IS_CONTRACT_TASK_CREATED]: (
      <IsContractTaskCreated
        onClose={onClose}
        heading={translate("calendar.is_contract_task_des")}
        contractId={selectedContractId}
        status={selectedStatus}
        onSuccess={contractHandler}
      />
    ),
    [ModalType.UPLOAD_OFFER_IMAGE]: (
      <ImagesUploadOffer
        onClose={onClose}
        handleImageSlider={handleImageSlider}
        type="Contract"
        onUpdateDetails={handleDetailUpdate}
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
    [ModalType.EDIT_CONTRACT_ADDITIONAL_DETAIL]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.contract_updating_description")}
        route={onSuccessEditContarctDetail}
      />
    ),
    [ModalType.EMAIL_CONFIRMATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_email_sent")}
        subHeading={translate("common.modals.contract_done")}
        route={onSuccess}
      />
    ),
    [ModalType.EDIT_DATE]: <EditDate onClose={onClose} />,
    [ModalType.SHARE_IMAGES]: (
      <ShareImages
        onClose={onClose}
        type="contractID"
        id={contractDetails?.id}
      />
    ),
    [ModalType.LOADING_MAIL_GIF]: <MailSendLoadingGif onClose={onClose} />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return {
    contractDetails,
    renderModal,
    offerDeleteHandler,
    handleNotes,
    handleImageUpload,
    handlePaymentStatusUpdate,
    handleStatusUpdate,
    setIsSendEmail,
    isSendEmail,
    onNextHandle,
    handleSendEmail,
    loading,
    handleViewPdf,
    systemSettings,
    handleUpdateAdditionalDetailsModal,
    editDateHandler,
    shareImgModal,
    handleImageSlider,
    handleUpdateContractDetail,
    isEditing,
    setIsEditing,
    handleChange,
    value,
    setValue,
  };
}
