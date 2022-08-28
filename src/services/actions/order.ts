import * as config from '../../config';
import { createOrderUrl, orderUrl } from '../../config';
import { AppDispatch, AppThunk } from '../../types';
import { checkResponse } from "../../utils/api-requests";
import { getCookie } from '../../utils/cookie';

//Actions
import {
	clearOrderAction,
	getOrderAction,
	orderFailedAction,
	orderLoadAction,
	orderSuccesAction,
	resetConstructorAction,
} from './index';

export const createOrder = (ingredientsId: Array<string>): AppThunk => {
	return (dispatch: AppDispatch) => {
		fetch(createOrderUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Authorization': 'Bearer ' + getCookie('token')
			},
			body: JSON.stringify({ 'ingredients': ingredientsId })
		})
			.then(checkResponse)
			.then(result => {
				if (result.success) {
					let orderNumber = result.order.number;

					dispatch(orderLoadAction(orderNumber));
					dispatch(resetConstructorAction());
				}
			})
			.catch(error => {
				console.log(error);
				alert('Ошибка ' + error + ' при подключении к Api');
			});
	}
}

export const getOrder = (id: string): AppThunk => {
	return (dispatch: AppDispatch) => {
		dispatch(getOrderAction());
		fetch(orderUrl + id, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			}
		}
		)
			.then(checkResponse)
			.then(response => {
				console.log(response);
				dispatch(orderSuccesAction(response.orders[0]));
				return response.data;
			})
			.catch(() => {
				console.log('errr');
				dispatch(orderFailedAction())
			})
	}
}

export const clearOrder = (): AppThunk => {
	return (dispatch: AppDispatch) => dispatch(clearOrderAction());
}
