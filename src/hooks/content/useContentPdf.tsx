import {
  SystemSetting,
  getTemplateSettings,
  readEmailSettings,
  readSystemSettings,
} from "@/api/slices/settingSlice/settings";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { EmailTemplate } from "@/types/settings";
import { ContentHeaderProps, TemplateType } from "@/types";
import { readContentDetails } from "@/api/slices/content/contentSlice";

export const useContentPdf = () => {
  const [contentData, setContentData] = useState<ContentHeaderProps>();
  const [templateSettings, setTemplateSettings] = useState<TemplateType | null>(
    null
  );

  const [emailTemplateSettings, setEmailTemplateSettings] =
    useState<EmailTemplate | null>(null);
  const [systemSetting, setSystemSettings] = useState<SystemSetting | null>(
    null
  );

  const { loading, contentDetails } = useAppSelector((state) => state.content);

  const dispatch = useAppDispatch();

  const router = useRouter();
  const { contentID } = router.query;

  useEffect(() => {
    (async () => {
      if (contentID) {
        const [template, emailTemplate, contentData, settings] =
          await Promise.all([
            dispatch(getTemplateSettings()),
            dispatch(readEmailSettings()),
            dispatch(readContentDetails({ params: { filter: contentID } })),
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
            aggrementDetails: contentDetails?.confirmationContent?.description,
          };

          setContentData(formatData);
        }
      }
    })();
  }, [contentID]);

  return {
    contentData,
    templateSettings,
    emailTemplateSettings,
    loading,
    systemSetting,
    contentDetails,
  };
};
