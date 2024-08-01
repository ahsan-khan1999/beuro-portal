import { useTranslation } from "next-i18next";
import Image, { StaticImageData } from "next/image";


export interface HouseDataObjectProps {
  mainHeading?: string;
  entityValue?: number;
  descriptionValue?: string;
  imgrSrc: StaticImageData;
}


export const HouseFieldDataObect = ({
  descriptionValue,
  entityValue,
  imgrSrc,
  mainHeading,
}: HouseDataObjectProps) => {
  const { t: translate } = useTranslation();
  return (
    <div className="mt-5 flex flex-col gap-y-2">
      <p className="text-base text-[#1E1E1E] font-semibold">{mainHeading}</p>
      <div className="bg-[#EDF4FF] rounded-lg px-2 py-3">
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
        <div className="grid grid-cols-1 md:grid-cols-2 xlg:grid-cols-3 md:gap-x-[71px] gap-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <Image src={imgrSrc} alt="house item icon" />
              <p className="text-[#1C1F35] text-base font-medium">
                {translate("agent.house_detail_fields.sofa")}
              </p>
            </div>
            <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
              {entityValue}
            </p>
          </div>
          {/* <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <Image src={teacherDesckIcon} alt="house item icon" />
              <p className="text-[#1C1F35] text-base font-medium">
                {translate("agent.house_detail_fields.puit")}
              </p>
            </div>
            <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
              {reportDetail?.livingRoomDetails?.teacherDesk}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <Image src={tvTableIcon} alt="house item icon" />
              <p className="text-[#1C1F35] text-base font-medium">
                {translate("agent.house_detail_fields.tv_table")}
              </p>
            </div>
            <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
              {reportDetail?.livingRoomDetails?.tvTable}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <Image src={armChairIcon} alt="house item icon" />
              <p className="text-[#1C1F35] text-base font-medium">
                {translate("agent.house_detail_fields.sessel")}
              </p>
            </div>
            <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
              {reportDetail?.livingRoomDetails?.armchair}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <Image src={deskIcon} alt="house item icon" />
              <p className="text-[#1C1F35] text-base font-medium">
                {translate("agent.house_detail_fields.tisch")}
              </p>
            </div>
            <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
              {reportDetail?.livingRoomDetails?.table}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <Image src={shelfIcon} alt="house item icon" />
              <p className="text-[#1C1F35] text-base font-medium">
                {translate("agent.house_detail_fields.regal")}
              </p>
            </div>
            <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
              {reportDetail?.livingRoomDetails?.shelf}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <Image src={lSofaIcon} alt="house item icon" />
              <p className="text-[#1C1F35] text-base font-medium">
                {translate("agent.house_detail_fields.l_sofa")}
              </p>
            </div>
            <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
              {reportDetail?.livingRoomDetails?.LSofa}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <Image src={tvIcon} alt="house item icon" />
              <p className="text-[#1C1F35] text-base font-medium">
                {translate("agent.house_detail_fields.fernseher")}
              </p>
            </div>
            <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
              {reportDetail?.livingRoomDetails?.TV}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <Image src={decoGrossIcon} alt="house item icon" />
              <p className="text-[#1C1F35] text-base font-medium">
                {translate("agent.house_detail_fields.deco_gross")}
              </p>
            </div>
            <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
              {reportDetail?.livingRoomDetails?.decoBig}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <Image src={boxIcon} alt="house item icon" />
              <p className="text-[#1C1F35] text-base font-medium">
                {translate("agent.house_detail_fields.box")}
              </p>
            </div>
            <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
              {reportDetail?.livingRoomDetails?.box}
            </p>
          </div> */}
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-sm font-medium text-[#344054]">
            {translate("agent.house_detail_fields.remark")}
          </p>
          <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
            {descriptionValue}
          </p>
        </div>
      </div>
    </div>
  );
};
