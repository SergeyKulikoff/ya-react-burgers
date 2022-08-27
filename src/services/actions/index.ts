import {
	CONSTRUCTOR_MODAL,
	INGREDIENTS_DATA,
	INGREDIENTS_CHOOSE,
	INGREDIENT_DELETE,
	COUNTER_INCREASE,
	COUNTER_DECREASE,
	MOVE_INGREDIENT,

	ORDER_LOAD,
	GET_ORDER,
	GET_ORDER_SUCCESS,
	GET_ORDER_FAILED,
	CLEAR_ORDER,

	RESET_CONSTRUCTOR,
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
	WS_CONNECTION_START,
	WS_CONNECTION_CLOSE,
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_MESSAGE,
	WS_SEND_MESSAGE,
} from "../constants/actionTypes";

import { TUser, TIngredient, TMessage, TOrder } from "../../types";

//Libraries
import { v4 as uuidv4 } from 'uuid';

export const constructorShowModal = (): _IShowModalAction => ({
	type: CONSTRUCTOR_MODAL
})

export const ingredientGET = (ingredient: TIngredient): _IGetIngredientsAction => ({
	type: INGREDIENTS_DATA,
	data: ingredient
})

export const ingredientChoose = (item: TIngredient): _IIngredientChooseAction => ({
	type: INGREDIENTS_CHOOSE,
	item: item,
	productId: uuidv4()
})

export const ingredientDelete = (id: string): _IIngredientDeleteAction => ({
	type: INGREDIENT_DELETE,
	id: id
})

export const sortIngredients = (hoverIndex: number, dragIndex: number): _IMoveIngredientAction => ({
	type: MOVE_INGREDIENT,
	toIndex: hoverIndex,
	fromIndex: dragIndex
})

export const countDecrease = (item: any): _ICounterDecreaseAction => ({
	type: COUNTER_DECREASE,
	key: item.id,
	typeItem: item.type
})

export const countIncrease = (item: any): _ICounterIncreaseAction => ({
	type: COUNTER_INCREASE,
	key: item.id,
	typeItem: item.type
})

export const orderLoadAction = (orderNumber: any): _IOrderLoadAction => ({
	type: ORDER_LOAD,
	number: orderNumber
})

export const getOrderAction = (): _IGetOrderAction => ({
	type: GET_ORDER
})

export const orderSuccesAction = (order: TOrder): _IOrderSuccesAction => ({
	type: GET_ORDER_SUCCESS,
	order: order
})
export const orderFailedAction = (): _IOrderFailedAction => ({
	type: GET_ORDER_FAILED
})

export const clearOrderAction = (): _IClearOrderAction => ({
	type: CLEAR_ORDER,
})

export const resetConstructorAction = (): _IResetConstructorAction => ({
	type: RESET_CONSTRUCTOR,
})

export const userRegisterSuccess = (user: TUser): _IRegSuccessAction => ({
	type: REGISTER_SUCCESS,
	user: user
})

export const userRegisterFailed = (): _IRegFailedAction => ({
	type: REGISTER_FAILED,
})

export const userLogin = (user: TUser): _ILoginAction => ({
	type: LOGIN,
	user: user
})

export const refreshTokenRequestAction = (): _IRefTokenRequestAction => ({
	type: REFRESH_TOKEN_REQUEST
})

export const refreshTokenSuccesAction = (): _IRefTokenSuccessAction => ({
	type: REFRESH_TOKEN_SUCCESS
})

export const refreshTokenFailedAction = (): _IRefTokenFailedAction => ({
	type: REFRESH_TOKEN_FAILED
})

export const userLogout = (): _ILogoutAction => ({
	type: LOGOUT
})

export const userActionRequest = (): _IGetUserRequestAction => ({
	type: GET_USER_REQUEST
})

export const userActionSucces = (user: TUser): _IGetUserSuccessAction => ({
	type: GET_USER_SUCCESS,
	user: user
})

export const userActionFailed = (): _IGetUserFailedAction => ({
	type: GET_USER_FAILED
})

//WS
export const wsConectionStart = (url: string): _IStartAction => ({
	type: WS_CONNECTION_START,
	payload: url
})

export const wsConectionClose = (): _ICloseAction => ({
	type: WS_CONNECTION_CLOSE
})

export const wsConectionSuccess = (event: WebSocketEventMap): _ISuccessAction => ({
	type: WS_CONNECTION_SUCCESS,
	payload: event
})

export const wsConectionError = (error: WebSocketEventMap | null): _IErrorAction => ({
	type: WS_CONNECTION_ERROR,
	payload: error
})

export const wsConectionClosed = (event: WebSocketEventMap): _IClosedAction => ({
	type: WS_CONNECTION_CLOSED,
	payload: event
})

export const wsGetMessage = (message: TMessage): _IGetAction => ({
	type: WS_GET_MESSAGE,
	payload: message
})

export const wsSendMessage = (message: string): _ISendAction => ({
	type: WS_SEND_MESSAGE,
	payload: message
})


//Экшены Ингредиентов
export interface _IGetIngredientsAction { readonly type: typeof INGREDIENTS_DATA, data: TIngredient }

export interface _IResetConstructorAction { readonly type: typeof RESET_CONSTRUCTOR }
export interface _IOrderLoadAction { readonly type: typeof ORDER_LOAD, number: any }
export interface _IClearOrderAction { readonly type: typeof CLEAR_ORDER }
export interface _ICounterDecreaseAction { readonly type: typeof COUNTER_DECREASE, key: string, typeItem: string }
export interface _ICounterIncreaseAction { readonly type: typeof COUNTER_INCREASE, key: string, typeItem: string }
export interface _IMoveIngredientAction { readonly type: typeof MOVE_INGREDIENT, toIndex: number, fromIndex: number }
export interface _IIngredientDeleteAction { readonly type: typeof INGREDIENT_DELETE, id: string }
export interface _IIngredientChooseAction { readonly type: typeof INGREDIENTS_CHOOSE, item: TIngredient, productId: string }
export interface _IShowModalAction { readonly type: typeof CONSTRUCTOR_MODAL }

export type TIngredientActions =
	| _IResetConstructorAction
	| _IOrderLoadAction
	| _IClearOrderAction
	| _ICounterDecreaseAction
	| _ICounterIncreaseAction
	| _IMoveIngredientAction
	| _IIngredientDeleteAction
	| _IIngredientChooseAction
	| _IShowModalAction

//Экшены авторизации
export interface _ILoginAction { readonly type: typeof LOGIN, user: TUser }
export interface _IRegSuccessAction { readonly type: typeof REGISTER_SUCCESS, user: TUser }
export interface _IRegFailedAction { readonly type: typeof REGISTER_FAILED; }
export interface _ILogoutAction { readonly type: typeof LOGOUT; }
export interface _IRefTokenRequestAction { readonly type: typeof REFRESH_TOKEN_REQUEST; }
export interface _IRefTokenSuccessAction { readonly type: typeof REFRESH_TOKEN_SUCCESS; }
export interface _IRefTokenFailedAction { readonly type: typeof REFRESH_TOKEN_FAILED; }
export interface _IGetUserRequestAction { readonly type: typeof GET_USER_REQUEST; }
export interface _IGetUserSuccessAction { readonly type: typeof GET_USER_SUCCESS, user: TUser }
export interface _IGetUserFailedAction { readonly type: typeof GET_USER_FAILED; }

export type TAuthActions =
	| _ILoginAction
	| _IRegSuccessAction
	| _IRegFailedAction
	| _ILogoutAction
	| _IRefTokenRequestAction
	| _IRefTokenSuccessAction
	| _IGetUserRequestAction
	| _IGetUserFailedAction
	| _IGetUserSuccessAction
	| _IRefTokenFailedAction;


//Экшены ленты заказов
export interface _IGetOrderAction { type: typeof GET_ORDER }
export interface _IOrderSuccesAction { type: typeof GET_ORDER_SUCCESS, order: TOrder }
export interface _IOrderFailedAction { type: typeof GET_ORDER_FAILED }

export type TOrderActions =
	| _IGetOrderAction
	| _IOrderSuccesAction
	| _IOrderFailedAction


//Экшены WS
export interface _IStartAction { type: typeof WS_CONNECTION_START, payload: string }
export interface _ICloseAction { type: typeof WS_CONNECTION_CLOSE }
export interface _ISuccessAction { type: typeof WS_CONNECTION_SUCCESS, payload: WebSocketEventMap }
export interface _IErrorAction { type: typeof WS_CONNECTION_ERROR, payload: WebSocketEventMap | null }
export interface _IClosedAction { type: typeof WS_CONNECTION_CLOSED, payload: WebSocketEventMap }
export interface _IGetAction { type: typeof WS_GET_MESSAGE, payload: TMessage }
export interface _ISendAction { type: typeof WS_SEND_MESSAGE, payload: string }

export type TWSActions =
	| _IStartAction
	| _ISuccessAction
	| _IErrorAction
	| _IClosedAction
	| _IGetAction
	| _ICloseAction
	| _ISendAction;

export type TWSActionNames = {
	[key in TWSActions['type']]: key
}