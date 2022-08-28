import { store } from './services/store';
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TAuthActions, TIngredientActions, TOrderActions, TWSActions, _IGetIngredientsAction } from './services/actions';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions = TAuthActions | TIngredientActions | _IGetIngredientsAction | TWSActions | TOrderActions;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, never, TApplicationActions>;

export type TIngredient = {
	id: string;
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v?: number;
	productId: string
	count?: number
}

export type TOrder = {
	ingredients: Array<string>
	_id: string
	status: string
	number: number
	price: number
	createdAt: Date
	updatedAt: Date
	name: string
	owner?: {
		createdAt: Date
		updatedAt: Date
		email: string
		name: string
	}
	__v: number
}

export type TUser = {
	name?: string | any;
	email: string;
	password: string;
}

export type TUserRequest = {
	name: string;
	email: string;
	token: string;
}

export type TError = {
	success: boolean;
	message?: string
}

export type TMessage = {
	success: boolean
	orders: [
		{
			ingredients: string[]
			_id: string
			name: string
			status: string
			number: number
			createdAt: Date
			updatedAt: Date
			price: number
			__v: number
		}
	],
	total: number
	totalToday: number
}
