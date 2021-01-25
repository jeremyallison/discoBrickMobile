import React from 'react';
import {Provider} from 'react-redux';
import store from './store/index';

import {Layout} from './layout.component';

import {Bt} from './utils/bt';
Bt.subscribe();

export const App = () => (
  <Provider store={store}>
    <Layout />
  </Provider>
);
