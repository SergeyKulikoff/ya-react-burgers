import { combineReducers } from "redux";

import isOpen from './toggleModal';
import fetchData from "./getData";
import orderReducer from "./order";
import authReducer from "./auth";
import wsReducer from "./wsReducer";

export default combineReducers({
	isOpen,
	fetchData,
	orderReducer,
	authReducer,
	wsReducer
})
