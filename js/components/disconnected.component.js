import React from 'react';
import {StyleSheet} from 'react-native';
import {H1, H3} from 'native-base';

export const DisconnectedPlaceholder = () => (
  <>
    <H1 style={styles.h1}>Nothing connected yet</H1>
    <H3 style={styles.h3}>Open the menu and turn on your DiscoBrick!</H3>
  </>
);

const styles = StyleSheet.create({
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
