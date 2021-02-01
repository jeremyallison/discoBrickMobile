import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, ScrollView, TextInput} from 'react-native';
import {View} from 'native-base';

import {
  deleteSequence,
  addSequence,
  setCurrentSequence,
  setCurrentSequenceSpeed,
  setCurrentSequenceMode,
  updateSequenceName,
} from '../../store/actions';
import {MagicLightBt} from '../../utils/magicLightBt';
import {ThemeStyles} from '../../theme';

import {DotButton, PillButton} from '../buttons.component';
import {DisconnectedPlaceholder} from '../disconnected.component';
import {SequenceBuilder} from '../pickers/sequenceBuilder.component';
import {ModalColorPicker} from '../pickers/modalColorPicker.component';
import {SequenceModePicker} from '../pickers/sequenceModePicker.component';
import {SpeedSlider} from '../pickers/speedSlider.component';
import {arrayhsv2rgb} from '../../utils/colors';

export const SequencePage = () => {
  const dispatch = useDispatch();

  const strips = useSelector(({strips}) => strips);
  const sequences = useSelector(({sequences}) => sequences),
    {
      sequence: currentSequence,
      speed: currentSpeed,
      mode: currentMode,
    } = useSelector(({currentSequence}) => currentSequence);

  const handleAddSequence = () => dispatch(addSequence());
  const handleDeleteSequence = (i) => dispatch(deleteSequence(i));
  const handlePlay = (colors, sequenceIndex) => {
    MagicLightBt.sendSequence(
      arrayhsv2rgb(colors),
      currentMode,
      6 - currentSpeed,
      strips,
    );
    dispatch(setCurrentSequence(sequenceIndex));
  };

  const handleRenameSequence = (i, name) =>
    dispatch(updateSequenceName(i, name));

  const handleSpeedChange = (speed) => {
    currentSequence !== null &&
      MagicLightBt.sendSequence(
        arrayhsv2rgb(sequences[currentSequence].colors),
        currentMode,
        6 - speed,
        strips,
      );
    dispatch(setCurrentSequenceSpeed(speed));
  };

  const handleModeChange = (mode) => {
    currentSequence !== null &&
      MagicLightBt.sendSequence(
        arrayhsv2rgb(sequences[currentSequence].colors),
        mode,
        6 - currentSpeed,
        strips,
      );
    dispatch(setCurrentSequenceMode(mode));
  };

  return strips.length ? (
    <>
      <ScrollView
        style={{
          paddingTop: 10,
          paddingLeft: 10,
          paddingRight: 10,
          flex: 1,
        }}>
        {sequences.map((sequence, i) => (
          <View key={i} style={styles.sequenceContainer}>
            <View style={styles.sequenceNameContainer}>
              <TextInput
                onBlur={({nativeEvent: {text}}) =>
                  handleRenameSequence(i, text)
                }
                style={[ThemeStyles.h2, {flex: 1, fontSize: 20}]}
                defaultValue={sequence.name}
              />
              <DotButton
                onPress={() => handleDeleteSequence(i)}
                iconName="trash-can-outline"
              />
              <PillButton
                onPress={() => handlePlay(sequence.colors, i)}
                iconName="play"
                text="Jouer"
              />
            </View>
            <SequenceBuilder sequence={sequence} sequenceIndex={i} />
          </View>
        ))}
        <PillButton
          onPress={handleAddSequence}
          iconName="playlist-plus"
          text="New sequence"
          style={{alignSelf: 'center', margin: 20}}
        />
        <ModalColorPicker />
      </ScrollView>
      <View style={[ThemeStyles.parameterFooter, {height: 140}]}>
        <SequenceModePicker
          value={currentMode}
          onModeSelect={handleModeChange}
        />
        <SpeedSlider value={currentSpeed} onSpeedSelect={handleSpeedChange} />
      </View>
    </>
  ) : (
    <DisconnectedPlaceholder />
  );
};

const styles = StyleSheet.create({
  sequenceContainer: {
    marginBottom: 20,
  },
  sequenceNameContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    borderBottomColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'flex-end',
  },
});
