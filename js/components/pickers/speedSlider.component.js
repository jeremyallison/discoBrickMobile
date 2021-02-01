import React from 'react';
import Slider from '@react-native-community/slider';
import {Text, View} from 'native-base';
import {ThemeColors} from '../../theme';

export const SpeedSlider = ({value, onSpeedSelect, ...props}) => (
  <View style={{flexDirection: 'column', flex: 1}} {...props}>
    <View
      style={{
        flexDirection: 'row',
        alignContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
      }}>
      <Text style={{flex: 0, color: '#fff'}}>1</Text>
      <Text style={{flex: 1, color: '#fff', textAlign: 'center'}}>
        Vitesse!
      </Text>
      <Text style={{flex: 0, color: '#fff'}}>5</Text>
    </View>
    <Slider
      value={value}
      step={1}
      onValueChange={onSpeedSelect}
      minimumValue={1}
      maximumValue={5}
      minimumTrackTintColor="#fff"
      maximumTrackTintColor={ThemeColors.highlight}
    />
  </View>
);
