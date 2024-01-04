import { useTranslation } from "next-i18next";

export const ProcutItemHeader = () => {
  const { t: translation } = useTranslation();
  return (
    <div className="bg-[#40506A] py-[8px] rounded-[4px] mb-3">
      <div className="grid grid-cols-3 gap-x-2 items-center ">
        <span className="col-span-2 pl-3 text-white text-base font-medium ">
          {translation("pdf.service")}
        </span>
        <div className="col-span-1 flex justify-between">
          <span className="text-base font-medium text-white">
            {" "}
            {translation("pdf.price")}
          </span>
          <span className="text-base font-medium text-white">
            {" "}
            {translation("pdf.unit")}
          </span>
          <span className="text-base font-medium text-white">
            {" "}
            {translation("pdf.count")}
          </span>
          <span className="text-base font-medium text-white pr-[46px]">
            {translation("pdf.total")}
          </span>
        </div>
      </div>
    </div>
  );
};
