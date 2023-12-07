import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "../DetailsData";
import SideCard from "../SideCard";
import useEmployeeDetail from "@/hooks/employee/useEmployeeDetail";
import EmployeeForm from "../EmployeeForm";

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
    deleteHandler
  } = useEmployeeDetail(true);

  return (
    <>
      <Layout>
        <DetailsCard>
          <DetailsData
            date={employeeDetails?.creationDate}
            id={employeeDetails?.employeeID}
            name={employeeDetails?.createdBy}
            isUpdate={isUpdate}
            handleDelete={deleteHandler}
          />
        </DetailsCard>
<<<<<<< HEAD
        <div className="flex mt-8">
          <EmployeeForm
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            handlePasswordReset={handlePasswordReset}
            fields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
          />
          <SideCard />
=======
        <div className="grid grid-cols-1 mt-8 gap-x-8 gap-y-5 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <EmployeeForm
              isUpdate={isUpdate}
              handlePasswordReset={handlePasswordReset}
              setIsUpdate={setIsUpdate}
              employeeDetail={employeeDetail}
              fields={fields}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
            />
          </div>
          <div className="xl:col-span-1">
            <SideCard />
          </div>
>>>>>>> 3cdd1e136fc5c84c6855aae82e5b40b61be4bd16
        </div>
      </Layout>

      {renderModal()}
    </>
  );
};

export default EmploysDetails;
