import React from "react";
import EmailCard from "./PdfCard";
import Page1 from "./pages/Page1";
import EmailButtons from "./PdfButtons";
import Page2 from "./pages/Page2";
const PdfPriview = () => {
  return (
    <div>
      <EmailCard />
      <div className="mt-[30px]">
        <Page1 />
      </div>

      <div className="mt-[30px]">
        <Page2 />
        {/* <EmailButtons /> */}
      </div>
    </div>
  );
};

export default PdfPriview;
