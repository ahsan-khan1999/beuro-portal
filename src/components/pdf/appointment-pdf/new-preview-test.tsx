import { SystemSetting } from "@/api/slices/settingSlice/settings";
import {
  BasementAtticDetailsProps,
  DedRoomDetailsProps,
  KitchenDetailsProps,
  LivingRoomDetailsProps,
  OutDoorDetailsProps,
  PdfProps,
  RoomDetailsProps,
  RoomObject,
  SpecialItemsDetailsProps,
  TemplateType,
} from "@/types";
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

import shelfIcon from "@/assets/pngs/shelf.png";
import sofaIcon from "@/assets/pngs/safe.png";
import aquariumIcon from "@/assets/pngs/aquarium.png";
import poolIcon from "@/assets/pngs/pool.png";
import washingMachineIcon from "@/assets/pngs/wash-machine.png";
import coffeeMachineIcon from "@/assets/pngs/coffe-machine.png";
import bedIcon from "@/assets/pngs/bed.png";
import doubleBedIcon from "@/assets/pngs/d-bed.png";
import smallWardrobeIcon from "@/assets/pngs/single-woodrobe.png";
import mediumWardrobeIcon from "@/assets/pngs/medWoodDrobe.png";
import largeWardrobeIcon from "@/assets/pngs/largeWoodDrobe.png";
import pianoIcon from "@/assets/pngs/piano.png";
import gymEquipmentIcon from "@/assets/pngs/gym-exc.png";
import lawnmowerIcon from "@/assets/pngs/gym-equ.png";
import lampIcon from "@/assets/pngs/lamp.png";
import electronicsIcon from "@/assets/pngs/electronics.png";
import boxIcon from "@/assets/pngs/box.png";
import boxesIcon from "@/assets/pngs/box.png";
import bicycleIcon from "@/assets/pngs/cycle.png";
import potsIcon from "@/assets/pngs/cup.png";
import tumblerIcon from "@/assets/pngs/tumbler.png";
import disposalIcon from "@/assets/pngs/disposible.png";
import furnitureIcon from "@/assets/pngs/mobel.png";
import strollerIcon from "@/assets/pngs/child-walker.png";
import chairsIcon from "@/assets/pngs/chair.png";
import armchairIcon from "@/assets/pngs/arm-chair.png";
import herbGardenIcon from "@/assets/pngs/greenery.png";
import plantsIcon from "@/assets/pngs/flour.png";
import umbrellaIcon from "@/assets/pngs/umbella.png";
import LSofaIcon from "@/assets/pngs/l-sofa.png";
import grillIcon from "@/assets/pngs/grill.png";
import tvTableIcon from "@/assets/pngs/tv-table.png";
import deskIcon from "@/assets/pngs/desk.png";
import tvIcon from "@/assets/pngs/tv.png";
import TVIcon from "@/assets/pngs/tv.png";
import tableIcon from "@/assets/pngs/table.png";
import nightstandIcon from "@/assets/pngs/table.png";
import dressingTableIcon from "@/assets/pngs/macUpTable.png";
import freezerIcon from "@/assets/pngs/freezer.png";
import refrigeratorIcon from "@/assets/pngs/refregirator.png";
import ovenIcon from "@/assets/pngs/oven.png";
import microwaveIcon from "@/assets/pngs/micro-oven.png";
import stoveIcon from "@/assets/pngs/herd.png";
import decoBigIcon from "@/assets/pngs/deco-gross.png";
import teacherDeskIcon from "@/assets/pngs/teacher-desk.png";
import safeIcon from "@/assets/pngs/safe-icon.png";
import { DynamicItemWrapper } from "./dynamic-item-wrapper";
import { AppointmentDetails } from "./appointment-details";
import { isRoomNotEmpty } from "@/utils/utility";
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

  const { address, workDates, time } = pdfData?.movingDetails || {};
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
      remarks: "Remarks",
      tumbler: "Tumbler",
      washingMachine: "Washing machine",
      shelf: "Shelf",
      box: "Box",
      bed: "Bed",
      doubleBed: "Double bed",
      armchair: "Armchair",
      smallWardrobe: "Small wardrobe",
      mediumWardrobe: "Medium wardrobe",
      largeWardrobe: "Large wardrobe",
      nightStand: "Bedside table",
      plants: "Plants",
      tv: "Television",
      TV: "Television",
      tvTable: "TV table",
      desk: "Desk",
      table: "Desk",
      teacherDesk: "Teacher Desk",
      sofa: "Sofa",
      lSofa: "L Sofa",
      LSofa: "L Sofa",
      decoBig: "Deco large",

      oven: "Oven",
      refrigerator: "Refrigerator",
      freezer: "Deep Freezer",
      stove: "Stove",
      microOven: "Microwave",
      microwave: "Microwave",
      coffeeMachine: "Coffee machine",

      dressingTable: "Dress Table",

      grill: "Grill",
      chairs: "Chairs",
      umbrella: "Umbrella",
      pots: "Pots",
      herbGarden: "Herb bed",
      lawnmower: "Lawn mower",

      disposal: "Disposals",
      bicycle: "Bicycle",
      stroller: "Baby carriage",
      furniture: "Furniture",
      boxes: "Boxes",

      aquarium: "Aquarium",
      piano: "Piano",
      gymEquipment: "Sports equipment",
      electronics: "Electronics",
      pool: "Pool",
      safe: "Tressor",
      lamp: "Lampe",

      employee: "Employees",
      deliveryVan: "Delivery van",
      hours: "Hours",
      cleaningHandOver: "Cleaning with delivery guarantee",
      broomClean: "Broom clean",
      price: "Price",
      noteInfo: "Note and information",
    },

    de: {
      livingRoomHeading: "Wohnzimmer(WZ)",
      kitchenHeading: "Küche",
      bedRoomHeading: "Schlafzimmer",
      roomHeading: "Zimmer(Z)",
      outdoorHeading: "Balkon/Terrasse/Garten (B/T/G)",
      basementHeading: "Keller/Estrich (K/E)",
      specialHeading: "Speziell",
      remarks: "Bemerkung",
      tumbler: "Tumbler",
      washingMachine: "Waschmaschine",
      shelf: "Regal",
      box: "Box",
      bed: "Bett",
      doubleBed: "Doppelbett",
      armchair: "Sessel",
      smallWardrobe: "Schrank klein",
      mediumWardrobe: "Schrank Mittel",
      largeWardrobe: "Schrank Gross",
      nightStand: "Nachttisch",
      plants: "Pflanzen",
      tv: "Fernseher",
      TV: "Fernseher",
      tvTable: "Fernsehtisch",
      desk: "Tisch",
      table: "Tisch",
      teacherDesk: "Pult",
      sofa: "Sofa",

      lSofa: "L Sofa",
      LSofa: "L Sofa",
      decoBig: "Deco gross",

      oven: "Backofen",
      refrigerator: "Kühlschrank",
      freezer: "Tiefkühler",
      stove: "Herd",
      microOven: "Mikrowelle",
      microwave: "Mikrowelle",
      coffeeMachine: "Kaffeemaschine",

      dressingTable: "Schminkanlage",

      grill: "Grill",
      chairs: "Stühle",
      umbrella: "Schirm",
      pots: "Töpfe",
      herbGarden: "Kräuterbeet",
      lawnmower: "Rasenmäher",

      disposal: "Entsorgungen",
      bicycle: "Fahrrad",
      stroller: "Kinderwagen",
      furniture: "Möbel",
      boxes: "Boxen",

      aquarium: "Aquarium",
      piano: "Piano",
      gymEquipment: "Sportgerät",
      electronics: "Elektronisches",
      pool: "Pool",
      safe: "Tressor",
      lamp: "Lampe",

      employee: "Mitarbeiter",
      deliveryVan: "Lieferwagen",
      hours: "Stunden",
      cleaningHandOver: "Reinigung mit Abgabegarantie",
      broomClean: "Besenrein",
      price: "Preis",
      noteInfo: "Hinweis und Angaben",
    },
  };

  interface ResultItem {
    name: string;
    quantity?: number;
    icon: StaticImageData;
  }

  const iconMap: Record<string, any> = {
    sofaIcon,
    teacherDeskIcon,
    tvTableIcon,
    armchairIcon,
    tableIcon,
    shelfIcon,
    LSofaIcon,
    TVIcon,
    tvIcon,
    decoBigIcon,
    boxIcon,
    ovenIcon,
    refrigeratorIcon,
    freezerIcon,
    stoveIcon,
    microwaveIcon,
    coffeeMachineIcon,
    washingMachineIcon,
    tumblerIcon,
    bedIcon,
    doubleBedIcon,
    smallWardrobeIcon,
    mediumWardrobeIcon,
    largeWardrobeIcon,
    dressingTableIcon,
    nightstandIcon,
    deskIcon,
    plantsIcon,
    grillIcon,
    chairsIcon,
    umbrellaIcon,
    potsIcon,
    herbGardenIcon,
    lawnmowerIcon,
    boxesIcon,
    bicycleIcon,
    disposalIcon,
    furnitureIcon,
    strollerIcon,
    aquariumIcon,
    electronicsIcon,
    gymEquipmentIcon,
    lampIcon,
    pianoIcon,
    poolIcon,
    safeIcon,
  };

  const livingRoomItem = () => {
    const items: ResultItem[] = [];

    for (const key in livingRoomDetails) {
      if (Object.hasOwn(livingRoomDetails, key)) {
        if (key !== "descriptions") {
          const value = livingRoomDetails[key as keyof LivingRoomDetailsProps];
          let lang = language as keyof typeof langContent;
          if (value) {
            let icon = `${key}Icon`;

            if (lang in langContent && key in langContent[lang]) {
              const name =
                langContent[lang][key as keyof (typeof langContent)["en"]];

              items.push({
                name: name,
                quantity: Number(value),
                icon: iconMap[icon],
              });
            }
          }
        }
      }
    }
    return items;
  };
  const kitchenRoomItem = () => {
    const items: ResultItem[] = [];
    for (const key in kitchenDetails) {
      if (Object.hasOwn(kitchenDetails, key)) {
        if (key !== "descriptions") {
          const value = kitchenDetails[key as keyof KitchenDetailsProps];
          let lang = language as keyof typeof langContent;
          if (value) {
            let icon = `${key}Icon`;

            if (lang in langContent && key in langContent[lang]) {
              const name =
                langContent[lang][key as keyof (typeof langContent)["en"]];

              items.push({
                name: name,
                quantity: Number(value),
                icon: iconMap[icon],
              });
            }
          }
        }
      }
    }
    return items;
  };

  const bedRoomItem = () => {
    const items: ResultItem[] = [];
    for (const key in bedRoomDetails) {
      if (Object.hasOwn(bedRoomDetails, key)) {
        if (key !== "descriptions") {
          const value = bedRoomDetails[key as keyof DedRoomDetailsProps];
          let lang = language as keyof typeof langContent;
          if (value) {
            let icon = `${key}Icon`;

            if (lang in langContent && key in langContent[lang]) {
              const name =
                langContent[lang][key as keyof (typeof langContent)["en"]];

              items.push({
                name: name,
                quantity: Number(value),
                icon: iconMap[icon],
              });
            }
          }
        }
      }
    }
    return items;
  };
  const outdoorItem = () => {
    const items: ResultItem[] = [];
    for (const key in outDoorDetails) {
      if (Object.hasOwn(outDoorDetails, key)) {
        if (key !== "descriptions") {
          const value = outDoorDetails[key as keyof OutDoorDetailsProps];
          let lang = language as keyof typeof langContent;
          if (value) {
            let icon = `${key}Icon`;

            if (lang in langContent && key in langContent[lang]) {
              const name =
                langContent[lang][key as keyof (typeof langContent)["en"]];

              items.push({
                name: name,
                quantity: Number(value),
                icon: iconMap[icon],
              });
            }
          }
        }
      }
    }
    return items;
  };
  const roomItem = () => {
    const items: ResultItem[] = [];
    for (const key in roomDetails) {
      if (Object.hasOwn(roomDetails, key)) {
        if (key !== "descriptions") {
          const value = roomDetails[key as keyof RoomDetailsProps];
          let lang = language as keyof typeof langContent;
          if (value) {
            let icon = `${key}Icon`;

            if (lang in langContent && key in langContent[lang]) {
              const name =
                langContent[lang][key as keyof (typeof langContent)["en"]];

              items.push({
                name: name,
                quantity: Number(value),
                icon: iconMap[icon],
              });
            }
          }
        }
      }
    }
    return items;
  };
  const basementItem = () => {
    const items: ResultItem[] = [];
    for (const key in basementAtticDetails) {
      if (Object.hasOwn(basementAtticDetails, key)) {
        if (key !== "descriptions") {
          const value =
            basementAtticDetails[key as keyof BasementAtticDetailsProps];
          let lang = language as keyof typeof langContent;
          if (value) {
            let icon = `${key}Icon`;

            if (lang in langContent && key in langContent[lang]) {
              const name =
                langContent[lang][key as keyof (typeof langContent)["en"]];

              items.push({
                name: name,
                quantity: Number(value),
                icon: iconMap[icon],
              });
            }
          }
        }
      }
    }
    return items;
  };
  const specialItem = () => {
    const items: ResultItem[] = [];
    for (const key in specialItemsDetails) {
      if (Object.hasOwn(specialItemsDetails, key)) {
        if (key !== "descriptions") {
          const value =
            specialItemsDetails[key as keyof SpecialItemsDetailsProps];
          let lang = language as keyof typeof langContent;
          if (value) {
            let icon = `${key}Icon`;

            if (lang in langContent && key in langContent[lang]) {
              const name =
                langContent[lang][key as keyof (typeof langContent)["en"]];

              items.push({
                name: name,
                quantity: Number(value),
                icon: iconMap[icon],
              });
            }
          }
        }
      }
    }
    return items;
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
          <AddressDetails {...{ address, workDates, time }} />

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
          currPage={undefined}
          emailTemplateSettings={emailTemplateSettings}
        />
      </div>
      <div className="mb-10 bg-white">
        <DocumentHeader
          {...pdfData?.headerDetails}
          emailTemplateSettings={emailTemplateSettings}
        />
        <div className="px-[80px]">
          {livingRoomItem().length > 0 && (
            <HouseItemWrapper
              mainHeading={
                langContent[language as keyof typeof langContent]
                  ?.livingRoomHeading
              }
              description={livingRoomDetails?.descriptions}
              items={livingRoomItem()}
              language={language}
              className="border-b border-b-[#ccc]"
            />
          )}
          {kitchenRoomItem().length > 0 && (
            <HouseItemWrapper
              mainHeading={
                langContent[language as keyof typeof langContent]
                  ?.kitchenHeading
              }
              description={kitchenDetails?.descriptions}
              items={kitchenRoomItem()}
              language={language}
              className="border-b border-b-[#ccc]"
            />
          )}
          {bedRoomItem().length > 0 && (
            <HouseItemWrapper
              mainHeading={
                langContent[language as keyof typeof langContent]
                  ?.bedRoomHeading
              }
              description={bedRoomDetails?.descriptions}
              items={bedRoomItem()}
              language={language}
              className="border-b border-b-[#ccc]"
            />
          )}
          {roomItem().length > 0 && (
            <HouseItemWrapper
              mainHeading={
                langContent[language as keyof typeof langContent]?.roomHeading
              }
              description={roomDetails?.descriptions}
              items={roomItem()}
              language={language}
              className="border-b border-b-[#ccc]"
            />
          )}
          {outdoorItem().length > 0 && (
            <HouseItemWrapper
              mainHeading={
                langContent[language as keyof typeof langContent]
                  ?.outdoorHeading
              }
              description={outDoorDetails?.descriptions}
              items={outdoorItem()}
              language={language}
              className="border-b border-b-[#ccc]"
            />
          )}
          {basementItem().length > 0 && (
            <HouseItemWrapper
              mainHeading={
                langContent[language as keyof typeof langContent]
                  ?.basementHeading
              }
              description={basementAtticDetails?.descriptions}
              items={basementItem()}
              language={language}
              className="border-b border-b-[#ccc]"
            />
          )}
          {specialItem().length > 0 && (
            <HouseItemWrapper
              mainHeading={
                langContent[language as keyof typeof langContent]
                  ?.specialHeading
              }
              description={specialItemsDetails?.descriptions}
              items={specialItem()}
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
      {/* <div className="mb-10 bg-white">
        <DocumentHeader
          {...pdfData?.headerDetails}
          emailTemplateSettings={emailTemplateSettings}
        />
        <div className="px-[80px]">
          <HouseItemWrapper
            mainHeading={
              langContent[language as keyof typeof langContent]?.roomHeading
            }
            description={roomDetails?.descriptions}
            items={roomItem()}
            language={language}
            className="border-b border-b-[#ccc]"
          />
          <HouseItemWrapper
            mainHeading={
              langContent[language as keyof typeof langContent]?.outdoorHeading
            }
            description={outDoorDetails?.descriptions}
            items={outdoorItem()}
            language={language}
            className="border-b border-b-[#ccc]"
          />

          <HouseItemWrapper
            mainHeading={
              langContent[language as keyof typeof langContent]?.basementHeading
            }
            description={basementAtticDetails?.descriptions}
            items={basementItem()}
            language={language}
          />
        </div>
        <Footer
          {...pdfData?.footerDetails}
          columnSettings={templateSettings}
          currPage={undefined}
          emailTemplateSettings={emailTemplateSettings}
        />
      </div>
      <div className="mb-10 bg-white min-h-[100vh] flex flex-col justify-between">
        <div>
          <DocumentHeader
            {...pdfData?.headerDetails}
            emailTemplateSettings={emailTemplateSettings}
          />
          <div className="px-[80px]">
            <HouseItemWrapper
              mainHeading={
                langContent[language as keyof typeof langContent]
                  ?.specialHeading
              }
              description={specialItemsDetails?.descriptions}
              items={specialItem()}
              language={language}
              className="border-b border-b-[#ccc]"
            />
            {generalRooms() && generalRooms()?.length > 0 && (
              <DynamicItemWrapper
                generalRoom={generalRooms()[0]}
                language={language}
                className="border-b border-b-[#ccc]"
              />
            )}
            {generalRooms() && generalRooms()?.length > 1 && (
              <DynamicItemWrapper
                generalRoom={generalRooms()[1]}
                language={language}
              />
            )}
          </div>
        </div>
        <Footer
          {...pdfData?.footerDetails}
          columnSettings={templateSettings}
          currPage={undefined}
          emailTemplateSettings={emailTemplateSettings}
        />
      </div>
      {generalRooms() && generalRooms().length > 2 && (
        <div className="mb-10 bg-white min-h-[100vh]  flex flex-col justify-between">
          <div>
            <DocumentHeader
              {...pdfData?.headerDetails}
              emailTemplateSettings={emailTemplateSettings}
            />

            <div className="px-[80px]">
              {generalRooms()
                .slice(2, generalRooms().length)
                .map((item, index) => (
                  <div key={index}>
                    <DynamicItemWrapper
                      generalRoom={item}
                      language={language}
                      className={
                        Number(index + 1) === generalRooms().length - 2
                          ? ""
                          : "border-b border-b-[#ccc]"
                      }
                    />
                  </div>
                ))}
            </div>
          </div>
          <Footer
            {...pdfData?.footerDetails}
            columnSettings={templateSettings}
            currPage={undefined}
            emailTemplateSettings={emailTemplateSettings}
          />
        </div>
      )} */}
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
