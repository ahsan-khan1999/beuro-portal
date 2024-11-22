import { SystemSetting } from "@/api/slices/settingSlice/settings";
import { PdfProps, RoomObject, TemplateType } from "@/types";
import { EmailTemplate } from "@/types/settings";
import React from "react";
import { DocumentHeader } from "../preview/document-header";
import { ContactDetails } from "../preview/contact-details";
import { Footer } from "../footer";
import { ServicesTotalAmount } from "./sevices-total";
import AddressDetails from "./address-details";
import { ServiceItem } from "./service-item";
import { ServiceHeader } from "./service-header";
import { HouseItemWrapper } from "./house-item-wrapper";

import { DynamicItemWrapper } from "./dynamic-item-wrapper";
import { AppointmentDetails } from "./appointment-details";
import {
  isRoomNotEmpty,
  getLivingRoom,
  getKitchenRoom,
  getBedRoom,
  getRoom,
  getOutdoorRoom,
  getBasement,
  getSpecialRoom,
} from "@/utils/utility";
import { StaticImageData } from "next/image";

export interface AppointProps {
  pdfData?: PdfProps;
  templateSettings: TemplateType | null;
  emailTemplateSettings: EmailTemplate | null;
  systemSettings: SystemSetting | null;
  language?: string | undefined;
}

const AppointmentPdfPreview = <T,>({
  pdfData,
  emailTemplateSettings,
  systemSettings,
  templateSettings,
  language,
}: AppointProps) => {
  const isDiscount =
    pdfData?.serviceItemFooter?.serviceDiscountSum &&
    Number(pdfData?.serviceItemFooter?.serviceDiscountSum) > 0
      ? true
      : false || false;

  const { address, workDates } = pdfData?.movingDetails || {};
  const livingRoomDetails = pdfData?.houseDetails?.livingRoomDetails;
  const generalRoomDetails = pdfData?.houseDetails?.generalRoomDetails;
  const kitchenDetails = pdfData?.houseDetails?.kitchenDetails;
  const roomDetails = pdfData?.houseDetails?.roomDetails;
  const bedRoomDetails = pdfData?.houseDetails?.bedRoomDetails;
  const outDoorDetails = pdfData?.houseDetails?.outDoorDetails;
  const basementAtticDetails = pdfData?.houseDetails?.basementAtticDetails;
  const specialItemsDetails = pdfData?.houseDetails?.specialItemsDetails;
  const offerDetails = pdfData?.offerDetails;

  const langContent = {
    en: {
      livingRoomHeading: "Living room(WZ)",
      kitchenHeading: "kitchen",
      bedRoomHeading: "Bedroom(SZ)",
      roomHeading: "Room(Z)",
      outdoorHeading: "Balcony/terrace/garden (W/D/G)",
      basementHeading: "Cellar/screed (K/E)",
      specialHeading: "Special",
    },

    de: {
      livingRoomHeading: "Wohnzimmer(WZ)",
      kitchenHeading: "Küche",
      bedRoomHeading: "Schlafzimmer",
      roomHeading: "Zimmer(Z)",
      outdoorHeading: "Balkon/Terrasse/Garten (B/T/G)",
      basementHeading: "Keller/Estrich (K/E)",
      specialHeading: "Speziell",
    },
  };

  const generalRooms = () => {
    const items: RoomObject[] = [];
    generalRoomDetails?.forEach((item) => {
      if (isRoomNotEmpty(item)) {
        items.push(item);
      }
    });
    return items;
  };

  return (
    <div className="mb-5">
      <div className="mb-10">
        <DocumentHeader
          {...pdfData?.headerDetails}
          emailTemplateSettings={emailTemplateSettings}
        />
        <div className="px-[80px] flex flex-col bg-white">
          <ContactDetails {...{ ...pdfData?.contactAddress, language }} />
          <AddressDetails {...{ address, workDates }} />

          <ServiceHeader isDiscount={isDiscount} />
          {pdfData?.serviceItem?.map((item, index) => (
            <ServiceItem
              {...item}
              key={index}
              isDiscount={isDiscount}
              pagebreak={false}
            />
          ))}

          <ServicesTotalAmount
            {...pdfData?.serviceItemFooter}
            systemSettings={systemSettings}
          />
        </div>
        <Footer
          {...pdfData?.footerDetails}
          columnSettings={templateSettings}
          // totalPages={totalPages}
          currPage={undefined}
          emailTemplateSettings={emailTemplateSettings}
        />
      </div>
      {(getLivingRoom(language || "", livingRoomDetails)?.length > 0 ||
        getKitchenRoom(language || "", kitchenDetails)?.length > 0 ||
        getBedRoom(language || "", bedRoomDetails)?.length > 0 ||
        getRoom(language || "", roomDetails)?.length > 0 ||
        getOutdoorRoom(language || "", outDoorDetails)?.length > 0 ||
        getBasement(language || "", basementAtticDetails)?.length > 0 ||
        getSpecialRoom(language || "", specialItemsDetails)?.length > 0 ||
        generalRooms().length > 0) && (
        <div className="mb-10 bg-white">
          <DocumentHeader
            {...pdfData?.headerDetails}
            emailTemplateSettings={emailTemplateSettings}
          />
          <div className="px-[80px]">
            {getLivingRoom(language || "", livingRoomDetails)?.length > 0 && (
              <HouseItemWrapper
                mainHeading={
                  langContent[language as keyof typeof langContent]
                    ?.livingRoomHeading
                }
                description={livingRoomDetails?.descriptions}
                items={getLivingRoom(language || "", livingRoomDetails)}
                language={language}
                className="border-b border-b-[#ccc]"
              />
            )}
            {getKitchenRoom(language || "", kitchenDetails)?.length > 0 && (
              <HouseItemWrapper
                mainHeading={
                  langContent[language as keyof typeof langContent]
                    ?.kitchenHeading
                }
                description={kitchenDetails?.descriptions}
                items={getKitchenRoom(language || "", kitchenDetails)}
                language={language}
                className="border-b border-b-[#ccc]"
              />
            )}
            {getBedRoom(language || "", bedRoomDetails)?.length > 0 && (
              <HouseItemWrapper
                mainHeading={
                  langContent[language as keyof typeof langContent]
                    ?.bedRoomHeading
                }
                description={bedRoomDetails?.descriptions}
                items={getBedRoom(language || "", bedRoomDetails)}
                language={language}
                className="border-b border-b-[#ccc]"
              />
            )}
            {getRoom(language || "", roomDetails)?.length > 0 && (
              <HouseItemWrapper
                mainHeading={
                  langContent[language as keyof typeof langContent]?.roomHeading
                }
                description={roomDetails?.descriptions}
                items={getRoom(language || "", roomDetails)}
                language={language}
                className="border-b border-b-[#ccc]"
              />
            )}

            {getOutdoorRoom(language || "", outDoorDetails)?.length > 0 && (
              <HouseItemWrapper
                mainHeading={
                  langContent[language as keyof typeof langContent]
                    ?.outdoorHeading
                }
                description={outDoorDetails?.descriptions}
                items={getOutdoorRoom(language || "", outDoorDetails)}
                language={language}
                className="border-b border-b-[#ccc]"
              />
            )}
            {getBasement(language || "", basementAtticDetails)?.length > 0 && (
              <HouseItemWrapper
                mainHeading={
                  langContent[language as keyof typeof langContent]
                    ?.basementHeading
                }
                description={basementAtticDetails?.descriptions}
                items={getBasement(language || "", basementAtticDetails)}
                language={language}
                className="border-b border-b-[#ccc]"
              />
            )}
            {getSpecialRoom(language || "", specialItemsDetails)?.length >
              0 && (
              <HouseItemWrapper
                mainHeading={
                  langContent[language as keyof typeof langContent]
                    ?.specialHeading
                }
                description={specialItemsDetails?.descriptions}
                items={getSpecialRoom(language || "", specialItemsDetails)}
                language={language}
                className="border-b border-b-[#ccc]"
              />
            )}
            {generalRooms() &&
              generalRooms().map((item, index) => (
                <div key={index}>
                  <DynamicItemWrapper
                    generalRoom={item}
                    language={language}
                    className={
                      Number(index) === generalRooms().length - 1
                        ? ""
                        : "border-b border-b-[#ccc]"
                    }
                  />
                </div>
              ))}
          </div>
          <Footer
            {...pdfData?.footerDetails}
            columnSettings={templateSettings}
            currPage={undefined}
            emailTemplateSettings={emailTemplateSettings}
          />
        </div>
      )}

      <div className="mb-10 bg-white min-h-[100vh] flex flex-col justify-between">
        <div>
          <DocumentHeader
            {...pdfData?.headerDetails}
            emailTemplateSettings={emailTemplateSettings}
          />

          <AppointmentDetails language={language} {...offerDetails} />
        </div>

        <Footer
          {...pdfData?.footerDetails}
          columnSettings={templateSettings}
          currPage={undefined}
          emailTemplateSettings={emailTemplateSettings}
        />
      </div>
    </div>
  );
};

export default AppointmentPdfPreview;
