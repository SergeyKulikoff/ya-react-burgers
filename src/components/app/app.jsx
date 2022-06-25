import { useState } from 'react';

//Components
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

//Data
import { ingredients } from '../../utils/data.js';

//Style
import style from './app.module.css';

const App = () => {
	const ingredientType = {
		bun: [],
		main: [],
		sauce: []
	}

	ingredients.forEach(elem => ingredientType[elem.type].push(elem));

	const [ingredient, setIngredients] = useState(ingredientType);

	return (
		<div className="App">
			<AppHeader />
			<main>
				<p className="text text_type_main-large">Соберите бургер</p>

				<div className={style.container}>
					<BurgerIngredients
						bun={ingredientType.bun}
						main={ingredientType.main}
						sauce={ingredientType.sauce}
					/>
					<BurgerConstructor
						bun={ingredientType.bun}
						main={ingredientType.main}
						sauce={ingredientType.sauce}
					/>
				</div>
			</main>
		</div>
	);
}

export default App;