import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Footer as NBFooter, FooterTab, Button, Text} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import {Pages} from '../pages/pages.constants';
import {setActiveTab} from '../../store/actions';
import {ThemeColors} from '../../theme';

export const Footer = () => {
  const activeTab = useSelector(({activeTab}) => activeTab);

  const dispatch = useDispatch();

  return (
    <NBFooter>
      <FooterTab>
        <Button
          vertical
          active={activeTab === Pages.COLOR_PICKER}
          onPress={() => dispatch(setActiveTab(Pages.COLOR_PICKER))}>
          <Icon
            name="sliders"
            size={25}
            color={
              activeTab === Pages.COLOR_PICKER
                ? ThemeColors.highlight
                : ThemeColors.neutralGrey
            }
            style={{marginBottom: 5}}
          />
          <Text
            style={{
              color:
                activeTab === Pages.COLOR_PICKER
                  ? ThemeColors.highlight
                  : ThemeColors.neutralGrey,
            }}>
            Single color
          </Text>
        </Button>
        <Button
          vertical
          active={activeTab === Pages.PRESETS}
          onPress={() => dispatch(setActiveTab(Pages.PRESETS))}>
          <Icon
            name="star"
            size={25}
            color={
              activeTab === Pages.PRESETS
                ? ThemeColors.highlight
                : ThemeColors.neutralGrey
            }
            style={{marginBottom: 5}}
          />
          <Text
            style={{
              color:
                activeTab === Pages.PRESETS
                  ? ThemeColors.highlight
                  : ThemeColors.neutralGrey,
            }}>
            Presets
          </Text>
        </Button>
        <Button
          vertical
          active={activeTab === Pages.SEQUENCES}
          onPress={() => dispatch(setActiveTab(Pages.SEQUENCES))}>
          <Icon
            name="repeat"
            size={25}
            color={
              activeTab === Pages.SEQUENCES
                ? ThemeColors.highlight
                : ThemeColors.neutralGrey
            }
            style={{marginBottom: 5}}
          />
          <Text
            style={{
              color:
                activeTab === Pages.SEQUENCES
                  ? ThemeColors.highlight
                  : ThemeColors.neutralGrey,
            }}>
            Sequence
          </Text>
        </Button>
      </FooterTab>
    </NBFooter>
  );
};
