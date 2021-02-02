import React from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {LANG_STORAGE_KEY} from '../../i18n';

import {PillButton} from './buttons.component';
import {ThemeColors} from '../theme';

export const LanguageSelector = () => {
  const {i18n} = useTranslation();

  const handleLanguageChange = (lang) => {
    AsyncStorage.setItem(LANG_STORAGE_KEY, lang);
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <PillButton
        style={[
          styles.languageButton,
          i18n.language === 'fr' && styles.languageButtonActive,
        ]}
        text="🇫🇷"
        onPress={() => handleLanguageChange('fr')}
      />
      <PillButton
        style={[
          styles.languageButton,
          i18n.language === 'en' && styles.languageButtonActive,
        ]}
        text="🇬🇧"
        onPress={() => handleLanguageChange('en')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  languageButton: {
    backgroundColor: '#fff',
  },
  languageButtonActive: {
    backgroundColor: ThemeColors.highlight,
  },
});
