import React from 'react';
import {Button, Text} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import {ThemeStyles} from '../theme';

export const PillButton = ({iconName, text, ...props}) => {
  return (
    <Button style={ThemeStyles.lightPillButton} {...props}>
      <Icon size={15} style={ThemeStyles.lightPillIcon} name={iconName} />
      <Text>{text}</Text>
    </Button>
  );
};

export const DotButton = ({iconName, ...props}) => {
  return (
    <Button style={ThemeStyles.lightDotButton} {...props}>
      <Icon size={15} style={ThemeStyles.lightDotIcon} name={iconName} />
    </Button>
  );
};
