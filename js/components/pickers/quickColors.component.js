import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Button, View} from 'native-base';

import store from '../../store/';
import {setCurrentColor, setSelectedPreset} from '../../store/actions';
import {MagicLightBt} from '../../utils/magicLightBt';

const QUICK_COLOR_CODES = [
  {r: 255, g: 255, b: 255},
  {r: 255, g: 0, b: 0},
  {r: 255, g: 255, b: 0},
  {r: 0, g: 255, b: 0},
  {r: 0, g: 255, b: 255},
  {r: 0, g: 0, b: 255},
  {r: 255, g: 0, b: 255},
];

export const QuickColors = ({strips}) => {
  const currentColor = useSelector(({currentColor}) => currentColor);
  const onColorSelect = (color) => {
    store.dispatch(setSelectedPreset(null));
    store.dispatch(setCurrentColor(color));
    MagicLightBt.sendColor(color, strips);
  };

  return (
    <View style={style.quickColorsContainer}>
      {QUICK_COLOR_CODES.map((color, i) => (
        <Button
          key={`quick-color-${i}`}
          style={{
            ...style.colorButton,
            ...(currentColor === color ? style.colorButtonActive : {}),
            backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
          }}
          onPress={() => onColorSelect(color)}
        />
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  quickColorsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  colorButton: {
    height: 35,
    width: 35,
    borderRadius: 17,
    margin: 5,
  },
  colorButtonActive: {
    borderWidth: 3,
    borderColor: '#ffffff',
  },
});
