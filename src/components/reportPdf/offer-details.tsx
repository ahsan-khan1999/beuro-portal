import { ReportPDFOfferDetailsProps } from "@/types";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  headingText: {
    fontSize: 10,
    fontStyle: "medium",
    fontWeight: 500,
    color: "#4A13E7",
  },
  columHeading: {
    fontSize: 8,
    fontStyle: "medium",
    fontWeight: 500,
    color: "#000",
  },
  textBase: {
    fontSize: 7,
    fontStyle: "normal",
    fontWeight: 400,
    color: "#404040",
  },
  innerContainer: {
    padding: 10,
    backgroundColor: "#F6F7F8",
    borderRadius: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },
  column: {
    flexDirection: "column",
    rowGap: 3,
  },
});

export const ReportPDFOfferDetails = ({
  language,
  broomClean,
  cleaningWithHandoverGuarantee,
  deliveryVehicle,
  employees,
  hours,
  noteAndInformation,
  priceCHF,
  remarks,
}: Partial<ReportPDFOfferDetailsProps>) => {
  const langContent = {
    en: {
      heading: "Detail Offer",
      employees: "Employees",
      deliveryVan: "Delivery van",
      hours: "Hours",
      cleaningWithDelivery: "Cleaning with delivery guarantee",
      broomClean: "Broom clean",
      price: "Price",
      remarks: "Remarks",
      noteAndInfo: "Note and instructions",
    },

    de: {
      heading: "Angebots details",
      employees: "Mitarbeiter",
      deliveryVan: "Lieferwagen",
      hours: "Stunden",
      cleaningWithDelivery: "Reinigung mit Abgabegarantie",
      broomClean: "Besenrein",
      price: "Preis",
      remarks: "Bemarkung",
      noteAndInfo: "Hinweis Und Anganben",
    },
  };

  const details = [
    {
      label: langContent[language as keyof typeof langContent]?.employees,
      value: employees,
    },
    {
      label: langContent[language as keyof typeof langContent]?.deliveryVan,
      value: deliveryVehicle,
    },
    {
      label: langContent[language as keyof typeof langContent]?.hours,
      value: hours,
    },
    {
      label:
        langContent[language as keyof typeof langContent]?.cleaningWithDelivery,
      value: cleaningWithHandoverGuarantee,
    },
    {
      label: langContent[language as keyof typeof langContent]?.broomClean,
      value: broomClean,
    },
    {
      label: langContent[language as keyof typeof langContent]?.price,
      value: priceCHF,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>
        {langContent[language as keyof typeof langContent]?.heading}
      </Text>

      <View
        style={{ ...styles.innerContainer, marginTop: 10, marginBottom: 5 }}
      >
        <View style={styles.grid}>
          {details.map(({ label, value }, index) => (
            <View key={index} style={styles.column}>
              <Text style={styles.columHeading}>{label}</Text>
              <Text style={styles.textBase}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={{ ...styles.column, paddingTop: 10 }}>
          <Text style={styles.columHeading}>
            {langContent[language as keyof typeof langContent]?.remarks}
          </Text>
          <Text style={styles.textBase}>{remarks}</Text>
        </View>
      </View>

      {noteAndInformation && (
        <View
          style={{ ...styles.innerContainer, marginTop: 5, marginBottom: 0 }}
        >
          <View style={styles.column}>
            <Text style={styles.columHeading}>
              {langContent[language as keyof typeof langContent]?.noteAndInfo}
            </Text>
            <Text style={styles.textBase}>{noteAndInformation}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
