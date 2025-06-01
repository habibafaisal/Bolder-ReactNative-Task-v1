import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {
  responsiveFontSize,
  windowHeight,
  windowWidth,
} from '../../constants/sizes';
import CustomText from './CustomText';

interface ScreenHeaderProps {
  title: string;
  rightButton?: {
    label: string;
    onPress: () => void;
    icon?: string;
  };
  leftButton?: {
    label: string;
    onPress: () => void;
    icon?: string;
  };
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  rightButton,
  leftButton,
}) => {
  return (
    <View style={styles.header}>
      {leftButton && (
        <TouchableOpacity style={styles.button} onPress={leftButton.onPress}>
          {leftButton.icon && (
            <CustomText
              fontSize={responsiveFontSize(22)}
              textMessage={leftButton.icon}
              color={colors.textInverse}
            />
          )}
          <CustomText
            fontSize={responsiveFontSize(14)}
            textMessage={leftButton.label}
            color={colors.textInverse}
          />
        </TouchableOpacity>
      )}
      <CustomText
        fontSize={responsiveFontSize(28)}
        textMessage={title}
        color={colors.textInverse}
      />
      {rightButton && (
        <TouchableOpacity style={styles.button} onPress={rightButton.onPress}>
          {rightButton.icon && (
            <CustomText
              fontSize={responsiveFontSize(22)}
              textMessage={rightButton.icon}
              color={colors.textInverse}
            />
          )}
          <CustomText
            fontSize={responsiveFontSize(14)}
            textMessage={rightButton.label}
            color={colors.textInverse}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: windowHeight * 0.05,
    paddingBottom: windowHeight * 0.03,
    paddingHorizontal: windowWidth * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderBottomLeftRadius: windowWidth * 0.05,
    borderBottomRightRadius: windowWidth * 0.05,
    shadowColor: colors.shadowDark,
    shadowOffset: {width: 0, height: windowHeight * 0.01},
    shadowOpacity: 0.3,
    shadowRadius: windowWidth * 0.02,
    elevation: 8,
    marginBottom: windowHeight * 0.02,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingVertical: windowHeight * 0.01,
    paddingHorizontal: windowWidth * 0.03,
    borderRadius: windowWidth * 0.05,
    shadowColor: colors.shadowLight,
    shadowOffset: {width: 0, height: windowHeight * 0.005},
    shadowOpacity: 0.2,
    shadowRadius: windowWidth * 0.01,
    elevation: 2,
  },
});

export default ScreenHeader;
