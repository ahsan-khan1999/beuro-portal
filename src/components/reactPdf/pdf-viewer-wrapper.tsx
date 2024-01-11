import dynamic from "next/dynamic";

const PDFViewerNoSSR = dynamic(() => import("./pdf-layout"), { ssr: false });
const o: any = {};
export const PDFViewer = () => {
  return (
    <></>
  );
};
