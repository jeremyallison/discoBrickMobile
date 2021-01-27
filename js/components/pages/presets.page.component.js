import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {H2, Text, Button} from 'native-base';
import {Row, Grid} from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Feather';

import {DisconnectedPlaceholder} from '../disconnected.component';

import {setSelectedPreset} from '../../store/actions';
import {Presets, MagicLightBt} from '../../utils/magicLightBt';
import {ThemeColors} from '../../utils/colors';

const iconsPerType = {
  fade: 'feather',
  throb: 'feather',
  strobe: 'zap',
  cut: 'grid',
};

export const PresetsPage = () => {
  const dispatch = useDispatch();

  const strips = useSelector(({strips}) => strips),
    selectedPreset = useSelector(({selectedPreset}) => selectedPreset);

  const sendPreset = (presetCode) => {
    MagicLightBt.sendPreset(presetCode, 1, strips);
    dispatch(setSelectedPreset(presetCode));
  };

  return (
    <>
      {strips.length ? (
        <Grid>
          <Row
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <H2 style={style.h2}>Choose a funky preset</H2>
            {Presets.map(({name, type, code, color}) => (
              <Button
                key={name}
                onPress={() => sendPreset(code)}
                style={
                  selectedPreset === code
                    ? style.selectedPresetButton
                    : style.presetButton
                }>
                <Icon
                  size={25}
                  name={iconsPerType[type]}
                  color={color}
                  style={
                    selectedPreset === code
                      ? style.selectedPresetIcon
                      : style.presetIcon
                  }
                />
                <Text
                  style={
                    selectedPreset === code
                      ? style.selectedPresetText
                      : style.presetText
                  }>
                  {name}
                </Text>
              </Button>
            ))}
          </Row>
        </Grid>
      ) : (
        <DisconnectedPlaceholder />
      )}
    </>
  );
};

const style = StyleSheet.create({
  h2: {
    color: '#fff',
    fontSize: 25,
    marginBottom: 30,
  },
  selectedPresetButton: {
    borderStyle: 'solid',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#FFFFFF',
    width: 170,
    height: 60,
    backgroundColor: ThemeColors.highlight,
    margin: 5,
    justifyContent: 'flex-start',
  },
  presetButton: {
    borderStyle: 'solid',
    borderWidth: StyleSheet.hairlineWidth,
    width: 170,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    margin: 5,
    justifyContent: 'flex-start',
  },
  selectedPresetIcon: {
    marginLeft: 10,
  },
  presetIcon: {
    marginLeft: 10,
  },
  selectedPresetText: {
    color: '#FFFFFF',
    marginLeft: -10,
  },
  presetText: {
    color: '#000000',
    marginLeft: -10,
  },
});
