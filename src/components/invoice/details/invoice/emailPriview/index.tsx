import React from "react";
import EmailCard from "./EmailCard";
import Page1 from "./pages/Page1";
import EmailButtons from "./EmailButtons";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";

const EmailPriview = () => {
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
      <div className="mt-[30px]">
        <Page3 />
        <EmailButtons />
      </div>
    </div>
  );
};

export default EmailPriview;
