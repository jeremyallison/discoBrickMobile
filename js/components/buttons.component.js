import React from 'react';
import {Button, Text} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {ThemeStyles} from '../theme';

export const PillButton = ({iconName, text, style, ...props}) => {
  return (
    <Button style={[ThemeStyles.lightPillButton, style]} {...props}>
      <Icon size={15} style={ThemeStyles.lightPillIcon} name={iconName} />
      <Text>{text}</Text>
    </Button>
  );
};

export const DotButton = ({iconName, big, style, ...props}) => {
  return (
    <Button
      style={[
        ThemeStyles.lightDotButton,
        big && ThemeStyles.lightDotButtonBig,
        style,
      ]}
      {...props}>
      <Icon
        size={big ? 30 : 15}
        style={[ThemeStyles.lightDotIcon, big && ThemeStyles.lightDotIconBig]}
        name={iconName}
      />
    </Button>
  );
};
