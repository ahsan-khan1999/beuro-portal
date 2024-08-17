import { combineClasses } from "@/utils/utility";
import { useTranslation } from "next-i18next";

export const LeadMobileAdditionalDetail = ({
  additional,
}: {
  additional: string;
}) => {
  const { t: translate } = useTranslation();
  const defaultClasses = combineClasses("p-4 bg-white rounded-b-lg");

  return (
    <div
      className={defaultClasses}
      id={translate("leads.tabs_headings.customer")}
    >
      <p
        className="text-[#656565] text-xs font-medium"
        dangerouslySetInnerHTML={{ __html: additional }}
      />
    </div>
  );
};
