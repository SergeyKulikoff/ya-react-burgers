//Config
import * as config from '../../config';

//Utils
import { checkResponse } from "../../utils/api-requests";

//Actions
import { ingredientGET } from '.';

export const getFetchData = () => {
	return dispatch => {
		fetch(config.getIngredientsUrl)
			.then(checkResponse)
			.then(data => {
				if (data?.success) return dispatch(ingredientGET(data));
				return Promise.reject(data)
			})
			.catch(error => {
				console.log(error);
				alert('Ошибка ' + error + ' при подключении к API');
			});
	}
}