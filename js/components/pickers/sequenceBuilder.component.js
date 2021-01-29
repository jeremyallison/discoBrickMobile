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
import {hsv2rgb} from '../../utils/colors';

import {SequenceListItem} from '../sequenceListItem.component';
import {DotButton} from '../buttons.component';

export const SequenceBuilder = ({sequenceIndex, sequence}) => {
  const dispatch = useDispatch();

  const openModal = useCallback(
    (itemIndex, item) => {
      dispatch(setModalCurrentColor(item));
      dispatch(setColorPickerModalVisible(true));
      dispatch(setColorPickerModalTarget(sequenceIndex, itemIndex));
    },
    [dispatch, sequenceIndex],
  );

  const onDragEnd = ({data}) => dispatch(updateSequence(sequenceIndex, data));

  const addSequenceItem = () =>
    sequence.colors.length <= 16 &&
    dispatch(
      updateSequence(
        sequenceIndex,
        sequence.colors.concat([
          hsv2rgb({hue: Math.round(Math.random() * 360), sat: 1, val: 1}),
        ]),
      ),
    );

  const renderItem = useCallback(
    ({item, index, drag, _isActive}) => {
      return (
        <TouchableOpacity
          onLongPress={drag}
          onPress={() => openModal(index, item)}>
          <SequenceListItem color={item} />
        </TouchableOpacity>
      );
    },
    [openModal],
  );

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <DotButton onPress={addSequenceItem} iconName="eyedropper-plus" />
      <DraggableFlatList
        horizontal
        data={sequence.colors}
        renderItem={renderItem}
        keyExtractor={(_item, index) => `draggable-item-${index}`}
        onDragEnd={onDragEnd}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
