import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import reschudleIcon from "@/assets/pngs/reschdule-icon.png";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  readAppointmentDetails,
  setAppointmentDetails,
  updateAppointmentStatus,
} from "@/api/slices/appointment/appointmentSlice";
import { CustomerPromiseActionType } from "@/types/company";
import { staticEnums } from "@/utils/static";
import { deleteNotes, readNotes } from "@/api/slices/noteSlice/noteSlice";
import { ConfirmDeleteNote } from "@/base-components/ui/modals1/ConfirmDeleteNote";
import { UpdateNote } from "@/base-components/ui/modals1/UpdateNote";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";
import ImagesUploadOffer from "@/base-components/ui/modals1/ImageUploadOffer";
import { readImage } from "@/api/slices/imageSlice/image";

export const useAppointmentsDetails = () => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const { loading, isLoading, appointmentDetails } = useAppSelector(
    (state) => state.appointment
  );

  const id = router.query.appointment;

  useEffect(() => {
    if (appointmentDetails?.id)
      dispatch(
        readImage({
          params: { type: "leadID", id: appointmentDetails?.leadID?.id },
        })
      );
  }, [appointmentDetails?.id]);

  useEffect(() => {
    if (id) {
      dispatch(readAppointmentDetails({ params: { filter: id } })).then(
        (res: CustomerPromiseActionType) => {
          dispatch(setAppointmentDetails(res.payload));
        }
      );
    }
  }, [id]);

  const defaultUpdateModal = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleStatusUpdate = async (appointmentStatus: string) => {
    const res = await dispatch(
      updateAppointmentStatus({
        data: {
          id: appointmentDetails?.id,
          appointmentStatus:
            staticEnums["AppointmentStatus"][appointmentStatus],
        },
      })
    );
    if (res?.payload) defaultUpdateModal();
  };

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

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
    dispatch(
      readNotes({
        params: { type: "lead", id: appointmentDetails?.leadID?.id },
      })
    );
    dispatch(
      updateModalType({
        type: ModalType.EXISTING_NOTES,
        data: {
          id: appointmentDetails?.leadID?.id,
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
          id: appointmentDetails?.leadID?.id,
          type: "lead",
          refID: refID,
          name: name,
          heading: heading,
        },
      })
    );
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
          type: "lead",
          data: note,
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

  const handleUploadImages = (
    id: string,
    refID?: string,
    name?: string,
    heading?: string,
    e?: React.MouseEvent<HTMLSpanElement>
  ) => {
    e?.stopPropagation();
    dispatch(
      updateModalType({
        type: ModalType.UPLOAD_OFFER_IMAGE,
        data: {
          id: appointmentDetails?.leadID?.id,
          refID: refID,
          name: name,
          heading: heading,
        },
      })
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

  const handleCreateReport = () => {
    router.push({
      pathname: `/agent/appointments/create-report`,
      query: {
        today: router.query.today,
        appointmentId: appointmentDetails?.id,
      },
    });
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.update_success")}
        route={onClose}
      />
    ),

    [ModalType.APPOINTMENT_SUCCESS]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("appointments.successs_modal.heading")}
        subHeading={translate("appointments.successs_modal.sub_heading")}
        route={onClose}
        imgSrc={reschudleIcon}
      />
    ),
    [ModalType.EXISTING_NOTES]: (
      <ExistingNotes
        handleAddNote={handleAddNote}
        onClose={onClose}
        leadDetails={appointmentDetails}
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
        mainHeading={translate("common.update_note")}
      />
    ),
    [ModalType.ADD_NOTE]: (
      <AddNewNote
        onClose={onClose}
        handleNotes={handleNotes}
        mainHeading={translate("common.add_note")}
      />
    ),
    [ModalType.UPLOAD_OFFER_IMAGE]: (
      <ImagesUploadOffer
        onClose={onClose}
        handleImageSlider={defaultUpdateModal}
        type={"Lead"}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return {
    router,
    loading,
    isLoading,
    translate,
    renderModal,
    appointmentDetails,
    handleStatusUpdate,
    handleCreateReport,
    handleNotes,
    handleUploadImages,
  };
};
