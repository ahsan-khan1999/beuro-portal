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
      <div className="flex flex-col gap-y-[30px] mt-[30px] h-[650px] overflow-y-scroll">
        <Page1 />
        <Page2 />
        <PdfButtons />
      </div>
      {/* <Pdf /> */}
    </Layout>
  );
};

export default PdfPriview;
