import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from '../reducers/rootReducer';
import { socketMiddleware } from "../middleware/socketMiddleware";

const composeEnhancers =
	typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const enhancer = composeEnhancers(
	applyMiddleware(thunk),
	applyMiddleware(socketMiddleware())
);

export const store = createStore(rootReducer, enhancer);