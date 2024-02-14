import { useTranslation } from "next-i18next";

export const ProcutItemHeader = ({ isDiscount }: { isDiscount?: boolean }) => {
  const { t: translation } = useTranslation();
  return (
    <div className="bg-[#40506A] py-[8px] rounded-[4px] mb-3">
      <div className="grid grid-cols-3 gap-x-2 items-center ">
        <span className="col-span-1 pl-3 text-white text-sm font-medium ">
          {translation("pdf.service")}
        </span>
        <span className="col-span-1 pl-3 text-white text-sm font-medium ">

          {translation("pdf.description")}
        </span>
        <div className="col-span-1 flex justify-between">
          <span className="text-sm font-medium text-white">
            {translation("pdf.count")}
          </span>
          <span className="text-sm font-medium text-white">
            {translation("pdf.unit")}
          </span>
          <span className="text-sm font-medium text-white">
            {translation("pdf.price")}
          </span>
          {isDiscount &&
            <span className="text-sm font-medium text-white">
              {translation("pdf.discount")}
            </span>}
          <span className="text-sm font-medium text-white pr-[46px]">
            {translation("pdf.total")}
          </span>
        </div>
      </div>
    </div>
  );
};
