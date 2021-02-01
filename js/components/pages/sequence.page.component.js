import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, ScrollView, TextInput} from 'react-native';
import {H2, View, Segment, Button, Text} from 'native-base';

import {
  deleteSequence,
  addSequence,
  setCurrentSequence,
  setCurrentSequenceSpeed,
  updateSequenceName,
} from '../../store/actions';
import {MagicLightBt, SequenceModes} from '../../utils/magicLightBt';
import {ThemeColors, ThemeStyles} from '../../theme';

import {DotButton, PillButton} from '../../components/buttons.component';
import {DisconnectedPlaceholder} from '../disconnected.component';
import {SequenceBuilder} from '../pickers/sequenceBuilder.component';
import {ModalColorPicker} from '../../components/pickers/modalColorPicker.component';
import {SpeedSlider} from '../pickers/speedSlider.component';

const SequenceModeNames = {
  [SequenceModes.FADE]: 'Fondu',
  [SequenceModes.CUT]: 'Coupé',
  [SequenceModes.STROBE]: 'Eclairs',
};

export const SequencePage = () => {
  const dispatch = useDispatch();
  const [currentMode, setCurrentMode] = useState(SequenceModes.FADE);
  const strips = useSelector(({strips}) => strips);
  const sequences = useSelector(({sequences}) => sequences),
    {sequence: currentSequence, speed} = useSelector(
      ({currentSequence}) => currentSequence,
    );

  const handleAddSequence = () => dispatch(addSequence());
  const handleDeleteSequence = (i) => dispatch(deleteSequence(i));
  const handlePlay = (colors, sequenceIndex) => {
    MagicLightBt.sendSequence(colors, currentMode, 6 - speed, strips);
    dispatch(setCurrentSequence(sequenceIndex));
  };

  const handleRenameSequence = (i, name) =>
    dispatch(updateSequenceName(i, name));

  const setSpeed = (speed) => {
    currentSequence !== null &&
      MagicLightBt.sendSequence(
        sequences[currentSequence].colors,
        currentMode,
        6 - speed,
        strips,
      );
    dispatch(setCurrentSequenceSpeed(speed));
  };

  const segmentButtons = Object.keys(SequenceModes).map((modeKey, i) => (
    <Button
      active={currentMode === SequenceModes[modeKey]}
      onPress={() => setCurrentMode(SequenceModes[modeKey])}
      key={modeKey}
      first={i === 0}
      last={i === Object.keys(SequenceModes).length - 1}
      style={[
        styles.segmentButton,
        currentMode === SequenceModes[modeKey] && styles.segmentButtonActive,
      ]}>
      <Text
        style={[
          styles.segmentButtonText,
          currentMode === SequenceModes[modeKey] &&
            styles.segmentButtonTextActive,
        ]}>
        {SequenceModeNames[SequenceModes[modeKey]]}
      </Text>
    </Button>
  ));

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
        <Segment style={{backgroundColor: 'transparent', marginBottom: 15}}>
          {segmentButtons}
        </Segment>
        <SpeedSlider value={speed} onSpeedSelect={setSpeed} />
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
  segmentButton: {
    borderColor: '#fff',
  },
  segmentButtonActive: {
    backgroundColor: '#fff',
  },
  segmentButtonText: {
    color: '#fff',
  },
  segmentButtonTextActive: {
    color: ThemeColors.highlight,
  },
});
