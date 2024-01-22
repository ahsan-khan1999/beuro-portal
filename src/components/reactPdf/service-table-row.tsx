import { ServiceList } from "@/types/offers";
import { ServiceDetailProps } from "@/types/pdf";
import { View, Text } from "@react-pdf/renderer";
import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    width: 555,
    backgroundColor: "#F6F7F8",
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 12,
    marginHorizontal: 20,
    paddingHorizontal: 12,
  },
  headerRow: {
    flexDirection: "row",
    width: 531,
    columnGap: 1,
  },
  description: {
    color: "#000",
    fontSize: 12,
    fontWeight: "medium",
    display: "flex",
    flexDirection: "column",
    width: 230,
    rowGap: 4,
  },
  descriptionTextTitle: {
    color: "#000",
    fontSize: 10,
    fontWeight: 500,
    fontStyle: "medium",
    width: 230,
  },
  descriptionText: {
    color: "#404040",
    fontSize: 10,
    fontWeight: 400,
    fontStyle: "normal",
    width: 230,
  },
  priceHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
  },
  headerText: {
    color: "#000",
    fontSize: 10,
    fontWeight: 400,
    fontStyle: "normal",
    width: 75,
  },
  headerTotal: {
    color: "#000",
    fontSize: 10,
    fontWeight: 500,
    fontStyle: "medium",
    width: 75,
  },
  // headerTextTotal: {
  //   color: "#000",
  //   fontSize: 12,
  //   fontWeight: "bold",
  //   width: 100,
  // },
});

export const ServiceTableRow = ({
  count,
  description,
  price,
  serviceTitle,
  serviceType,
  totalPrice,
  pagebreak,
  unit,
}: Partial<ServiceList>) => {
  return (
    <View style={styles.headerContainer} break={pagebreak}>
      <View style={styles.headerRow}>
        <View style={styles.description}>
          <Text style={styles.descriptionTextTitle}>{serviceTitle}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
        <View style={styles.priceHeader}>
          <Text style={styles.headerText}>{price}</Text>
          <Text style={styles.headerText}>{unit}</Text>
          <Text style={styles.headerText}>{count}</Text>
          <Text style={styles.headerTotal}>{totalPrice}</Text>
        </View>
      </View>
    </View>
  );
};
