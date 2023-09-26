import DescriptionSection from "@/components/loginAndRegister/DescriptionSection";
import ResetPassword from "@/components/loginAndRegister/login/ResetPassword";
import { LoginFlowCard } from "@/layout/LoginFlowCard";
import React from "react";

const Index = () => {
  return (
    <LoginFlowCard>
      <ResetPassword />
      <DescriptionSection />
    </LoginFlowCard>
  );
};

export default Index;
