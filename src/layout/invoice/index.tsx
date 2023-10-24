import { detailScreenCardsLayout } from "@/types";
import React from "react";

const InvoiceCardLayout = ({ children }: detailScreenCardsLayout) => {
  return (
    <div className="rounded-md border-none bg-white p-5 border w-full h-fit">
      {children}
    </div>
  );
};

export default InvoiceCardLayout;