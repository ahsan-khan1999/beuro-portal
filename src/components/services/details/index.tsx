import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import ServicesForm from "../ServicesForm";
import DetailsData from "../DetailsData";
import useServiceDetail from "@/hooks/services/useServiceDetail";
import CustomLoader from "@/base-components/ui/loader/customer-loader";

const ServicesDetails = () => {
  const {
    serviceDetails,
    isUpdate,
    setIsUpdate,
    fields,
    handleSubmit,
    onSubmit,
    errors,
    deleteHandler,
    renderModal,
    loading,
  } = useServiceDetail(true);

  return (
    <Layout>
      <DetailsCard>
        <DetailsData
          serviceDetail={serviceDetails}
          isUpdate={isUpdate}
          deleteHandler={deleteHandler}
        />
      </DetailsCard>
      <div className="w-full mt-5">
        {loading ? (
          <CustomLoader />
        ) : (
          <ServicesForm
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            serviceDetail={serviceDetails}
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

export default ServicesDetails;
