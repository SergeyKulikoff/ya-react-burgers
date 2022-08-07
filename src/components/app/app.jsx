//Components
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

//Style
import style from './app.module.css';

export default function App() {
	return (
		<div className="App">
			<AppHeader />
			<main>
				<p className="text text_type_main-large">Соберите бургер</p>
				<div className={style.container}>
					<BurgerIngredients />

					<BurgerConstructor />
				</div>
			</main>
		</div >
	);
}

