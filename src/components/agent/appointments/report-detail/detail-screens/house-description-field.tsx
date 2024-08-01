import { useTranslation } from "next-i18next";

export const HouseDescriptionField = ({
  descriptionValue,
}: {
  descriptionValue: string;
}) => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex flex-col gap-y-2 pt-[14px] w-full truncate">
      <p className="text-sm font-medium text-[#344054]">
        {translate("agent.house_detail_fields.remark")}
      </p>
      <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[64px] min-w-[54px] truncate">
        {descriptionValue}
      </p>
    </div>
  );
};
