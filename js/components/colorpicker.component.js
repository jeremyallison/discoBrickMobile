import React, {useState} from 'react';
import {debounce} from 'lodash';
import HsvColorPicker from 'react-native-hsv-color-picker';
import {View} from 'react-native';

import {MagicLightBt} from '../utils/magicLightBt';

const hsv2rgb = ({hue, sat, val}) => {
  const f = (n, k = (n + hue / 60) % 6) =>
    val - val * sat * Math.max(Math.min(k, 4 - k, 1), 0);
  return {
    r: Math.round(f(5) * 255),
    g: Math.round(f(3) * 255),
    b: Math.round(f(1) * 255),
  };
};

export const ColorPicker = ({strips}) => {
  const [hsv, setHsv] = useState({hue: 0, sat: 0, val: 1});

  const onSatValPickerChange = ({saturation, value}, strips) => {
    const newHsv = {hue: hsv.hue, sat: saturation, val: value};
    colorChangeHandler(hsv2rgb(newHsv), strips);
    setHsv(newHsv);
  };

  const onHuePickerChange = ({hue}, strips) => {
    const newHsv = {hue: hue, sat: hsv.sat, val: hsv.val};
    colorChangeHandler(hsv2rgb(newHsv), strips);
    setHsv(newHsv);
  };

  const colorChangeHandler = debounce(MagicLightBt.sendColor, 20);

  return (
    <View>
      <HsvColorPicker
        huePickerBorderRadius={10}
        huePickerBarWidth={30}
        huePickerBarHeight={300}
        huePickerSliderSize={30}
        satValPickerSize={300}
        huePickerHue={hsv.hue}
        onHuePickerDragMove={(h) => onHuePickerChange(h, strips)}
        onHuePickerPress={(h) => onHuePickerChange(h, strips)}
        satValPickerBorderRadius={10}
        satValPickerSliderSize={30}
        satValPickerHue={hsv.hue}
        satValPickerSaturation={hsv.sat}
        satValPickerValue={hsv.val}
        onSatValPickerDragMove={(sv) => onSatValPickerChange(sv, strips)}
        onSatValPickerPress={(sv) => onSatValPickerChange(sv, strips)}
      />
    </View>
  );
};
