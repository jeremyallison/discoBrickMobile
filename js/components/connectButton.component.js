import React from 'react';
import {Button, Text} from 'native-base';

import {Bt} from '../utils/bt';
import {MagicLightBt} from '../utils/magicLightBt';

import store from '../store';
import {addStrip, removeStrip} from '../store/actions';

const onScanAndConnect = () => {
  Bt.scanAndConnect()
    .then(({device, characteristic}) => {
      MagicLightBt.sayHello(characteristic);

      store.dispatch(
        addStrip({
          device,
          characteristic,
          disconnectSubscription: device.onDisconnected(onDisconnect),
        }),
      );
    })
    .catch(console.log);
};

const onDisconnect = (_e, device) => {
  console.log('disconnected device', device.id);

  const {strips} = store.getState();

  const strip = strips && strips.find((strip) => strip.device.id == device.id);

  if (strip) {
    strip.disconnectSubscription.remove();
    store.dispatch(removeStrip(device.id));
  }
};

export const ConnectButton = () => {
  return (
    <Button onPress={onScanAndConnect}>
      <Text>Scan & find device</Text>
    </Button>
  );
};
