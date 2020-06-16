import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import clientMiddleware from './clientMiddleware';
import reducers from './reducers';
import Service from '~/utils/Service';

export default function configureStore(initialState = {}) {
  // middlewares
  const reducer = combineReducers({ ...reducers });
  // async reduces middleware
  const middlewares = [clientMiddleware(new Service()), thunk];

  // ONLY in dev environment and if we have redux devtools installed hook into it.
  const reduxDevtoolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ || window.devToolsExtension;
  if (reduxDevtoolsExtension) {
    const enhancer = compose(
      applyMiddleware(...middlewares),
      reduxDevtoolsExtension()
    );
    return createStore(reducer, initialState, enhancer);
  }

  const enhancer = compose(applyMiddleware(...middlewares));
  return createStore(reducer, initialState, enhancer);
}
