import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { HouseItem } from "./house-item";
import { HouseItemHeader } from "./house-item-header";
import { HouseDetailObjectProps } from "./generate-report-pdf";

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#D0D5DD",
    borderBottomStyle: "solid",
    paddingVertical: 15,
    marginHorizontal: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
  },
  column: {
    width: "30%",
    paddingRight: 10,
  },
  mainHeading: {
    fontSize: 10,
    fontStyle: "semibold",
    fontWeight: 700,
    color: "#4A13E7",
    marginBottom: 5,
  },
  remarksContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: 3,
  },
  remarksHeading: {
    fontSize: 8,
    fontStyle: "medium",
    fontWeight: 500,
    color: "#1C1F35",
  },
  remarksDescription: {
    fontSize: 8,
    fontStyle: "normal",
    fontWeight: 400,
    color: "#474747",
    marginBottom: 15,
  },
});

interface HouseItemWrapperProps {
  items: HouseDetailObjectProps[];
  mainHeading: string;
  description?: string;
  language?: string;
}

export const HouseItemWrapper: React.FC<HouseItemWrapperProps> = ({
  items,
  mainHeading,
  description,
  language,
}) => {
  const langContent = {
    en: {
      remarks: "Remarks",
    },

    de: {
      remarks: "Bemerkung",
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}>{mainHeading}</Text>
      <View style={styles.remarksContainer}>
        <Text style={styles.remarksHeading}>
          {langContent[language as keyof typeof langContent]?.remarks}
        </Text>
        <Text style={styles.remarksDescription}>{description}</Text>
      </View>
      <HouseItemHeader language={language} count={items.length} />

      <View style={styles.grid}>
        {items.map((item, index) => (
          <View key={index} style={styles.column}>
            <HouseItem
              icon={item.icon}
              name={item.name}
              quantity={item.quantity}
            />
          </View>
        ))}
      </View>
    </View>
  );
};
