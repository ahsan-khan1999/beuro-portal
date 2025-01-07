import { Document, Font, Page, StyleSheet } from "@react-pdf/renderer";
import { ReportAddressDetails } from "./report-address-details";
import { HouseItemWrapper } from "./house-item-wrapper";
import { StaticImageData } from "next/image";
import { ServiceTableHederRow } from "../reactPdf/service-table-header-row";
import { ServiceTableRow } from "../reactPdf/service-table-row";
import { ServicesTotalAmount } from "../reactPdf/services-total-ammount";
import { PdfPreviewProps, RoomObject } from "@/types";
import { Header } from "../reactPdf/header";
import { Footer } from "../reactPdf/footer";
import { ContactAddress } from "../reactPdf/contact-address";
import { ReportPDFOfferDetails } from "./offer-details";
import { DynamicItemWrapper } from "./dynamic-item-wrapper";
import {
  getBasement,
  getBedRoom,
  getKitchenRoom,
  getLivingRoom,
  getOutdoorRoom,
  getRoom,
  getSpecialRoom,
  isRoomNotEmpty,
} from "@/utils/utility";

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
      src: "/assets/fonts/PoppinsRegular.ttf",
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
  const { address, workDates, time } = data?.movingDetails || {};
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

  const generalRooms = () => {
    const items: RoomObject[] = [];
    generalRoomDetails?.forEach((item) => {
      if (isRoomNotEmpty(item)) {
        items.push(item);
      }
    });
    return items;
  };

  const staticRooms = () => {
    const rooms: any[] = [];

    if (getLivingRoom(lang || "", livingRoomDetails)?.length > 0) {
      rooms[0] = [];
      rooms[0].push({
        items: getLivingRoom(lang || "", livingRoomDetails),
        mainHeading:
          langContent[lang as keyof typeof langContent]?.livingRoomHeading,
        description: livingRoomDetails?.descriptions,
      });
    }
    if (getKitchenRoom(lang || "", kitchenDetails)?.length > 0) {
      let length = rooms?.length || 0;
      if (length == 0) {
        rooms[0] = [];
        rooms[0].push({
          items: getKitchenRoom(lang || "", kitchenDetails),
          mainHeading:
            langContent[lang as keyof typeof langContent]?.kitchenHeading,
          description: kitchenDetails?.descriptions,
        });
      } else {
        rooms[0].push({
          items: getKitchenRoom(lang || "", kitchenDetails),
          mainHeading:
            langContent[lang as keyof typeof langContent]?.kitchenHeading,
          description: kitchenDetails?.descriptions,
        });
      }
    }

    if (getBedRoom(lang || "", bedRoomDetails)?.length > 0) {
      let length = rooms?.length || 0;
      if (length == 0) {
        rooms[0] = [];
        rooms[0].push({
          items: getBedRoom(lang || "", bedRoomDetails),
          mainHeading:
            langContent[lang as keyof typeof langContent]?.bedRoomHeading,
          description: bedRoomDetails?.descriptions,
        });
      } else {
        rooms[0].push({
          items: getBedRoom(lang || "", bedRoomDetails),
          mainHeading:
            langContent[lang as keyof typeof langContent]?.bedRoomHeading,
          description: bedRoomDetails?.descriptions,
        });
      }
    }

    if (getRoom(lang || "", roomDetails)?.length > 0) {
      let length = rooms?.length || 0;
      if (length == 0) {
        rooms[0] = [];
        rooms[0].push({
          items: getRoom(lang || "", roomDetails),
          mainHeading:
            langContent[lang as keyof typeof langContent]?.roomHeading,
          description: roomDetails?.descriptions,
        });
      } else if (rooms[length - 1].length < 3) {
        rooms[length - 1].push({
          items: getRoom(lang || "", roomDetails),
          mainHeading:
            langContent[lang as keyof typeof langContent]?.roomHeading,
          description: roomDetails?.descriptions,
        });
      } else {
        rooms[length] = [];
        rooms[length].push({
          items: getRoom(lang || "", roomDetails),
          mainHeading:
            langContent[lang as keyof typeof langContent]?.roomHeading,
          description: roomDetails?.descriptions,
        });
      }
    }

    if (getOutdoorRoom(lang || "", outDoorDetails)?.length > 0) {
      let length = rooms?.length || 0;
      if (length == 0) {
        rooms[0] = [];
        rooms[0].push({
          items: getOutdoorRoom(lang || "", outDoorDetails),
          mainHeading:
            langContent[lang as keyof typeof langContent]?.outdoorHeading,
          description: outDoorDetails?.descriptions,
        });
      } else if (rooms[length - 1].length < 3) {
        rooms[length - 1].push({
          items: getOutdoorRoom(lang || "", outDoorDetails),
          mainHeading:
            langContent[lang as keyof typeof langContent]?.outdoorHeading,
          description: outDoorDetails?.descriptions,
        });
      } else {
        rooms[length] = [];

        rooms[length].push({
          items: getOutdoorRoom(lang || "", outDoorDetails),
          mainHeading:
            langContent[lang as keyof typeof langContent]?.outdoorHeading,
          description: outDoorDetails?.descriptions,
        });
      }
    }

    if (getBasement(lang || "", basementAtticDetails)?.length > 0) {
      let length = rooms?.length || 0;
      if (length == 0) {
        rooms[0] = [];
        rooms[0].push({
          items: getBasement(lang || "", basementAtticDetails),
          mainHeading:
            langContent[lang as keyof typeof langContent]?.basementHeading,
          description: basementAtticDetails?.descriptions,
        });
      } else if (rooms[length - 1].length < 3) {
        rooms[length - 1].push({
          items: getBasement(lang || "", basementAtticDetails),
          mainHeading:
            langContent[lang as keyof typeof langContent]?.basementHeading,
          description: basementAtticDetails?.descriptions,
        });
      } else {
        rooms[length] = [];
        rooms[length].push({
          items: getBasement(lang || "", basementAtticDetails),
          mainHeading:
            langContent[lang as keyof typeof langContent]?.basementHeading,
          description: basementAtticDetails?.descriptions,
        });
      }
    }

    if (getSpecialRoom(lang || "", specialItemsDetails)?.length > 0) {
      let length = rooms?.length || 0;
      if (length == 0) {
        rooms[0] = [];
        rooms[0].push({
          items: getSpecialRoom(lang || "", specialItemsDetails),
          mainHeading:
            langContent[lang as keyof typeof langContent]?.specialHeading,
          description: specialItemsDetails?.descriptions,
        });
      } else if (rooms[length - 1].length < 3) {
        rooms[length - 1].push({
          items: getSpecialRoom(lang || "", specialItemsDetails),
          mainHeading:
            langContent[lang as keyof typeof langContent]?.specialHeading,
          description: specialItemsDetails?.descriptions,
        });
      } else {
        rooms[length] = [];
        rooms[length].push({
          items: getSpecialRoom(lang || "", specialItemsDetails),
          mainHeading:
            langContent[lang as keyof typeof langContent]?.specialHeading,
          description: specialItemsDetails?.descriptions,
        });
      }
    }

    return rooms;
  };

  const filterDynamicRooms = () => {
    const dynamicRooms: any[] = [];
    if (generalRooms() && generalRooms()?.length > 0) {
      generalRooms().forEach((item) => {
        let count = dynamicRooms.length || 0;
        if (count == 0) {
          dynamicRooms[0] = [];
          dynamicRooms[0].push(item);
        } else if (dynamicRooms[count - 1].length < 3) {
          dynamicRooms[count - 1].push(item);
        } else {
          dynamicRooms[count] = [];
          dynamicRooms[count].push(item);
        }
      });
    }
    return dynamicRooms;
  };

  return (
    <Document>
      <Page style={styles.body}>
        <Header {...headerDetails} language={lang} />

        <ContactAddress {...{ ...contactAddress, language: lang }} />
        <ReportAddressDetails
          {...{ address, workDates, time }}
          language={lang}
        />

        <ServiceTableHederRow
          isDiscount={isDiscount}
          language={lang}
          // bgColor="#4A13E7"
        />

        {serviceItem?.map((item, index) => (
          <ServiceTableRow
            {...item}
            key={index}
            pagebreak={false}
            // pagebreak={
            //   !pageBreakCondition
            //     ? serviceItem?.length === 1
            //       ? false
            //       : index === serviceItem?.length - 1
            //     : false
            // }

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

      {staticRooms() &&
        staticRooms().map((item, index) => (
          <Page style={styles.body} key={index}>
            <Header {...headerDetails} language={lang} />

            {item[0] && (
              <HouseItemWrapper
                mainHeading={item[0]?.mainHeading}
                description={item[0]?.description}
                items={item[0]?.items}
                language={lang}
              />
            )}
            {item[1] && (
              <HouseItemWrapper
                mainHeading={item[1]?.mainHeading}
                description={item[1]?.description}
                items={item[1]?.items}
                language={lang}
              />
            )}
            {item[2] && (
              <HouseItemWrapper
                mainHeading={item[2]?.mainHeading}
                description={item[2]?.description}
                items={item[2]?.items}
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
        ))}
      {filterDynamicRooms() &&
        filterDynamicRooms().map((item, index) => (
          <Page style={styles.body} key={index}>
            <Header {...headerDetails} language={lang} />

            {item[0] && (
              <DynamicItemWrapper generalRoom={item[0]} language={lang} />
            )}
            {item[1] && (
              <DynamicItemWrapper generalRoom={item[1]} language={lang} />
            )}
            {item[2] && (
              <DynamicItemWrapper generalRoom={item[2]} language={lang} />
            )}

            <Footer
              {...{
                emailTemplateSettings,
                templateSettings,
              }}
            />
          </Page>
        ))}

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
