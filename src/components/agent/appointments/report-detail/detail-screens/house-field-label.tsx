import { useTranslation } from "next-i18next";

export const HouseFieldLabel = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xlg:grid-cols-3 md:gap-x-[71px]">
      <div className="flex items-center justify-between mb-[14px]">
        <span className="text-base font-medium text-[#1C1F35]">
          {translate("agent.house_detail_fields.item")}
        </span>
        <span className="text-base font-medium text-[#1C1F35]">
          {translate("agent.house_detail_fields.qty")}
        </span>
      </div>
      <div className="hidden md:flex items-center justify-between mb-[14px]">
        <span className="text-base font-medium text-[#1C1F35]">
          {translate("agent.house_detail_fields.item")}
        </span>
        <span className="text-base font-medium text-[#1C1F35]">
          {translate("agent.house_detail_fields.qty")}
        </span>
      </div>
      <div className="hidden xlg:flex items-center justify-between mb-[14px]">
        <span className="text-base font-medium text-[#1C1F35]">
          {translate("agent.house_detail_fields.item")}
        </span>
        <span className="text-base font-medium text-[#1C1F35]">
          {translate("agent.house_detail_fields.qty")}
        </span>
      </div>
    </div>
  );
};
