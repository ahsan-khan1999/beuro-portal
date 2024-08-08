import { Document, Font, Page, StyleSheet, View } from "@react-pdf/renderer";
import { ReportPDFHeader } from "./header";
import { ReportPDFFooter } from "./footer";
import { ReportContactAddress } from "./contact-address";
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
import { ReportPdfProps } from "@/types/appointments";
import { ServiceTableHederRow } from "../reactPdf/service-table-header-row";
import { ServiceTableRow } from "../reactPdf/service-table-row";
import { ServicesTotalAmount } from "../reactPdf/services-total-ammount";

export interface HouseDetailObjectProps {
  icon: StaticImageData;
  name: string;
  quantity: number;
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

const ReportPdf = ({ data, language, systemSetting }: ReportPdfProps) => {
  const date = data?.headerDetails?.date;
  const { address } = data?.movingDetails || {};
  const serviceItem = data?.serviceItem;
  const serviceItemFooter = data?.serviceItemFooter;
  const livingRoomDetails = data?.houseDetails?.livingRoomDetails;
  const kitchenDetails = data?.houseDetails?.kitchenDetails;
  const roomDetails = data?.houseDetails?.roomDetails;
  const bedRoomDetails = data?.houseDetails?.bedRoomDetails;
  const specialItemsDetails = data?.houseDetails?.specialItemsDetails;
  const outDoorDetails = data?.houseDetails?.outDoorDetails;
  const basementAtticDetails = data?.houseDetails?.basementAtticDetails;
  const offerDetails = data?.offerDetails;
  const contactAddress = data?.contactAddress;

  const isDiscount =
    serviceItemFooter?.serviceDiscountSum &&
    Number(serviceItemFooter?.serviceDiscountSum) > 0
      ? true
      : false || false;

  const pageBreakCondition = isDiscount || serviceItemFooter?.isDiscount;

  const livingRoomItem: HouseDetailObjectProps[] = [
    { icon: sofaIcon, name: "Sofa", quantity: livingRoomDetails?.sofa },
    {
      icon: teacherDesckIcon,
      name: "Pult",
      quantity: livingRoomDetails?.teacherDesk,
    },
    {
      icon: tvTableIcon,
      name: "Fernsehtisch",
      quantity: livingRoomDetails?.tvTable,
    },
    {
      icon: armChairIcon,
      name: "Sessel",
      quantity: livingRoomDetails?.armchair,
    },
    { icon: deskIcon, name: "Tisch", quantity: livingRoomDetails?.table },
    { icon: shelfIcon, name: "Regal", quantity: livingRoomDetails?.shelf },
    { icon: lSofaIcon, name: "L Sofa", quantity: livingRoomDetails?.LSofa },
    { icon: tvIcon, name: "Fernseher", quantity: livingRoomDetails?.TV },
    {
      icon: grossyIcon,
      name: "Deco gross",
      quantity: livingRoomDetails?.decoBig,
    },
    { icon: boxIcon, name: "Box", quantity: livingRoomDetails?.box },
  ];
  const kitchenRoomItem: HouseDetailObjectProps[] = [
    { icon: ovenIcon, name: "Backofen", quantity: kitchenDetails?.oven },
    {
      icon: refrigeratorIcon,
      name: "Kühlschrank",
      quantity: kitchenDetails?.refrigerator,
    },
    {
      icon: freezerIcon,
      name: "Tiefkühler",
      quantity: kitchenDetails?.freezer,
    },
    {
      icon: herdIcon,
      name: "Herd",
      quantity: kitchenDetails?.stove,
    },
    {
      icon: microOvenIcon,
      name: "Mikrowelle",
      quantity: kitchenDetails?.microwave,
    },
    {
      icon: coffeMacIcon,
      name: "Kaffeemaschine",
      quantity: kitchenDetails?.coffeeMachine,
    },
    {
      icon: washMacIcon,
      name: "Waschmaschine",
      quantity: kitchenDetails?.washingMachine,
    },
    { icon: tumblerIcon, name: "Tumbler", quantity: kitchenDetails?.tumbler },
    {
      icon: shelfIcon,
      name: "Regal",
      quantity: kitchenDetails?.shelf,
    },

    { icon: boxIcon, name: "Box", quantity: kitchenDetails?.box },
  ];
  const bedRoomItem: HouseDetailObjectProps[] = [
    {
      icon: bedIcon,
      name: "Bett",
      quantity: bedRoomDetails?.bed,
    },
    {
      icon: doublebedIcon,
      name: "Doppelbett",
      quantity: bedRoomDetails?.doubleBed,
    },
    {
      icon: armChairIcon,
      name: "Sessel",
      quantity: bedRoomDetails?.armchair,
    },
    {
      icon: singWoodDrobeIcon,
      name: "Schrank klein",
      quantity: bedRoomDetails?.smallWardrobe,
    },
    {
      icon: medWoodDrobeIcon,
      name: "Schrank Mittel",
      quantity: bedRoomDetails?.mediumWardrobe,
    },
    {
      icon: largeWoodDrobeIcon,
      name: "Schrank Gross",
      quantity: bedRoomDetails?.largeWardrobe,
    },
    {
      icon: macupTableIcon,
      name: "Schminkanlage",
      quantity: bedRoomDetails?.dressingTable,
    },
    {
      icon: tableIcon,
      name: "Nachttisch",
      quantity: bedRoomDetails?.nightstand,
    },
    {
      icon: shelfIcon,
      name: "Regal",
      quantity: bedRoomDetails?.shelf,
    },
    {
      icon: teacherDesckIcon,
      name: "Pult",
      quantity: bedRoomDetails?.desk,
    },
    {
      icon: plantIcon,
      name: "Pflanzen",
      quantity: bedRoomDetails?.plants,
    },

    { icon: boxIcon, name: "Box", quantity: bedRoomDetails?.box },
  ];
  const roomItem: HouseDetailObjectProps[] = [
    {
      icon: bedIcon,
      name: "Bett",
      quantity: roomDetails?.bed,
    },
    {
      icon: doublebedIcon,
      name: "Doppelbett",
      quantity: roomDetails?.doubleBed,
    },
    {
      icon: armChairIcon,
      name: "Sessel",
      quantity: roomDetails?.armchair,
    },
    {
      icon: singWoodDrobeIcon,
      name: "Schrank klein",
      quantity: roomDetails?.smallWardrobe,
    },
    {
      icon: medWoodDrobeIcon,
      name: "Schrank Mittel",
      quantity: roomDetails?.mediumWardrobe,
    },
    {
      icon: largeWoodDrobeIcon,
      name: "Schrank Gross",
      quantity: roomDetails?.largeWardrobe,
    },
    {
      icon: shelfIcon,
      name: "Regal",
      quantity: roomDetails?.shelf,
    },
    {
      icon: teacherDesckIcon,
      name: "Pult",
      quantity: roomDetails?.desk,
    },
    {
      icon: tvIcon,
      name: "Fernseher",
      quantity: roomDetails?.tv,
    },
    {
      icon: tvTableIcon,
      name: "Fernsehtisch",
      quantity: roomDetails?.tvTable,
    },
    {
      icon: tableIcon,
      name: "Nachttisch",
      quantity: roomDetails?.nightstand,
    },

    { icon: boxIcon, name: "Box", quantity: roomDetails?.box },
  ];
  const outdoorItem: HouseDetailObjectProps[] = [
    {
      icon: grillIcon,
      name: "Grill",
      quantity: outDoorDetails?.grill,
    },
    {
      icon: deskIcon,
      name: "Tisch",
      quantity: outDoorDetails?.table,
    },
    {
      icon: chairIcon,
      name: "Stühle",
      quantity: outDoorDetails?.chairs,
    },
    {
      icon: sofaIcon,
      name: "Sofa",
      quantity: outDoorDetails?.sofa,
    },
    {
      icon: shelfIcon,
      name: "Regal",
      quantity: outDoorDetails?.shelf,
    },
    {
      icon: umbellaIcon,
      name: "Schirm",
      quantity: outDoorDetails?.umbrella,
    },
    {
      icon: cupIcon,
      name: "Töpfe",
      quantity: outDoorDetails?.pots,
    },
    {
      icon: plantIcon,
      name: "Pflanzen",
      quantity: outDoorDetails?.plants,
    },
    {
      icon: grossyIcon,
      name: "Kräuterbeet",
      quantity: outDoorDetails?.herbGarden,
    },
    {
      icon: gymEquIcon,
      name: "Rasenmäher",
      quantity: outDoorDetails?.lawnmower,
    },
  ];

  return (
    <Document>
      <Page style={styles.body} dpi={72} break={true}>
        <ReportPDFHeader date={date} language={language} />

        <ReportContactAddress {...{ ...contactAddress }} />
        <ReportAddressDetails {...{ address }} language={language} />

        <HouseItemWrapper
          mainHeading="Wohnzimmer(WZ)"
          description={livingRoomDetails?.descriptions}
          items={livingRoomItem}
        />

        <HouseItemWrapper
          mainHeading="Küche"
          description={kitchenDetails?.descriptions}
          items={kitchenRoomItem}
        />
        <HouseItemWrapper
          mainHeading="Schlafzimmer"
          description={bedRoomDetails?.descriptions}
          items={bedRoomItem}
        />

        <HouseItemWrapper
          mainHeading="Zimmer(Z)"
          description={roomDetails?.descriptions}
          items={roomItem}
        />
        <HouseItemWrapper
          mainHeading="Balkon/Terrasse/Garten (B/T/G)"
          description={outDoorDetails?.descriptions}
          items={outdoorItem}
        />

        <View style={styles.footerContainer}>
          <ReportPDFFooter />
        </View>
      </Page>

      <Page style={{ paddingBottom: 145, fontFamily: "Poppins" }} break={true}>
        <View style={{ marginBottom: 10 }} fixed>
          <ReportPDFHeader date={date} language={language} />
        </View>

        <ServiceTableHederRow
          isDiscount={isDiscount}
          language={language}
          bgColor="#4A13E7"
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
          language={language}
          isBreakPage={true}
        />

        <View style={styles.footerContainer}>
          <ReportPDFFooter />
        </View>
      </Page>
    </Document>
  );
};

export default ReportPdf;

const styles = StyleSheet.create({
  body: {
    paddingBottom: 50,
    fontFamily: "Poppins",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
