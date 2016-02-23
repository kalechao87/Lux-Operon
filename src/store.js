import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import * as reducers from 'reducers';

// Combine reducers
const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

// Apply the middleware to the store
const middleware = routerMiddleware( browserHistory );

// Create Redux DevTools
export const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible={false}>
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
);

// Add the reducer to your store on the `routing` key
export const store = createStore(
  reducer,
  DevTools.instrument(),
  applyMiddleware( middleware )
);

// Create an enhanced history that syncs navigation events with the store
export const history = syncHistoryWithStore( browserHistory, store );