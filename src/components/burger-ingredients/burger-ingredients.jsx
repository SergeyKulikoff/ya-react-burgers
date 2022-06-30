//React hooks
import { useState } from "react";

//Components
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "../ingredinet-card/ingredient-card";
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';



//Types
import PropTypes from 'prop-types';

//Style
import style from './burger-ingredients.module.css'

export default function BurgerIngredients({ ingredients }) {
	const [current, setCurrent] = useState('Булки');

	const bun = ingredients.filter(elem => elem.type === 'bun');

	const sauce = ingredients.filter(elem => elem.type === 'sauce');

	const main = ingredients.filter(elem => elem.type === 'main');

	const [isActive, setOpenModal] = useState(false);

	const [selectIngredient, setSelectIingredient] = useState([])

	const scrollTab = tab => {
		setCurrent(tab)
		const element = document.getElementById(tab);

		if (element) element.scrollIntoView({ behavior: "smooth" })
	}

	const onIngredientClick = id => {
		const selectID = ingredients.filter(elem => elem._id === id);
		setOpenModal(!isActive)
		setSelectIingredient(selectID)
	}

	return (
		<>
			<section>
				<div className={style.tabsBox}>
					<Tab value="Булки" active={current === 'Булки'} onClick={scrollTab}>
						Булки
					</Tab>
					<Tab value="Соусы" active={current === 'Соусы'} onClick={scrollTab}>
						Соусы
					</Tab>
					<Tab value="Начинки" active={current === 'Начинки'} onClick={scrollTab}>
						Начинки
					</Tab>
				</div>

				<div className={style.content}>
					<div className={style.ingredientBox}>
						<div className={style.headline} id="Булки">Булки</div>
						{bun.map(elem => {
							return (
								<IngredientCard
									key={elem._id}
									id={elem._id}
									image={elem.image}
									name={elem.name}
									price={elem.price}
									OnIngredientClick={onIngredientClick}
								/>
							)
						})}
					</div>

					<div className={style.ingredientBox}>
						<div className={style.headline} id="Соусы">Соусы</div>
						{sauce.map(elem => {
							return (
								<IngredientCard
									key={elem._id}
									id={elem._id}
									image={elem.image}
									name={elem.name}
									price={elem.price}
									OnIngredientClick={onIngredientClick}
								/>
							)
						})}
					</div>

					<div className={style.ingredientBox}>
						<div className={style.headline} id="Начинки">Начинки</div>
						{main.map(elem => {
							return (
								<IngredientCard
									key={elem._id}
									id={elem._id}
									image={elem.image}
									name={elem.name}
									price={elem.price}
									OnIngredientClick={onIngredientClick}
								/>
							)
						})}
					</div>
				</div>
			</section>
			{
				isActive && (
					<Modal
						isOpen={onIngredientClick}
						title={'Детали ингредиента'}
					>
						<IngredientDetails ingredient={selectIngredient} />
					</Modal>
				)
			}
		</>
	)
}

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}