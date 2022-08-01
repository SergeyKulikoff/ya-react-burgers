//React hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

//Components
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "../ingredinet-card/ingredient-card";
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

//Actions 
import { getFetchData } from '../../services/actions/index';
import { ingredientShowModal } from "../../services/actions";

//Style
import style from './burger-ingredients.module.css'

export default function BurgerIngredients() {
	const isActive = useSelector(state => state.isOpen);
	const ingredients = useSelector(state => state.fetchData.ingredient);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFetchData());

	}, [dispatch]);

	const [current, setCurrent] = useState('Булки');

	const bun = ingredients.filter(elem => elem.type === 'bun');
	const sauce = ingredients.filter(elem => elem.type === 'sauce');
	const main = ingredients.filter(elem => elem.type === 'main');
	const [selectIngredient, setSelectIingredient] = useState([])

	const scrollTab = tab => {
		setCurrent(tab)
		const element = document.getElementById(tab);

		if (element) element.scrollIntoView({ behavior: "smooth" })
	}

	const onIngredientClick = id => {
		dispatch(ingredientShowModal())
		const selectID = ingredients.filter(elem => elem._id === id);
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
									type={elem.type}
									data={ingredients}
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
									type={elem.type}
									data={ingredients}
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
									type={elem.type}
									data={ingredients}
									OnIngredientClick={onIngredientClick}
								/>
							)
						})}
					</div>
				</div>
			</section>

			{
				isActive.ingredientModal && (
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
