import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {H2, Text, Button} from 'native-base';
import {Row, Grid} from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Feather';

import {DisconnectedPlaceholder} from '../disconnected.component';

import {setSelectedPreset} from '../../store/actions';
import {Presets, MagicLightBt} from '../../utils/magicLightBt';
import {ThemeColors, ThemeStyles} from '../../theme';

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
            <H2 style={ThemeStyles.h2}>Choose a funky preset</H2>
            {Presets.map(({name, type, code, color}) => (
              <Button
                key={name}
                onPress={() => sendPreset(code)}
                style={
                  selectedPreset === code
                    ? styles.selectedPresetButton
                    : styles.presetButton
                }>
                <Icon
                  size={25}
                  name={iconsPerType[type]}
                  color={color}
                  style={
                    selectedPreset === code
                      ? styles.selectedPresetIcon
                      : styles.presetIcon
                  }
                />
                <Text
                  style={
                    selectedPreset === code
                      ? styles.selectedPresetText
                      : styles.presetText
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

const styles = StyleSheet.create({
  selectedPresetButton: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#fff',
    width: 170,
    height: 60,
    backgroundColor: '#fff',
    margin: 5,
    justifyContent: 'flex-start',
  },
  presetButton: {
    borderStyle: 'solid',
    borderWidth: StyleSheet.hairlineWidth,
    width: 170,
    height: 60,
    backgroundColor: 'transparent',
    borderColor: '#fff',
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
    color: ThemeColors.highlight,
    marginLeft: -10,
  },
  presetText: {
    color: '#fff',
    marginLeft: -10,
  },
});
