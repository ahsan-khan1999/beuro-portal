import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";
import SignPdfPreview from "@/components/offers/pdfPriview/sign-pdf-preview";

export default function () {
  return <SignPdfPreview />;
}

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
