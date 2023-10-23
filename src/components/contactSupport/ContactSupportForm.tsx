import { updateModalType } from "@/api/slices/globalSlice/global";
import { Form } from "@/base-components/form/form";
import RequestSubmitted from "@/base-components/ui/modals1/RequestSubmitted";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppSelector } from "@/hooks/useRedux";
import { userContactSupport } from "@/hooks/userContactSupport";
import FormCard from "@/layout/customers/FormCard";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const ContactSupportForm = () => {
  const defaultClassName = "mt-[30px] ";
  const { fields, control, onSubmit, handleSubmit, errors, error } =
    userContactSupport();

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.REQUEST_SUBMITTED]: <RequestSubmitted onClose={onClose} />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  useEffect(() => {
    dispatch(updateModalType(ModalType.REQUEST_SUBMITTED));
  }, []);

  return (
    <>
      <FormCard>
        <div className="flex justify-between items-center pb-[26px] border-b border-black border-opacity-20">
          <h2 className="text-[#393939] text-lg font-medium">
            Submit your request
          </h2>
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

export default ContactSupportForm;
