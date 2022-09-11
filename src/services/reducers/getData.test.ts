//Constant
import {
	INGREDIENTS_DATA,
	INGREDIENTS_CHOOSE,
	INGREDIENT_DELETE,
	COUNTER_DECREASE,
	COUNTER_INCREASE,
	MOVE_INGREDIENT,
	RESET_CONSTRUCTOR
} from "../constants/actionTypes";

//Types
import { TIngredient } from "../../types";
import { TInitialState } from "./getData.types";

//Reducer
import { fetchData } from "./getData";

//Libraries
import { v4 as uuidv4 } from 'uuid';


const ingredient: TIngredient = {
	id: '',
	_id: "60d3b41abdacab0026a733c6",
	name: "Краторная булка N-200i",
	type: "bun",
	carbohydrates: 53,
	calories: 420,
	proteins: 80,
	fat: 24,
	price: 1255,
	image: "https://code.s3.yandex.net/react/code/bun-02.png",
	image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
	image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
	__v: 0,
	productId: ''
}

const initialState: TInitialState = {
	ingredient: [ingredient],
	burgerIngredients: {
		bun: ingredient,
		contentItems: [],
		counts: {}
	}
};

describe('check fetchData', () => {

	it('check INGREDIENTS_DATA', () => {
		const expected = {
			...initialState
		};
		const received = fetchData(initialState, {
			type: INGREDIENTS_DATA,
			data: [ingredient]
		});
		expect(received).toEqual(expected)
	});

	it('check RESET_CONSTRUCTOR', () => {
		const expected = {
			...initialState,
			burgerIngredients: {
				...initialState.burgerIngredients,
				bun: null
			}
		};
		const received = fetchData(initialState, {
			type: RESET_CONSTRUCTOR
		});
		expect(received).toEqual(expected)
	});

	it('check INGREDIENTS_CHOOSE', () => {
		const expected = {
			...initialState,
			burgerIngredients: {
				...initialState.burgerIngredients,
				bun: ingredient
			}
		};
		const received = fetchData(initialState, {
			type: INGREDIENTS_CHOOSE,
			item: ingredient,
			productId: uuidv4()
		});
		expect(received).toEqual(expected)
	});

	it('check INGREDIENT_DELETE', () => {
		const expected = {
			...initialState,
			burgerIngredients: {
				...initialState.burgerIngredients
			}
		};
		const received = fetchData(initialState, {
			type: INGREDIENT_DELETE,
			id: '60d3b41abdacab0026a733c6'
		});
		expect(received).toEqual(expected)
	});

	it('check COUNTER_INCREASE', () => {
		const expected = {
			...initialState,
			burgerIngredients: {
				...initialState.burgerIngredients,
				counts: {
					"60d3b41abdacab0026a733c6": 1
				}
			}
		};

		const received = fetchData(initialState, {
			type: COUNTER_INCREASE,
			id: '60d3b41abdacab0026a733c6',
			key: '60d3b41abdacab0026a733c6',
			typeItem: 'bun'
		});
		expect(received).toEqual(expected)
	});

	it('check COUNTER_DECREASE', () => {
		const expected = {
			...initialState,
			burgerIngredients: {
				...initialState.burgerIngredients
			}
		};
		const received = fetchData(initialState, {
			type: COUNTER_DECREASE,
			id: '60d3b41abdacab0026a733c6',
			key: '60d3b41abdacab0026a733c6',
			typeItem: 'bun'
		});
		expect(received).toEqual(expected)
	});

	it('check MOVE_INGREDIENT', () => {
		const expected = {
			...initialState,
			burgerIngredients: {
				...initialState.burgerIngredients,
				contentItems: [undefined]
			}
		};
		const received = fetchData(initialState, {
			type: MOVE_INGREDIENT,
			fromIndex: 1,
			toIndex: 3
		});
		expect(received).toEqual(expected)
	});
});