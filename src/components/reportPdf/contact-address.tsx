import { ReportContactDetailsProps } from "@/types";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  serviceContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    rowGap: 0,
    width: "65%",
    marginLeft: 0,
  },
  serviceInnerContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 15,
    marginTop: 5,
  },
  contactContainer: {
    flexDirection: "column",
    rowGap: 0,
    width: "35%",
  },

  contactInnerContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: 2,
    marginTop: 5,
  },
  headingText: {
    fontSize: 8,
    fontWeight: 600,
    fontStyle: "semibold",
  },
  textBase: {
    color: "#000",
    fontSize: 8,
    fontWeight: 500,
    fontStyle: "medium",
  },
});

export const ReportContactAddress = ({
  email,
  name,
  phone,
}: ReportContactDetailsProps) => {
  const langContent = {
    en: {
      serviceHeading: "Services",
      contactHeading: "Contact",
    },

    de: {
      serviceHeading: "Dienstleistungen",
      contactHeading: "Kontakt",
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.serviceContainer}>
        <Text style={styles.headingText}>
          {langContent["en" as keyof typeof langContent]?.serviceHeading}
        </Text>

        <View style={styles.serviceInnerContainer}>
          <Text style={styles.textBase}>Umzug</Text>
          <Text style={styles.textBase}>Reinigung</Text>
        </View>
      </View>
      <View style={styles.contactContainer}>
        <Text style={styles.headingText}>
          {langContent["en" as keyof typeof langContent]?.contactHeading}
        </Text>
        <View style={styles.contactInnerContainer}>
          <Text style={styles.textBase}>{name}</Text>
          <Text style={styles.textBase}>{email}</Text>
          <Text style={styles.textBase}>{phone}</Text>
        </View>
      </View>
    </View>
  );
};
