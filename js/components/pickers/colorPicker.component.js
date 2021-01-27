import React from 'react';
import {useSelector} from 'react-redux';
import {debounce} from 'lodash';
import HsvColorPicker from 'react-native-hsv-color-picker';
import {View} from 'react-native';

import store from '../../store/';
import {setCurrentColor, setSelectedPreset} from '../../store/actions';
import {MagicLightBt} from '../../utils/magicLightBt';
import {hsv2rgb, rgb2hsv} from '../../utils/colors';

export const ColorPicker = ({strips}) => {
  const hsv = useSelector(({currentColor}) => rgb2hsv(currentColor));
  const setHsv = (newHsv) => {
    store.dispatch(setCurrentColor(hsv2rgb(newHsv)));
  };

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

  const colorChangeHandler = debounce((color, strips) => {
    MagicLightBt.sendColor(color, strips);
    store.dispatch(setSelectedPreset(null));
  }, 25);

  return (
    <View>
      <HsvColorPicker
        huePickerBorderRadius={10}
        huePickerBarWidth={30}
        huePickerBarHeight={280}
        huePickerSliderSize={35}
        satValPickerSize={280}
        huePickerHue={hsv.hue}
        onHuePickerDragMove={(h) => onHuePickerChange(h, strips)}
        onHuePickerPress={(h) => onHuePickerChange(h, strips)}
        satValPickerBorderRadius={10}
        satValPickerSliderSize={35}
        satValPickerHue={hsv.hue}
        satValPickerSaturation={hsv.sat}
        satValPickerValue={hsv.val}
        onSatValPickerDragMove={(sv) => onSatValPickerChange(sv, strips)}
        onSatValPickerPress={(sv) => onSatValPickerChange(sv, strips)}
      />
    </View>
  );
};
