import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { MovingDetailsProps } from "@/types";
import { Row } from "../reactPdf/row";
import { GridItem } from "../reactPdf/grid-item";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});

export const ReportAddressDetails = ({
  address,
}: Partial<MovingDetailsProps>) => {
  let MaxLength = 0;
  for (const item of (address && address) || []) {
    const labelLength = item?.label?.length;
    if (labelLength > MaxLength) MaxLength = labelLength;
  }

  const labelWidth = (MaxLength < 15 && 15 * 6) || MaxLength * 6;
  const valueWidth = 595 - labelWidth;

  return (
    <View style={styles.container}>
      {
        <View style={{ flexDirection: "column" }}>
          {address?.map((address, index) => (
            <Row key={index}>
              <GridItem width={labelWidth}>
                <Text
                  style={{
                    fontSize: 8,
                    fontWeight: 500,
                    fontStyle: "medium",
                    color: "#000",
                  }}
                >
                  {address?.label}:
                </Text>
              </GridItem>
              <GridItem width={valueWidth}>
                <Text
                  style={{
                    fontSize: 8,
                    fontWeight: 400,
                    fontStyle: "normal",
                    color: "#000",
                    paddingRight: 30,
                  }}
                >
                  {`${address.streetNumber}, ${address.postalCode}, ${
                    [address.country as keyof typeof Country] || ""
                  }`}
                  {address.description && ` - ${address.description}`}
                </Text>
              </GridItem>
            </Row>
          ))}
        </View>
      }
    </View>
  );
};

export const Country = {
  Switzerland: "Schweiz",
  Germany: "Deutschland",
  Austria: "Österreich",
  Italy: "Italien",
  France: "Frankreich",
};
