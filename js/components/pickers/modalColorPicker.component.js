import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Modal} from 'react-native';
import {Button, View, Text} from 'native-base';

import {ColorPicker} from './colorPicker.component';
import {setColorPickerModalVisible} from '../../store/actions';

export const ModalColorPicker = () => {
  const dispatch = useDispatch();

  const strips = useSelector(({strips}) => strips);
  const visible = useSelector(
    ({isColorPickerModalVisible}) => isColorPickerModalVisible,
  );

  return (
    <View style={style.centeredView}>
      <Modal transparent={true} animationType="slide" visible={visible}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <ColorPicker strips={strips} />

            <Button onPress={() => dispatch(setColorPickerModalVisible(false))}>
              <Text>Hide Modal</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
