import React from "react";
import { detailScreenCardsLayout } from "@/types";

const PdfCardLayout = ({ children }: detailScreenCardsLayout) => {
  return <div className="rounded-md bg-white p-5 w-full h-fit">{children}</div>;
};

export default PdfCardLayout;
