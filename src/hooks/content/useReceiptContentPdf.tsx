import {
  SystemSetting,
  getTemplateSettings,
  readEmailSettings,
  readSystemSettings,
} from "@/api/slices/settingSlice/settings";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { EmailTemplate } from "@/types/settings";
import { ContentHeaderProps, TemplateType } from "@/types";
import { readContentDetails } from "@/api/slices/content/contentSlice";

export const useReceiptContentPdf = () => {
  const [contentData, setContentData] = useState<ContentHeaderProps>();
  const [templateSettings, setTemplateSettings] = useState<TemplateType | null>(
    null
  );

  const [emailTemplateSettings, setEmailTemplateSettings] =
    useState<EmailTemplate | null>(null);
  const [systemSetting, setSystemSettings] = useState<SystemSetting | null>(
    null
  );

  const {
    auth: { user },
    content: { loading, contentDetails },
    global: { currentLanguage },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      // if (contentID) {
      const [template, emailTemplate, contentData, settings] =
        await Promise.all([
          dispatch(getTemplateSettings()),
          dispatch(readEmailSettings()),
          dispatch(readContentDetails({ params: { filter: "" } })),
          dispatch(readSystemSettings()),
        ]);
      if (template?.payload?.Template) {
        const {
          firstColumn,
          fourthColumn,
          isFirstColumn,
          isFourthColumn,
          isSecondColumn,
          isThirdColumn,
          secondColumn,
          thirdColumn,
          order,
        }: TemplateType = template.payload.Template;

        setTemplateSettings(() => ({
          firstColumn,
          secondColumn,
          thirdColumn,
          fourthColumn,
          isFirstColumn,
          isFourthColumn,
          isSecondColumn,
          isThirdColumn,
          order,
        }));
      }
      if (emailTemplate?.payload) {
        setEmailTemplateSettings({
          logo: emailTemplate?.payload?.logo,
          FooterColour: emailTemplate?.payload?.FooterColour,
          email: emailTemplate?.payload?.email,
          mobileNumber: emailTemplate?.payload?.mobileNumber,
          phoneNumber: emailTemplate?.payload?.phoneNumber,
          textColour: emailTemplate?.payload?.textColour,
        });
      }

      if (settings?.payload?.Setting) {
        setSystemSettings({ ...settings?.payload?.Setting });
      }
      if (contentData?.payload) {
        let formatData: ContentHeaderProps = {
          headerDetails: {
            offerNo: ": R-2508-2",
            companyName: "",
            offerDate: "26. June 2024",
            createdBy: "Abdul rahman",
            logo: emailTemplate?.payload?.logo,
            fileType: "receipt",
            emailTemplateSettings: emailTemplate?.payload,
            isReverseLogo: template.payload.Template?.order,
          },
          footerDetails: {
            firstColumn: {
              companyName: user?.company?.companyName,
              email: user?.email,
              phoneNumber: user?.company?.phoneNumber,
              taxNumber: user?.company?.taxNumber,
              website: user?.company?.website,
            },
            secondColumn: {
              address: {
                postalCode: user?.company?.address?.postalCode,
                streetNumber: user?.company?.address?.streetNumber,
              },
              bankDetails: {
                accountNumber: user?.company?.bankDetails?.accountNumber,
                bankName: user?.company?.bankDetails?.bankName,
                ibanNumber: user?.company?.bankDetails?.ibanNumber,
              },
            },
            thirdColumn: {
              row1: "Standorte",
              row2: "bern-Solothurn",
              row3: "Aargau-Luzern",
              row4: "Basel-Zürich",
              row5: "",
            },
            fourthColumn: {},
            columnSettings: null,
            currPage: 1,
            totalPages: 10,
          },
          aggrementDetails: contentDetails?.receiptContent?.description,
        };

        setContentData(formatData);
      }
      // }
    })();
  }, []);

  return {
    contentData,
    templateSettings,
    emailTemplateSettings,
    loading,
    systemSetting,
    contentDetails,
    currentLanguage,
  };
};
