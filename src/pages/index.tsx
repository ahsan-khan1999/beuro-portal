import EmailConfirmation from "@/base-components/ui/modals/EmailConfirmation";
import DescriptionSection from "@/components/loginAndRegister/DescriptionSection";
import Login from "@/components/loginAndRegister/login/Login";
import { LoginFlowCard } from "@/layout/LoginFlowCard";
import React from "react";

// import Table from "@/base-components/table";

export default function Home() {
  return (
    <LoginFlowCard>
      <Login />
      <DescriptionSection />
    </LoginFlowCard>
  );
}
