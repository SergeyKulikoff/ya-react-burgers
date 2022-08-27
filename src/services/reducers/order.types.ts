import { TOrder } from '../../types'
import {
	CLEAR_ORDER,
	GET_ORDER,
	GET_ORDER_FAILED,
	GET_ORDER_SUCCESS,
	ORDER_LOAD
} from '../constants/actionTypes'

export type _TOrderLoadAction = {
	type: typeof ORDER_LOAD
	number: number
}

export type GetOrderAction = {
	type: typeof GET_ORDER
}

export type GetOrderActionSuccess = {
	type: typeof GET_ORDER_SUCCESS
	order: TOrder
}

export type GetOrderActionFailed = {
	type: typeof GET_ORDER_FAILED
}

export type _TClearOrderAction = {
	type: typeof CLEAR_ORDER
}

export type _TOrderActions =
	| _TOrderLoadAction
	| GetOrderAction
	| GetOrderActionSuccess
	| GetOrderActionFailed
	| _TClearOrderAction

export type TGetOrderResponse = {
	name: string
	orders: TOrder[]
	success: boolean
} & Response

export type _TOrderState = {
	number?: number
	orderRequest: boolean
	orderFailed: boolean
	order: TOrder | null
}
