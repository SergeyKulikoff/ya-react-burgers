//React hooks
import { useState, useEffect } from 'react';

//Libraries
import { v4 as uuidv4 } from 'uuid';

//Utils
import { getIngredients } from '../../utils/get-api'

//Components
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

//Style
import style from './app.module.css';

export default function App() {
	const [ingredients, setIngredientType] = useState([]);

	useEffect(() => {
		getIngredients()
			.then(setIngredientType)
			.catch(() => alert("Во время загрузки данных произошла ошибка."))
	}, []);

	return (
		<div className="App">
			<AppHeader />
			<main>
				<p className="text text_type_main-large">Соберите бургер</p>

				<div className={style.container}>
					<BurgerIngredients
						ingredients={ingredients}
					/>
					<BurgerConstructor
						ingredients={ingredients}
					/>
				</div>
			</main>
		</div>
	);
}

