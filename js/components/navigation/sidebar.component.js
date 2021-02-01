import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {View} from 'native-base';

import {AvailableStripList} from '../availableStripList.component';
import {LanguageSelector} from '../languageSelector.component';

export const Sidebar = ({isDrawerOpen}) => {
  return (
    <View style={styles.sidebar}>
      <Image
        source={require('../../../assets/images/app-menu-header.jpg')}
        style={styles.header}
      />
      <View style={{flex: 1}}>
        <AvailableStripList scan={isDrawerOpen} />
      </View>
      <View style={styles.languageSelector}>
        <LanguageSelector />
      </View>
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
    height: 250,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 30,
  },
  languageSelector: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    margin: 20,
  },
});
