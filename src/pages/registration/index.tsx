import DescriptionSection from "@/components/loginAndRegister/DescriptionSection";
import Register from "@/components/loginAndRegister/registration/Register";
import { LoginFlowCard } from "@/layout/LoginFlowCard";

const Index = () => {
  return (
    <LoginFlowCard>
      <Register />
      <DescriptionSection />
    </LoginFlowCard>
  );
};

export default Index;
