import { AddressDetailsProps } from "@/types/pdf";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { CustomerAddress } from "@/types/leads";
import { MovingDetailsProps } from "@/types";
import { GridItem } from "./grid-item";
import { Row } from "./row";

// Define your styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 14,
    fontWeight: 600,
    fontStyle: "semibold",
    color: "#000",
    paddingBottom: 3,
    borderBottomWidth: 2,
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
    columnGap: 2,
  },
  dateRow: {
    display: "flex",
    flexDirection: "row",
    columnGap: 2,
    marginTop: 8,
  },
  dateText: {
    fontSize: 10,
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
}: Partial<MovingDetailsProps>) => {
  let MaxLength = 0;
  for (const item of (address && address) || []) {
    const labelLength = item?.label.length;
    if (labelLength > MaxLength) MaxLength = labelLength;
  }

  const labelWidth = MaxLength * 5;

  console.log(labelWidth, MaxLength);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{header}</Text>
      {address?.map((address, index) => (
      <View style={styles.addressRow} key={index}>
        <View style={styles.addressText}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 500,
              fontStyle: "medium",
              color: "#000",
              width: '20%',
            }}
          >
            {address?.label}:
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 400,
              fontStyle: "normal",
              color: "#000",
              width: '80%'
            }}
          >
            {` ${address.streetNumber}, ${address.postalCode}, ${address.country}`}
            {address.description && ` - ${address.description}`}
          </Text>
        </View>
      </View>
    ))}

      {/* <View style={{ flexDirection: "column" }}>
        {address?.map((address, index) => (
          // <View
          //   style={{ display: "flex", flexDirection: "row", }}
          //   key={index}
          // >
          //   <View style={{overflow: 'hidden', maxWidth: 200}}>
          //     <Text
          //       style={{
          //         fontSize: 10,
          //         fontWeight: 500,
          //         fontStyle: "medium",
          //         color: "#000",width: (labelWidth - 100),
          //         overflow: 'hidden',
          //         backgroundColor: '#ccc',

          //       }}
          //     >
          //       {address?.label}
          //     </Text>
          //   </View>
          //   <View>
          //     <Text
          //       style={{
          //         fontSize: 10,
          //         fontWeight: 400,
          //         fontStyle: "normal",
          //         color: "#000",
          //       }}
          //     >
          //       {` ${address.streetNumber}, ${address.postalCode}, ${address.country}`}
          //       {address.description && ` - ${address.description}`}
          //     </Text>
          //   </View>
          // </View>
          <Row key={index}>
            <GridItem width={labelWidth}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  fontStyle: "medium",
                  color: "#000",
                }}
              >
                {address?.label}
              </Text>
            </GridItem>
            <GridItem flex>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 400,
                  fontStyle: "normal",
                  color: "#000",
                }}
              >
                {` ${address.streetNumber}, ${address.postalCode}, ${address.country}`}
                {address.description && ` - ${address.description}`}
              </Text>
            </GridItem>
          </Row>
        ))}
      </View> */}

      <View style={styles.dateRow}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 500,
            fontStyle: "medium",
            color: "#000",
            width: "20%",
          }}
        >
          Arbeitstermine:
        </Text>
        <View style={styles.datesColumn}>
          {workDates?.map((date, index) => (
            <Text style={styles.dateText} key={index}>
              {`${date.startDate}${
                date.endDate ? " to " + date.endDate + "," : ""
              }`}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};
