import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, ScrollView} from 'react-native';
import {H2, View, Segment, Button, Text} from 'native-base';

import {MagicLightBt, SequenceModes} from '../../utils/magicLightBt';

import {DisconnectedPlaceholder} from '../disconnected.component';
import {SequenceBuilder} from '../pickers/sequenceBuilder.component';
import {ModalColorPicker} from '../../components/pickers/modalColorPicker.component';

export const SequencePage = () => {
  const [currentMode, setCurrentMode] = useState(SequenceModes.FADE);
  const strips = useSelector(({strips}) => strips);
  const sequences = useSelector(({sequences}) => sequences);

  return strips.length ? (
    <>
      <ScrollView>
        <Segment>
          <Button
            first
            active={currentMode === SequenceModes.FADE}
            onPress={() => setCurrentMode(SequenceModes.FADE)}>
            <Text>Fade</Text>
          </Button>
          <Button
            active={currentMode === SequenceModes.CUT}
            onPress={() => setCurrentMode(SequenceModes.CUT)}>
            <Text>Cut</Text>
          </Button>
          <Button
            last
            active={currentMode === SequenceModes.STROBE}
            onPress={() => setCurrentMode(SequenceModes.STROBE)}>
            <Text>Strobe</Text>
          </Button>
        </Segment>
        {sequences.map((sequence, i) => (
          <View key={i}>
            <H2 style={styles.h2}>{sequence.name}</H2>
            <Button
              onPress={() => {
                MagicLightBt.sendSequence(
                  sequence.colors,
                  currentMode,
                  1,
                  strips,
                );
              }}>
              <Text>Apply</Text>
            </Button>
            <SequenceBuilder sequence={sequence} sequenceIndex={i} />
          </View>
        ))}
      </ScrollView>
      <ModalColorPicker />
    </>
  ) : (
    <DisconnectedPlaceholder />
  );
};

const styles = StyleSheet.create({
  h2: {
    color: '#fff',
    fontSize: 25,
    marginTop: 10,
  },
});
