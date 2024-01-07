import dynamic from "next/dynamic";

const PDFViewerNoSSR = dynamic(() => import("./pdf-layout"), { ssr: false });

export const PDFViewer = () => {
  return <PDFViewerNoSSR />;
};
