import DescriptionSection from "@/components/loginAndRegister/DescriptionSection";
import Login from "@/components/loginAndRegister/login/Login";
import { LoginFlowCard } from "@/layout/LoginFlowCard";
import React, { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale, User } from "@/types";
import { useRouter } from "next/router";
import { staticEnums } from "@/utils/static";
import { getUser } from "@/utils/auth.util";
import { isJSON } from "@/utils/functions";

export default function Home() {
  const user: User = isJSON(getUser());
  const router = useRouter();

  useEffect(() => {
    if (user && staticEnums["User"]["role"][user?.role] === 0)
      router.push("/admin/dashboard");

    if (user && staticEnums["User"]["role"][user?.role] === 3)
      router.push("/agent/dashboard");

    if (
      user &&
      user?.isEmailVerified &&
      user?.isProfileComplete &&
      (staticEnums["User"]["role"][user?.role] === 1 ||
        staticEnums["User"]["role"][user?.role] === 2)
    )
      router.push("/dashboard");
  }, []);

  return (
    <LoginFlowCard>
      <Login />
      <DescriptionSection />
    </LoginFlowCard>
  );
}

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
