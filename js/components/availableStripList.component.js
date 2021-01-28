import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Card, CardItem, H2, Text, View} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Bt} from '../utils/bt';
import {MagicLightBt} from '../utils/magicLightBt';

import store from '../store';
import {
  addStrip,
  removeStrip,
  setScanningState,
  addAvailableStrip,
  clearAvailableStrips,
} from '../store/actions';

const onConnect = (device) => {
  Bt.connectToDevice(device)
    .then(({device, characteristic}) => {
      MagicLightBt.sayHello(characteristic);

      store.dispatch(clearAvailableStrips());
      store.dispatch(setScanningState(false));
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

  const strip =
    strips &&
    strips.find(
      (strip) => parseInt(strip.device.id, 10) === parseInt(device.id, 10),
    );

  if (strip) {
    strip.disconnectSubscription.remove();
    store.dispatch(removeStrip(device.id));
  }
};

export const AvailableStripList = (props) => {
  useEffect(() => {
    if (props.scan) {
      store.dispatch(clearAvailableStrips());
      store.dispatch(setScanningState(true));
      Bt.scanForDevices((payload) =>
        store.dispatch(addAvailableStrip(payload)),
      );
    } else {
      Bt.stopScanning();
    }
  }, [props.scan]);

  const availableStrips = useSelector(({availableStrips}) => availableStrips);
  const connectedStrips = useSelector(({strips}) => strips);

  return (
    <>
      <View style={styles.stripCategoryList}>
        <H2 style={styles.stripCategory}>Connected bricks</H2>
        {connectedStrips.length ? (
          connectedStrips.map(({device}) => (
            <Card key={device.id} style={{alignItems: 'center', width: '100%'}}>
              <CardItem>
                <View>
                  <Icon size={25} name="led-strip-variant" />
                </View>
                <View>
                  <Text style={{flexWrap: 'nowrap'}}>{' ' + device.name}</Text>
                </View>
              </CardItem>
            </Card>
          ))
        ) : (
          <Text style={styles.placeholder}>No brick connected</Text>
        )}
      </View>

      {availableStrips.length ? (
        <View style={styles.stripCategoryList}>
          <H2 style={styles.stripCategory}>Available bricks</H2>
          {availableStrips.map((device) => (
            <Card key={device.id} style={{alignItems: 'center', width: '100%'}}>
              <CardItem button onPress={() => onConnect(device)}>
                <View>
                  <Icon size={25} name="led-strip-variant" />
                </View>
                <View>
                  <Text style={{flexWrap: 'nowrap'}}>{' ' + device.name}</Text>
                </View>
              </CardItem>
            </Card>
          ))}
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  stripCategory: {
    marginTop: 20,
  },
  placeholder: {
    padding: 10,
    fontStyle: 'italic',
    color: '#666666',
  },
  stripCategoryList: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingRight: 20,
    paddingLeft: 20,
  },
});
