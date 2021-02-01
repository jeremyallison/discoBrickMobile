import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {isEmulatorSync} from 'react-native-device-info';

const __DEBUG__ = isEmulatorSync();

import store, {persistor} from './store/index';
import {Layout} from './layout.component';

import {Bt} from './utils/bt';
Bt.subscribe();

export const App = () => (
  <Provider store={store}>
    {__DEBUG__ ? (
      <Layout />
    ) : (
      <PersistGate loading={null} persistor={persistor}>
        <Layout />
      </PersistGate>
    )}
  </Provider>
);
