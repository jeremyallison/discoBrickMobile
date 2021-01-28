import React from 'react';
import {useSelector} from 'react-redux';
import {H2} from 'native-base';
import {Row, Grid} from 'react-native-easy-grid';
import {debounce} from 'lodash';

import store from '../../store';
import {setCurrentColor, setSelectedPreset} from '../../store/actions';
import {MagicLightBt} from '../../utils/magicLightBt';
import {ThemeStyles} from '../../theme';

import {ColorPicker} from '../pickers/colorPicker.component';
import {QuickColors} from '../pickers/quickColors.component';

import {DisconnectedPlaceholder} from '../disconnected.component';

export const ColorPickerPage = () => {
  const strips = useSelector(({strips}) => strips);
  const currentColor = useSelector(({currentColor}) => currentColor);

  const btSendColor = debounce(MagicLightBt.sendColor, 25);

  const colorChangeHandler = (color) => {
    btSendColor(color, strips);
    store.dispatch(setSelectedPreset(null));
    store.dispatch(setCurrentColor(color));
  };

  return (
    <>
      {strips.length ? (
        <Grid>
          <Row
            style={{flexDirection: 'column', alignItems: 'center', margin: 10}}>
            <H2 style={ThemeStyles.h2}>Find your shade...</H2>
            <ColorPicker
              currentColor={currentColor}
              colorChangeHandler={colorChangeHandler}
            />
            <H2 style={ThemeStyles.h2}>...or quick pick a color</H2>
            <QuickColors
              currentColor={currentColor}
              colorChangeHandler={colorChangeHandler}
            />
          </Row>
        </Grid>
      ) : (
        <DisconnectedPlaceholder />
      )}
    </>
  );
};
