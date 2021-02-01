import React from 'react';

import {ThemeStyles} from '../theme';
import {H1, H3} from './translatedText.component';

export const DisconnectedPlaceholder = () => (
  <>
    <H1 style={ThemeStyles.h1}>Nothing connected yet</H1>
    <H3 style={ThemeStyles.h3}>Open the menu and turn on your DiscoBrick!</H3>
  </>
);
