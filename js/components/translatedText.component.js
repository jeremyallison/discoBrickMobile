import React from 'react';
import {useTranslation} from 'react-i18next';
import {H1 as RNH1, H2 as RNH2, H3 as RNH3, Text as RNText} from 'native-base';

export const H1 = (props) => {
  const {t} = useTranslation();
  return <RNH1 {...props}>{t(props.children)}</RNH1>;
};

export const H2 = (props) => {
  const {t} = useTranslation();
  return <RNH2 {...props}>{t(props.children)}</RNH2>;
};

export const H3 = (props) => {
  const {t} = useTranslation();
  return <RNH3 {...props}>{t(props.children)}</RNH3>;
};

export const Text = (props) => {
  const {t} = useTranslation();
  return <RNText {...props}>{t(props.children)}</RNText>;
};
