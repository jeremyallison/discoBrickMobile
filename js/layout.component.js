import React, {useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Drawer, Content, Container} from 'native-base';

import {ColorPickerPage} from './components/pages/colorPicker.page.component';
import {PresetsPage} from './components/pages/presets.page.component';
import {SequencePage} from './components/pages/sequence.page.component';

import {Header} from './components/navigation/header.component';
import {Sidebar} from './components/navigation/sidebar.component';
import {Footer} from './components/navigation/footer.component';

import {Pages} from './components/pages/pages.constants';

export const Layout = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef();
  const activeTab = useSelector(({activeTab}) => activeTab);

  const closeDrawer = () => {
    drawerRef.current._root.close();
    setDrawerOpen(false);
  };

  const openDrawer = () => {
    drawerRef.current._root.open();
    setDrawerOpen(true);
  };

  let Tab;

  switch (activeTab) {
    case Pages.COLOR_PICKER:
      Tab = <ColorPickerPage />;
      break;

    case Pages.PRESETS:
      Tab = <PresetsPage />;
      break;

    case Pages.SEQUENCES:
      Tab = <SequencePage />;
      break;

    default:
      Tab = <ColorPickerPage />;
  }

  return (
    <Drawer
      ref={drawerRef}
      content={<Sidebar isDrawerOpen={isDrawerOpen} />}
      onClose={closeDrawer}>
      <Container>
        <Header openDrawerHandler={openDrawer} />
        <Content
          contentContainerStyle={{flex: 1, justifyContent: 'center'}}
          style={styles.content}
          scrollEnabled={false}>
          {Tab}
        </Content>
        <Footer />
      </Container>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#2d678e',
  },
});
