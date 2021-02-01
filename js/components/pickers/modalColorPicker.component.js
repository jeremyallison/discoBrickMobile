import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Modal} from 'react-native';
import {Button, View} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  setColorPickerModalVisible,
  setModalCurrentColor,
  updateSequenceItemColor,
  deleteSequenceItem,
} from '../../store/actions';

import {ColorPicker} from './colorPicker.component';
import {Text} from '../../components/translatedText.component';

export const ModalColorPicker = () => {
  const dispatch = useDispatch();

  const strips = useSelector(({strips}) => strips);
  const {visible, currentColor, target} = useSelector(
    ({colorPickerModal}) => colorPickerModal,
  );

  const colorChangeHandler = (color) => {
    dispatch(setModalCurrentColor(color));
  };

  return (
    <View style={styles.centeredView}>
      <Modal transparent={true} animationType="slide" visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ColorPicker
              hsv={currentColor}
              strips={strips}
              colorChangeHandler={colorChangeHandler}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Button
                danger
                onPress={() => {
                  dispatch(
                    deleteSequenceItem(target.sequenceIndex, target.itemIndex),
                  );
                  dispatch(setColorPickerModalVisible(false));
                }}>
                <Icon
                  name="trash-can-outline"
                  size={20}
                  style={{marginLeft: 15, marginRight: 15, color: '#fff'}}
                />
              </Button>
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
                <Text>Save color</Text>
              </Button>
            </View>
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
    // alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    paddingBottom: 15,
    // alignItems: 'center',
    // justifyContent: 'center',
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
