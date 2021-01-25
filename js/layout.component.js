import React, {useRef} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {
  Drawer,
  Body,
  Content,
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

import {Sidebar} from './components/sidebar.component';
import {ColorPicker} from './components/colorPicker.component';

export const Layout = () => {
  const strips = useSelector(({strips}) => strips);
  const drawerRef = useRef();

  closeDrawer = (drawerRef) => {
    drawerRef.current._root.close();
  };

  openDrawer = (drawerRef) => {
    drawerRef.current._root.open();
  };

  return (
    <Drawer
      ref={drawerRef}
      content={<Sidebar />}
      onClose={() => closeDrawer(drawerRef)}>
      <Container>
        <Header style={style.header}>
          <Left>
            <Button transparent onPress={() => openDrawer(drawerRef)}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>DiscoBrick!</Title>
          </Body>
          <Right />
        </Header>
        <Content style={style.content} scrollEnabled={false}>
          <Grid>
            <Row>{strips.length ? <ColorPicker strips={strips} /> : null}</Row>
          </Grid>
        </Content>
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
    </Drawer>
  );
};

const style = StyleSheet.create({
  header: {
    // backgroundColor: '#2d678e',
    color: '#FFFFFF',
  },
  content: {
    backgroundColor: '#2d678e',
  },
});
