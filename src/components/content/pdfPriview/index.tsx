import React from "react";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import ContentCard from "../ContentCard";
import PdfButtons from "./PdfButtons";

const PdfPreview = () => {
  return (
    <div>
      <ContentCard />
      <div className="mt-[30px]">
        <Page1 />
      </div>

      <div className="mt-[30px]">
        <Page2 />
        <PdfButtons />
      </div>
    </div>
  );
};

export default PdfPreview;
