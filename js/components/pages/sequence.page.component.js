import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, ScrollView} from 'react-native';
import {H2, View} from 'native-base';

import {DisconnectedPlaceholder} from '../disconnected.component';
import {SequenceBuilder} from '../pickers/sequenceBuilder.component';
import {ModalColorPicker} from '../../components/pickers/modalColorPicker.component';

export const SequencePage = () => {
  const strips = useSelector(({strips}) => strips);
  const sequences = useSelector(({sequences}) => sequences);

  return strips.length ? (
    <>
      <ScrollView>
        {sequences.map((sequence, i) => (
          <View key={i}>
            <H2 style={style.h2}>{sequence.name}</H2>
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

const style = StyleSheet.create({
  h2: {
    color: '#fff',
    fontSize: 25,
    marginTop: 10,
  },
});
