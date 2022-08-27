import { TUser } from "../../types"
import {
	GET_USER_FAILED,
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	LOGIN, LOGOUT,
	REFRESH_TOKEN_FAILED,
	REFRESH_TOKEN_REQUEST,
	REFRESH_TOKEN_SUCCESS,
	REGISTER_FAILED,
	REGISTER_SUCCESS
} from "../constants/actionTypes"

export type _TAuthInitialState = {
	login: boolean,
	authorized: boolean,
	user: TUser,
	getUserRequest: boolean,
	refreshTokenRequest: boolean,
	tokenIsGood: boolean
}

export type _TRegSuccessAction = { type: typeof REGISTER_SUCCESS }
export type _TRegFailedAction = { type: typeof REGISTER_FAILED }
export type _TLoginAction = { type: typeof LOGIN, user: TUser }
export type _TLogoutAction = { type: typeof LOGOUT }
export type _TUserReqAction = { type: typeof GET_USER_REQUEST }
export type _TUserSuccessAction = { type: typeof GET_USER_SUCCESS, user: TUser }
export type _TUserFailedAction = { type: typeof GET_USER_FAILED }
export type _TTokenRequestAction = { type: typeof REFRESH_TOKEN_REQUEST }
export type _TTokenSuccessAction = { type: typeof REFRESH_TOKEN_SUCCESS }
export type _TTokenFailedAction = { type: typeof REFRESH_TOKEN_FAILED }

export type _TAuthActions =
	| _TRegSuccessAction
	| _TRegFailedAction
	| _TLoginAction
	| _TLogoutAction
	| _TUserReqAction
	| _TUserSuccessAction
	| _TUserFailedAction
	| _TTokenRequestAction
	| _TTokenSuccessAction
	| _TTokenFailedAction