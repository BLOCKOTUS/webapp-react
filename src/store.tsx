import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import type { State } from './reducers';

const initializeStore = (preloadedState?: State) =>
  createStore(
    reducer,
    preloadedState,
    applyMiddleware(thunk),
  );

export default initializeStore;
