import { Layout } from "@/layout";
import React from "react";
import ContentAddDetailsData from "./ContentAddDetailsData";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import ContentCreated from "@/base-components/ui/modals1/ContentCreated";

const ContentAddDetails = () => {
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  // Function for handling the modal for exiting notes
  const handleContentCreated = () => {
    dispatch(updateModalType(ModalType.CONTENT_CREATED));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CONTENT_CREATED]: <ContentCreated onClose={onClose} />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return (
    <>
      <Layout>
        <p className="text-xl font-normal text-[#222B45]">Create Content</p>
        <div className="mt-4">
          <ContentAddDetailsData handleContentCreated={handleContentCreated}/>
        </div>
      </Layout>
      {renderModal()}
    </>
  );
};

export default ContentAddDetails;
