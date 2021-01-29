import React from 'react';
import {Button, Text} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {ThemeStyles} from '../theme';

export const PillButton = ({iconName, text, ...props}) => {
  return (
    <Button style={ThemeStyles.lightPillButton} {...props}>
      <Icon size={15} style={ThemeStyles.lightPillIcon} name={iconName} />
      <Text>{text}</Text>
    </Button>
  );
};

export const DotButton = ({iconName, big, ...props}) => {
  return (
    <Button
      style={[ThemeStyles.lightDotButton, big && ThemeStyles.lightDotButtonBig]}
      {...props}>
      <Icon
        size={big ? 30 : 15}
        style={[ThemeStyles.lightDotIcon, big && ThemeStyles.lightDotIconBig]}
        name={iconName}
      />
    </Button>
  );
};
