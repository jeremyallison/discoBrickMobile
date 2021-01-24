/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import HsvColorPicker from 'react-native-hsv-color-picker';

import {
  Body,
  Button,
  Container,
  Left,
  Right,
  Header,
  Text,
  Title,
  Footer,
  FooterTab,
  Icon,
} from 'native-base';

import {Row, Grid} from 'react-native-easy-grid';

import {debounce} from 'lodash';

import {Bt} from './utils/bt';
import {MagicLightBt} from './utils/magicLightBt';

const hsv2rgb = ({hue, sat, val}) => {
  const f = (n, k = (n + hue / 60) % 6) =>
    val - val * sat * Math.max(Math.min(k, 4 - k, 1), 0);
  return {
    r: Math.round(f(5) * 255),
    g: Math.round(f(3) * 255),
    b: Math.round(f(1) * 255),
  };
};

const App = () => {
  Bt.subscribe();

  const [strips, setStrips] = useState(new Map());
  const [hsv, setHsv] = useState({hue: 0, sat: 0, val: 1});

  const onSatValPickerChange = ({saturation, value}) => {
    const newHsv = {hue: hsv.hue, sat: saturation, val: value};
    colorChangeHandler(hsv2rgb(newHsv), strips);
    setHsv(newHsv);
  };

  const onHuePickerChange = ({hue}) => {
    const newHsv = {hue: hue, sat: hsv.sat, val: hsv.val};
    colorChangeHandler(hsv2rgb(newHsv), strips);
    setHsv(newHsv);
  };

  const onScanAndConnect = () => {
    Bt.scanAndConnect()
      .then(({device, characteristic}) => {
        MagicLightBt.sayHello(characteristic);

        if (!strips.has(device.id)) {
          strips.set(device.id, {
            device,
            characteristic,
            disconnectSubscription: device.onDisconnected(onDisconnect),
          });
        }

        setStrips(strips);
      })
      .catch(console.log);
  };

  const onDisconnect = (_e, device) => {
    console.log('disconnected device', device.id);
    strips.get(device.id).disconnectSubscription.remove();
    strips.delete(device.id);
    setStrips(strips);
  };

  const colorChangeHandler = debounce(MagicLightBt.sendColor, 20);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>DiscoBrick!</Title>
        </Body>
        <Right />
      </Header>
      <Grid>
        <Row style={{height: 80, marginTop: 30, alignSelf: 'center'}}>
          <Button onPress={onScanAndConnect}>
            <Text>Scan & find device</Text>
          </Button>
        </Row>
        <Row>
          <View>
            <HsvColorPicker
              huePickerBorderRadius={10}
              huePickerBarWidth={30}
              huePickerBarHeight={300}
              huePickerSliderSize={30}
              satValPickerSize={300}
              huePickerHue={hsv.hue}
              onHuePickerDragMove={onHuePickerChange}
              onHuePickerPress={onHuePickerChange}
              satValPickerBorderRadius={10}
              satValPickerSliderSize={30}
              satValPickerHue={hsv.hue}
              satValPickerSaturation={hsv.sat}
              satValPickerValue={hsv.val}
              onSatValPickerDragMove={onSatValPickerChange}
              onSatValPickerPress={onSatValPickerChange}
            />
          </View>
        </Row>
      </Grid>
      <Footer>
        <FooterTab>
          <Button vertical active>
            <Icon name="color-palette" />
            <Text>Single color</Text>
          </Button>
          <Button vertical>
            <Icon name="color-wand-outline" />
            <Text>Presets</Text>
          </Button>
          <Button vertical>
            <Icon name="construct-outline" />
            <Text>Sequence</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default App;
