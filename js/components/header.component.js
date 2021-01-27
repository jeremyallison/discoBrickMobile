import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Body, Button, Left, Right, Header as NBHeader} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import {ThemeColors} from '../utils/colors';

export const Header = ({openDrawerHandler}) => {
  return (
    <NBHeader style={style.header}>
      <Left>
        <Button transparent onPress={openDrawerHandler}>
          <Icon size={30} color={ThemeColors.highlight} name="menu" />
        </Button>
      </Left>
      <Body>
        <Image
          source={require('../../assets/images/discobrick-header-logo.png')}
          style={style.headerLogo}
        />
      </Body>
      <Right />
    </NBHeader>
  );
};

const style = StyleSheet.create({
  header: {
    color: '#FFFFFF',
  },
  headerLogo: {
    height: 50,
    aspectRatio: 3,
  },
});
