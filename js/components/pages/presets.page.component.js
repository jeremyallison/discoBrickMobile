import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {H2, Text, Button} from 'native-base';
import {Row, Grid} from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {DisconnectedPlaceholder} from '../disconnected.component';

import {setCurrentPreset, setCurrentPresetSpeed} from '../../store/actions';
import {Presets as Ps, MagicLightBt} from '../../utils/magicLightBt';
import {ThemeStyles} from '../../theme';
import {SpeedSlider} from '../pickers/speedSlider.component';

const iconsPerType = {
  fade: 'blur',
  throb: 'blur',
  strobe: 'lightning-bolt-outline',
  cut: 'view-grid-outline',
};

const presetDetails = {
  [Ps.CUT_SEVEN]: {name: 'Séquence multi', type: 'cut', color: '#fff'},
  [Ps.FADE_SEVEN]: {name: 'Fondu multi', type: 'fade', color: '#fff'},
  [Ps.THROB_RED]: {name: 'Fondu rouge', type: 'throb', color: '#FF0000'},
  [Ps.THROB_GREEN]: {name: 'Fondu vert', type: 'throb', color: '#00FF00'},
  [Ps.THROB_BLUE]: {name: 'Fondu bleu', type: 'throb', color: '#0000FF'},
  [Ps.THROB_YELLOW]: {name: 'Fondu jaune', type: 'throb', color: '#FFFF00'},
  [Ps.STROBE_SEVEN]: {name: 'Éclairs multi', type: 'strobe', color: '#fff'},
  [Ps.STROBE_RED]: {name: 'Éclairs rouge', type: 'strobe', color: '#FF0000'},
  [Ps.STROBE_GREEN]: {name: 'Éclairs vert', type: 'strobe', color: '#00FF00'},
  [Ps.STROBE_BLUE]: {name: 'Éclairs bleu', type: 'strobe', color: '#0000FF'},
  [Ps.STROBE_YELLOW]: {name: 'Éclairs jaune', type: 'strobe', color: '#FFFF00'},
  [Ps.STROBE_CYAN]: {name: 'Éclairs cyan', type: 'strobe', color: '#00FFFF'},
  [Ps.STROBE_PURPLE]: {
    name: 'Éclairs violet',
    type: 'strobe',
    color: '#FF00FF',
  },
  [Ps.STROBE_WHITE]: {name: 'Éclairs blanc', type: 'strobe', color: '#fff'},
};

export const PresetsPage = () => {
  const dispatch = useDispatch();

  const strips = useSelector(({strips}) => strips),
    {preset: currentPreset, speed} = useSelector(
      ({currentPreset}) => currentPreset,
    );

  const sendPreset = (presetCode) => {
    MagicLightBt.sendPreset(presetCode, 6 - speed, strips);
    dispatch(setCurrentPreset(presetCode));
  };

  const setSpeed = (speed) => {
    MagicLightBt.sendPreset(currentPreset, 6 - speed, strips);
    dispatch(setCurrentPresetSpeed(speed));
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
            <H2 style={[ThemeStyles.h2, ThemeStyles.centeredTitle]}>
              Choose a funky preset
            </H2>
            {Object.keys(Ps).map((psKey) => {
              const {name, type, color} = presetDetails[Ps[psKey]];
              return (
                <Button
                  key={name}
                  onPress={() => sendPreset(Ps[psKey])}
                  style={
                    currentPreset === Ps[psKey]
                      ? styles.currentPresetButton
                      : styles.presetButton
                  }>
                  <Icon
                    size={25}
                    name={iconsPerType[type]}
                    color={color}
                    style={
                      currentPreset === Ps[psKey]
                        ? styles.currentPresetIcon
                        : styles.presetIcon
                    }
                  />
                  <Text
                    style={
                      currentPreset === Ps[psKey]
                        ? styles.currentPresetText
                        : styles.presetText
                    }>
                    {name}
                  </Text>
                </Button>
              );
            })}
          </Row>
          <Row size={0.2}>
            <SpeedSlider value={speed} onSpeedSelect={setSpeed} />
          </Row>
        </Grid>
      ) : (
        <DisconnectedPlaceholder />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  currentPresetButton: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#fff',
    width: 170,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    margin: 5,
    justifyContent: 'flex-start',
  },
  presetButton: {
    borderStyle: 'solid',
    borderWidth: StyleSheet.hairlineWidth,
    width: 170,
    height: 50,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    margin: 5,
    justifyContent: 'flex-start',
  },
  currentPresetIcon: {
    marginLeft: 10,
  },
  presetIcon: {
    marginLeft: 10,
  },
  currentPresetText: {
    color: '#000',
    marginLeft: -10,
  },
  presetText: {
    color: '#fff',
    marginLeft: -10,
  },
});
