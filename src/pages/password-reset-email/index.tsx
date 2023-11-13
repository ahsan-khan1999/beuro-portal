import EmailConfirmation from "@/base-components/ui/modals/EmailConfirmation";
import PasswordResetEmail from "@/base-components/ui/modals/PasswordResetEmail";
import React from "react";
let data = {
  heading: "We send an email to rest password",
  description: " We have sent you the link to reset the password by e-mail! Please take a second to make sure we have your correct email address"
}
const Index = () => {
  return (
    <>
      <PasswordResetEmail data={data}/>
    </>
  );
};

export default Index;
