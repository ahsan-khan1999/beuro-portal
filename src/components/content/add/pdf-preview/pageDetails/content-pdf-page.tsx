import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { pdfDateFormat } from "@/utils/utility";
import { ContentPdfHeader } from "./content-pdf-header";
import { Footer } from "@/components/pdf/footer";
import { ContentPdfDescription } from "./content-pdf-description";
import { ContentPdfPageProps } from "@/types/content";

export const ContentPdfPage = ({
  aggrementDetails,
  currPage,
  emailTemplateSettings,
  footerDetails,
  headerDetails,
  systemSettings,
  templateSettings,
  totalPages,
}: ContentPdfPageProps) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const currentDate = new Date().toString();
  const date = pdfDateFormat(currentDate, router.locale as string);

  return (
    <>
      <ContentPdfHeader {...headerDetails} />
      <div className="px-[80px] flex flex-col bg-white pb-[50px] pt-10">
        <ContentPdfDescription aggrementDetails={aggrementDetails} />

        <div className="flex gap-x-[103px] mt-4">
          <div className="h-[223.656px] flex flex-col justify-between">
            <div className="pt-5">
              <span className="text-[#000] text-sm font-medium">
                {translate("pdf.validate_heading")}:
              </span>

              <p className="text-[#000] text-sm font-normal">
                {translate("pdf.validate_des")}
              </p>
            </div>
            <p className="text-[18px] text-black font-medium pb-[43px]">
              {translate("pdf.share_des")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-[103px] mt-4 items-center">
          <div className="flex flex-col">
            <span className="font-medium text-sm mb-2">{date}</span>
            <hr className="mb-[17px]" />
            <span className="text-sm text-black font-normal">
              {translate("pdf.date")}
            </span>
          </div>
          <div className="flex flex-col gap-y-[18px] mt-[26px]">
            <hr />
            <span className="text-sm text-black font-normal">
              {translate("pdf.signature")}
            </span>
          </div>
        </div>
      </div>

      <Footer
        {...footerDetails}
        columnSettings={templateSettings}
        totalPages={totalPages}
        currPage={currPage}
        emailTemplateSettings={emailTemplateSettings}
      />
    </>
  );
};
