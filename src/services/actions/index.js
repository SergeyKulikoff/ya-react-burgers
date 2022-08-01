import {
	CONSTRUCTOR_MODAL,
	INGREDIENT_MODAL,
	INGREDIENTS_DATA,
	INGREDIENTS_CHOOSE,
	INGREDIENT_DELETE,
	COUNTER_INCREASE,
	COUNTER_DECREASE,
	MOVE_INGREDIENT
} from "../constants/actionTypes";

export const constructorShowModal = () => ({
	type: CONSTRUCTOR_MODAL
})

export const ingredientShowModal = () => ({
	type: INGREDIENT_MODAL
})

export const ingredientGET = (data) => ({
	type: INGREDIENTS_DATA,
	payload: data
})

export const ingredientChoose = (item) => ({
	type: INGREDIENTS_CHOOSE,
	payload: item
})

export const ingredientDelete = (id) => ({
	type: INGREDIENT_DELETE,
	id: id
})
export const sortIngredients = (hoverIndex, dragIndex) => ({
	type: MOVE_INGREDIENT,
	toIndex: hoverIndex,
	fromIndex: dragIndex
})

export const countDecrease = (item) => ({
	type: COUNTER_DECREASE,
	key: item.id,
	typeItem: item.type
})

export const countIncrease = (item) => ({
	type: COUNTER_INCREASE,
	key: item.id,
	typeItem: item.type
})

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';
const checkResponse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const getFetchData = () => {
	return dispatch => {
		fetch(API_URL)
			.then(checkResponse)
			.then(data => {
				if (data?.success) return dispatch(ingredientGET(data));
				return Promise.reject(data)
			})
	}
}
