import React from "react";
import PlanComp from "./PlanComp";
import UpgradeSection from "./UpgradeSection";
import PaymentHistory from "./PaymentHistory";

const Billing = ({ handleEditPayment }: { handleEditPayment: () => void }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-x-3">
        <div className="col-span-2">
          <PlanComp />
        </div>
        <div className="col-span-1">
          <UpgradeSection handleEditPayment={handleEditPayment}/>
        </div>
      </div>
      <PaymentHistory />
    </>
  );
};

export default Billing;
