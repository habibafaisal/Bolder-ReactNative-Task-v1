import {Platform, StyleSheet, Text} from 'react-native';
import {colors} from '../../constants/colors';
interface Props {
  fontSize?: number;
  textMessage: string;
  align?: 'left' | 'right' | 'center';
  fontFamily?: string;
  color?: string;
  underLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
  lines?: boolean;
  lineHeight?: number;
  lineLength?: number;
  letterSpacing?: number;
  textShadowColor?: string;
  textShadowOffset?: {width: number; height: number};
  textShadowRadius?: number;
}

const CustomText: React.FC<Props> = ({
  fontSize,
  textMessage,
  align,
  fontFamily,
  color,
  underLine,
  lines,
  lineHeight,
  lineLength,
  letterSpacing,
  textShadowColor,
  textShadowOffset,
  textShadowRadius,
}) => {
  return (
    <Text
      numberOfLines={lineLength}
      style={[
        styles.textStyle,
        {
          letterSpacing: letterSpacing || 0,
          lineHeight: lineHeight,
          includeFontPadding: false,
          textAlign: align || 'left',
          fontSize: fontSize,
          //   fontFamily: fontFamily || fonts.regular,
          color: color || colors.secondary,
          textDecorationLine: underLine || 'none',
          textShadowColor: textShadowColor,
          textShadowOffset: textShadowOffset,
          textShadowRadius: textShadowRadius,
          paddingVertical: 0,
        },
      ]}>
      {textMessage}
    </Text>
  );
};

export default CustomText;
const styles = StyleSheet.create({
  textStyle: {
    // fontFamily: fonts.regular,
    color: colors.secondary,
  },
});
