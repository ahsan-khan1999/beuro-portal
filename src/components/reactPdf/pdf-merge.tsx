import LoadingState from "@/base-components/loadingEffect/loading-state";

export const Merger = ({
  mergedPdfFileUrl,
  isPdfRendering,
}: {
  mergedPdfFileUrl: string | null;
  isPdfRendering?: boolean;
}) => {
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

      <embed src={mergedPdfFileUrl} width={"100%"} height={"700px"} />
    )
  );
};
