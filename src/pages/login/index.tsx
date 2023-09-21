import DescriptionSection from "@/components/loginAndRegister/DescriptionSection";
import FormSection from "@/components/loginAndRegister/FormSection";
import React from "react";

const Index = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="mx-auto max-w-[1030px]    shadow-loginCard ">
        <div className="p-[14px] flex min-h-[749px] ">
          <FormSection heading="Sign in to Büro-365" name="login" />
          <DescriptionSection />
        </div>
      </div>
    </div>
  );
};

export default Index;
