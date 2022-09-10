//Constant
import {
	CONSTRUCTOR_MODAL
} from '../constants/actionTypes';

//Types
import { _TInitialModalState } from './toggle.types';

//Reducer
import { isOpen } from './toggleModal';

const initialState: _TInitialModalState = {
	constructorModal: false
};

describe('check isOpen', () => {
	it('check WS_CONNECTION_SUCCESS', () => {
		const expected = {
			...initialState,
			constructorModal: !initialState.constructorModal
		};

		const received = isOpen(initialState, {
			type: CONSTRUCTOR_MODAL
		});

		expect(received).toEqual(expected)
	});
});
