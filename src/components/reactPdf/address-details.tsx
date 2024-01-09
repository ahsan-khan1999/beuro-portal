import { AddressDetailsProps } from "@/types/pdf";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { CustomerAddress } from "@/types/leads";
import { MovingDetailsProps } from "@/types";

// Define your styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
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
    fontSize: 16,
    fontWeight: "medium",
    color: "#000",
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
});

export const AddressDetails = ({
  address,
  header,
  workDates,
}: Partial<MovingDetailsProps>) => (
  <View style={styles.container}>
    <Text style={styles.header}>{header}</Text>

    {address?.map((address, index) => (
      <View style={styles.addressRow} key={index}>
        <View style={styles.addressText}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "#000",
            }}
          >
            Address {index + 1}:
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "medium", color: "#000", width: 450, textAlign: 'justify' }}>
            {` ${address.streetNumber}, ${address.postalCode}, ${address.country}`}
            {address.description && `, ${address.description}`}
          </Text>
        </View>
      </View>
    ))}

    <View style={styles.dateRow}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "bold",
          color: "#000",
        }}
      >
        Work Dates:
      </Text>
      <View style={styles.datesColumn}>
        {workDates?.map((date, index) => (
          <Text style={styles.dateText} key={index}>
            {`${date.startDate} to ${date.endDate},`}
          </Text>
        ))}
      </View>
    </View>
  </View>
);
