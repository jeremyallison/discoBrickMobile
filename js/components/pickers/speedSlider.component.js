import React from 'react';
import Slider from '@react-native-community/slider';

export const SpeedSlider = ({value, onSpeedSelect}) => (
  <Slider
    style={{marginLeft: 10, marginRight: 10, flex: 1, height: 40}}
    value={value}
    step={1}
    onValueChange={onSpeedSelect}
    minimumValue={1}
    maximumValue={5}
    minimumTrackTintColor="#000"
    maximumTrackTintColor="#000"
  />
);
