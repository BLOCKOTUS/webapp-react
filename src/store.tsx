import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import type { State } from './reducers';
import type { Action } from './actions';

// credits to @lyleunderwood
// thanks to our mutual COO Mike, and the whole mutual team
export type GenericGetState<S> = () => S;
export type GenericPromiseAction<A> = Promise<A>;
export type GenericDispatch<A, S> =
  (action: A | GenericThunkAction<A, S> | GenericPromiseAction<A>) => any;
export type GenericThunkAction<A, S> =
  (dispatch: GenericDispatch<A, S>, getState: GenericGetState<S>) => any;
export type GetState = GenericGetState<State>;
export type PromiseAction = GenericPromiseAction<Action>;
export type Dispatch = GenericDispatch<Action, State>;
export type ThunkAction = GenericThunkAction<Action, State>;
export type { State, Action };

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initializeStore = (preloadedState?: any) =>
  createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk)),
  );

export default initializeStore;
