import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isEmulatorSync} from 'react-native-device-info';

const __DEBUG__ = isEmulatorSync();

import rootReducer from './reducers/index';

let store, persistor;

if (__DEBUG__) {
  store = createStore(rootReducer);
} else {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['strips', 'availableStrips'],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  store = createStore(persistedReducer);
  persistor = persistStore(store);
}

export {persistor};
export default store;
