import React from "react";

const DetailsSwitchBtn = ({ switchDetails, setSwitchDetails }) => {
  return (
    <div className="flex gap-[2px]">
      <button
        className={`bg-white px-[55px] py-[12px] text-base font-medium border-b-[3px] ${
          switchDetails === "Invoice"
            ? " border-[#4A13E7] text-[#4A13E7]"
            : "border-transparent text-[#8F8F8F]"
        }`}
        onClick={() => setSwitchDetails("Invoice")}
      >
        Invoice
      </button>
      <button
        className={`bg-white px-[55px] py-[12px] text-base font-medium border-b-[3px] ${
          switchDetails === "Receipt"
            ? " border-[#4A13E7] text-[#4A13E7]"
            : "border-transparent text-[#8F8F8F]"
        }`}
        onClick={() => setSwitchDetails("Receipt")}
      >
        Receipt
      </button>
    </div>
  );
};

export default DetailsSwitchBtn;
