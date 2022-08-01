import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    composeWithDevTools(applyMiddleware(thunk))
);