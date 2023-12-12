import React from "react";
import PdfCard from "./PdfCard";
import Page1 from "./pages/Page1";
import PdfButtons from "./PdfButtons";
import Page2 from "./pages/Page2";
import { Layout } from "@/layout";
import { Pdf } from "@/components/pdf/pdf";

const PdfPriview = () => {
  return (
    <Layout>
      <PdfCard />
      {/* <div className="mt-[30px]">
        <Page1 />
      </div>

      <div className="mt-[30px]">
        <Page2 />
        <PdfButtons />
      </div> */}
      <Pdf />
    </Layout>
  );
};

export default PdfPriview;
