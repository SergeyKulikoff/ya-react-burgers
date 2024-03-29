//React
import { useState, useEffect } from 'react';

//Router
import { useHistory } from 'react-router-dom';

//Style
import style from './ingredient-details.module.css'
import { useAppSelector } from '../../hooks/hooks';
import { TIngredient } from '../../types';

export default function IngredientDetails() {
	type EmptyObject = Record<any, never> | undefined;
	const history = useHistory();
	const id = history.location.pathname.slice(13);
	const ingredients = useAppSelector(state => state.fetchData.ingredient);
	let item: TIngredient | EmptyObject = {};
	let [ingredient, setIngredient] = useState<TIngredient | EmptyObject>({});

	useEffect(() => {
		item = ingredients.find((el: { _id: string; }) => el._id === id);
		setIngredient(item)
	}, [id, ingredients]);

	if (!item) {
		return (
			<div>Загрузка ингредиента....</div>
		)
	} else {
		return (
			<div className={`${style.item} pl-25 pr-25 pt-4`}>
				<div className={style.image}>
					<img src={ingredient?.image_large} alt={ingredient?.name} />
				</div>

				<div className={style.about}>
					{ingredient?.name}
				</div>

				<div className={`${style.nutriVal} mt-4`}>
					<div className={style.itemval}>
						<span className={style.val}>Калории,ккал</span>
						<p className={style.quantity}>{ingredient?.calories}</p>
					</div>

					<div className={style.itemval}>
						<span className={style.val}>Белки, г</span>
						<p className={style.quantity}>{ingredient?.proteins}</p>
					</div>

					<div className={style.itemval}>
						<span className={style.val}>Жиры, г</span>
						<p className={style.quantity}>{ingredient?.fat}</p>
					</div>

					<div className={style.itemval}>
						<span className={style.val}>Углеводы, г</span>
						<p className={style.quantity}>{ingredient?.carbohydrates}</p>
					</div>
				</div>
			</div>
		)
	}
}
