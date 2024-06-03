const ContentPdf = dynamic(
  () => import("@/components/reactPdf/content-pdf-preview"),
  {
    ssr: false,
  }
);

import dynamic from "next/dynamic";
import CustomLoader from "@/base-components/ui/loader/customer-loader";
import { useContentPdf } from "@/hooks/content/useContentPdf";

export const ContentPdfPriview = () => {
  const { loading, contentData } = useContentPdf();

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <div className="mt-5">
          <ContentPdf />
        </div>
      )}
    </>
  );
};
