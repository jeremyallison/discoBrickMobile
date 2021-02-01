import React from 'react';
import {Segment, Button} from 'native-base';
import {StyleSheet} from 'react-native';

import {SequenceModes} from '../../utils/magicLightBt';
import {ThemeColors} from '../../theme';
import {Text} from '../../components/translatedText.component';

const SequenceModeNames = {
  [SequenceModes.FADE]: 'Fade',
  [SequenceModes.CUT]: 'Cut',
  [SequenceModes.STROBE]: 'Strobe',
};

export const SequenceModePicker = ({value, onModeSelect}, ...props) => {
  return (
    <Segment
      style={{backgroundColor: 'transparent', marginBottom: 15}}
      {...props}>
      {Object.keys(SequenceModes).map((modeKey, i) => (
        <Button
          active={value === SequenceModes[modeKey]}
          onPress={() => onModeSelect(SequenceModes[modeKey])}
          key={modeKey}
          first={i === 0}
          last={i === Object.keys(SequenceModes).length - 1}
          style={[
            styles.segmentButton,
            value === SequenceModes[modeKey] && styles.segmentButtonActive,
          ]}>
          <Text
            style={[
              styles.segmentButtonText,
              value === SequenceModes[modeKey] &&
                styles.segmentButtonTextActive,
            ]}>
            {SequenceModeNames[SequenceModes[modeKey]]}
          </Text>
        </Button>
      ))}
    </Segment>
  );
};

const styles = StyleSheet.create({
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
