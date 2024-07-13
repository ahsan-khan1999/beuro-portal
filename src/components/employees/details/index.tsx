import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "../DetailsData";
import useEmployeeDetail from "@/hooks/employee/useEmployeeDetail";
import EmployeeForm from "../EmployeeForm";
import CustomLoader from "@/base-components/ui/loader/customer-loader";

const EmploysDetails = () => {
  const {
    employeeDetails,
    handlePasswordReset,
    renderModal,
    isUpdate,
    setIsUpdate,
    fields,
    onSubmit,
    handleSubmit,
    errors,
    deleteHandler,
    loading,
  } = useEmployeeDetail(true);

  return (
    <Layout>
      <DetailsCard>
        <DetailsData
          date={employeeDetails?.creationDate}
          id={employeeDetails?.employeeID}
          name={employeeDetails?.createdBy}
          isUpdate={isUpdate}
          handleDelete={deleteHandler}
          refID={employeeDetails?.employeeID}
        />
      </DetailsCard>
      <div className="w-full mt-5">
        {loading ? (
          <CustomLoader />
        ) : (
          <EmployeeForm
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            handlePasswordReset={handlePasswordReset}
            fields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
          />
        )}
      </div>

      {renderModal()}
    </Layout>
  );
};

export default EmploysDetails;
