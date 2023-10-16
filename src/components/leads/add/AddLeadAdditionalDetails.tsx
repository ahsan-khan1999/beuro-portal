import { updateModalType } from "@/api/slices/globalSlice/global";
import { Form } from "@/base-components/form/form";
import LeadCreated from "@/base-components/ui/modals1/LeadCreated";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAddLeadAdditionalDetails } from "@/hooks/useAddLeadAdditionalDetails";
import { useAppSelector } from "@/hooks/useRedux";
import FormCard from "@/layout/customers/FormCard";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const AddLeadAdditionalDetails = () => {
  const defaultClassName = "mt-[30px]  ";
  const { fields, control, onSubmit, handleSubmit, errors, error } =
    useAddLeadAdditionalDetails();

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.PASSWORD_CHANGE_SUCCESSFULLY]: <LeadCreated />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  useEffect(() => {
    dispatch(updateModalType(ModalType.PASSWORD_CHANGE_SUCCESSFULLY));
  }, []);

  return (
    <>
      <FormCard>
        <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
          <h2 className="text-[#393939] text-lg font-medium">
            Additional Details
          </h2>
          <button className="text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[131px] w-full">
            Cancel
          </button>
        </div>
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
