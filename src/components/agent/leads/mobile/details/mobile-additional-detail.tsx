import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
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
      {additional ? (
        <p
          className="text-[#656565] text-xs font-medium"
          dangerouslySetInnerHTML={{ __html: additional }}
        />
      ) : (
        <NoDataEmptyState
          containerClassName="py-5"
          imgClassName="w-14 h-14"
          textClassName="text-lg"
        />
      )}
    </div>
  );
};
