import { ReportDocumentHeaderProps } from "@/types";
import { formatDateTimeToDate } from "@/utils/utility";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: "#EDE7FD",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headinText: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 500,
    color: "#1C1F35",
  },
  dateContainer: { display: "flex", flexDirection: "row", columnGap: 10 },
  dateText: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 500,
    color: "#1C1F35",
  },
});

export const ReportPDFHeader = ({
  language,
  date,
}: ReportDocumentHeaderProps) => {
  const langContent = {
    en: {
      heading: "Viewing form",
      date: "Date",
    },

    de: {
      heading: "Besichtigungsformular",
      date: "Datum",
    },
  };

  return (
    <View style={styles.container} key={language} fixed>
      <Text style={styles.headinText}>
        {langContent[language as keyof typeof langContent]?.heading}
      </Text>

      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          {langContent[language as keyof typeof langContent]?.date}:
        </Text>
        <Text style={styles.dateText}>{formatDateTimeToDate(date)}</Text>
      </View>
    </View>
  );
};
