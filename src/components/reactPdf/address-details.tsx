import { AddressDetailsProps } from "@/types/pdf";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { A4_WIDTH } from "./pdf-layout";

// Define your styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 3,
    borderBottomWidth: 3,
    marginBottom: 8,
  },
  addressRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#8C8C8C",
    borderBottomStyle: "solid",
  },
  addressText: {
    color: "#141414",
    fontSize: 14,
    display: "flex",
    flexDirection: "row",
    columnGap: 30,
  },
  dateRow: {
    display: "flex",
    flexDirection: "row",
    columnGap: 16,
    marginTop: 8,
  },
  dateText: {
  },
  datesColumn: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dateColumn: {
    display: "flex",
    flexDirection: "column",
  },
  dateBlock: {},
  addressItemText: {
    fontStyle: "bold",
    fontSize: 16,
    fontWeight: 600,
    color: "#000",
  },
});

export const AddressDetails = ({
  title,
  addresses,
  dates,
}: AddressDetailsProps) => (
  <View style={styles.container}>
    <Text style={styles.header}>{title}</Text>

    {addresses.map((address, index) => (
      <View style={styles.addressRow} key={index}>
        <View style={styles.addressText}>
          <Text style={styles.addressItemText}>Address {index + 1}:</Text>
          <Text>
            {` ${address.streetNumber}, ${address.postalCode}, ${address.country}`}
            {address.description && `, ${address.description}`}
          </Text>
        </View>
      </View>
    ))}

    <View style={styles.dateRow}>
      <Text style={styles.addressItemText}>Work Dates:</Text>
      <View style={styles.datesColumn}>
        {dates.map((date, index) => (
          <Text style={styles.dateText} key={index}>
            {`${date.startDate} to ${date.endDate},`}
          </Text>
        ))}
      </View>
    </View>
  </View>
);
