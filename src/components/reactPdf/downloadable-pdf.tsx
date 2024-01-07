import dynamic from "next/dynamic";

const Downloaded = dynamic(() => import("./pdf-download"), { ssr: false });

export const DownloadablePdf = () => {
  return <Downloaded />;
};
