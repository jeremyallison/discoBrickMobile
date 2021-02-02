import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import resources from './lang.json';

export const LANG_STORAGE_KEY = '@lang';

const languageDetector = {
  init: Function.prototype,
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    const lng = (await AsyncStorage.getItem(LANG_STORAGE_KEY)) || 'fr';
    // const selectLanguage = lng || 'fr';
    callback(lng);
  },
  cacheUserLanguage: () => {},
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    resources,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
