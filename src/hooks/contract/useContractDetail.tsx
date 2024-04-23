import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import {
  deleteContract,
  readContractDetails,
  setContractDetails,
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

export default function useContractDetail() {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const router = useRouter();
  const id = router.query.offer;
  const isMail = Boolean(router.query?.isMail);
  const [isSendEmail, setIsSendEmail] = useState(isMail || false);
  const { systemSettings } = useAppSelector((state) => state.settings);
  const [isEditing, setIsEditing] = useState(false);
  const { contractDetails, loading, contract } = useAppSelector(
    (state) => state.contract
  );

  const { t: translate } = useTranslation();

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
          dispatch(setContractDetails(res.payload));
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

  const handleNotes = (item: string, e?: React.MouseEvent<HTMLSpanElement>) => {
    if (e) {
      e.stopPropagation();
    }
    dispatch(
      readNotes({ params: { type: "contract", id: contractDetails?.id } })
    );
    dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));
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
      dispatch(updateModalType({ type: ModalType.CREATION }));
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
    dispatch(
      readImage({ params: { type: "contractID", id: contractDetails?.id } })
    );
    dispatch(updateModalType({ type: ModalType.UPLOAD_OFFER_IMAGE }));
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

  const shareImgModal = () => {
    dispatch(updateModalType({ type: ModalType.SHARE_IMAGES }));
  };

  const handleUpdateContractDetail = () => {
    dispatch(
      updateModalType({
        type: ModalType.EDIT_CONTRACT_ADDITIONAL_DETAIL,
      })
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
        heading={translate("common.add_note")}
      />
    ),
    [ModalType.EDIT_NOTE]: (
      <UpdateNote
        onClose={onClose}
        handleNotes={handleNotes}
        heading={translate("common.update_note")}
      />
    ),
    // [ModalType.EDIT_CONTRACT_ADDITIONAL_DETAIL]: (
    //   <EditContractAdditionalDetails
    //     onClose={onClose}
    //     heading="Update Additional Details"
    //   />
    // ),
    [ModalType.UPLOAD_OFFER_IMAGE]: (
      <ImagesUploadOffer
        onClose={onClose}
        handleImageSlider={handleImageSlider}
        type="Contract"
      />
    ),
    // [ModalType.IMAGE_SLIDER]: (
    //   <ImageSlider onClose={onClose} details={images} />
    // ),
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
      <ShareImages onClose={onClose} offerId={contractDetails?.id} />
    ),
  };

  const handleSendEmail = async () => {
    setIsSendEmail(!isSendEmail);
  };

  const offerCreatedHandler = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
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
    if (res?.payload) offerCreatedHandler();
  };

  const handleStatusUpdate = async (offerStatus: string) => {
    const res = await dispatch(
      updateContractStatus({
        data: {
          id: contractDetails?.id,
          contractStatus: staticEnums["ContractStatus"][offerStatus],
        },
      })
    );
    if (res?.payload) offerCreatedHandler();
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
  };
}
