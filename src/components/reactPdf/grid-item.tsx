import { View } from '@react-pdf/renderer';



export const GUTTER = 10; // Space between columns
export const COLUMNS = 12;
export const PAGE_WIDTH = 595; // Width of an A4 page in points (pt)
export const totalGuttersWidth = (COLUMNS - 1) * GUTTER;
export const COLUMN_WIDTH = (PAGE_WIDTH - totalGuttersWidth) / COLUMNS;

export const GridItem = ({ children, width }: any) => {
//   const width = COLUMN_WIDTH * span + GUTTER * (span - 1);
const style = width ? { width, marginRight: GUTTER } : { flexGrow: 1, marginRight: GUTTER };


  return (
    <View style={style}>
      {children}
    </View>
  );
};
