import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
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
  setIsOn,
} from '../store/actions';

export const AvailableStripList = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.scan) {
      dispatch(clearAvailableStrips());
      dispatch(setScanningState(true));
      Bt.scanForDevices((payload) => dispatch(addAvailableStrip(payload)));
    } else {
      Bt.stopScanning();
    }
  }, [props.scan, dispatch]);

  const onConnect = (device) => {
    Bt.connectToDevice(device)
      .then(({device, characteristic}) => {
        MagicLightBt.sayHello(characteristic);

        dispatch(setIsOn(true));
        dispatch(clearAvailableStrips());
        dispatch(setScanningState(false));
        dispatch(
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
      strips && strips.find((strip) => device.id === strips[0].device.id);

    if (strip) {
      strip.disconnectSubscription.remove();
      dispatch(removeStrip(device.id));
    }
  };

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
                <Icon size={25} name="led-strip-variant" />
                <Text style={{flex: 1}}>{' ' + device.name}</Text>
                <Icon size={25} name="bluetooth" color="#6bb1ff" />
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
                <Icon size={25} name="led-strip-variant" />
                <Text style={{flex: 1}}>{' ' + device.name}</Text>
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
