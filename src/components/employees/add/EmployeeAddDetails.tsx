import { Form } from "@/base-components/form/form";
import { useEmployeeAddDetails } from "@/hooks/employee/useEmployeeAddDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const EmployeeAddDetails = ({ routeHandler, linkSendHandler }: { routeHandler: Function, linkSendHandler: Function }) => {
  const defaultClassName = "mt-[30px]  ";
  const { fields, onSubmit, handleSubmit, errors, error } =
  useEmployeeAddDetails(linkSendHandler);
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-[26px] border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">
          Employees Details
        </h2>
        <button
          onClick={() => routeHandler()}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7]  px-9"
        >
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
  );
};

export default EmployeeAddDetails;
