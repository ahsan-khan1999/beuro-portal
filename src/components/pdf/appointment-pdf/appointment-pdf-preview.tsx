import { SystemSetting } from "@/api/slices/settingSlice/settings";
import { PdfProps, TemplateType } from "@/types";
import { EmailTemplate } from "@/types/settings";
import React from "react";
import { DocumentHeader } from "../preview/document-header";
import { ContactDetails } from "../preview/contact-details";
import { MovingDetails } from "../preview/movng-details";
import { Footer } from "../footer";
import { ProductItem } from "../preview/productDetails/product-item";
import { ProcutItemHeader } from "../preview/productDetails/product-item-header";
import { ProductItemFooter } from "../preview/productDetails/product-item-footer";
import { ServicesTotalAmount } from "./sevices-total";
import { AddressDetailCard } from "@/components/setting/general-setting/address";
import AddressDetails from "./address-details";
import { ServiceItem } from "./service-item";
import { ServiceHeader } from "./service-header";
import { HouseItemWrapper } from "./house-item-wrapper";
import { HouseDetailObjectProps } from "@/components/reportPdf/generate-report-pdf";

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
import { DynamicItemWrapper } from "./dynamic-item-wrapper";
import { AppointmentDetails } from "./appointment-details";
import { isInArithmeticSequence } from "@/utils/utility";

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
  console.log("pdfData:", pdfData);
  const isDiscount =
    pdfData?.serviceItemFooter?.serviceDiscountSum &&
    Number(pdfData?.serviceItemFooter?.serviceDiscountSum) > 0
      ? true
      : false || false;

  const headerDetails = pdfData?.headerDetails;
  const { address, workDates } = pdfData?.movingDetails || {};
  const serviceItem = pdfData?.serviceItem;
  const serviceItemFooter = pdfData?.serviceItemFooter;
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
      washMachine: "Washing machine",
      shelf: "Shelf",
      box: "Box",
      bed: "Bed",
      doublebed: "Double bed",
      armchair: "Armchair",
      smallWoodDrobe: "Small wardrobe",
      mediumWoodDrobe: "Medium wardrobe",
      largeWoodDrobe: "Large wardrobe",
      nightStand: "Bedside table",
      plant: "Plants",
      tv: "Television",
      tvTable: "TV table",
      desk: "Desk",
      teacherDesk: "Teacher Desk",
      sofa: "Sofa",
      livingRoomItem: {
        teacherDesk: "Desk",
        lSofa: "L Sofa",
        decoGross: "Deco large",
      },
      kitchenItem: {
        oven: "Oven",
        refrigerator: "Refrigerator",
        freezer: "Deep Freezer",
        stove: "Stove",
        microOven: "Microwave",
        coffeMachine: "Coffee machine",
      },
      bedRoomItem: {
        dressingTable: "Dress Table",
      },
      outdoorItem: {
        grill: "Grill",
        chair: "Chairs",
        umbrella: "Umbrella",
        cup: "Pots",
        herbGen: "Herb bed",
        lawnmower: "Lawn mower",
      },
      basementItem: {
        disposible: "Disposals",
        cycle: "Bicycle",
        stroller: "Baby carriage",
        furniture: "Furniture",
        boxes: "Boxes",
      },
      specialItem: {
        aquairum: "Aquarium",
        piano: "Piano",
        gymSport: "Sports equipment",
        electronics: "Electronics",
        pool: "Pool",
        safe: "Tressor",
        lamp: "Lampe",
      },
      offerDetails: {
        employee: "Employees",
        deliveryVan: "Delivery van",
        hours: "Hours",
        cleaningHandOver: "Cleaning with delivery guarantee",
        broomClean: "Broom clean",
        price: "Price",
        noteInfo: "Note and information",
      },
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
      washMachine: "Waschmaschine",
      shelf: "Regal",
      box: "Box",
      bed: "Bett",
      doublebed: "Doppelbett",
      armchair: "Sessel",
      smallWoodDrobe: "Schrank klein",
      mediumWoodDrobe: "Schrank Mittel",
      largeWoodDrobe: "Schrank Gross",
      nightStand: "Nachttisch",
      plant: "Pflanzen",
      tv: "Fernseher",
      tvTable: "Fernsehtisch",
      desk: "Tisch",
      teacherDesk: "Pult",
      sofa: "Sofa",
      livingRoomItem: {
        teacherDesk: "Pult",
        lSofa: "L Sofa",
        decoGross: "Deco gross",
      },
      kitchenItem: {
        oven: "Backofen",
        refrigerator: "Kühlschrank",
        freezer: "Tiefkühler",
        stove: "Herd",
        microOven: "Mikrowelle",
        coffeMachine: "Kaffeemaschine",
      },
      bedRoomItem: {
        dressingTable: "Schminkanlage",
      },
      outdoorItem: {
        grill: "Grill",
        chair: "Stühle",
        umbrella: "Schirm",
        cup: "Töpfe",
        herbGen: "Kräuterbeet",
        lawnmower: "Rasenmäher",
      },
      basementItem: {
        disposible: "Entsorgungen",
        cycle: "Fahrrad",
        stroller: "Kinderwagen",
        furniture: "Möbel",
        boxes: "Boxen",
      },
      specialItem: {
        aquairum: "Aquarium",
        piano: "Piano",
        gymSport: "Sportgerät",
        electronics: "Elektronisches",
        pool: "Pool",
        safe: "Tressor",
        lamp: "Lampe",
      },
      offerDetails: {
        employee: "Mitarbeiter",
        deliveryVan: "Lieferwagen",
        hours: "Stunden",
        cleaningHandOver: "Reinigung mit Abgabegarantie",
        broomClean: "Besenrein",
        price: "Preis",
        noteInfo: "Hinweis und Angaben",
      },
    },
  };

  const pageBreakCondition = isDiscount || serviceItemFooter?.isDiscount;

  const livingRoomItem: HouseDetailObjectProps[] = [
    {
      icon: sofaIcon,
      name: `${langContent[language as keyof typeof langContent]?.sofa}`,
      quantity: livingRoomDetails?.sofa,
    },
    {
      icon: teacherDesckIcon,
      name: `${langContent[language as keyof typeof langContent]?.teacherDesk}`,
      quantity: livingRoomDetails?.teacherDesk,
    },
    {
      icon: tvTableIcon,
      name: `${langContent[language as keyof typeof langContent]?.tvTable}`,
      quantity: livingRoomDetails?.tvTable,
    },
    {
      icon: armChairIcon,
      name: `${langContent[language as keyof typeof langContent]?.armchair}`,
      quantity: livingRoomDetails?.armchair,
    },
    {
      icon: deskIcon,
      name: `${langContent[language as keyof typeof langContent]?.desk}`,
      quantity: livingRoomDetails?.table,
    },
    {
      icon: shelfIcon,
      name: `${langContent[language as keyof typeof langContent]?.shelf}`,
      quantity: livingRoomDetails?.shelf,
    },
    {
      icon: lSofaIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.livingRoomItem?.lSofa
      }`,
      quantity: livingRoomDetails?.LSofa,
    },
    {
      icon: tvIcon,
      name: `${langContent[language as keyof typeof langContent]?.tv}`,
      quantity: livingRoomDetails?.TV,
    },
    {
      icon: decoGrossIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.livingRoomItem
          ?.decoGross
      }`,
      quantity: livingRoomDetails?.decoBig,
    },
    {
      icon: boxIcon,
      name: `${langContent[language as keyof typeof langContent]?.box}`,
      quantity: livingRoomDetails?.box,
    },
  ];
  const kitchenRoomItem: HouseDetailObjectProps[] = [
    {
      icon: ovenIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.kitchenItem?.oven
      }`,
      quantity: kitchenDetails?.oven,
    },
    {
      icon: refrigeratorIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.kitchenItem
          ?.refrigerator
      }`,
      quantity: kitchenDetails?.refrigerator,
    },
    {
      icon: freezerIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.kitchenItem?.freezer
      }`,
      quantity: kitchenDetails?.freezer,
    },
    {
      icon: herdIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.kitchenItem?.stove
      }`,
      quantity: kitchenDetails?.stove,
    },
    {
      icon: microOvenIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.kitchenItem
          ?.microOven
      }`,
      quantity: kitchenDetails?.microwave,
    },
    {
      icon: coffeMacIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.kitchenItem
          ?.coffeMachine
      }`,
      quantity: kitchenDetails?.coffeeMachine,
    },
    {
      icon: washMacIcon,
      name: `${langContent[language as keyof typeof langContent]?.washMachine}`,
      quantity: kitchenDetails?.washingMachine,
    },
    {
      icon: tumblerIcon,
      name: `${langContent[language as keyof typeof langContent]?.tumbler}`,
      quantity: kitchenDetails?.tumbler,
    },
    {
      icon: shelfIcon,
      name: `${langContent[language as keyof typeof langContent]?.shelf}`,
      quantity: kitchenDetails?.shelf,
    },

    {
      icon: boxIcon,
      name: `${langContent[language as keyof typeof langContent]?.box}`,
      quantity: kitchenDetails?.box,
    },
  ];
  const bedRoomItem: HouseDetailObjectProps[] = [
    {
      icon: bedIcon,
      name: `${langContent[language as keyof typeof langContent]?.bed}`,
      quantity: bedRoomDetails?.bed,
    },
    {
      icon: doublebedIcon,
      name: `${langContent[language as keyof typeof langContent]?.doublebed}`,
      quantity: bedRoomDetails?.doubleBed,
    },
    {
      icon: armChairIcon,
      name: `${langContent[language as keyof typeof langContent]?.armchair}`,
      quantity: bedRoomDetails?.armchair,
    },
    {
      icon: singWoodDrobeIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.smallWoodDrobe
      }`,
      quantity: bedRoomDetails?.smallWardrobe,
    },
    {
      icon: medWoodDrobeIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.mediumWoodDrobe
      }`,
      quantity: bedRoomDetails?.mediumWardrobe,
    },
    {
      icon: largeWoodDrobeIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.largeWoodDrobe
      }`,
      quantity: bedRoomDetails?.largeWardrobe,
    },
    {
      icon: macupTableIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.bedRoomItem
          ?.dressingTable
      }`,
      quantity: bedRoomDetails?.dressingTable,
    },
    {
      icon: tableIcon,
      name: `${langContent[language as keyof typeof langContent]?.nightStand}`,
      quantity: bedRoomDetails?.nightstand,
    },
    {
      icon: shelfIcon,
      name: `${langContent[language as keyof typeof langContent]?.shelf}`,
      quantity: bedRoomDetails?.shelf,
    },
    {
      icon: teacherDesckIcon,
      name: `${langContent[language as keyof typeof langContent]?.teacherDesk}`,
      quantity: bedRoomDetails?.desk,
    },
    {
      icon: plantIcon,
      name: `${langContent[language as keyof typeof langContent]?.plant}`,
      quantity: bedRoomDetails?.plants,
    },

    {
      icon: boxIcon,
      name: `${langContent[language as keyof typeof langContent]?.box}`,
      quantity: bedRoomDetails?.box,
    },
  ];
  const roomItem: HouseDetailObjectProps[] = [
    {
      icon: bedIcon,
      name: `${langContent[language as keyof typeof langContent]?.bed}`,
      quantity: roomDetails?.bed,
    },
    {
      icon: doublebedIcon,
      name: `${langContent[language as keyof typeof langContent]?.doublebed}`,
      quantity: roomDetails?.doubleBed,
    },
    {
      icon: armChairIcon,
      name: `${langContent[language as keyof typeof langContent]?.armchair}`,
      quantity: roomDetails?.armchair,
    },
    {
      icon: singWoodDrobeIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.smallWoodDrobe
      }`,
      quantity: roomDetails?.smallWardrobe,
    },
    {
      icon: medWoodDrobeIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.mediumWoodDrobe
      }`,
      quantity: roomDetails?.mediumWardrobe,
    },
    {
      icon: largeWoodDrobeIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.largeWoodDrobe
      }`,
      quantity: roomDetails?.largeWardrobe,
    },
    {
      icon: shelfIcon,
      name: `${langContent[language as keyof typeof langContent]?.shelf}`,
      quantity: roomDetails?.shelf,
    },
    {
      icon: teacherDesckIcon,
      name: `${langContent[language as keyof typeof langContent]?.teacherDesk}`,
      quantity: roomDetails?.desk,
    },
    {
      icon: tvIcon,
      name: `${langContent[language as keyof typeof langContent]?.tv}`,
      quantity: roomDetails?.tv,
    },
    {
      icon: tvTableIcon,
      name: `${langContent[language as keyof typeof langContent]?.tvTable}`,
      quantity: roomDetails?.tvTable,
    },
    {
      icon: tableIcon,
      name: `${langContent[language as keyof typeof langContent]?.nightStand}`,
      quantity: roomDetails?.nightstand,
    },

    {
      icon: boxIcon,
      name: `${langContent[language as keyof typeof langContent]?.box}`,
      quantity: roomDetails?.box,
    },
  ];
  const outdoorItem: HouseDetailObjectProps[] = [
    {
      icon: grillIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.outdoorItem?.grill
      }`,
      quantity: outDoorDetails?.grill,
    },
    {
      icon: deskIcon,
      name: `${langContent[language as keyof typeof langContent]?.desk}`,
      quantity: outDoorDetails?.table,
    },
    {
      icon: chairIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.outdoorItem?.chair
      }`,
      quantity: outDoorDetails?.chairs,
    },
    {
      icon: sofaIcon,
      name: `${langContent[language as keyof typeof langContent]?.sofa}`,
      quantity: outDoorDetails?.sofa,
    },
    {
      icon: shelfIcon,
      name: `${langContent[language as keyof typeof langContent]?.shelf}`,
      quantity: outDoorDetails?.shelf,
    },
    {
      icon: umbellaIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.outdoorItem?.umbrella
      }`,
      quantity: outDoorDetails?.umbrella,
    },
    {
      icon: cupIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.outdoorItem?.cup
      }`,
      quantity: outDoorDetails?.pots,
    },
    {
      icon: plantIcon,
      name: `${langContent[language as keyof typeof langContent]?.plant}`,
      quantity: outDoorDetails?.plants,
    },
    {
      icon: grossyIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.outdoorItem?.herbGen
      }`,
      quantity: outDoorDetails?.herbGarden,
    },
    {
      icon: gymEquIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.outdoorItem
          ?.lawnmower
      }`,
      quantity: outDoorDetails?.lawnmower,
    },
  ];
  const basementItem: HouseDetailObjectProps[] = [
    {
      icon: washMacIcon,
      name: `${langContent[language as keyof typeof langContent]?.washMachine}`,
      quantity: basementAtticDetails?.washingMachine,
    },
    {
      icon: tumblerIcon,
      name: `${langContent[language as keyof typeof langContent]?.tumbler}`,
      quantity: basementAtticDetails?.tumbler,
    },
    {
      icon: shelfIcon,
      name: `${langContent[language as keyof typeof langContent]?.shelf}`,
      quantity: basementAtticDetails?.shelf,
    },
    {
      icon: disposibleIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.basementItem
          ?.disposible
      }`,
      quantity: basementAtticDetails?.disposal,
    },
    {
      icon: cycleIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.basementItem?.cycle
      }`,
      quantity: basementAtticDetails?.bicycle,
    },
    {
      icon: chilWalkerIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.basementItem
          ?.stroller
      }`,
      quantity: basementAtticDetails?.stroller,
    },
    {
      icon: mobelIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.basementItem
          ?.furniture
      }`,
      quantity: basementAtticDetails?.furniture,
    },
    {
      icon: boxIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.basementItem?.boxes
      }`,
      quantity: basementAtticDetails?.boxes,
    },
  ];
  const specialItem: HouseDetailObjectProps[] = [
    {
      icon: aquairumIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.specialItem?.aquairum
      }`,
      quantity: specialItemsDetails?.aquarium,
    },
    {
      icon: pianoIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.specialItem?.piano
      }`,
      quantity: specialItemsDetails?.piano,
    },
    {
      icon: gymSportIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.specialItem?.gymSport
      }`,
      quantity: specialItemsDetails?.gymEquipment,
    },
    {
      icon: electronicsIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.specialItem
          ?.electronics
      }`,
      quantity: specialItemsDetails?.electronics,
    },
    {
      icon: poolIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.specialItem?.pool
      }`,
      quantity: specialItemsDetails?.pool,
    },
    {
      icon: safeIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.specialItem?.safe
      }`,
      quantity: specialItemsDetails?.safe,
    },
    {
      icon: lampIcon,
      name: `${
        langContent[language as keyof typeof langContent]?.specialItem?.lamp
      }`,
      quantity: specialItemsDetails?.lamp,
    },
  ];

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
      <div className="mb-10 bg-white">
        <DocumentHeader
          {...pdfData?.headerDetails}
          emailTemplateSettings={emailTemplateSettings}
        />
        <div className="px-[80px]">
          <HouseItemWrapper
            mainHeading={
              langContent[language as keyof typeof langContent]
                ?.livingRoomHeading
            }
            description={livingRoomDetails?.descriptions}
            items={livingRoomItem}
            language={language}
            className="border-b border-b-[#ccc]"
          />
          <HouseItemWrapper
            mainHeading={
              langContent[language as keyof typeof langContent]?.kitchenHeading
            }
            description={kitchenDetails?.descriptions}
            items={kitchenRoomItem}
            language={language}
            className="border-b border-b-[#ccc]"
          />
          <HouseItemWrapper
            mainHeading={
              langContent[language as keyof typeof langContent]?.bedRoomHeading
            }
            description={bedRoomDetails?.descriptions}
            items={bedRoomItem}
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
      <div className="mb-10 bg-white">
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
            items={roomItem}
            language={language}
            className="border-b border-b-[#ccc]"
          />
          <HouseItemWrapper
            mainHeading={
              langContent[language as keyof typeof langContent]?.outdoorHeading
            }
            description={outDoorDetails?.descriptions}
            items={outdoorItem}
            language={language}
            className="border-b border-b-[#ccc]"
          />
          <HouseItemWrapper
            mainHeading={
              langContent[language as keyof typeof langContent]?.basementHeading
            }
            description={basementAtticDetails?.descriptions}
            items={basementItem}
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
              items={specialItem}
              language={language}
              className="border-b border-b-[#ccc]"
            />
            {generalRoomDetails && generalRoomDetails?.length > 0 && (
              <DynamicItemWrapper
                generalRoom={generalRoomDetails[0]}
                language={language}
                className="border-b border-b-[#ccc]"
              />
            )}
            {generalRoomDetails && generalRoomDetails?.length > 1 && (
              <DynamicItemWrapper
                generalRoom={generalRoomDetails[1]}
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
      {generalRoomDetails && generalRoomDetails.length > 2 && (
        <div className="mb-10 bg-white min-h-[100vh]  flex flex-col justify-between">
          <div>
            <DocumentHeader
              {...pdfData?.headerDetails}
              emailTemplateSettings={emailTemplateSettings}
            />

            <div className="px-[80px]">
              {generalRoomDetails
                .slice(2, generalRoomDetails.length)
                .map((item, index) => (
                  <div key={index}>
                    <DynamicItemWrapper
                      generalRoom={item}
                      language={language}
                      className={
                        Number(index + 1) === generalRoomDetails.length - 2
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
