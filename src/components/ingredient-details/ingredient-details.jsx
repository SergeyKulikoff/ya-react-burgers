//Type
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';

//Style
import style from './ingredient-details.module.css'

export default function IngredientDetails(ingredient) {
	return (
		ingredient.ingredient.map(elem => {
			return (
				<div className={`${style.item} pl-25 pr-25 pt-4`} key={elem._id}>
					<div className={style.image}>
						<img src={elem.image_large} alt="Здесь должно быть изображение булки" />
					</div>

					<div className={style.about}>
						{elem.name}
					</div>

					<div className={`${style.nutriVal} mt-4`}>
						<div className={style.itemval}>
							<span className={style.val}>Калории,ккал</span>
							<p className={style.quantity}>{elem.calories}</p>
						</div>

						<div className={style.itemval}>
							<span className={style.val}>Белки, г</span>
							<p className={style.quantity}>{elem.proteins}</p>
						</div>

						<div className={style.itemval}>
							<span className={style.val}>Жиры, г</span>
							<p className={style.quantity}>{elem.fat}</p>
						</div>

						<div className={style.itemval}>
							<span className={style.val}>Углеводы, г</span>
							<p className={style.quantity}>{elem.carbohydrates}</p>
						</div>
					</div>
				</div>
			)
		})
	)
}
IngredientDetails.propTypes = {
	ingredient: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
}
