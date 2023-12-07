import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../useRedux';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { deleteContract } from '@/api/slices/contract/contractSlice';
import { CustomerPromiseActionType } from '@/types/customer';
import { ModalConfigType, ModalType } from '@/enums/ui';
import { updateModalType } from '@/api/slices/globalSlice/global';
import { readNotes } from '@/api/slices/noteSlice/noteSlice';
import DeleteConfirmation_1 from '@/base-components/ui/modals1/DeleteConfirmation_1';
import DeleteConfirmation_2 from '@/base-components/ui/modals1/DeleteConfirmation_2';
import ExistingNotes from '@/base-components/ui/modals1/ExistingNotes';
import AddNewNote from '@/base-components/ui/modals1/AddNewNote';
import CreationCreated from '@/base-components/ui/modals1/CreationCreated';
import { readCollectiveInvoice, readCollectiveReciept, readInvoiceDetails, setInvoiceDetails, updateInvoicePaymentStatus, updateInvoiceStatus } from '@/api/slices/invoice/invoiceSlice';
import InvoiceCreated from '@/base-components/ui/modals1/InvoiceCreated';
import { staticEnums } from '@/utils/static';

export default function useInvoiceDetail() {
    const dispatch = useAppDispatch();
    const [switchDetails, setSwitchDetails] = useState("Invoice");

    const { modal } = useAppSelector((state) => state.global);
    const { invoiceDetails, loading, invoice, collectiveInvoice, collectiveReciept } = useAppSelector((state) => state.invoice);
    const { t: translate } = useTranslation()
    const router = useRouter();
    const id = router.query.invoice;


    useEffect(() => {
        if (id) {
            dispatch(readInvoiceDetails({ params: { filter: id } })).then((res: CustomerPromiseActionType) => {
                dispatch(readCollectiveInvoice({ params: { filter: { "invoiceStatus": "0" }, paginate: 0 } }))
                dispatch(readCollectiveReciept({ params: { filter: { "invoiceStatus": "1" }, paginate: 0 } }))


                dispatch(setInvoiceDetails(res.payload))
            })
        }
    }, [id]);
    const onClose = () => {
        dispatch(updateModalType({ type: ModalType.NONE }));
    };

    const offerDeleteHandler = () => {
        dispatch(updateModalType({ type: ModalType.CONFIRM_DELETION, data: { refId: invoiceDetails?.invoiceNumber } }));
    };

    const handleDelete = () => {
        dispatch(updateModalType({ type: ModalType.INFO_DELETED }));
    };

    const routeHandler = () => {
        dispatch(deleteContract({ data: invoiceDetails, router, translate }))
    };

    const handleInvoiceCreation = () => {
        dispatch(updateModalType({ type: ModalType.INVOICE_CREATE }));
    };

    const invoiceCreated = () => {
        dispatch(updateModalType({ type: ModalType.CREATION }));
    };



    const route = () => {
        dispatch(updateModalType({ type: ModalType.NONE }));
    };

    const handleNotes = (
        item: string,
        e?: React.MouseEvent<HTMLSpanElement>
    ) => {
        if (e) {
            e.stopPropagation();
        }
        const filteredLead = invoice?.filter((item_) => item_.id === item)
        if (filteredLead?.length === 1) {
            dispatch(setInvoiceDetails(filteredLead[0]));
            dispatch(readNotes({ params: { type: "invoice", id: filteredLead[0]?.id } }));
            dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));

        } else {
            dispatch(readNotes({ params: { type: "invoice", id: item } }));
            dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));
        }
    };

    const handleAddNote = (id: string) => {
        dispatch(updateModalType({ type: ModalType.ADD_NOTE, data: id }));
    };




    const MODAL_CONFIG: ModalConfigType = {
        [ModalType.CONFIRM_DELETION]: (
            <DeleteConfirmation_1
                onClose={onClose}
                handleDelete={handleDelete}
                modelHeading="Please confirm Invoice ID"
                subHeading="Enter Invoice ID"
            />
        ),
        [ModalType.INFO_DELETED]: (
            <DeleteConfirmation_2
                onClose={onClose}
                modelHeading="Are you sure you want to delete this Invoice?"
                routeHandler={routeHandler}
                loading={loading}
            />
        ),
        [ModalType.EXISTING_NOTES]: (
            <ExistingNotes handleAddNote={handleAddNote} onClose={onClose} leadDetails={invoiceDetails} />
        ),
        [ModalType.ADD_NOTE]: (
            <AddNewNote onClose={onClose} handleNotes={handleNotes} />
        ),


        [ModalType.INVOICE_CREATE]: (
            <InvoiceCreated onClose={onClose} invoiceCreated={invoiceCreated} />
        ),
        [ModalType.CREATION]: (
            <CreationCreated
                onClose={onClose}
                heading="Invoice status updated successful "
                subHeading="Thanks for creating Invoice we are happy to have you. "
                route={route}
            />
        ),

    };
    const offerCreatedHandler = () => {
        dispatch(updateModalType({ type: ModalType.CREATION }));
    };
    const renderModal = () => {
        return MODAL_CONFIG[modal.type] || null;
    };
    const handleInvoiceStatusUpdate = async (id: string, status: string) => {
        const res = await dispatch(updateInvoiceStatus({ data: { id: id, invoiceStatus: staticEnums["InvoiceStatus"][status] } }))
        if (res?.payload) offerCreatedHandler()
    }
    const handlePaymentStatusUpdate = async (id: string, status: string) => {
        const res = await dispatch(updateInvoicePaymentStatus({ data: { id: id, paymentType: staticEnums["PaymentType"][status] } }))
        if (res?.payload) offerCreatedHandler()
    }



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
        collectiveReciept
    }
}
