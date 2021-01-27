import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Modal, Alert} from 'react-native';
import {H2, Button, View, Text} from 'native-base';

import {ModalColorPicker} from '../../components/pickers/modalColorPicker.component';
import {DisconnectedPlaceholder} from '../disconnected.component';
import {setColorPickerModalVisible} from '../../store/actions';

export const SequencePage = () => {
  const dispatch = useDispatch();
  const strips = useSelector(({strips}) => strips);

  const openModal = () => dispatch(setColorPickerModalVisible(true));
  // !strips.length ?
  return (
    <>
      <H2>Sequence page</H2>
      <Button onPress={openModal}>
        <Text>Open it</Text>
      </Button>
      <ModalColorPicker />
    </>
  );
  // : (
  //   <DisconnectedPlaceholder />
  // );
};

const style = StyleSheet.create({
  h2: {
    color: '#fff',
    fontSize: 25,
    marginTop: 10,
  },
});
