import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'native-base';

export const SequenceListItem = ({color}) => (
  <View
    style={[
      styles.sequenceListItem,
      {backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`},
    ]}
  />
);

const styles = StyleSheet.create({
  sequenceListItem: {
    height: 35,
    width: 35,
    borderRadius: 17,
    margin: 5,
  },
});
