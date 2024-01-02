import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "../DetailsData";
import CustomerForm from "../CustomerForm";
import useCustomerDetail from "@/hooks/customer/useCustomerDetail";
import { formatDateTimeToDate } from "@/utils/utility";
import LoadingState from "@/base-components/loadingEffect/loading-state";

const CustomerDetails = () => {
  const {
    customerDetail,
    isUpdate,
    setIsUpdate,
    fields,
    handleSubmit,
    onSubmit,
    errors,
    handlePreviousClick,
    deleteHandler,
    renderModal,
    loading,
  } = useCustomerDetail(true);

  return (
    <Layout>
      <DetailsCard>
        <DetailsData
          date={formatDateTimeToDate(customerDetail?.createdAt)}
          id={customerDetail?.refID}
          name={customerDetail?.fullName}
          handlePreviousClick={handlePreviousClick}
          handleDelete={deleteHandler}
        />
      </DetailsCard>
      {loading ? (
        <LoadingState />
      ) : (
        <div className="w-full mt-8 ">
          <CustomerForm
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            customerDetail={customerDetail}
            fields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
          />
        </div>
      )}
      {renderModal()}
    </Layout>
  );
};

export default CustomerDetails;
