import { ContentHeaderProps, TemplateType } from "@/types";
import { ContentPdfHeader } from "./content-pdf-header";
import { EmailTemplate } from "@/types/settings";
import { Footer } from "@/components/pdf/footer";

export interface PdfFirstPageProps {
  pdfData: ContentHeaderProps | undefined;
  emailTemplateSettings: EmailTemplate | null | undefined;
  templateSettings: TemplateType | null;
}

export const PdfFirstPage = ({
  pdfData,
  emailTemplateSettings,
  templateSettings,
}: PdfFirstPageProps) => {
  return (
    <div className="border border-[#404F6A] rounded-lg">
      <ContentPdfHeader
        {...pdfData?.headerDetails}
        emailTemplateSettings={emailTemplateSettings}
      />

      <Footer
        {...pdfData?.footerDetails}
        columnSettings={templateSettings}
        totalPages={1}
        currPage={1}
        emailTemplateSettings={emailTemplateSettings}
      />
    </div>
  );
};
