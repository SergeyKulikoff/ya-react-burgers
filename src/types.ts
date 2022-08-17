import { store } from './services/store';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type TIngredient = {
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
	productId: string
	count?: number
}

export type TOrder = {
	ingredients: Array<string>
	_id: string
	number: number
}

export type TUser = {
	name?: string;
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
