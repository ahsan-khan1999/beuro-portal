import React from "react";
import EmailCard from "./EmailCard";
import EmailHeader from "./EmailHeader";
import EmailFooter from "./EmailFooter";
import Page1 from "./pages/Page1";
import EmailButtons from "./EmailButtons";
import Page2 from "./pages/Page2";

const EmailPriview = () => {
  return (
    <div>
      <EmailCard />
      <div className="mt-[30px]">
        <EmailHeader />
        <Page1 />
        <EmailFooter />
        
      </div>

      <div className="mt-[30px]">
        <EmailHeader />
        <Page2 />
        <EmailFooter />
        <EmailButtons />
      </div>
    </div>
  );
};

export default EmailPriview;
