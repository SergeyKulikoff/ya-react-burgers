import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

//Components
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

//Style
import style from './app.module.css';

export default function App() {
	const URL = 'https://norma.nomoreparties.space/api/ingredients'
	const [ingredientType, setIngredientType] = useState([]);

	const [showMore, setShowMore] = useState(false);

	useEffect(() => {
		fetch(URL)
			.then(response => response.json())
			.then(data => setIngredientType(data.data))
			.catch(e => console.log('error'))
	}, []);

	return (
		<div className="App">
			<AppHeader />
			<main>
				<p className="text text_type_main-large">Соберите бургер</p>

				<div className={style.container}>
					<BurgerIngredients
						ingredients={ingredientType}
					/>
					<BurgerConstructor
						ingredients={ingredientType}
					/>
				</div>
			</main>
		</div>
	);
}

