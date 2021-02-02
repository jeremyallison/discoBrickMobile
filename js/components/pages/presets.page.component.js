import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Button, View} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {DisconnectedPlaceholder} from '../disconnected.component';

import {setCurrentPreset, setCurrentPresetSpeed} from '../../store/actions';
import {Presets as Ps, MagicLightBt} from '../../utils/magicLightBt';
import {ThemeColors, ThemeStyles} from '../../theme';
import {SpeedSlider} from '../pickers/speedSlider.component';
import {H2, Text} from '../../components/translatedText.component';

const iconsPerType = {
  fade: 'blur',
  throb: 'blur',
  strobe: 'lightning-bolt-outline',
  cut: 'view-grid-outline',
};

const presetDetails = {
  [Ps.CUT_SEVEN]: {name: 'Multi cut', type: 'cut', color: '#fff'},
  [Ps.FADE_SEVEN]: {name: 'Multi fade', type: 'fade', color: '#fff'},
  [Ps.THROB_RED]: {name: 'Red throb', type: 'throb', color: '#FF0000'},
  [Ps.THROB_GREEN]: {name: 'Green throb', type: 'throb', color: '#00FF00'},
  [Ps.THROB_BLUE]: {name: 'Blue throb', type: 'throb', color: '#0000FF'},
  [Ps.THROB_YELLOW]: {name: 'Yellow throb', type: 'throb', color: '#FFFF00'},
  [Ps.STROBE_SEVEN]: {name: 'Multi strobe', type: 'strobe', color: '#fff'},
  [Ps.STROBE_RED]: {name: 'Red strobe', type: 'strobe', color: '#FF0000'},
  [Ps.STROBE_GREEN]: {name: 'Green strobe', type: 'strobe', color: '#00FF00'},
  [Ps.STROBE_BLUE]: {name: 'Blue strobe', type: 'strobe', color: '#0000FF'},
  [Ps.STROBE_YELLOW]: {name: 'Yellow strobe', type: 'strobe', color: '#FFFF00'},
  [Ps.STROBE_CYAN]: {name: 'Cyan strobe', type: 'strobe', color: '#00FFFF'},
  [Ps.STROBE_PURPLE]: {
    name: 'Purple strobe',
    type: 'strobe',
    color: '#FF00FF',
  },
  [Ps.STROBE_WHITE]: {name: 'White strobe', type: 'strobe', color: '#fff'},
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
        <>
          <View
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
          </View>
          <View style={[ThemeStyles.parameterFooter, {height: 80}]}>
            <SpeedSlider value={speed} onSpeedSelect={setSpeed} />
          </View>
        </>
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
    borderColor: ThemeColors.brightHighlight,
    borderRadius: 25,
    width: 170,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: 5,
    justifyContent: 'center',
  },
  presetButton: {
    borderStyle: 'solid',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 25,
    width: 170,
    height: 50,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    margin: 5,
    justifyContent: 'center',
  },
  currentPresetIcon: {
    marginLeft: 10,
  },
  presetIcon: {
    marginLeft: 10,
  },
  currentPresetText: {
    marginLeft: -10,
  },
  presetText: {
    color: '#fff',
    marginLeft: -10,
  },
});
