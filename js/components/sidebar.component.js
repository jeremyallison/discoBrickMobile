import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {View} from 'native-base';

import {AvailableStripList} from './availableStripList.component';

export const Sidebar = ({isDrawerOpen}) => {
  return (
    <View style={styles.sidebar}>
      <Image
        source={require('../../assets/images/app-menu-header.jpg')}
        style={styles.header}
      />
      <AvailableStripList scan={isDrawerOpen} />
    </View>
  );
};

const styles = StyleSheet.create({
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
