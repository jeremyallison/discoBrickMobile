import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {View} from 'native-base';

import {ConnectButton} from './connectButton.component';
import {AvailableStripList} from './availableStripList.component';
import {useEffect} from 'react';

import {Bt} from '../utils/bt';

import store from '../store';
import {
  addAvailableStrip,
  clearAvailableStrips,
  setScanningState,
} from '../store/actions';

export const Sidebar = (props) => {
  useEffect(() => {
    store.dispatch(clearAvailableStrips());
    store.dispatch(setScanningState(true));
    Bt.scanForDevices((payload) => store.dispatch(addAvailableStrip(payload)));
  });

  return (
    <View style={style.sidebar}>
      <Image
        source={require('../../assets/images/app-menu-header.jpg')}
        style={style.header}
      />
      {/* <ConnectButton style={style.button} /> */}
      <AvailableStripList />
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
    // alignSelf: 'stretch',
    marginBottom: 30,
  },
});
