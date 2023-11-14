import DescriptionSection from "@/components/loginAndRegister/DescriptionSection";
import Register from "@/components/loginAndRegister/registration/Register";
import { LoginFlowCard } from "@/layout/LoginFlowCard";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from '@/types';
const Index = () => {
  return (
    <LoginFlowCard>
      <Register />
      <DescriptionSection />
    </LoginFlowCard>
  );
};

export default Index;
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
