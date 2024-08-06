import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { Report } from "@/types/appointments";
import { useRouter } from "next/router";
import { EditIcon } from "@/assets/svgs/components/edit-icon";
import shelfIcon from "@/assets/pngs/shelf.png";
import sofaIcon from "@/assets/pngs/safe.png";
import aquairumIcon from "@/assets/pngs/aquarium.png";
import poolIcon from "@/assets/pngs/pool.png";
import washMacIcon from "@/assets/pngs/wash-machine.png";
import coffeMacIcon from "@/assets/pngs/coffe-machine.png";
import bedIcon from "@/assets/pngs/bed.png";
import doublebedIcon from "@/assets/pngs/d-bed.png";
import singWoodDrobeIcon from "@/assets/pngs/single-woodrobe.png";
import medWoodDrobeIcon from "@/assets/pngs/medWoodDrobe.png";
import largeWoodDrobeIcon from "@/assets/pngs/largeWoodDrobe.png";
import pianoIcon from "@/assets/pngs/piano.png";
import gymSportIcon from "@/assets/pngs/gym-exc.png";
import gymEquIcon from "@/assets/pngs/gym-equ.png";
import lampIcon from "@/assets/pngs/lamp.png";
import electronicsIcon from "@/assets/pngs/electronics.png";
import boxIcon from "@/assets/pngs/box.png";
import cycleIcon from "@/assets/pngs/cycle.png";
import cupIcon from "@/assets/pngs/cup.png";
import tumblerIcon from "@/assets/pngs/tumbler.png";
import disposibleIcon from "@/assets/pngs/disposible.png";
import mobelIcon from "@/assets/pngs/mobel.png";
import chilWalkerIcon from "@/assets/pngs/child-walker.png";
import chairIcon from "@/assets/pngs/chair.png";
import armChairIcon from "@/assets/pngs/arm-chair.png";
import grossyIcon from "@/assets/pngs/greenery.png";
import plantIcon from "@/assets/pngs/flour.png";
import umbellaIcon from "@/assets/pngs/umbella.png";
import lSofaIcon from "@/assets/pngs/l-sofa.png";
import grillIcon from "@/assets/pngs/grill.png";
import tvTableIcon from "@/assets/pngs/tv-table.png";
import teacherDesckIcon from "@/assets/pngs/teacher-desk.png";
import deskIcon from "@/assets/pngs/desk.png";
import tvIcon from "@/assets/pngs/tv.png";
import tableIcon from "@/assets/pngs/table.png";
import macupTableIcon from "@/assets/pngs/macUpTable.png";
import freezerIcon from "@/assets/pngs/freezer.png";
import refrigeratorIcon from "@/assets/pngs/refregirator.png";
import ovenIcon from "@/assets/pngs/oven.png";
import microOvenIcon from "@/assets/pngs/micro-oven.png";
import herdIcon from "@/assets/pngs/herd.png";
import decoGrossIcon from "@/assets/pngs/deco-gross.png";
import safeIcon from "@/assets/pngs/safe-icon.png";
import Image from "next/image";
import { HouseFieldLabel } from "./house-field-label";
import { HouseDescriptionField } from "./house-description-field";

export interface ReportHouseDetailProps {
  isCompanyAppointment?: boolean;
  reportDetail: Report;
}

export const ReportHouseDetail = ({
  isCompanyAppointment,
  reportDetail,
}: ReportHouseDetailProps) => {
  const router = useRouter();

  return (
    <LeadsCardLayout>
      <div
        className="flex justify-between items-center bg-[#FE9244] py-5 px-6 rounded-t-lg"
        id={translate("appointments.report_detail.house_detail")}
      >
        <h2 className="text-[#fff] text-xl font-medium">
          {translate("appointments.report_detail.house_detail")}
        </h2>
        {/* {!isCompanyAppointment && ( */}
        <button
          onClick={() =>
            router.push({
              pathname: "/agent/appointments/update-report",
              query: { report: reportDetail?.appointmentID?.id, tab: 1 },
            })
          }
          className="flex items-center gap-x-4 text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 min-w-[161px] w-fit bg-white"
        >
          <EditIcon />
          {translate("offers.address_details.edit_button")}
        </button>
        {/* )} */}
      </div>

      <div className="px-5 pb-3">
        <div className="mt-5 flex flex-col gap-y-2">
          <p className="text-base text-[#1E1E1E] font-semibold">
            {translate("agent.house_detail_fields.living_room_heading")}
          </p>
          <div className="bg-[#EDF4FF] rounded-lg px-2 py-3">
            <HouseFieldLabel />
            <div className="grid grid-cols-1 md:grid-cols-2 xlg:grid-cols-3 md:gap-x-[71px] gap-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={safeIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.sofa")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.livingRoomDetails?.sofa}
                </p>
              </div>
              <div className="flex justify-between items-center">
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
              </div>
            </div>
            <HouseDescriptionField
              descriptionValue={reportDetail?.livingRoomDetails?.descriptions}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-y-2">
          <p className="text-base text-[#1E1E1E] font-semibold">
            {translate("agent.house_detail_fields.kuche")}
          </p>
          <div className="bg-[#EDF4FF] rounded-lg px-2 py-3">
            <HouseFieldLabel />
            <div className="grid grid-cols-1 md:grid-cols-2 xlg:grid-cols-3 md:gap-x-[71px] gap-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={ovenIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.backofen")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.kitchenDetails?.oven}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={refrigeratorIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.kuhlschrank")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.kitchenDetails?.refrigerator}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={freezerIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.tiefkuhler")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.kitchenDetails?.freezer}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={herdIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.herd")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.kitchenDetails?.stove}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={microOvenIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.mikrowelle")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.kitchenDetails?.microwave}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={coffeMacIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.kaffeemaschine")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.kitchenDetails?.coffeeMachine}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={washMacIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.washchmashine")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.kitchenDetails?.washingMachine}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={tumblerIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.Tumbler")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.kitchenDetails?.tumbler}
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
                  {reportDetail?.kitchenDetails?.shelf}
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
                  {reportDetail?.kitchenDetails?.box}
                </p>
              </div>
            </div>
            <HouseDescriptionField
              descriptionValue={reportDetail?.kitchenDetails?.descriptions}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-y-2">
          <p className="text-base text-[#1E1E1E] font-semibold">
            {translate("agent.house_detail_fields.bedroom_heading")}
          </p>
          <div className="bg-[#EDF4FF] rounded-lg px-2 py-3">
            <HouseFieldLabel />
            <div className="grid grid-cols-1 md:grid-cols-2 xlg:grid-cols-3 md:gap-x-[71px] gap-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={bedIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.bett")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.bedRoomDetails?.bed}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={doublebedIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.doppeltbett")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.bedRoomDetails?.doubleBed}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={shelfIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.sessel")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.bedRoomDetails?.shelf}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={singWoodDrobeIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.schrank_klein")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.bedRoomDetails?.smallWardrobe}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={medWoodDrobeIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.schrank_mittel")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.bedRoomDetails?.mediumWardrobe}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={largeWoodDrobeIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.schrank_gross")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.bedRoomDetails?.largeWardrobe}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={macupTableIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.schminkanlage")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.bedRoomDetails?.dressingTable}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={tableIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.nachttisch")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.bedRoomDetails?.nightstand}
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
                  {reportDetail?.bedRoomDetails?.shelf}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={teacherDesckIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.pult")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.bedRoomDetails?.desk}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={plantIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.pflanzen")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.bedRoomDetails?.plants}
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
                  {reportDetail?.bedRoomDetails?.box}
                </p>
              </div>
            </div>
            <HouseDescriptionField
              descriptionValue={reportDetail?.bedRoomDetails?.descriptions}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-y-2">
          <p className="text-base text-[#1E1E1E] font-semibold">
            {translate("agent.house_detail_fields.bedroom_heading")}
          </p>
          <div className="bg-[#EDF4FF] rounded-lg px-2 py-3">
            <HouseFieldLabel />
            <div className="grid grid-cols-1 md:grid-cols-2 xlg:grid-cols-3 md:gap-x-[71px] gap-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={bedIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.bett")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.roomDetails?.bed}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={doublebedIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.doppeltbett")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.roomDetails?.doubleBed}
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
                  {reportDetail?.roomDetails?.armchair}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={singWoodDrobeIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.schrank_klein")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.roomDetails?.smallWardrobe}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={medWoodDrobeIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.schrank_mittel")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.roomDetails?.mediumWardrobe}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={largeWoodDrobeIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.schrank_gross")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.roomDetails?.largeWardrobe}
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
                  {reportDetail?.roomDetails?.shelf}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={teacherDesckIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.pult")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.roomDetails?.desk}
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
                  {reportDetail?.roomDetails?.tv}
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
                  {reportDetail?.roomDetails?.tvTable}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={tableIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.nachttisch")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.roomDetails?.nightstand}
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
                  {reportDetail?.roomDetails?.box}
                </p>
              </div>
            </div>
            <HouseDescriptionField
              descriptionValue={reportDetail?.roomDetails?.descriptions}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-y-2">
          <p className="text-base text-[#1E1E1E] font-semibold">
            {translate("agent.house_detail_fields.balcony_heading")}
          </p>
          <div className="bg-[#EDF4FF] rounded-lg px-2 py-3">
            <HouseFieldLabel />
            <div className="grid grid-cols-1 md:grid-cols-2 xlg:grid-cols-3 md:gap-x-[71px] gap-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={grillIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.grill")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.outDoorDetails?.grill}
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
                  {reportDetail?.outDoorDetails?.table}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={chairIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.stuhle")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.outDoorDetails?.chairs}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={sofaIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.sofa")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.outDoorDetails?.sofa}
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
                  {reportDetail?.outDoorDetails?.shelf}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={umbellaIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.schirm")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.outDoorDetails?.umbrella}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={cupIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.topfe")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.outDoorDetails?.pots}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={plantIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.pflanzen")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.outDoorDetails?.plants}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={grossyIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.krauterbeet")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.outDoorDetails?.herbGarden}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={gymEquIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.rasenmaher")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.outDoorDetails?.lawnmower}
                </p>
              </div>
            </div>
            <HouseDescriptionField
              descriptionValue={reportDetail?.outDoorDetails?.descriptions}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-y-2">
          <p className="text-base text-[#1E1E1E] font-semibold">
            {translate("agent.house_detail_fields.keller_heading")}
          </p>
          <div className="bg-[#EDF4FF] rounded-lg px-2 py-3">
            <HouseFieldLabel />
            <div className="grid grid-cols-1 md:grid-cols-2 xlg:grid-cols-3 md:gap-x-[71px] gap-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={washMacIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.washchmashine")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.basementAtticDetails?.washingMachine}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={tumblerIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.Tumbler")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.basementAtticDetails?.tumbler}
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
                  {reportDetail?.basementAtticDetails?.shelf}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={disposibleIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.entsorgungen")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.basementAtticDetails?.disposal}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={cycleIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.fahrrad")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.basementAtticDetails?.bicycle}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={chilWalkerIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.kinderwagen")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.basementAtticDetails?.stroller}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={mobelIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.mobel")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.basementAtticDetails?.furniture}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={boxIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.boxen")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.basementAtticDetails?.boxes}
                </p>
              </div>
            </div>
            <HouseDescriptionField
              descriptionValue={
                reportDetail?.basementAtticDetails?.descriptions
              }
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-y-2">
          <p className="text-base text-[#1E1E1E] font-semibold">
            {translate("agent.house_detail_fields.speziell")}
          </p>
          <div className="bg-[#EDF4FF] rounded-lg px-2 py-3">
            <HouseFieldLabel />
            <div className="grid grid-cols-1 md:grid-cols-2 xlg:grid-cols-3 md:gap-x-[71px] gap-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={aquairumIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.aquarium")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.specialItemsDetails?.aquarium}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={pianoIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.piano")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.specialItemsDetails?.piano}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={gymSportIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.sportgerat")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.specialItemsDetails?.gymEquipment}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={electronicsIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.elektronisches")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.specialItemsDetails?.electronics}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={poolIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.pool")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.specialItemsDetails?.pool}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={safeIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.tressor")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.specialItemsDetails?.safe}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Image src={lampIcon} alt="house item icon" />
                  <p className="text-[#1C1F35] text-base font-medium">
                    {translate("agent.house_detail_fields.lampe")}
                  </p>
                </div>
                <p className="rounded-lg border border-[#EBEBEB] bg-white p-4 text-[#4B4B4B] font-medium min-h-[32px] min-w-[54px] truncate">
                  {reportDetail?.specialItemsDetails?.lamp}
                </p>
              </div>
            </div>
            <HouseDescriptionField
              descriptionValue={reportDetail?.specialItemsDetails?.descriptions}
            />
          </div>
        </div>
      </div>
    </LeadsCardLayout>
  );
};
