import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "../DetailsData";
import useSupportDetail from "@/hooks/admin/support-request/useSupportDetail";
import SupportDetailsData from "./support-request-data";

const SupportRequestDetails = () => {
  const { supportDetail, handlePreviousClick } = useSupportDetail(true);

  return (
    <Layout>
      <DetailsCard>
        <DetailsData
          supportDetail={supportDetail}
          handlePreviousClick={handlePreviousClick}
        />
      </DetailsCard>
      <div className="flex mt-8">
        <SupportDetailsData supportDetail={supportDetail} />
      </div>
    </Layout>
  );
};

export default SupportRequestDetails;
