import LoadingState from "@/base-components/loadingEffect/loading-state";
import { useEffect } from "react";

export const Merger = ({
  mergedPdfFileUrl,
  isPdfRendering,
}: {
  mergedPdfFileUrl: string | null;
  isPdfRendering?: boolean;
}) => {
  useEffect(() => {
    const downloadButton = document.getElementById("download");
    if (downloadButton) {
      downloadButton.setAttribute("download", "desiredFilename.pdf");
    }
  }, []);

  return isPdfRendering ? (
    <LoadingState />
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
        height={"700px"}
        title="PDF"
      />
    )
  );
};
