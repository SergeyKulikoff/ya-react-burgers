import {
	CONSTRUCTOR_MODAL,
	INGREDIENT_MODAL,
	INGREDIENTS_DATA,
	INGREDIENTS_CHOOSE,
	INGREDIENT_DELETE,
	COUNTER_INCREASE,
	COUNTER_DECREASE,
	MOVE_INGREDIENT,
	ORDER_LOAD,
	RESET_CONSTRUCTOR,
	CLEAR_ORDER,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN,
	LOGOUT,
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	GET_USER_FAILED,
	REFRESH_TOKEN_REQUEST,
	REFRESH_TOKEN_SUCCESS,
	REFRESH_TOKEN_FAILED,
} from "../constants/actionTypes";

//Libraries
import { v4 as uuidv4 } from 'uuid';

export const constructorShowModal = () => ({
	type: CONSTRUCTOR_MODAL
})

export const ingredientShowModal = () => ({
	type: INGREDIENT_MODAL
})

export const ingredientGET = data => ({
	type: INGREDIENTS_DATA,
	payload: data
})

export const ingredientChoose = item => ({
	type: INGREDIENTS_CHOOSE,
	payload: item,
	productId: uuidv4()
})

export const ingredientDelete = id => ({
	type: INGREDIENT_DELETE,
	id: id
})

export const sortIngredients = (hoverIndex, dragIndex) => ({
	type: MOVE_INGREDIENT,
	toIndex: hoverIndex,
	fromIndex: dragIndex
})

export const countDecrease = item => ({
	type: COUNTER_DECREASE,
	key: item.id,
	typeItem: item.type
})

export const countIncrease = item => ({
	type: COUNTER_INCREASE,
	key: item.id,
	typeItem: item.type
})

export const orderLoadAction = orderNumber => ({
	type: ORDER_LOAD,
	number: orderNumber
})

export const resetConstructorAction = () => ({
	type: RESET_CONSTRUCTOR,
})

export const clearOrderAction = () => ({
	type: CLEAR_ORDER,
})

export const userRegisterSuccess = user => ({
	type: REGISTER_SUCCESS,
	user: user
})

export const userRegisterFailed = () => ({
	type: REGISTER_FAILED,
})

export const userLogin = user => ({
	type: LOGIN,
	user: user
})

export const refreshTokenRequestAction = () => ({
	type: REFRESH_TOKEN_REQUEST
})

export const refreshTokenSuccesAction = () => ({
	type: REFRESH_TOKEN_SUCCESS
})

export const refreshTokenFailedAction = () => ({
	type: REFRESH_TOKEN_FAILED
})

export const userLogout = () => ({
	type: LOGOUT
})

export const userActionRequest = () => ({
	type: GET_USER_REQUEST
})

export const userActionSucces = user => ({
	type: GET_USER_SUCCESS,
	user: user
})

export const userActionFailed = () => ({
	type: GET_USER_FAILED
})
