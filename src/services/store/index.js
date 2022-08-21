import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from '../reducers/rootReducer';


const composeEnhancers =
	window === 'object' && (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const enhancer = composeEnhancers(
	applyMiddleware(thunk),
);

export const store = createStore(rootReducer, enhancer);