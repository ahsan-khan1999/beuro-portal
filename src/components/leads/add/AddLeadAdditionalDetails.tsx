import { updateModalType } from "@/api/slices/globalSlice/global";
import { Form } from "@/base-components/form/form";
import LeadCreated from "@/base-components/ui/modals1/LeadCreated";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAddLeadAdditionalDetails } from "@/hooks/leads/useAddLeadAdditionalDetails";
import { useAppSelector } from "@/hooks/useRedux";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import ImagesUpload from "@/base-components/ui/modals1/ImagesUpload";
import ImageSlider from "@/base-components/ui/modals1/ImageSlider";

const AddLeadAdditionalDetails = () => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error } =
    useAddLeadAdditionalDetails();

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };
  const leadCreatedHandler = () => {
    dispatch(updateModalType(ModalType.PASSWORD_CHANGE_SUCCESSFULLY));
  };

  const imageUploadHandler = () => {
    dispatch(updateModalType(ModalType.UPLOAD_IMAGE));
  };

  const handleImageSlider = () => {
    dispatch(updateModalType(ModalType.NONE));
    dispatch(updateModalType(ModalType.IMAGE_SLIDER));
  };

  const routeHandler = () => {
    router.push("/leads");
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.PASSWORD_CHANGE_SUCCESSFULLY]: (
      <LeadCreated
        imageUploadHandler={imageUploadHandler}
        onClose={onClose}
        routeHandler={routeHandler}
      />
    ),
    [ModalType.UPLOAD_IMAGE]: (
      <ImagesUpload onClose={onClose} handleImageSlider={handleImageSlider} />
    ),
    [ModalType.IMAGE_SLIDER]: <ImageSlider onClose={onClose} />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const router = useRouter();

  return (
    <>
      <FormCard>
        <div
          className="flex justify-between items-center pb-5 "
          id="Additional Details"
        >
          <h2 className="text-[#393939] text-lg font-medium">
            Additional Details
          </h2>
          <button
            onClick={() => router.push("/leads")}
            className="text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[131px] w-full"
          >
            Cancel
          </button>
        </div>

        <hr className="opacity-20 mb-5" />
        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          className={`${defaultClassName}`}
        />
      </FormCard>
      {renderModal()}
    </>
  );
};

export default AddLeadAdditionalDetails;
