import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {H2} from 'native-base';
import {Row, Grid} from 'react-native-easy-grid';

import {ColorPicker} from '../pickers/colorPicker.component';
import {QuickColors} from '../pickers/quickColors.component';

import {DisconnectedPlaceholder} from '../disconnected.component';

export const ColorPickerPage = () => {
  const strips = useSelector(({strips}) => strips);

  return (
    <>
      {strips.length ? (
        <Grid>
          <Row
            style={{flexDirection: 'column', alignItems: 'center', margin: 10}}>
            <H2 style={style.h2}>Find your shade...</H2>
            <ColorPicker strips={strips} />
            <H2 style={style.h2}>...or quick pick a color</H2>
            <QuickColors strips={strips} />
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
    marginTop: 10,
  },
});
