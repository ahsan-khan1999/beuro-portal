import { useTranslation } from "next-i18next";

export const ProcutItemHeader = ({ isDiscount }: { isDiscount?: boolean }) => {
  const { t: translate } = useTranslation();
  return (
    <div className="bg-[#40506A] py-[8px] rounded-[4px] mb-3 pl-3">
      <div className="grid grid-cols-3 items-center">
        <span className="col-span-1 text-white text-sm font-medium">
          {translate("pdf.service")}
        </span>
        <span className="col-span-1 text-white text-sm font-medium">
          {translate("pdf.description")}
        </span>
        <div className="col-span-1 flex space-x-2 items-center pr-[44px] w-full">
          <span className="text-sm font-medium text-white min-w-[50px]">
            {translate("pdf.count")}
          </span>
          <span className="text-sm font-medium text-white min-w-[50px]">
            {translate("pdf.unit")}
          </span>
          <span className="text-sm font-medium text-white min-w-[50px]">
            {translate("pdf.price")}
          </span>
          {isDiscount && (
            <span className="text-sm font-medium text-white w-[62px]">
              {translate("pdf.discount")}
            </span>
          )}
          <span className="text-sm font-medium text-white min-w-[50px]">
            {translate("pdf.total")}
          </span>
        </div>
      </div>
    </div>
  );
};
