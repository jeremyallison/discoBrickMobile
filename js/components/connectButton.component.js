import React from 'react';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import {Button, Text} from 'native-base';

import {Bt} from '../utils/bt';

import store from '../store';
import {
  addAvailableStrip,
  clearAvailableStrips,
  setScanningState,
} from '../store/actions';

const onScanForDevices = () => {
  store.dispatch(clearAvailableStrips());
  store.dispatch(setScanningState(true));
  Bt.scanForDevices((payload) => store.dispatch(addAvailableStrip(payload)))
    .then(() => store.dispatch(setScanningState(false)))
    .catch(console.log);
};

export const ConnectButton = (props) => {
  const scanning = useSelector(({scanning}) => scanning);

  return (
    <Button disabled={scanning} onPress={onScanForDevices} {...props}>
      <Text>Scan & find device</Text>
      {scanning && (
        <ActivityIndicator
          size="small"
          color="#ffffff"
          style={{marginRight: 20}}
        />
      )}
    </Button>
  );
};
