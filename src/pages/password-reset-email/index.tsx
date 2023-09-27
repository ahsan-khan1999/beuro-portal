import EmailConfirmation from "@/base-components/ui/modals/EmailConfirmation";
import PasswordResetEmail from "@/base-components/ui/modals/PasswordResetEmail";
import React from "react";

const Index = () => {
  return (
    <>
      <PasswordResetEmail />
      <EmailConfirmation />;
    </>
  );
};

export default Index;
