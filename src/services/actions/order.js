import * as config from '../../config';
import { checkResponse } from "../../utils/api-requests";

//Actions
import {
	clearOrderAction,
	orderLoadAction,
	resetConstructorAction,
} from './index';

export const createOrder = (ingredientsId) => {
	return dispatch => {
		fetch(config.createOrderUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({ 'ingredients': ingredientsId })
		})
			.then(checkResponse)
			.then(result => {
				if (result.success) {
					let orderNumber = result.order.number;
					dispatch(orderLoadAction(orderNumber));
					dispatch(resetConstructorAction);
				}
			})
			.catch(error => {
				console.log(error);
				alert('Error ' + error + ' while connecting to Api');
			});
	}
}

export const clearOrder = () => {
	return dispatch => dispatch(clearOrderAction);
}
