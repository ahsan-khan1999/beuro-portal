import DescriptionSection from "@/components/loginAndRegister/DescriptionSection";
import ForgetPasswordEmail from "@/components/loginAndRegister/login/ForgetPasswordEmail";
import { LoginFlowCard } from "@/layout/LoginFlowCard";
import React from "react";

const Index = () => {
  return (
    <LoginFlowCard>
      <ForgetPasswordEmail />
      <DescriptionSection />
    </LoginFlowCard>
  );
};

export default Index;
