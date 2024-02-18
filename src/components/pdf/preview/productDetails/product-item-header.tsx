import { useTranslation } from "next-i18next";

export const ProcutItemHeader = ({ isDiscount }: { isDiscount?: boolean }) => {
  const { t: translation } = useTranslation();
  return (
    <div className="bg-[#40506A] py-[8px] rounded-[4px] mb-3 pl-3">
      <div className="grid grid-cols-3 items-center ">
        <span className="col-span-1 text-white text-sm font-medium">
          {translation("pdf.service")}
        </span>
        <span className="col-span-1 text-white text-sm font-medium">
          {translation("pdf.description")}
        </span>
        <div className="col-span-1 flex space-x-2 items-center pr-[46px] w-full">
          <span className="text-sm font-medium text-white min-w-[50px]">
            {translation("pdf.count")}
          </span>
          <span className="text-sm font-medium text-white min-w-[50px]">
            {translation("pdf.unit")}
          </span>
          <span className="text-sm font-medium text-white min-w-[50px]">
            {translation("pdf.price")}
          </span>
          {isDiscount && (
            <span className="text-sm font-medium text-white min-w-[50px]">
              {translation("pdf.discount")}
            </span>
          )}
          <span className="text-sm font-medium text-white min-w-[50px]">
            {translation("pdf.total")}
          </span>
        </div>
      </div>
    </div>
  );
};
