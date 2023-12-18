import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React, { useState } from "react";
import DetailsData from "../DetailsData";

import useCustomerDetail from "@/hooks/admin/customer/useCustomerDetail";
import CustomerDetailsData from "./customer-details-data";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useRouter } from "next/router";
import WarningModal from "@/base-components/ui/modals1/WarningModal";
import { useTranslation } from "next-i18next";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";

const CustomerDetails = () => {
  const {
    customerDetail,
    translate,
    isCustomerFree,
    modal,
    handleAreYouSure,
    handleCreated,
    onClose,
    route,
    handlePreviousClick,
  } = useCustomerDetail(true);

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.ARE_YOU_SURE_CUSTOMER]: (
      <WarningModal handleCreated={handleCreated} onClose={onClose} />
    ),
    [ModalType.CREATION]: (
      <CreationCreated
        heading={translate("common.are_you_sure_modal.success")}
        subHeading={translate(
          "admin.customers_details.card_content.customer_free"
        )}
        onClose={onClose}
        route={route}
      />
    ),
  };

  return (
    <>
      <Layout>
        <DetailsCard>
          <DetailsData
            customerDetail={customerDetail}
            handlePreviousClick={handlePreviousClick}
            handleAreYouSure={handleAreYouSure}
            isCustomerFree={isCustomerFree}
          />
        </DetailsCard>
        <div className="flex mt-8">
          <CustomerDetailsData customerDetail={customerDetail} />
        </div>
      </Layout>
      {renderModal()}
    </>
  );
};

export default CustomerDetails;
