import LoadingState from "@/base-components/loadingEffect/loading-state";

export const RenderPdf = ({ mergedPdfUrl }: { mergedPdfUrl: string }) => {
  return (
    <>
      <iframe
        height="1000"
        src={mergedPdfUrl || ""}
        width="100%"
        style={{ border: "none" }}
      />
    </>
  );
};
