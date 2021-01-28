import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Modal} from 'react-native';
import {Button, View, Text} from 'native-base';

import store from '../../store';
import {
  setColorPickerModalVisible,
  setModalCurrentColor,
  updateSequenceItemColor,
} from '../../store/actions';

import {ColorPicker} from './colorPicker.component';

export const ModalColorPicker = () => {
  const dispatch = useDispatch();

  const strips = useSelector(({strips}) => strips);
  const {visible, currentColor, target} = useSelector(
    ({colorPickerModal}) => colorPickerModal,
  );

  const colorChangeHandler = (color) => {
    store.dispatch(setModalCurrentColor(color));
  };

  return (
    <View style={styles.centeredView}>
      <Modal transparent={true} animationType="slide" visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ColorPicker
              currentColor={currentColor}
              strips={strips}
              colorChangeHandler={colorChangeHandler}
            />

            <Button
              onPress={() => {
                dispatch(
                  updateSequenceItemColor(
                    target.sequenceIndex,
                    target.itemIndex,
                    currentColor,
                  ),
                );
                dispatch(setColorPickerModalVisible(false));
              }}>
              <Text>Hide Modal</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
