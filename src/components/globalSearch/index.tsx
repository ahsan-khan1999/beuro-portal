import { useState } from "react";
import { GlobalCardDetails } from "./cardDetail/global-card-details";
import { SwitchTabs } from "./detail-tabs";
import GlobalSearchFilter from "./filters";
import { FiltersComponentProps } from "@/types";
import InvoiceDetailsTable from "../invoice/details/invoice/table";
import useInvoiceDetail from "@/hooks/invoice/useInvoiceDetail";
import ReceiptDetailsTable from "../invoice/details/receipt/table";
import { useEmptyStates } from "@/utils/hooks";
import { useTranslation } from "next-i18next";
import OffersDetailsTable from "./details/offers";
import useOffers from "@/hooks/offers/useOffers";
import ContractDetailsTable from "./details/contracts";

export const GlobalSearch = ({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) => {
  const { t: translate } = useTranslation();
  const [switchDetails, setSwitchDetails] = useState(
    `${translate("switch_tabs.offer")}`
  );

  const {
    collectiveInvoice,
    handlePaymentStatusUpdate,
    handleInvoiceStatusUpdate,
    collectiveReciept,
    handleInvoiceEdit,
    handleRecurringInvoiceEdit,
    loading,
  } = useInvoiceDetail();

  const { currentPageRows } = useOffers();

  const globalSearchComponent = {
    Offers: {
      comp: <OffersDetailsTable />,
      isData: currentPageRows?.length > 0,
    },
    Contracts: {
      comp: <ContractDetailsTable />,
      isData: currentPageRows?.length > 0,
    },
    invoice: {
      comp: (
        <InvoiceDetailsTable
          collectiveInvoice={collectiveInvoice}
          handleInvoiceStatusUpdate={handleInvoiceStatusUpdate}
          handlePaymentStatusUpdate={handlePaymentStatusUpdate}
          handleInvoiceEdit={handleInvoiceEdit}
          handleRecurringInvoiceEdit={handleRecurringInvoiceEdit}
        />
      ),
      isData: collectiveInvoice?.length > 0,
    },
    Receipt: {
      comp: (
        <ReceiptDetailsTable
          collectiveInvoice={collectiveReciept}
          handleInvoiceStatusUpdate={handleInvoiceStatusUpdate}
          handlePaymentStatusUpdate={handlePaymentStatusUpdate}
        />
      ),
      isData: collectiveReciept?.length > 0,
    },
  };

  const CurrentComponent = useEmptyStates(
    globalSearchComponent[switchDetails as keyof typeof globalSearchComponent]
      ?.comp,
    globalSearchComponent[switchDetails as keyof typeof globalSearchComponent]
      ?.isData,
    loading
  );

  return (
    <>
      <GlobalCardDetails translate={translate}/>
      <div className="flex flex-col xlg:flex-row xlg:justify-between xlg:items-center gap-y-4 mt-4 mb-5">
        <SwitchTabs
          switchDetails={switchDetails}
          setSwitchDetails={setSwitchDetails}
        />
        <GlobalSearchFilter
          filter={filter}
          setFilter={setFilter}
          handleFilterChange={handleFilterChange}
        />
      </div>
      {CurrentComponent}
    </>
  );
};
