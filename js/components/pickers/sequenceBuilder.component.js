import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {View} from 'native-base';
import DraggableFlatList from 'react-native-draggable-flatlist';

import {
  updateSequence,
  setModalCurrentColor,
  setColorPickerModalVisible,
  setColorPickerModalTarget,
} from '../../store/actions';
import {SequenceListItem} from '../sequenceListItem.component';

export const SequenceBuilder = ({sequenceIndex, sequence}) => {
  const dispatch = useDispatch();

  const openModal = (itemIndex, item) => {
    dispatch(setModalCurrentColor(item));
    dispatch(setColorPickerModalVisible(true));
    dispatch(setColorPickerModalTarget(sequenceIndex, itemIndex));
  };

  const onDragEnd = ({data}) => dispatch(updateSequence(sequenceIndex, data));

  const renderItem = useCallback(({item, index, drag, isActive}) => {
    return (
      <TouchableOpacity
        onLongPress={drag}
        onPress={() => openModal(index, item)}>
        <SequenceListItem color={item} />
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      <DraggableFlatList
        horizontal
        data={sequence.colors}
        renderItem={renderItem}
        keyExtractor={(_item, index) => `draggable-item-${index}`}
        onDragEnd={onDragEnd}
      />
    </View>
  );
};
