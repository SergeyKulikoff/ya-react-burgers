import { CONSTRUCTOR_MODAL, INGREDIENT_MODAL } from "../constants/actionTypes";

const initialState = {
	constructorModal: false,
	ingredientModal: false
};

function isOpen(state = initialState, action) {
	switch (action.type) {
		case CONSTRUCTOR_MODAL:
			return {
				...state,
				constructorModal: !state.constructorModal
			};
		case INGREDIENT_MODAL:
			return {
				...state,
				ingredientModal: !state.ingredientModal
			};
		default:
			return state;
	}
}

export default isOpen;
