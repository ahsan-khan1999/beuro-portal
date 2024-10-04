import CustomLoader from "@/base-components/ui/loader/customer-loader";

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
