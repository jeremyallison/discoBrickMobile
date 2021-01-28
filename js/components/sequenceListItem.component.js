import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'native-base';

export const SequenceListItem = ({color}) => (
  <View
    style={{
      ...styles.sequenceListItem,
      backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
    }}
  />
);

const styles = StyleSheet.create({
  sequenceListItem: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ffffff',
  },
});
