import { View } from "@react-pdf/renderer";

export const Row = ({ children }: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingBottom: 5,
        marginBottom: 5,
        borderBottom: "1px",
        borderBottomColor: "#ccc",
      }}
    >
      {children}
    </View>
  );
};
