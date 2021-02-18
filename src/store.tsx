import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import type { State } from './reducers';
import type { Action } from './actions';

export type { State, Action };

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initializeStore = (preloadedState?: any) =>
  createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk)),
  );

export default initializeStore;
