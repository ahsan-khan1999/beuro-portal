import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";
import { DocumentViewer } from "@/components/DocumentViewer";

export default function () {
  return <DocumentViewer />;
}

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
