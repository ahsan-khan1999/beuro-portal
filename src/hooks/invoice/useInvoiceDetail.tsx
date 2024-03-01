import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { deleteContract } from "@/api/slices/contract/contractSlice";
import { CustomerPromiseActionType } from "@/types/customer";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { deleteNotes, readNotes } from "@/api/slices/noteSlice/noteSlice";
import DeleteConfirmation_1 from "@/base-components/ui/modals1/DeleteConfirmation_1";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import {
  readCollectiveInvoice,
  readCollectiveReciept,
  readInvoiceDetails,
  setInvoiceDetails,
  stopRecurringInvoices,
  updateInvoicePaymentStatus,
  updateInvoiceStatus,
  updateRecieptPaymentStatus,
  updateRecieptStatus,
} from "@/api/slices/invoice/invoiceSlice";
import InvoiceCreated from "@/base-components/ui/modals1/InvoiceCreated";
import { staticEnums } from "@/utils/static";
import AreYouSureOffer from "@/base-components/ui/modals1/AreYouSureOffer";
import cautionIcon from "@/assets/svgs/caution.svg";
import RecurringInvoice from "@/base-components/ui/modals1/RecurringInvoice";
import RecurringInvoiceFrequency from "@/base-components/ui/modals1/InvoiceFrequency";
import InvoiceUpdate from "@/base-components/ui/modals1/InvoiceUpdate";
import RecurringInvoiceUpdate from "@/base-components/ui/modals1/RecurringInvoiceUpdate";
import { readContent } from "@/api/slices/content/contentSlice";
import { updateQuery } from "@/utils/update-query";
import { ConfirmDeleteNote } from "@/base-components/ui/modals1/ConfirmDeleteNote";
export default function useInvoiceDetail() {
  const dispatch = useAppDispatch();
  const [switchDetails, setSwitchDetails] = useState("Invoice");
  const [isSendEmail, setIsSendEmail] = useState(false);

  const { modal } = useAppSelector((state) => state.global);
  const { systemSettings } = useAppSelector((state) => state.settings);

  const {
    invoiceDetails,
    loading,
    invoice,
    collectiveInvoice,
    collectiveReciept,
  } = useAppSelector((state) => state.invoice);
  const { t: translate } = useTranslation();
  const router = useRouter();
  const id = router.query.invoice;

  useEffect(() => {
    if (id) {
      dispatch(readContent({ params: { filter: {}, paginate: 0 } }));
      dispatch(readInvoiceDetails({ params: { filter: id } })).then(
        (res: CustomerPromiseActionType) => {
          dispatch(
            readCollectiveInvoice({
              params: {
                filter: { invoiceStatus: ["0", "1"] },
                paginate: 0,
                id: res?.payload?.id,
              },
            })
          );
          dispatch(
            readCollectiveReciept({
              params: {
                filter: { invoiceStatus: "2" },
                paginate: 0,
                id: res?.payload?.id,
              },
            })
          );

          dispatch(setInvoiceDetails(res.payload));
        }
      );
    }
  }, [id]);
  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const offerDeleteHandler = () => {
    dispatch(
      updateModalType({
        type: ModalType.CONFIRM_DELETION,
        data: { refId: invoiceDetails?.invoiceNumber },
      })
    );
  };

  const handleDelete = () => {
    dispatch(updateModalType({ type: ModalType.INFO_DELETED }));
  };

  const routeHandler = () => {
    dispatch(deleteContract({ data: invoiceDetails, router, translate }));
  };

  const handleInvoiceCreation = () => {
    dispatch(updateModalType({ type: ModalType.INVOICE_CREATE }));
  };

  const invoiceCreated = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleRecurringInvoiceCreation = () => {
    dispatch(updateModalType({ type: ModalType.RECURRING_INVOICE }));
  };

  const handleStopInvoiceCreation = () => {
    dispatch(updateModalType({ type: ModalType.ARE_YOU_SURE }));
  };

  const handleEditInvoiceFrequencyCreation = () => {
    dispatch(updateModalType({ type: ModalType.RECURRING_INVOICE_FREQUENCY }));
  };

  const handleSendEmail = async () => {
    setIsSendEmail(!isSendEmail);
  };
  const onSuccess = () => {
    router.push("/invoice");
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const route = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const handleNotes = (item: string, e?: React.MouseEvent<HTMLSpanElement>) => {
    if (e) {
      e.stopPropagation();
    }
    dispatch(
      readNotes({ params: { type: "invoice", id: invoiceDetails?.id } })
    );
    dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));
  };

  const handleAddNote = (id: string) => {
    dispatch(
      updateModalType({
        type: ModalType.ADD_NOTE,
        data: { id: id, type: "invoice" },
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
        data: { id: id, type: "invoice", data: note },
      })
    );
  };

  const handleRecurringSuccess = async () => {
    const res = await dispatch(
      stopRecurringInvoices({
        data: { isInvoiceRecurring: false, id: invoiceDetails?.id },
      })
    );
    if (res?.payload) dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  let modalInfo = {
    image: cautionIcon,
    heading: `${translate("common.modals.are_sure")}`,
    text: `${translate("common.modals.stop_reccuring")}`,
    noButton: `${translate("common.cancel_button")}`,
    yesButton: `${translate("common.are_you_sure_modal.yes_button")}`,
    onSuccess: handleRecurringSuccess,
    loading: loading,
  };
  const handleInvoiceEdit = (item: any) => {
    dispatch(updateModalType({ type: ModalType.INVOICE_UPDATE, data: item }));
  };

  const handleRecurringInvoiceEdit = (item: any) => {
    dispatch(
      updateModalType({ type: ModalType.RECURRING_INVOICE_UPDATE, data: item })
    );
  };

  const handleConfirmDeleteNote = (id: string) => {
    dispatch(
      updateModalType({ type: ModalType.CONFIRM_DELETE_NOTE, data: id })
    );
  };

  const handleCancelNote = () => {
    dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CONFIRM_DELETION]: (
      <DeleteConfirmation_1
        onClose={onClose}
        handleDelete={handleDelete}
        modelHeading={translate("common.modals.confirm_invoice_id")}
        subHeading={translate("common.modals.enter_invoice_id")}
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
    [ModalType.INFO_DELETED]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading={translate("common.modals.delete_invoice")}
        routeHandler={routeHandler}
        loading={loading}
      />
    ),
    [ModalType.EXISTING_NOTES]: (
      <ExistingNotes
        handleAddNote={handleAddNote}
        onClose={onClose}
        leadDetails={invoiceDetails}
        onEditNote={handleEditNote}
        onConfrimDeleteNote={handleConfirmDeleteNote}
      />
    ),

    [ModalType.EDIT_NOTE]: (
      <AddNewNote
        onClose={onClose}
        handleNotes={handleNotes}
        heading={translate("common.update_note")}
      />
    ),

    [ModalType.ADD_NOTE]: (
      <AddNewNote
        onClose={onClose}
        handleNotes={handleNotes}
        heading={translate("common.add_note")}
      />
    ),

    [ModalType.INVOICE_CREATE]: (
      <InvoiceCreated onClose={onClose} invoiceCreated={invoiceCreated} />
    ),

    [ModalType.INVOICE_UPDATE]: (
      <InvoiceUpdate onClose={onClose} invoiceCreated={invoiceCreated} />
    ),

    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.admin_setting_des")}
        route={route}
      />
    ),
    [ModalType.ARE_YOU_SURE]: (
      <AreYouSureOffer info={modalInfo} onClose={onClose} />
    ),
    [ModalType.RECURRING_INVOICE]: (
      <RecurringInvoice onClose={onClose} invoiceCreated={invoiceCreated} />
    ),
    [ModalType.RECURRING_INVOICE_FREQUENCY]: (
      <RecurringInvoiceFrequency
        onClose={onClose}
        invoiceCreated={invoiceCreated}
      />
    ),
    [ModalType.EMAIL_CONFIRMATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_email_sent")}
        subHeading={translate("common.modals.invoice_update")}
        route={onSuccess}
      />
    ),

    [ModalType.RECURRING_INVOICE_UPDATE]: (
      <RecurringInvoiceUpdate
        onClose={onClose}
        invoiceCreated={invoiceCreated}
      />
    ),
  };

  const offerCreatedHandler = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const handleInvoiceStatusUpdate = async (
    id: string,
    status: string,
    type: string
  ) => {
    if (type === "invoice") {
      const res = await dispatch(
        updateInvoiceStatus({
          data: { id: id, invoiceStatus: staticEnums["InvoiceStatus"][status] },
        })
      );
      if (res?.payload)
        dispatch(
          readInvoiceDetails({ params: { filter: invoiceDetails?.id } })
        ),
          offerCreatedHandler();
    } else {
      const res = await dispatch(
        updateRecieptStatus({
          data: { id: id, invoiceStatus: staticEnums["InvoiceStatus"][status] },
        })
      );
      if (res?.payload)
        dispatch(
          readInvoiceDetails({ params: { filter: invoiceDetails?.id } })
        ),
          offerCreatedHandler();
    }
  };

  const handlePaymentStatusUpdate = async (
    id: string,
    status: string,
    type: string
  ) => {
    if (type === "invoice") {
      const res = await dispatch(
        updateInvoicePaymentStatus({
          data: { id: id, paymentType: staticEnums["PaymentType"][status] },
        })
      );
      if (res?.payload) offerCreatedHandler();
    } else {
      const res = await dispatch(
        updateRecieptPaymentStatus({
          data: { id: id, paymentType: staticEnums["PaymentType"][status] },
        })
      );
      if (res?.payload) offerCreatedHandler();
    }
  };

  const onNextHandle = () => {
    router.pathname = "/offers/pdf-preview";
  };

  const handleInvoiceUpdate = () => {
    router.pathname = "/invoices/update-invoice";
    router.query = { invoice: invoiceDetails?.id };
    updateQuery(router, router.locale as string);
  };
  return {
    invoiceDetails,
    renderModal,
    offerDeleteHandler,
    handleNotes,
    setSwitchDetails,
    switchDetails,
    handleInvoiceCreation,
    collectiveInvoice,
    handleInvoiceStatusUpdate,
    handlePaymentStatusUpdate,
    collectiveReciept,
    handleRecurringInvoiceCreation,
    handleStopInvoiceCreation,
    handleEditInvoiceFrequencyCreation,
    handleInvoiceEdit,
    handleSendEmail,
    setIsSendEmail,
    isSendEmail,
    onNextHandle,
    handleRecurringInvoiceEdit,
    loading,
    systemSettings,
    handleInvoiceUpdate,
  };
}
