import { View, Image, Text, StyleSheet } from "@react-pdf/renderer";
import { HouseDetailObjectProps } from "./generate-report-pdf";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
  },
  textbase: {
    fontSize: 8,
    fontStyle: "medium",
    fontWeight: 500,
    color: "#1C1F35",
  },
  img: {
    width: 20,
    height: 15,
  },
  qtyDiv: {
    width: 15,
    height: 15,
    border: 1,
    borderRadius: 2,
    borderColor: "#D0D5DD",
    borderStyle: "solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const HouseItem = ({ icon, name, quantity }: HouseDetailObjectProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Image src={icon.src} style={styles.img} />
        <Text style={styles.textbase}>{name}</Text>
      </View>

      <View style={styles.qtyDiv}>
        <Text style={{ ...styles.textbase, overflow: "hidden" }}>
          {quantity}
        </Text>
      </View>
    </View>
  );
};
