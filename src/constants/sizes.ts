import {Dimensions, PixelRatio} from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const responsiveFontSize = (
  baseFontSize: number,
  scalingFactor = 0.8,
) => {
  // Handle potential errors with non-numeric input
  if (typeof baseFontSize !== 'number' || typeof scalingFactor !== 'number') {
    throw new TypeError('Input values must be numbers.');
  }

  const {width} = Dimensions.get('window'); // Get screen width

  // Calculate the responsive font size
  const responsiveSize = baseFontSize * scalingFactor * (width / 375.0);

  // Round to nearest integer for pixel-perfect rendering
  return PixelRatio.roundToNearestPixel(responsiveSize);
};
