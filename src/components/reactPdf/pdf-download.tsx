import dynamic from "next/dynamic";
import { ReactPdf } from "./react-pdf";

// Dynamically import BlobProvider with SSR disabled
const BlobProvider = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.BlobProvider),
  { ssr: false }
);

export const DownloadPdf = () => {
  return (
    <BlobProvider document={<ReactPdf />}>
      {({ url, loading, error }) => {
        if (loading) {
          return <div>Loading...</div>;
        }

        if (error) {
          console.error(error);
          return <div>Error generating PDF</div>;
        }

        return (
          <a href={url || "#"} target="_blank" rel="noopener noreferrer">
            Download PDF
          </a>
        );
      }}
    </BlobProvider>
  );
};
