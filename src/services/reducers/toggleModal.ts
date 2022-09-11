import { CONSTRUCTOR_MODAL } from "../constants/actionTypes";
import { _IShowAction, _TInitialModalState } from "./toggle.types";

const initialState: _TInitialModalState = {
	constructorModal: false
};

export const isOpen = (state = initialState, action: _IShowAction): _TInitialModalState => {
	switch (action.type) {
		case CONSTRUCTOR_MODAL:
			return {
				...state,
				constructorModal: !state.constructorModal
			};
		default:
			return state;
	}
}
