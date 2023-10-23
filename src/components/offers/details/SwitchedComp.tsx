import React, { useState } from "react";
import DetailsSwitchBtn from "./DetailsSwitchBtn";
import Activity from "./activity";
import Discounts from "./discount";

const SwitchedComp = () => {
  const [switchDetails, setSwitchDetails] = useState("Activity");

  return (
    <>
      <DetailsSwitchBtn
        switchDetails={switchDetails}
        setSwitchDetails={setSwitchDetails}
      />

      {switchDetails.includes("Activity") ? <Activity /> : <Discounts />}
    </>
  );
};

export default SwitchedComp;
