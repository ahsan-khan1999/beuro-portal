import { Locale } from "@/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ThankYouPage } from "@/components/ThankYouPage";

export default function () {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ThankYouPage />
    </div>
  );
}

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
