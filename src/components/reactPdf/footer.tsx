import { FooterProps } from "@/types/pdf";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  footerContainer: {
    width: 595,
    height: 95,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    fontSize: 12,
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  footerSection: {
    borderRight: 1,
    borderColor: "#D9D9D9",
  },
  footerText: {
    fontSize: 10,
    marginBottom: 2,
  },
  pageNumberContainer: {
    position: "absolute",
    bottom: 5,
    right: 0,
    flexDirection: "row",
    marginRight: 10,
  },
  pageNumberText: {
    fontSize: 10,
    color: "#1E1E1E",
  },
});

export const Footer = ({
  company,
  createdBy: { email },
  pages,
}: FooterProps) => (
  <View style={styles.footerContainer} fixed>
    <View style={styles.footerSection}>
      <Text style={styles.footerText}>{company.companyName}</Text>
      <Text style={styles.footerText}>{company.website}</Text>
      <Text style={styles.footerText}>{email}</Text>
      <Text style={styles.footerText}>{company.mobileNumber}</Text>
      <Text style={styles.footerText}>{company.phoneNumber}</Text>
    </View>
    <View style={styles.footerSection}>
      <Text style={styles.footerText}>{company.bankDetails.bankName}</Text>
      <Text style={styles.footerText}>{company.bankDetails.ibanNumber}</Text>
      <Text
        style={styles.footerText}
      >{`${company.address.streetNumber}, ${company.address.houseNumber}`}</Text>
      <Text
        style={styles.footerText}
      >{`${company.address.postalCode}, ${company.address.city}`}</Text>
      <Text style={styles.footerText}>{company.taxNumber}</Text>
    </View>
    <View style={styles.footerSection}>
      <Text style={styles.pageNumberText}>Row 1 </Text>
      <Text style={styles.pageNumberText}>Row 2</Text>
      <Text style={styles.pageNumberText}>Row 3</Text>
      <Text style={styles.pageNumberText}>Row 4</Text>
      <Text style={styles.pageNumberText}>Row 5</Text>
    </View>
    <View style={styles.footerSection}>
      <Text style={styles.pageNumberText}>Row 1 </Text>
      <Text style={styles.pageNumberText}>Row 2</Text>
      <Text style={styles.pageNumberText}>Row 3</Text>
      <Text style={styles.pageNumberText}>Row 4</Text>
      <Text style={styles.pageNumberText}>Row 5</Text>
    </View>
  </View>
);
