import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {View} from 'native-base';

import {AvailableStripList} from './availableStripList.component';

export const Sidebar = ({isDrawerOpen}) => {
  return (
    <View style={style.sidebar}>
      <Image
        source={require('../../assets/images/app-menu-header.jpg')}
        style={style.header}
      />
      <AvailableStripList scan={isDrawerOpen} />
    </View>
  );
};

const style = StyleSheet.create({
  sidebar: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'center',
  },
  header: {
    height: 200,
    width: '100%',
    marginBottom: 30,
  },
});
