import React from 'react';
import {useSelector} from 'react-redux';
import {
  Body,
  Button,
  Container,
  Left,
  Right,
  Header,
  Text,
  Title,
  Footer,
  FooterTab,
  Icon,
} from 'native-base';
import {Row, Grid} from 'react-native-easy-grid';

import {ConnectButton} from './components/connectButton.component';
import {StripCounter} from './components/stripCounter.component';
import {ColorPicker} from './components/colorpicker.component';

export const Layout = () => {
  const strips = useSelector(({strips}) => strips);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>DiscoBrick!</Title>
        </Body>
        <Right />
      </Header>
      <Grid>
        <Row style={{height: 80, marginTop: 30, alignSelf: 'center'}}>
          <ConnectButton />
        </Row>
        <StripCounter />
        <Row>{strips.length ? <ColorPicker strips={strips} /> : null}</Row>
      </Grid>
      <Footer>
        <FooterTab>
          <Button vertical active>
            <Icon name="color-palette" />
            <Text>Single color</Text>
          </Button>
          <Button vertical>
            <Icon name="color-wand-outline" />
            <Text>Presets</Text>
          </Button>
          <Button vertical>
            <Icon name="construct-outline" />
            <Text>Sequence</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};
