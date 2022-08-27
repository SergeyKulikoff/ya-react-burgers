import { TIngredient } from "../../types";
import {
	COUNTER_DECREASE,
	COUNTER_INCREASE,
	INGREDIENTS_CHOOSE,
	INGREDIENTS_DATA,
	INGREDIENT_DELETE,
	MOVE_INGREDIENT,
	RESET_CONSTRUCTOR
} from "../constants/actionTypes";


export type TInitialState = {
	ingredient: TIngredient[],
	burgerIngredients: {
		bun: TIngredient | null,
		contentItems: TIngredient[],
		counts: {
			[name: string]: number
		}
	}
};

export type _TBurgerIngredientState = {
	ingredient: TIngredient[]
	burgerIngredients: {
		bun: TIngredient,
		contentItems: TIngredient[],
		counts: {
			[name: string]: number
		}
	}
}

export interface _IGetIngredientsAction { type: typeof INGREDIENTS_DATA, data: TIngredient[] }
export interface _IResetConstructorAction { type: typeof RESET_CONSTRUCTOR }
export interface _IIngredientsChooseAction { type: typeof INGREDIENTS_CHOOSE, item: TIngredient, productId: string }
export interface _IIngredientsDeleteAction { type: typeof INGREDIENT_DELETE, id: string }
export interface _ICounterDownAction { type: typeof COUNTER_DECREASE, typeItem: string, key: string, id: string }
export interface _ICounterUpAction { type: typeof COUNTER_INCREASE, typeItem: string, key: string, id: string }
export interface _IMoveAction { type: typeof MOVE_INGREDIENT, fromIndex: number, toIndex: number }

export type _TActionsIngredient =
	| _IGetIngredientsAction
	| _IResetConstructorAction
	| _IIngredientsChooseAction
	| _IIngredientsDeleteAction
	| _ICounterDownAction
	| _ICounterUpAction
	| _IMoveAction