import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { MovingDetailsProps } from "@/types";
import { GridItem } from "./grid-item";
import { Row } from "./row";
import { formatDateTimeToDate } from "@/utils/utility";
import { DateRow } from "./date-row";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    fontSize: 12,
    fontWeight: 700,
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
    fontSize: 7,
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
    fontSize: 7,
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

export const OfferAddressDetails = ({
  address,
  header,
  workDates,
  time,
  isReverseAddress,
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
      <Text style={styles.header}>{header}</Text>

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

      <DateRow>
        <GridItem width={labelWidth}>
          <Text
            style={{
              fontSize: 7,
              fontWeight: 500,
              fontStyle: "medium",
              color: "#000",
            }}
          >
            {workDates?.length === 1
              ? translate("pdf.work_date")
              : translate("pdf.work_dates")}
            :
          </Text>
        </GridItem>

        {/* <View style={styles.datesColumn}> */}
        <GridItem width={valueWidth}>
          <Text style={{ ...styles.dateText, paddingRight: 30 }}>
            {workDates?.map(
              (date, index) =>
                `${formatDateTimeToDate(date.startDate)}${
                  date.endDate
                    ? " bis " +
                      formatDateTimeToDate(date.endDate) +
                      ((workDates?.length - 1 != index && ", ") || ".")
                    : (workDates?.length - 1 != index && ", ") || "."
                }`
            )}
            {time && ` Um ` + time + " Uhr"}
          </Text>
        </GridItem>
        {/* </View> */}
      </DateRow>
      {/* </View> */}
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
