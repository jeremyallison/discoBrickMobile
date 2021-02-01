import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Footer as NBFooter, FooterTab, Button} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import {Pages} from '../pages/pages.constants';
import {setActiveTab} from '../../store/actions';
import {ThemeColors} from '../../theme';
import {Text} from '../../components/translatedText.component';

const pageTabs = [
  {page: Pages.COLOR_PICKER, text: 'Single color', icon: 'sliders'},
  {page: Pages.PRESETS, text: 'Presets', icon: 'star'},
  {page: Pages.SEQUENCES, text: 'Sequences', icon: 'repeat'},
];

const a = ThemeColors.highlight,
  b = ThemeColors.neutralGrey;

export const Footer = () => {
  const activeTab = useSelector(({activeTab}) => activeTab);

  const dispatch = useDispatch();

  return (
    <NBFooter>
      <FooterTab style={{backgroundColor: '#fff'}}>
        {pageTabs.map(({page, text, icon}) => (
          <Button
            key={page}
            active={activeTab === page}
            style={styles.footerButton}
            onPress={() => dispatch(setActiveTab(page))}>
            <Icon
              name={icon}
              size={25}
              color={activeTab === page ? a : b}
              style={{marginBottom: 5}}
            />
            <Text
              style={{
                color: activeTab === page ? a : b,
              }}>
              {text}
            </Text>
          </Button>
        ))}
      </FooterTab>
    </NBFooter>
  );
};

const styles = StyleSheet.create({
  footerButton: {
    backgroundColor: '#fff',
  },
});
