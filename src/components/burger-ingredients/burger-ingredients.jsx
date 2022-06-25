import React from "react";

//Components
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "../ingredinet-card/ingredient-card";

//Style
import style from './burger-ingredients.module.css'

const BurgerIngredients = (props) => {
	const [current, setCurrent] = React.useState('one')

	return (
		<section>
			<div className={style.tabsBox}>
				<Tab value="one" active={current === 'one'} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab value="two" active={current === 'two'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value="three" active={current === 'three'} onClick={setCurrent}>
					Начинки
				</Tab>
			</div>

			<div className={style.content}>
				<div className={style.ingredientBox}>
					<div className={style.headline}>Булки</div>
					{props.bun.map((elem, index) => {
						console.log(elem)
						return (
							<IngredientCard
								key={index}
								image={elem.image}
								name={elem.name}
								price={elem.price}
								proteins={elem.proteins}
							/>
						)
					})}
				</div>

				<div className={style.ingredientBox}>
					<div className={style.headline}>Соусы</div>
					{props.sauce.map((elem, index) => {
						console.log(elem)
						return (
							<IngredientCard
								key={index}
								image={elem.image}
								name={elem.name}
								price={elem.price}
								proteins={elem.proteins}
							/>
						)
					})}
				</div>

				<div className={style.ingredientBox}>
					<div className={style.headline}>Начинки</div>
					{props.main.map((elem, index) => {
						console.log(elem)
						return (
							<IngredientCard
								key={index}
								image={elem.image}
								name={elem.name}
								price={elem.price}
								proteins={elem.proteins}
							/>
						)
					})}
				</div>
			</div>


		</section>
	)
}
export default BurgerIngredients