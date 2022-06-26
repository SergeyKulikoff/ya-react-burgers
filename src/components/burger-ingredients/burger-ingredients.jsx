import { useEffect, useState } from "react";

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
	const [ingredient, setIngredient] = useState(ingredients)

	let toggleShowHandler = () => {
		setOpenModal(!isActive)
	}

	return (
		<>
			<section>
				<div className={style.tabsBox}>
					<Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
						Булки
					</Tab>
					<Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
						Соусы
					</Tab>
					<Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
						Начинки
					</Tab>
				</div>

				<div className={style.content}>
					<div className={style.ingredientBox}>
						<div className={style.headline}>Булки</div>
						{bun.map((elem, index) => {
							return (
								<IngredientCard
									key={index}
									id={elem._id}
									image={elem.image}
									name={elem.name}
									price={elem.price}
									proteins={elem.proteins}
									click={toggleShowHandler}
								/>
							)
						})}
					</div>

					<div className={style.ingredientBox}>
						<div className={style.headline}>Соусы</div>
						{sauce.map((elem, index) => {
							return (
								<IngredientCard
									key={index}
									id={elem._id}
									image={elem.image}
									name={elem.name}
									price={elem.price}
									proteins={elem.proteins}
									click={toggleShowHandler}
								/>
							)
						})}
					</div>

					<div className={style.ingredientBox}>
						<div className={style.headline}>Начинки</div>
						{main.map((elem, index) => {
							return (
								<IngredientCard
									key={index}
									id={elem._id}
									image={elem.image}
									name={elem.name}
									price={elem.price}
									proteins={elem.proteins}
									click={toggleShowHandler}
								/>
							)
						})}
					</div>
				</div>
			</section>

			{isActive ?
				<Modal
					isOpen={isActive}
					title={'Детали ингредиента'}
				>
					<IngredientDetails ingredient={ingredients} />
				</Modal>
				: null}
		</>
	)
}

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
}