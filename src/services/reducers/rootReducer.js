import { combineReducers } from "redux";

import isOpen from './toggleModal';
import fetchData from "./getData";
import orderReducer from "./order";

export default combineReducers({
	isOpen,
	fetchData,
	orderReducer
})
