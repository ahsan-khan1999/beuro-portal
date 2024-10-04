import React from "react";
import PlanComp from "./PlanComp";
import UpgradeSection from "./UpgradeSection";
import PaymentHistory from "./PaymentHistory";
import TableLayout from "@/layout/TableLayout";

const Billing = ({ handleEditPayment }: { handleEditPayment: () => void }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-x-3 gap-y-3 xl:gap-y-0">
        <div className="col-span-3 xl:col-span-2 ">
          <PlanComp />
        </div>

        <div className="col-span-3 xl:col-span-1">
          <UpgradeSection handleEditPayment={handleEditPayment} />
        </div>
      </div>
      <TableLayout>
        <PaymentHistory />
      </TableLayout>
    </>
  );
};

export default Billing;
