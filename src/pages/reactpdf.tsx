import { ReactPdf } from "@/components/reactPdf/react-pdf";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);


const A4_WIDTH = 595; // 72dpi
const A4_HEIGHT = 842; // 72dpi

export default function Home() {
  return (
    // <PDFViewer width={A4_WIDTH} height={A4_HEIGHT}>
      <ReactPdf />
    // </PDFViewer>
  );
}
