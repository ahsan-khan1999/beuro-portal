import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "../DetailsData";
import SideCard from "../SideCard";
import useServiceDetail from "@/hooks/services/useServiceDetail";
import ServicesForm from "../ServicesForm";
import LoadingState from "@/base-components/loadingEffect/loading-state";

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
      <div className="w-full mt-8">
        {loading ? (
          <LoadingState />
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
      {/* <div className="xl:col-span-1">
          <SideCard />
        </div> */}

      {renderModal()}
    </Layout>
  );
};

export default ServicesDetails;
