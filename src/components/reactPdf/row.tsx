import { View } from "@react-pdf/renderer";
import { GUTTER } from "./grid-item";

export const Row = ({ children }: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingBottom: 5,
        marginBottom: 5,
        // width: 595,
        borderBottom: "1px",
        borderBottomColor: "#ccc",
      }}
    >
      {children}
    </View>
  );
};
