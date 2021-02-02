import React from 'react';
import HsvColorPicker from '@fallingllama/react-native-hsv-color-picker';
import {View} from 'react-native';

export const ColorPicker = ({hsv, colorChangeHandler}) => {
  const onSatValPickerChange = ({saturation, value}) => {
    const newHsv = {hue: hsv.hue, sat: saturation, val: Math.max(value, 0.002)};
    colorChangeHandler(newHsv);
  };

  const onHuePickerChange = ({hue}) => {
    const newHsv = {hue: Math.min(hue, 359), sat: hsv.sat, val: hsv.val};
    colorChangeHandler(newHsv);
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
