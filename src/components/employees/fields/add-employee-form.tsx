import { Form } from "@/base-components/form/form";
import { BaseButton } from "@/base-components/ui/button/base-button";
import useEmployeeDetail from "@/hooks/employee/useEmployeeDetail";
import React from "react";

const AddEmployeeForm = ({ handleCancel }: { handleCancel: () => void }) => {
  const defaultClassName = "mt-5";
  const {
    fields,
    onSubmit,
    handleSubmit,
    errors,
    isUpdate,
    renderModal,
    translate,
  } = useEmployeeDetail(false);

  return (
    <div
      className={`rounded-md bg-white ${
        !isUpdate ? " border border-primary" : "border-none"
      } w-full h-fit`}
    >
      <div className="flex justify-between items-center bg-primary py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-xl font-medium">
          {translate("employees.add_new_employee")}
        </h2>

        <BaseButton
          buttonText={translate("employees.details.cancel_button")}
          onClick={handleCancel}
          containerClassName="flex items-center justify-center text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[161px] w-full"
        ></BaseButton>
      </div>
      <div className="pb-3 px-6">
        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          className={`${defaultClassName}`}
        />
      </div>
      {renderModal()}
    </div>
  );
};

export default AddEmployeeForm;
