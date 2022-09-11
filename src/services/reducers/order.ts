import { ORDER_LOAD, CLEAR_ORDER, GET_ORDER, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from "../constants/actionTypes";
import { _TOrderActions, _TOrderState } from "./order.types";

const initialState: _TOrderState = {
    number: 0,
    order: null,
    orderRequest: false,
    orderFailed: false,
};

export const orderReducer = (state = initialState, action: _TOrderActions): _TOrderState => {
    switch (action.type) {
        case ORDER_LOAD:
            return {
                ...state,
                number: action.number
            };

        case GET_ORDER: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            }
        }

        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.order,
                orderRequest: false
            }
        }

        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            }
        }

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
