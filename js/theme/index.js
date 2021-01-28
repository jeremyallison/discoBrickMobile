import {StyleSheet} from 'react-native';

export const ThemeColors = {
  highlight: '#2d678e', // old #3f9dc3
  neutralGrey: '#444',
};

const CommonStyle = {
  pillDotButton: {
    height: 35,
    width: 35,
    borderRadius: 17,
    margin: 5,
    padding: 7,
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#fff',
  },
  pillDotIcon: {
    color: '#fff',
  },
};

export const ThemeStyles = StyleSheet.create({
  h1: {
    color: '#fff',
    fontSize: 30,
    alignSelf: 'center',
  },
  h2: {
    color: '#fff',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  h3: {
    color: '#222',
    fontSize: 20,
    marginTop: 10,
    alignSelf: 'center',
  },
  lightDotButton: {
    ...CommonStyle.pillDotButton,
    width: 35,
  },
  lightDotIcon: {
    ...CommonStyle.pillDotIcon,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  lightPillButton: {
    ...CommonStyle.pillDotButton,
    width: 'auto',
  },
  lightPillIcon: {
    ...CommonStyle.pillDotIcon,
    marginLeft: 3,
    marginRight: 'auto',
  },
});
