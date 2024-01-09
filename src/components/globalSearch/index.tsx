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
import { TabsComponent } from "@/enums/global-search";

export const GlobalSearch = () => {
  const { t: translate } = useTranslation();
  const [switchDetails, setSwitchDetails] = useState(TabsComponent.offer);

  const {
    collectiveInvoice,
    handlePaymentStatusUpdate,
    handleInvoiceStatusUpdate,
    collectiveReciept,
    handleInvoiceEdit,
    handleRecurringInvoiceEdit,
    loading,
  } = useInvoiceDetail();

  const { currentPageRows, filter, setFilter, handleFilterChange } =
    useOffers();
  const globalSearchComponent = {
    [TabsComponent.offer]: {
      comp: <OffersDetailsTable />,
      isData: currentPageRows?.length > 0,
    },
    [TabsComponent.contract]: {
      comp: <ContractDetailsTable />,
      isData: currentPageRows?.length > 0,
    },
    [TabsComponent.invoices]: {
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
    [TabsComponent.receipt]: {
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
    globalSearchComponent[switchDetails]?.comp,
    globalSearchComponent[switchDetails]?.isData,
    loading
  );

  const handleSwitchDetail = (index: number) => {
    setSwitchDetails(index);
  };

  return (
    <>
      <GlobalCardDetails translate={translate} />
      <div className="flex flex-col xlg:flex-row xlg:justify-between xlg:items-center gap-y-4 mt-4 mb-5">
        <SwitchTabs
          switchDetails={switchDetails}
          onSwitchDetail={handleSwitchDetail}
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
