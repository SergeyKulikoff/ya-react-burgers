import { TIngredient } from './../../types';
import {
    INGREDIENTS_DATA,
    INGREDIENTS_CHOOSE,
    INGREDIENT_DELETE,
    COUNTER_DECREASE,
    COUNTER_INCREASE,
    MOVE_INGREDIENT,
    RESET_CONSTRUCTOR
} from "../constants/actionTypes";
import { TInitialState, _TActionsIngredient } from "./getData.types";

const initialState: TInitialState = {
    ingredient: [],
    burgerIngredients: {
        bun: null,
        contentItems: [],
        counts: {}
    },
}

export const fetchData = (state = initialState, action: _TActionsIngredient): TInitialState => {
    switch (action.type) {
        case INGREDIENTS_DATA:
            return {
                ...state,
                ingredient: action.data
            }

        case RESET_CONSTRUCTOR:
            return {
                ...state,
                burgerIngredients: initialState.burgerIngredients
            };

        case INGREDIENTS_CHOOSE:
            const item = action.item;

            if (item.type === 'bun') {
                return {
                    ...state,
                    burgerIngredients: {
                        ...state.burgerIngredients,
                        bun: item
                    }
                };
            } else {
                const chosenItem = { ...item, productId: action.productId }

                return {
                    ...state,
                    burgerIngredients: {
                        ...state.burgerIngredients,
                        contentItems: [
                            ...state.burgerIngredients.contentItems,
                            chosenItem
                        ]
                    }
                };
            }

        case INGREDIENT_DELETE: {
            return {
                ...state,
                burgerIngredients: {
                    ...state.burgerIngredients,
                    contentItems: [...state.burgerIngredients.contentItems].filter((elem: TIngredient) => elem.productId !== action.id)
                }
            };
        }

        case COUNTER_DECREASE: {

            if (action.typeItem !== 'bun') {
                return {
                    ...state,
                    burgerIngredients: {
                        ...state.burgerIngredients,
                        counts: {
                            ...state.burgerIngredients.counts,
                            [action.key]: state.burgerIngredients.counts[action.key] - 1
                        }
                    }
                }
            } else {
                return state;
            }
        }

        case COUNTER_INCREASE: {
            if (action.typeItem === 'bun' && state.burgerIngredients.counts[action.key] >= 2) {
                return state
            }

            return {
                ...state,
                burgerIngredients: {
                    ...state.burgerIngredients,
                    counts: {
                        ...state.burgerIngredients.counts,
                        [action.key]: (state.burgerIngredients.counts[action.key] || 0) + 1
                    }
                }
            }
        }

        case MOVE_INGREDIENT: {
            const contentItems = [...state.burgerIngredients.contentItems];
            contentItems.splice(action.toIndex, 0, contentItems.splice(action.fromIndex, 1)[0]);
            return {
                ...state,
                burgerIngredients: {
                    ...state.burgerIngredients,
                    contentItems: contentItems
                }
            };
        }

        default:
            return state
    }
}