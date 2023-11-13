import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "../DetailsData";
import SideCard from "../SideCard";
import useServiceDetail from "@/hooks/services/useServiceDetail";
import ServicesForm from "../ServicesForm";

const ServicesDetails = () => {
  const {
    serviceDetail,
    isUpdate,
    setIsUpdate,
    fields,
    handleSubmit,
    onSubmit,
    errors,
  } = useServiceDetail(true);
  return (
    <Layout>
      <DetailsCard>
        <DetailsData serviceDetail={serviceDetail} isUpdate={isUpdate}/>
      </DetailsCard>
      <div className="flex mt-8">
        <ServicesForm
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          serviceDetail={serviceDetail}
          fields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
        <SideCard />
      </div>
    </Layout>
  );
};

export default ServicesDetails;
