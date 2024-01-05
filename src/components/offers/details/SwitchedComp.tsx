import React, { useState } from "react";
import DetailsSwitchBtn from "./DetailsSwitchBtn";
import Activity from "./activity";
import Discounts from "./discount";

const SwitchedComp = ({ handleUpdateDiscount }: { handleUpdateDiscount: (discount: number) => void }) => {
  const [switchDetails, setSwitchDetails] = useState("Activity");

  return (
    <>
      <DetailsSwitchBtn
        switchDetails={switchDetails}
        setSwitchDetails={setSwitchDetails}
      />

      {switchDetails.includes("Activity") ? <Activity /> : <Discounts handleUpdateDiscount={handleUpdateDiscount} />}
    </>
  );
};

export default SwitchedComp;
