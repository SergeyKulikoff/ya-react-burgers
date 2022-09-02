//Config
import * as config from '../../config';

//Utils
import { checkResponse } from "../../utils/api-requests";

//Actions
import { ingredientGET } from '.';
import { AppDispatch, AppThunk } from '../../types';

export const getFetchData = (): AppThunk => {
	return (dispatch: AppDispatch) => {
		fetch(config.getIngredientsUrl)
			.then(checkResponse)
			.then(result => {
				if (result?.success) return dispatch(ingredientGET(result.data));
				return Promise.reject(result)
			})
			.catch(error => {
				console.log(error);
				alert('Ошибка ' + error + ' при подключении к API');
			});
	}
}