import LoadingState from "@/base-components/loadingEffect/loading-state";

export const Merger = ({
  mergedPdfFileUrl,
  isPdfRendering,
}: {
  mergedPdfFileUrl: string | null;
  isPdfRendering?: boolean;
}) => {
  // const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       let blobArray: Blob[] = [];
  //       if (data && emailTemplateSettings && templateSettings) {
  //         const localPdfBlob = await reactPdf(
  //           <PdfFile {...{ data, emailTemplateSettings, templateSettings }} />
  //         ).toBlob();
  //         blobArray.push(localPdfBlob);
  //       }
  //       if (remoteFileBlob) {
  //         blobArray.push(remoteFileBlob);
  //       }
  //       if (blobArray.length > 0) {
  //         const mergedPdfBytes = await mergePDFs(blobArray, "fileName");
  //         const url = URL.createObjectURL(
  //           new Blob([mergedPdfBytes], { type: "application/pdf" })
  //         );
  //         setMergedPdfUrl(url);
  //       }
  //     } catch (err) {
  //       console.error("Error merging PDFs:", err);
  //     }
  //   })();

  //   return () => {
  //     mergedPdfUrl && URL.revokeObjectURL(mergedPdfUrl);
  //   };
  // }, [emailTemplateSettings, templateSettings, data, remoteFileBlob]);

  return isPdfRendering ? (
    <LoadingState />
  ) : (
    mergedPdfFileUrl && (
      <iframe
        height="670"
        src={mergedPdfFileUrl}
        title="Merged PDF Document"
        width="100%"
        style={{ border: "none" }}
      />
    )
  );
};
