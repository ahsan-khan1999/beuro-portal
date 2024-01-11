import { PDFViewer } from "@/components/reactPdf/pdf-viewer-wrapper";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";
export default function Home() {
  return (
    <div>
      <PDFViewer />
      {/* <DownloadablePdf /> */}
    </div>
  );
}


export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
