import { ORDER_LOAD, CLEAR_ORDER } from "../constants/actionTypes";

const initialState = {
    number: 0,
    order: null,
    orderRequest: false,
    orderFailed: false,
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_LOAD:
            return {
                ...state,
                number: action.number
            };

        case CLEAR_ORDER: {
            return {
                ...state,
                number: 0,
                order: null
            }
        }

        default: {
            return state;
        }
    }
}

export default orderReducer;