import React from "react";
import EmailCard from "./PdfCard";
import Page1 from "./pages/Page1";
import EmailButtons from "./PdfButtons";
import Page2 from "./pages/Page2";
import { Pdf } from "@/components/pdf/pdf";
const PdfPriview = () => {
  return (
    <div className="">
      <EmailCard />
      <div className="my-5">
        <Pdf />
      </div>
    </div>
  );
};

export default PdfPriview;
