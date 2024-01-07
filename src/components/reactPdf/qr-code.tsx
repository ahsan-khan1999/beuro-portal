import { QRCodeProps } from "@/types/pdf";
import { Text, View, Image, StyleSheet } from "@react-pdf/renderer";

// Define your styles
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  borderContainer: {
    borderTop: 2,
    borderTopStyle: "dashed",
    borderTopColor: "#8F8F8F",
    position: "relative",
    paddingHorizontal: 30,
  },
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 30,
    width: "100%",
  },
  qrLeftColumn: {
    flex: 1,
    borderRight: 2,
    borderRightStyle: "dashed",
    borderRightColor: "#8F8F8F",
    paddingTop: 48,
    paddingRight: 25,
  },

  sectionHeading: {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 20,
    marginBottom: 3,
  },
  infoTitleText: {
    fontSize: 16,
    fontWeight: 500,
    fontStyle: "normal",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    fontWeight: 400,
    fontStyle: "normal",
    marginBottom: 6,
  },
  qrSection: {
    flex: 1,
    paddingTop: 48,
    paddingLeft: 50,
  },
  qrImage: {
    width: 220,
    height: 228,
  },
  currencyAmountSection: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 25,
    columnGap: 20,
  },
  currencyAmountText: {
    fontSize: 12,
  },
  additionalInfo: {
    marginTop: 37,
    marginBottom: 37,
  },
  additionalInfoText: {
    fontSize: 12,
  },
  rightSection: {
    flex: 1,
    paddingTop: 48,
    paddingLeft: 40,
  },
});
export const QRCode = ({ bank, qr }: QRCodeProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.borderContainer}>
        <View style={styles.gridContainer}>
          <View style={styles.qrLeftColumn}>
            <Text style={styles.sectionHeading}>{"Empfangsschenin"}</Text>
            <Text style={styles.infoTitleText}>Konto/ Zahlbar an</Text>
            <Text style={styles.infoText}>{bank.ibanNumber}</Text>
            <Text style={styles.infoText}>{bank.bankName}</Text>
            <Text style={styles.infoText}>{bank.companyAddress}</Text>
            <Text style={styles.infoText}>{bank.street}</Text>
            {/* <View style={styles.additionalInfo}>
              <Text style={styles.additionalInfoText}>
                Zusätzliche Informationen
              </Text>
              <Text style={styles.additionalInfoText}>
                {bank.referenceNumber}
              </Text>
            </View> */}
            <View style={{ marginTop: 36 }}>
              <Text style={styles.infoTitleText}>Zahlbar durch</Text>
              <Text style={styles.infoText}>{bank.payableName}</Text>
              <Text style={styles.infoText}>{bank.payableAddress}</Text>
              <Text style={styles.infoText}>{bank.payableStreet}</Text>
              <View
                style={{ marginTop: 24, flexDirection: "row", columnGap: 16 }}
              >
                <View style={{ flexDirection: "column", rowGap: 4 }}>
                  <Text style={styles.infoText}>Währung</Text>
                  <Text style={styles.infoText}>{bank.currency}</Text>
                </View>
                <View style={{ flexDirection: "column", rowGap: 4 }}>
                  <Text style={styles.infoText}>Betrag</Text>
                  <Text style={styles.infoText}>{bank.amount}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.qrSection}>
            <Text style={styles.sectionHeading}>{qr.heading}</Text>
            <View style={{ marginTop: 30 }}>
              <Image src="/assets/images/qr.png" />
            </View>
            <View style={styles.currencyAmountSection}>
              <Text style={styles.currencyAmountText}>
                Währung: {qr.currency}
              </Text>
              <Text style={styles.currencyAmountText}>Betrag: {qr.amount}</Text>
            </View>
          </View>
          <View style={styles.rightSection}>
            <Text style={styles.sectionHeading}>{bank.heading}</Text>
            <Text style={styles.infoText}>Konto/ Zahlbar an</Text>
            <Text style={styles.infoText}>{bank.ibanNumber}</Text>
            <Text style={styles.infoText}>{bank.bankName}</Text>
            <Text style={styles.infoText}>{bank.companyAddress}</Text>
            <Text style={styles.infoText}>{bank.street}</Text>
            <View style={styles.additionalInfo}>
              <Text style={styles.additionalInfoText}>
                Zusätzliche Informationen
              </Text>
              <Text style={styles.additionalInfoText}>
                {bank.referenceNumber}
              </Text>
            </View>
            <Text style={styles.infoText}>Zahlbar durch</Text>
            <Text style={styles.infoText}>{bank.payableName}</Text>
            <Text style={styles.infoText}>{bank.payableAddress}</Text>
            <Text style={styles.infoText}>{bank.payableStreet}</Text>
            <Text style={styles.infoText}>Währung: {bank.currency}</Text>
            <Text style={styles.infoText}>Betrag: {bank.amount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
