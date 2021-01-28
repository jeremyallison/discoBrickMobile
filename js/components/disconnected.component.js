import React from 'react';
import {H1, H3} from 'native-base';

import {ThemeStyles} from '../theme';

export const DisconnectedPlaceholder = () => (
  <>
    <H1 style={ThemeStyles.h1}>Nothing connected yet</H1>
    <H3 style={ThemeStyles.h3}>Open the menu and turn on your DiscoBrick!</H3>
  </>
);
