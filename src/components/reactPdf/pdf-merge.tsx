import CustomLoader from "@/base-components/ui/loader/customer-loader";
import { useEffect } from "react";

export const Merger = ({
  mergedPdfFileUrl,
  isPdfRendering,
}: {
  mergedPdfFileUrl: string | null;
  isPdfRendering?: boolean;
}) => {
  return isPdfRendering ? (
    <CustomLoader />
  ) : (
    mergedPdfFileUrl && (
      // <iframe
      //   height="670"
      //   src={mergedPdfFileUrl}
      //   title="Merged PDF Document"
      //   width="100%"
      //   style={{ border: "none" }}
      // />

      <embed
        src={mergedPdfFileUrl}
        width={"100%"}
        title="PDF"
        id="downloadButton"
        style={{ height: "100vh" }}
      />
    )
  );
};
