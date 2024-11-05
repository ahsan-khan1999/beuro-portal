import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { HouseItem } from "./house-item";
import { HouseItemHeader } from "./house-item-header";
import { HouseDetailObjectProps } from "./generate-report-pdf";
import { RoomObject } from "@/types";
import shelfIcon from "@/assets/pngs/shelf.png";
import sofaIcon from "@/assets/pngs/safe.png";
import boxIcon from "@/assets/pngs/box.png";
import armChairIcon from "@/assets/pngs/arm-chair.png";
import lSofaIcon from "@/assets/pngs/l-sofa.png";
import tvTableIcon from "@/assets/pngs/tv-table.png";
import teacherDesckIcon from "@/assets/pngs/teacher-desk.png";
import deskIcon from "@/assets/pngs/desk.png";
import tvIcon from "@/assets/pngs/tv.png";
import decoGrossIcon from "@/assets/pngs/deco-gross.png";

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#D0D5DD",
    borderBottomStyle: "solid",
    paddingVertical: 15,
    marginHorizontal: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },
  column: {
    width: "30%",
  },
  mainHeading: {
    fontSize: 10,
    fontStyle: "semibold",
    fontWeight: 700,
    color: "#4A13E7",
    marginBottom: 5,
  },
  remarksContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: 3,
  },
  remarksHeading: {
    fontSize: 8,
    fontStyle: "medium",
    fontWeight: 500,
    color: "#1C1F35",
  },
  remarksDescription: {
    fontSize: 8,
    fontStyle: "normal",
    fontWeight: 400,
    color: "#474747",
    marginBottom: 15,
  },
});

interface RoomItem {
  generalRoom?: RoomObject;
  language?: string;
}

export const DynamicItemWrapper = ({ generalRoom, language }: RoomItem) => {
  const langContent = {
    en: {
      remarks: "Remarks",
    },

    de: {
      remarks: "Bemerkung",
    },
  };

  const generalRoomItem: HouseDetailObjectProps[] = [
    {
      icon: sofaIcon,
      name: generalRoom?.label1 || "",
      quantity: generalRoom?.label1Value,
    },
    {
      icon: teacherDesckIcon,
      name: generalRoom?.label2 || "",
      quantity: generalRoom?.label2Value,
    },
    {
      icon: tvTableIcon,
      name: generalRoom?.label3 || "",
      quantity: generalRoom?.label3Value,
    },
    {
      icon: armChairIcon,
      name: generalRoom?.label4 || "",
      quantity: generalRoom?.label4Value,
    },
    {
      icon: deskIcon,
      name: generalRoom?.label5 || "",
      quantity: generalRoom?.label5Value,
    },
    {
      icon: shelfIcon,
      name: generalRoom?.label6 || "",
      quantity: generalRoom?.label6Value,
    },
    {
      icon: lSofaIcon,
      name: generalRoom?.label7 || "",
      quantity: generalRoom?.label7Value,
    },
    {
      icon: tvIcon,
      name: generalRoom?.label8 || "",
      quantity: generalRoom?.label8Value,
    },
    {
      icon: decoGrossIcon,
      name: generalRoom?.label9 || "",
      quantity: generalRoom?.label9Value,
    },
    {
      icon: boxIcon,
      name: generalRoom?.label10 || "",
      quantity: generalRoom?.label10Value,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}>{generalRoom?.mainHeading}</Text>
      <View style={styles.remarksContainer}>
        <Text style={styles.remarksHeading}>
          {langContent[language as keyof typeof langContent]?.remarks}
        </Text>
        <Text style={styles.remarksDescription}>
          {generalRoom?.descriptions}
        </Text>
      </View>
      <HouseItemHeader language={language} />

      <View style={styles.grid}>
        {generalRoomItem?.map((item, index) => (
          <View key={index} style={styles.column}>
            <HouseItem
              icon={item.icon}
              name={item.name}
              quantity={item.quantity}
            />
          </View>
        ))}
      </View>
    </View>
  );
};
