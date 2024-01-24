import { View } from '@react-pdf/renderer';
import { GUTTER } from './grid-item';

export const Row = ({ children }: any) => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: GUTTER, width: 595 }}>
      {children}
    </View>
  );
};
