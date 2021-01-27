import React from 'react';
import {StyleSheet} from 'react-native';
import {H1, H3} from 'native-base';

export const DisconnectedPlaceholder = () => (
  <>
    <H1 style={style.h1}>Nothing connected yet</H1>
    <H3 style={style.h3}>Open the menu and turn on your DiscoBrick!</H3>
  </>
);

const style = StyleSheet.create({
  h1: {
    color: '#fff',
    fontSize: 30,
    alignSelf: 'center',
  },
  h3: {
    color: '#222',
    fontSize: 20,
    marginTop: 10,
    alignSelf: 'center',
  },
});
