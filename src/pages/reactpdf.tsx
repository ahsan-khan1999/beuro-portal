// import { ReactPdf } from "@/components/reactPdf/react-pdf";
// import dynamic from "next/dynamic";
// import View from '@/components/reactPdf/pdf-view';

// // const PDFViewer = dynamic(
// //   () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
// //   { ssr: false }
// // );

// const A4_WIDTH = 595; // 72dpi
// const A4_HEIGHT = 842; // 72dpi

// export default function Home() {
//   return (
//     // <PDFViewer width={A4_WIDTH} height={A4_HEIGHT}>
//       <View />
//     // </PDFViewer>
//   );
// }

import { DownloadablePdf } from "@/components/reactPdf/downloadable-pdf";
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
