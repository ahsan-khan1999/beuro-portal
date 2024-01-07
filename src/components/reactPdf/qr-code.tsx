import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { current } from "@reduxjs/toolkit";
import { QRDetailsProps } from "@/types/pdf";

const styles = StyleSheet.create({
  container: {
    borderTop: 2,
    borderStyle: "dashed",
    borderTopColor: "#000",
    position: "relative",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 48,
  },
  flexChild: {
    flex: 1,
    borderRight: 2,
    borderRightStyle: "dashed",
    borderRightColor: "#000",
    padding: 10,
  },
});

export const QRDetails = ({
  bankSideDetails,
  qrSideDetails,
}: QRDetailsProps) => (
  <View style={styles.container}>
    <View style={styles.flexContainer}>
      <View
        style={{
          borderRight: 2,
          borderRightStyle: "dashed",
          borderRightColor: "#000",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          {bankSideDetails.heading}
        </Text>
      </View>

      <View>
        <Text>{qrSideDetails.heading}</Text>
        {/* <Image src={"/assets/pngs/QR_code.jpg"} /> */}

        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text>Währung</Text>
            <Text>{qrSideDetails.currency}</Text>
          </View>
          <View>
            <Text>Betrag</Text>
            <Text>{qrSideDetails.amount}</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          {bankSideDetails.heading}
        </Text>
      </View>
    </View>
  </View>
);
