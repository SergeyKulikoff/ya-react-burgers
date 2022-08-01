import { combineReducers } from "redux";

import isOpen from './toggleModal';
import fetchData from "./getData";

export default combineReducers({
	isOpen,
	fetchData
})
