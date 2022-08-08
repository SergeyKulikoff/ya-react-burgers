//React hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';

//Components
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "../ingredient-card/ingredient-card";

//Actions 
import { getFetchData } from "../../services/actions/ingredients";

//Style
import style from './burger-ingredients.module.css'

export default function BurgerIngredients() {
	const [current, setCurrent] = useState('Булки');
	const ingredients = useSelector(state => state.fetchData.ingredient);
	const dispatch = useDispatch();

	const bun = ingredients.filter(elem => elem.type === 'bun');
	const sauce = ingredients.filter(elem => elem.type === 'sauce');
	const main = ingredients.filter(elem => elem.type === 'main');

	const primaryRef = useRef(null);
	const bunRef = useRef(null);
	const sauceRef = useRef(null);
	const mainRef = useRef(null);

	useEffect(() => {
		dispatch(getFetchData());

	}, [dispatch]);



	const setTab = tab => {
		console.log(tab);
		setCurrent(tab)
		const element = document.getElementById(tab);

		if (element) element.scrollIntoView({ behavior: "smooth" })
	}

	const handleScroll = () => {
		if (primaryRef && bunRef && sauceRef && mainRef && primaryRef.current && bunRef.current && sauceRef.current && mainRef.current) {
			const bunDistance = Math.abs(primaryRef.current.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top)
			const sauceDistance = Math.abs(primaryRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)
			const mainDistance = Math.abs(primaryRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
			const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
			const currentHeader = minDistance === bunDistance
				? 'Булки' : minDistance === sauceDistance ? 'Соусы' : 'Начинки';
			setCurrent(prevState => (currentHeader === prevState ? prevState : currentHeader))
		}
	}

	useEffect(() => {
		document.getElementById(current)?.scrollIntoView();
	},[current])

	return (
		<>
			<section>
				<div className={style.tabsBox}>
					<Tab value="Булки" active={current === 'Булки'} onClick={setTab}>
						Булки
					</Tab>
					<Tab value="Начинки" active={current === 'Начинки'} onClick={setTab}>
						Начинки
					</Tab>
					<Tab value="Соусы" active={current === 'Соусы'} onClick={setTab}>
						Соусы
					</Tab>
				</div>

				<div className={style.content} ref={primaryRef} onScroll={handleScroll}>
					<div className={style.ingredientBox} id="Булки" ref={bunRef}>
						<div className={style.headline} >Булки</div>
						
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
								/>
							)
						})}
					</div>

					<div className={style.ingredientBox} id="Начинки" ref={mainRef} >
						<div className={style.headline} >Начинки</div>
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
								/>
							)
						})}
					</div>

					<div className={style.ingredientBox} id="Соусы" ref={sauceRef} >
						<div className={style.headline} >Соусы</div>
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
								/>
							)
						})}
					</div>
				</div>
			</section>
		</>
	)
}
