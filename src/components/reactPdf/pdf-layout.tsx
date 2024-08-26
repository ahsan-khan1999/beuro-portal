import { Merger } from "./pdf-merge";

const PDF = ({
  mergedPdfFileUrl,
  isPdfRendering,
}: {
  mergedPdfFileUrl: string | null;
  isPdfRendering?: boolean;
}) => {
  return (
    <Merger
      isPdfRendering={isPdfRendering}
      mergedPdfFileUrl={mergedPdfFileUrl}
    />
  );
};

export default PDF;
