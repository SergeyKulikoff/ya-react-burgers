//React hooks
import { useState, useEffect, useRef } from "react";

//Components
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "../ingredient-card/ingredient-card";

//Actions 
import { getFetchData } from "../../services/actions/ingredients";

//Style
import style from './burger-ingredients.module.css'
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { TIngredient } from "../../types";


export default function BurgerIngredients() {
	const [current, setCurrent] = useState<string>('Булки');
	const ingredients: Array<TIngredient> = useAppSelector(state => state.fetchData.ingredient);
	const dispatch = useAppDispatch();

	console.log(ingredients)

	const bun = ingredients.filter(elem => elem.type === 'bun');
	const sauce = ingredients.filter(elem => elem.type === 'sauce');
	const main = ingredients.filter(elem => elem.type === 'main');

	const primaryRef = useRef<HTMLDivElement>(null);
	const bunRef = useRef<any>(null);
	const sauceRef = useRef<any>(null);
	const mainRef = useRef<any>(null);

	useEffect(() => {
		dispatch(getFetchData());

	}, [dispatch]);

	const setTab = (tab: any) => {
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
	}, [current])

	return (
		<>
			<section>
				<div className={style.tabsBox}>
					{/*// @ts-ignore*/}
					<Tab value="Булки" active={current === 'Булки'
					} onClick={setTab} >
						Булки
					</Tab>
					{/*// @ts-ignore*/}
					< Tab value="Начинки" active={current === 'Начинки'} onClick={setTab} >
						Начинки
					</Tab>
					{/*// @ts-ignore*/}
					< Tab value="Соусы" active={current === 'Соусы'} onClick={setTab} >
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
								/>
							)
						})}
					</div>
				</div>
			</section>
		</>
	)
}
