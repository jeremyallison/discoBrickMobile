import React from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import {PillButton} from './buttons.component';
import {ThemeColors} from '../theme';

export const LanguageSelector = () => {
  const {i18n} = useTranslation();

  return (
    <>
      <PillButton
        style={[
          styles.languageButton,
          i18n.language === 'fr' && styles.languageButtonActive,
        ]}
        text="🇫🇷"
        onPress={() => i18n.changeLanguage('fr')}
      />
      <PillButton
        style={[
          styles.languageButton,
          i18n.language === 'en' && styles.languageButtonActive,
        ]}
        text="🇬🇧"
        onPress={() => i18n.changeLanguage('en')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  languageButton: {
    backgroundColor: '#fff',
  },
  languageButtonActive: {
    borderColor: ThemeColors.brightHighlight,
  },
});
