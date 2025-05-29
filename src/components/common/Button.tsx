import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ReactNode} from 'react';
import {colors} from '../../constants/colors';
import {responsiveFontSize, windowHeight} from '../../constants/sizes';
interface ButtonProps {
  btnLabel?: any;
  onPress: () => void;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  buttonFontStyle?: object;
  disabled?: boolean;
  width?: number;
  bColor?: string;
  showRightIcon?: boolean;
  RightIcon?: ReactNode;
  showLeftIcon?: boolean;
  LeftIcon?: ReactNode;
  iconStyle?: object;
  radius?: number;
  buttonPropStyle?: object;
  imgTrue?: boolean;
  letterSpacing?: number;
}

const Button: React.FC<ButtonProps> = ({
  btnLabel,
  onPress,
  buttonBackgroundColor,
  buttonTextColor,
  buttonFontStyle,
  disabled,
  width,
  bColor,
  RightIcon,
  iconStyle,
  showRightIcon,
  radius,
  buttonPropStyle,
  imgTrue,
  letterSpacing,
  showLeftIcon,
  LeftIcon,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.ButtonStyle,
        {
          backgroundColor: buttonBackgroundColor || colors.primary,
          borderRadius: radius || 12,
        },
        disabled && {opacity: 0.5},
        {borderWidth: width, borderColor: bColor},
        buttonPropStyle,
      ]}
      disabled={disabled}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent: 'space-between',
          gap: 5,
        }}>
        {showLeftIcon && (
          <View
            style={{
              // backgroundColor: 'red',
              marginRight: 5,
            }}>
            {LeftIcon}
          </View>
        )}
        <Text
          style={[
            styles.buttonTextStyle,
            {
              color: buttonTextColor || colors.secondary,
              letterSpacing: letterSpacing || 0,
            },
            buttonFontStyle,
          ]}>
          {btnLabel}
        </Text>
        {showRightIcon && <View>{RightIcon}</View>}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
const styles = StyleSheet.create({
  buttonTextStyle: {
    fontSize: responsiveFontSize(18),
    // fontFamily: fonts.semiBold,
  },
  ButtonStyle: {
    alignItems: 'center',
    paddingVertical: windowHeight * 0.0175,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    elevation: Platform.OS === 'android' ? 0 : 3,
  },
});
