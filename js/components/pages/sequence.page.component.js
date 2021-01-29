import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, ScrollView} from 'react-native';
import {H2, View, Segment, Button, Text} from 'native-base';

import {deleteSequence, addSequence} from '../../store/actions';
import {MagicLightBt, SequenceModes} from '../../utils/magicLightBt';
import {ThemeColors, ThemeStyles} from '../../theme';

import {DotButton, PillButton} from '../../components/buttons.component';
import {DisconnectedPlaceholder} from '../disconnected.component';
import {SequenceBuilder} from '../pickers/sequenceBuilder.component';
import {ModalColorPicker} from '../../components/pickers/modalColorPicker.component';

const SequenceModeNames = {
  [SequenceModes.FADE]: 'Fondu',
  [SequenceModes.CUT]: 'Coupé',
  [SequenceModes.STROBE]: 'Eclairs',
};

export const SequencePage = () => {
  const dispatch = useDispatch();
  const [currentMode, setCurrentMode] = useState(SequenceModes.FADE);
  const strips = useSelector(({strips}) => strips);
  const sequences = useSelector(({sequences}) => sequences);

  const handleAddSequence = () => dispatch(addSequence());
  const handleDeleteSequence = (i) => dispatch(deleteSequence(i));
  const handlePlay = (colors) =>
    MagicLightBt.sendSequence(colors, currentMode, 1, strips);

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
      <ScrollView style={{padding: 10}}>
        <Segment>{segmentButtons}</Segment>
        {sequences.map((sequence, i) => (
          <View key={i}>
            <View style={styles.sequenceContainer}>
              <H2 style={ThemeStyles.h2}>{sequence.name}</H2>
              <DotButton
                onPress={() => handleDeleteSequence(i)}
                iconName="trash-can-outline"
              />
              <PillButton
                onPress={() => handlePlay(sequence.colors)}
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
        />
      </ScrollView>
      <ModalColorPicker />
    </>
  ) : (
    <DisconnectedPlaceholder />
  );
};

const styles = StyleSheet.create({
  sequenceContainer: {
    marginTop: 20,
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
