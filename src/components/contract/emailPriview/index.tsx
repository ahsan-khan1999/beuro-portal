import React from "react";
import EmailCard from "./EmailCard";
import EmailHeader from "./EmailHeader";
import EmailFooter from "./EmailFooter";
import Page1 from "./pages/Page1";
import EmailButtons from "./EmailButtons";

const EmailPriview = () => {
  return (
    <div>
      <EmailCard />
      <div className="mt-[30px]">
        <EmailHeader />
        <Page1 />
        <EmailFooter />
        <EmailButtons />
      </div>
    </div>
  );
};

export default EmailPriview;
