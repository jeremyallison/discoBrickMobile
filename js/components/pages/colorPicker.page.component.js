import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View} from 'native-base';
import {debounce} from 'lodash';

import {setCurrentColor, setCurrentPreset, setIsOn} from '../../store/actions';
import {MagicLightBt} from '../../utils/magicLightBt';
import {ThemeStyles} from '../../theme';

import {ColorPicker} from '../pickers/colorPicker.component';
import {QuickColors} from '../pickers/quickColors.component';

import {DisconnectedPlaceholder} from '../disconnected.component';
import {DotButton} from '../buttons.component';
import {hsv2rgb} from '../../utils/colors';
import {H2} from '../translatedText.component';

export const ColorPickerPage = () => {
  const dispatch = useDispatch();
  const strips = useSelector(({strips}) => strips);
  const currentColor = useSelector(({currentColor}) => currentColor);
  const isOn = useSelector(({isOn}) => isOn);

  const btSendColor = debounce(MagicLightBt.sendColor, 25);

  const colorChangeHandler = (color) => {
    const rgbColor = hsv2rgb(color);
    btSendColor(rgbColor, strips);
    dispatch(setCurrentPreset(null));
    dispatch(setCurrentColor(color));
  };

  const handleOnOff = (onOff) => {
    if (onOff) {
      MagicLightBt.turnOn(strips);
    } else {
      MagicLightBt.turnOff(strips);
    }

    dispatch(setIsOn(onOff));
  };

  return (
    <>
      {strips.length ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <DotButton
              big
              iconName="lightbulb-on-outline"
              active={isOn}
              onPress={() => handleOnOff(true)}
            />
            <DotButton
              big
              iconName="lightbulb-off-outline"
              active={!isOn}
              onPress={() => handleOnOff(false)}
            />
          </View>
          <View
            style={{flexDirection: 'column', alignItems: 'center', margin: 10}}>
            <H2 style={ThemeStyles.h2}>Find your shade...</H2>
            <ColorPicker
              hsv={currentColor}
              colorChangeHandler={colorChangeHandler}
            />
            <H2 style={ThemeStyles.h2}>...or quick pick a color</H2>
            <QuickColors
              hsv={currentColor}
              colorChangeHandler={colorChangeHandler}
            />
          </View>
        </>
      ) : (
        <DisconnectedPlaceholder />
      )}
    </>
  );
};
