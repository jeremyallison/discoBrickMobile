import React from 'react';
import HsvColorPicker from 'react-native-hsv-color-picker';
import {View} from 'react-native';

import {hsv2rgb, rgb2hsv} from '../../utils/colors';

export const ColorPicker = ({currentColor, colorChangeHandler}) => {
  const hsv = rgb2hsv(currentColor);

  const onSatValPickerChange = ({saturation, value}) => {
    const newHsv = {hue: hsv.hue, sat: saturation, val: value};
    colorChangeHandler(hsv2rgb(newHsv));
  };

  const onHuePickerChange = ({hue}) => {
    const newHsv = {hue: Math.min(hue, 359), sat: hsv.sat, val: hsv.val};
    colorChangeHandler(hsv2rgb(newHsv));
  };

  return (
    <View>
      <HsvColorPicker
        huePickerBorderRadius={10}
        huePickerBarWidth={30}
        huePickerBarHeight={260}
        huePickerSliderSize={35}
        satValPickerSize={260}
        huePickerHue={hsv.hue}
        onHuePickerDragMove={onHuePickerChange}
        onHuePickerPress={onHuePickerChange}
        satValPickerBorderRadius={10}
        satValPickerSliderSize={35}
        satValPickerHue={hsv.hue}
        satValPickerSaturation={hsv.sat}
        satValPickerValue={hsv.val}
        onSatValPickerDragMove={onSatValPickerChange}
        onSatValPickerPress={onSatValPickerChange}
        containerStyle={{marginLeft: -5, marginRight: 10, marginTop: -5}}
      />
    </View>
  );
};
