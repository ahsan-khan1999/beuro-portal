import { Document, Font, Page, StyleSheet } from "@react-pdf/renderer";
import { ReportAddressDetails } from "./report-address-details";
import { HouseItemWrapper } from "./house-item-wrapper";
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
import { StaticImageData } from "next/image";
import { ServiceTableHederRow } from "../reactPdf/service-table-header-row";
import { ServiceTableRow } from "../reactPdf/service-table-row";
import { ServicesTotalAmount } from "../reactPdf/services-total-ammount";
import { PdfPreviewProps } from "@/types";
import { Header } from "../reactPdf/header";
import { Footer } from "../reactPdf/footer";
import { ContactAddress } from "../reactPdf/contact-address";
import { ReportPDFOfferDetails } from "./offer-details";
import { DynamicItemWrapper } from "./dynamic-item-wrapper";

export interface HouseDetailObjectProps {
  icon: StaticImageData;
  name: string;
  quantity?: number;
}

Font.register({
  family: "Poppins",
  fonts: [
    {
      src: "/assets/fonts/Poppins-Thin.ttf",
      fontStyle: "thin",
      fontWeight: 100,
    },
    {
      src: "/assets/fonts/Poppins-ThinItalic.ttf",
      fontStyle: "italic",
      fontWeight: 100,
    },
    {
      src: "/assets/fonts/Poppins-Regular.ttf",
      fontStyle: "normal",
      fontWeight: 400,
    },
    {
      src: "/assets/fonts/Poppins-Light.ttf",
      fontStyle: "light",
      fontWeight: 300,
    },
    {
      src: "/assets/fonts/Poppins-LightItalic.ttf",
      fontStyle: "italic",
      fontWeight: 300,
    },
    {
      src: "/assets/fonts/Poppins-Medium.ttf",
      fontStyle: "medium",
      fontWeight: 500,
    },
    {
      src: "/assets/fonts/Poppins-MediumItalic.ttf",
      fontStyle: "italic",
      fontWeight: 500,
    },
    {
      src: "/assets/fonts/Poppins-SemiBold.ttf",
      fontStyle: "semibold",
      fontWeight: 600,
    },
    {
      src: "/assets/fonts/Poppins-SemiBoldItalic.ttf",
      fontStyle: "italic",
      fontWeight: 600,
    },
    {
      src: "/assets/fonts/Poppins-Bold.ttf",
      fontStyle: "bold",
      fontWeight: 700,
    },
    {
      src: "/assets/fonts/Poppins-BoldItalic.ttf",
      fontStyle: "italic",
      fontWeight: 700,
    },
    {
      src: "/assets/fonts/Poppins-Black.ttf",
      fontStyle: "black",
      fontWeight: 800,
    },
    {
      src: "/assets/fonts/Poppins-BlackItalic.ttf",
      fontStyle: "italic",
      fontWeight: 800,
    },
  ],
});

const ReportPdf = ({
  data,
  templateSettings,
  emailTemplateSettings,
  systemSetting,
  lang,
}: PdfPreviewProps) => {
  const headerDetails = data?.headerDetails;
  const { address } = data?.movingDetails || {};
  const serviceItem = data?.serviceItem;
  const serviceItemFooter = data?.serviceItemFooter;
  const livingRoomDetails = data?.houseDetails?.livingRoomDetails;
  const generalRoomDetails = data?.houseDetails?.generalRoomDetails;
  const kitchenDetails = data?.houseDetails?.kitchenDetails;
  const roomDetails = data?.houseDetails?.roomDetails;
  const bedRoomDetails = data?.houseDetails?.bedRoomDetails;
  const outDoorDetails = data?.houseDetails?.outDoorDetails;
  const basementAtticDetails = data?.houseDetails?.basementAtticDetails;
  const specialItemsDetails = data?.houseDetails?.specialItemsDetails;
  const offerDetails = data?.offerDetails;
  const contactAddress = data?.contactAddress;

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

  const isDiscount =
    serviceItemFooter?.serviceDiscountSum &&
    Number(serviceItemFooter?.serviceDiscountSum) > 0
      ? true
      : false || false;

  const pageBreakCondition = isDiscount || serviceItemFooter?.isDiscount;

  const livingRoomItem: HouseDetailObjectProps[] = [
    {
      icon: sofaIcon,
      name: `${langContent[lang as keyof typeof langContent]?.sofa}`,
      quantity: livingRoomDetails?.sofa,
    },
    {
      icon: teacherDesckIcon,
      name: `${langContent[lang as keyof typeof langContent]?.teacherDesk}`,
      quantity: livingRoomDetails?.teacherDesk,
    },
    {
      icon: tvTableIcon,
      name: `${langContent[lang as keyof typeof langContent]?.tvTable}`,
      quantity: livingRoomDetails?.tvTable,
    },
    {
      icon: armChairIcon,
      name: `${langContent[lang as keyof typeof langContent]?.armchair}`,
      quantity: livingRoomDetails?.armchair,
    },
    {
      icon: deskIcon,
      name: `${langContent[lang as keyof typeof langContent]?.desk}`,
      quantity: livingRoomDetails?.table,
    },
    {
      icon: shelfIcon,
      name: `${langContent[lang as keyof typeof langContent]?.shelf}`,
      quantity: livingRoomDetails?.shelf,
    },
    {
      icon: lSofaIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.livingRoomItem?.lSofa
      }`,
      quantity: livingRoomDetails?.LSofa,
    },
    {
      icon: tvIcon,
      name: `${langContent[lang as keyof typeof langContent]?.tv}`,
      quantity: livingRoomDetails?.TV,
    },
    {
      icon: decoGrossIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.livingRoomItem?.decoGross
      }`,
      quantity: livingRoomDetails?.decoBig,
    },
    {
      icon: boxIcon,
      name: `${langContent[lang as keyof typeof langContent]?.box}`,
      quantity: livingRoomDetails?.box,
    },
  ];
  const kitchenRoomItem: HouseDetailObjectProps[] = [
    {
      icon: ovenIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.kitchenItem?.oven
      }`,
      quantity: kitchenDetails?.oven,
    },
    {
      icon: refrigeratorIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.kitchenItem?.refrigerator
      }`,
      quantity: kitchenDetails?.refrigerator,
    },
    {
      icon: freezerIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.kitchenItem?.freezer
      }`,
      quantity: kitchenDetails?.freezer,
    },
    {
      icon: herdIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.kitchenItem?.stove
      }`,
      quantity: kitchenDetails?.stove,
    },
    {
      icon: microOvenIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.kitchenItem?.microOven
      }`,
      quantity: kitchenDetails?.microwave,
    },
    {
      icon: coffeMacIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.kitchenItem?.coffeMachine
      }`,
      quantity: kitchenDetails?.coffeeMachine,
    },
    {
      icon: washMacIcon,
      name: `${langContent[lang as keyof typeof langContent]?.washMachine}`,
      quantity: kitchenDetails?.washingMachine,
    },
    {
      icon: tumblerIcon,
      name: `${langContent[lang as keyof typeof langContent]?.tumbler}`,
      quantity: kitchenDetails?.tumbler,
    },
    {
      icon: shelfIcon,
      name: `${langContent[lang as keyof typeof langContent]?.shelf}`,
      quantity: kitchenDetails?.shelf,
    },

    {
      icon: boxIcon,
      name: `${langContent[lang as keyof typeof langContent]?.box}`,
      quantity: kitchenDetails?.box,
    },
  ];
  const bedRoomItem: HouseDetailObjectProps[] = [
    {
      icon: bedIcon,
      name: `${langContent[lang as keyof typeof langContent]?.bed}`,
      quantity: bedRoomDetails?.bed,
    },
    {
      icon: doublebedIcon,
      name: `${langContent[lang as keyof typeof langContent]?.doublebed}`,
      quantity: bedRoomDetails?.doubleBed,
    },
    {
      icon: armChairIcon,
      name: `${langContent[lang as keyof typeof langContent]?.armchair}`,
      quantity: bedRoomDetails?.armchair,
    },
    {
      icon: singWoodDrobeIcon,
      name: `${langContent[lang as keyof typeof langContent]?.smallWoodDrobe}`,
      quantity: bedRoomDetails?.smallWardrobe,
    },
    {
      icon: medWoodDrobeIcon,
      name: `${langContent[lang as keyof typeof langContent]?.mediumWoodDrobe}`,
      quantity: bedRoomDetails?.mediumWardrobe,
    },
    {
      icon: largeWoodDrobeIcon,
      name: `${langContent[lang as keyof typeof langContent]?.largeWoodDrobe}`,
      quantity: bedRoomDetails?.largeWardrobe,
    },
    {
      icon: macupTableIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.bedRoomItem
          ?.dressingTable
      }`,
      quantity: bedRoomDetails?.dressingTable,
    },
    {
      icon: tableIcon,
      name: `${langContent[lang as keyof typeof langContent]?.nightStand}`,
      quantity: bedRoomDetails?.nightstand,
    },
    {
      icon: shelfIcon,
      name: `${langContent[lang as keyof typeof langContent]?.shelf}`,
      quantity: bedRoomDetails?.shelf,
    },
    {
      icon: teacherDesckIcon,
      name: `${langContent[lang as keyof typeof langContent]?.teacherDesk}`,
      quantity: bedRoomDetails?.desk,
    },
    {
      icon: plantIcon,
      name: `${langContent[lang as keyof typeof langContent]?.plant}`,
      quantity: bedRoomDetails?.plants,
    },

    {
      icon: boxIcon,
      name: `${langContent[lang as keyof typeof langContent]?.box}`,
      quantity: bedRoomDetails?.box,
    },
  ];
  const roomItem: HouseDetailObjectProps[] = [
    {
      icon: bedIcon,
      name: `${langContent[lang as keyof typeof langContent]?.bed}`,
      quantity: roomDetails?.bed,
    },
    {
      icon: doublebedIcon,
      name: `${langContent[lang as keyof typeof langContent]?.doublebed}`,
      quantity: roomDetails?.doubleBed,
    },
    {
      icon: armChairIcon,
      name: `${langContent[lang as keyof typeof langContent]?.armchair}`,
      quantity: roomDetails?.armchair,
    },
    {
      icon: singWoodDrobeIcon,
      name: `${langContent[lang as keyof typeof langContent]?.smallWoodDrobe}`,
      quantity: roomDetails?.smallWardrobe,
    },
    {
      icon: medWoodDrobeIcon,
      name: `${langContent[lang as keyof typeof langContent]?.mediumWoodDrobe}`,
      quantity: roomDetails?.mediumWardrobe,
    },
    {
      icon: largeWoodDrobeIcon,
      name: `${langContent[lang as keyof typeof langContent]?.largeWoodDrobe}`,
      quantity: roomDetails?.largeWardrobe,
    },
    {
      icon: shelfIcon,
      name: `${langContent[lang as keyof typeof langContent]?.shelf}`,
      quantity: roomDetails?.shelf,
    },
    {
      icon: teacherDesckIcon,
      name: `${langContent[lang as keyof typeof langContent]?.teacherDesk}`,
      quantity: roomDetails?.desk,
    },
    {
      icon: tvIcon,
      name: `${langContent[lang as keyof typeof langContent]?.tv}`,
      quantity: roomDetails?.tv,
    },
    {
      icon: tvTableIcon,
      name: `${langContent[lang as keyof typeof langContent]?.tvTable}`,
      quantity: roomDetails?.tvTable,
    },
    {
      icon: tableIcon,
      name: `${langContent[lang as keyof typeof langContent]?.nightStand}`,
      quantity: roomDetails?.nightstand,
    },

    {
      icon: boxIcon,
      name: `${langContent[lang as keyof typeof langContent]?.box}`,
      quantity: roomDetails?.box,
    },
  ];
  const outdoorItem: HouseDetailObjectProps[] = [
    {
      icon: grillIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.outdoorItem?.grill
      }`,
      quantity: outDoorDetails?.grill,
    },
    {
      icon: deskIcon,
      name: `${langContent[lang as keyof typeof langContent]?.desk}`,
      quantity: outDoorDetails?.table,
    },
    {
      icon: chairIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.outdoorItem?.chair
      }`,
      quantity: outDoorDetails?.chairs,
    },
    {
      icon: sofaIcon,
      name: `${langContent[lang as keyof typeof langContent]?.sofa}`,
      quantity: outDoorDetails?.sofa,
    },
    {
      icon: shelfIcon,
      name: `${langContent[lang as keyof typeof langContent]?.shelf}`,
      quantity: outDoorDetails?.shelf,
    },
    {
      icon: umbellaIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.outdoorItem?.umbrella
      }`,
      quantity: outDoorDetails?.umbrella,
    },
    {
      icon: cupIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.outdoorItem?.cup
      }`,
      quantity: outDoorDetails?.pots,
    },
    {
      icon: plantIcon,
      name: `${langContent[lang as keyof typeof langContent]?.plant}`,
      quantity: outDoorDetails?.plants,
    },
    {
      icon: grossyIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.outdoorItem?.herbGen
      }`,
      quantity: outDoorDetails?.herbGarden,
    },
    {
      icon: gymEquIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.outdoorItem?.lawnmower
      }`,
      quantity: outDoorDetails?.lawnmower,
    },
  ];
  const basementItem: HouseDetailObjectProps[] = [
    {
      icon: washMacIcon,
      name: `${langContent[lang as keyof typeof langContent]?.washMachine}`,
      quantity: basementAtticDetails?.washingMachine,
    },
    {
      icon: tumblerIcon,
      name: `${langContent[lang as keyof typeof langContent]?.tumbler}`,
      quantity: basementAtticDetails?.tumbler,
    },
    {
      icon: shelfIcon,
      name: `${langContent[lang as keyof typeof langContent]?.shelf}`,
      quantity: basementAtticDetails?.shelf,
    },
    {
      icon: disposibleIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.basementItem?.disposible
      }`,
      quantity: basementAtticDetails?.disposal,
    },
    {
      icon: cycleIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.basementItem?.cycle
      }`,
      quantity: basementAtticDetails?.bicycle,
    },
    {
      icon: chilWalkerIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.basementItem?.stroller
      }`,
      quantity: basementAtticDetails?.stroller,
    },
    {
      icon: mobelIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.basementItem?.furniture
      }`,
      quantity: basementAtticDetails?.furniture,
    },
    {
      icon: boxIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.basementItem?.boxes
      }`,
      quantity: basementAtticDetails?.boxes,
    },
  ];
  const specialItem: HouseDetailObjectProps[] = [
    {
      icon: aquairumIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.specialItem?.aquairum
      }`,
      quantity: specialItemsDetails?.aquarium,
    },
    {
      icon: pianoIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.specialItem?.piano
      }`,
      quantity: specialItemsDetails?.piano,
    },
    {
      icon: gymSportIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.specialItem?.gymSport
      }`,
      quantity: specialItemsDetails?.gymEquipment,
    },
    {
      icon: electronicsIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.specialItem?.electronics
      }`,
      quantity: specialItemsDetails?.electronics,
    },
    {
      icon: poolIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.specialItem?.pool
      }`,
      quantity: specialItemsDetails?.pool,
    },
    {
      icon: safeIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.specialItem?.safe
      }`,
      quantity: specialItemsDetails?.safe,
    },
    {
      icon: lampIcon,
      name: `${
        langContent[lang as keyof typeof langContent]?.specialItem?.lamp
      }`,
      quantity: specialItemsDetails?.lamp,
    },
  ];

  // for dynamic room to put fix three room on every page

  // const filterDynamicRooms = () => {
  //   const dynamicRooms: any[] = [];
  //   if (generalRoomDetails && generalRoomDetails?.length > 1) {
  //     generalRoomDetails.slice(1, generalRoomDetails.length).forEach((item) => {
  //       let count = dynamicRooms.length || 0;
  //       if (count == 0) {
  //         dynamicRooms[0] = [];
  //         dynamicRooms[0].push(item);
  //       } else if (dynamicRooms[count - 1].length < 3) {
  //         dynamicRooms[count - 1].push(item);
  //       } else {
  //         dynamicRooms[count] = [];
  //         dynamicRooms[count].push(item);
  //       }
  //     });
  //   }
  //   return dynamicRooms;
  // };

  return (
    <Document>
      <Page style={styles.body} dpi={72} break={true}>
        <Header {...headerDetails} language={lang} />

        <ContactAddress {...{ ...contactAddress }} />
        <ReportAddressDetails {...{ address }} language={lang} />

        <HouseItemWrapper
          mainHeading={
            langContent[lang as keyof typeof langContent]?.livingRoomHeading
          }
          description={livingRoomDetails?.descriptions}
          items={livingRoomItem}
          language={lang}
        />

        <HouseItemWrapper
          mainHeading={
            langContent[lang as keyof typeof langContent]?.kitchenHeading
          }
          description={kitchenDetails?.descriptions}
          items={kitchenRoomItem}
          language={lang}
        />

        <Footer
          {...{
            emailTemplateSettings,
            templateSettings,
          }}
        />
      </Page>
      <Page style={styles.body}>
        <Header {...headerDetails} language={lang} />
        <HouseItemWrapper
          mainHeading={
            langContent[lang as keyof typeof langContent]?.bedRoomHeading
          }
          description={bedRoomDetails?.descriptions}
          items={bedRoomItem}
          language={lang}
        />

        <HouseItemWrapper
          mainHeading={
            langContent[lang as keyof typeof langContent]?.roomHeading
          }
          description={roomDetails?.descriptions}
          items={roomItem}
          language={lang}
        />
        <HouseItemWrapper
          mainHeading={
            langContent[lang as keyof typeof langContent]?.outdoorHeading
          }
          description={outDoorDetails?.descriptions}
          items={outdoorItem}
          language={lang}
        />

        <Footer
          {...{
            emailTemplateSettings,
            templateSettings,
          }}
        />
      </Page>
      <Page style={styles.body}>
        <Header {...headerDetails} language={lang} />
        <HouseItemWrapper
          mainHeading={
            langContent[lang as keyof typeof langContent]?.basementHeading
          }
          description={basementAtticDetails?.descriptions}
          items={basementItem}
          language={lang}
        />
        <HouseItemWrapper
          mainHeading={
            langContent[lang as keyof typeof langContent]?.specialHeading
          }
          description={specialItemsDetails?.descriptions}
          items={specialItem}
          language={lang}
        />

        {generalRoomDetails && generalRoomDetails?.length > 0 && (
          <DynamicItemWrapper
            generalRoom={generalRoomDetails[0]}
            language={lang}
          />
        )}

        <Footer
          {...{
            emailTemplateSettings,
            templateSettings,
          }}
        />
      </Page>

      {generalRoomDetails && generalRoomDetails.length > 1 && (
        <Page style={styles.body}>
          <Header {...headerDetails} language={lang} />

          {generalRoomDetails
            .slice(1, generalRoomDetails.length)
            .map((item) => (
              <DynamicItemWrapper generalRoom={item} language={lang} />
            ))}

          <Footer
            {...{
              emailTemplateSettings,
              templateSettings,
            }}
          />
        </Page>
      )}
      <Page style={styles.body}>
        <Header {...headerDetails} language={lang} />
        <ServiceTableHederRow
          isDiscount={isDiscount}
          language={lang}
          // bgColor="#4A13E7"
        />

        {serviceItem?.map((item, index) => (
          <ServiceTableRow
            {...item}
            key={index}
            pagebreak={
              !pageBreakCondition
                ? serviceItem?.length === 1
                  ? false
                  : index === serviceItem?.length - 1
                : false
            }
            isDiscount={isDiscount}
          />
        ))}

        <ServicesTotalAmount
          {...serviceItemFooter}
          systemSettings={systemSetting}
          language={lang}
          isBreakPage={false}
        />

        <Footer
          {...{
            emailTemplateSettings,
            templateSettings,
          }}
        />
      </Page>
      <Page style={styles.body}>
        <Header {...headerDetails} language={lang} />
        <ReportPDFOfferDetails language={lang} {...offerDetails} />
        <Footer
          {...{
            emailTemplateSettings,
            templateSettings,
          }}
        />
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    fontFamily: "Poppins",
    paddingBottom: 100,
  },
});

export default ReportPdf;
