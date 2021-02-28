import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducer from './reducers';

export type { State } from './reducers';
export type { Action } from './actions';

const persistConfig = {
  key: 'root',
  storage,
};
 
const persistedReducer = persistReducer<any, any>(persistConfig, reducer);

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initializeStore = (preloadedState?: any) =>
  createStore(
    persistedReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk)),
  );

export const store = initializeStore();

export const persistor = persistStore(store);
